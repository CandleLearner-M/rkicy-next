import Groq from "groq-sdk";

const maintenanceMessage = `
### Rkicy AI is temporarily unavailable

Our AI assistant is currently undergoing maintenance. In the meantime, our team is happy to help you directly:

- Email: contact@rkicy.com
- Phone: +212 07 07 07 2558
- Or use the contact form on our website

Thank you for your patience—please try again shortly.
`.trim();

function ok(payload: any, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function makeCorrelationId() {
  // Lightweight correlation id without adding deps
  return `rkicy_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(req: Request) {
  const cid = makeCorrelationId();

  try {
    // Basic validation (do NOT leak details to the client)
    const body = await req.json().catch(() => null);
    const messages = Array.isArray(body?.messages) ? body?.messages : null;

    if (!messages || messages.length === 0) {
      // Client-side usually prevents this, but keep UX consistent
      console.warn(`[${cid}] Invalid request: missing messages`);
      return ok({ message: maintenanceMessage, meta: { degraded: true, cid } }, { "x-rkicy-cid": cid });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error(`[${cid}] Missing GROQ_API_KEY`);
      return ok({ message: maintenanceMessage, meta: { degraded: true, cid } }, { "x-rkicy-cid": cid });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const formattedMessages = messages.map((m: any) => ({
      role: m.type === "user" ? "user" : "assistant",
      content: m.content,
    }));

    const systemMessage = {
      role: "system" as const,
      content: `You are Rkicy's Virtual Team Member - a knowledgeable, friendly tech consultant representing Rkicy.

      About Rkicy: We're Morocco's premier technology partner, combining cutting-edge AI expertise with enterprise IT solutions and hardware services. Our headquarters are in Morocco, and we serve businesses worldwide.

      FORMAT & TONE:
      - Always format responses in Markdown (headings, bullet lists, numbered lists, bold where helpful).
      - Keep paragraphs short and scannable. Do not wrap the whole response in triple backticks.
      - Friendly, confident, conversational tone; use "we" for Rkicy.

      CORE EXPERTISE:
      1. AI & Data Solutions: ML systems, predictive analytics, computer vision, NLP, custom AI implementation
      2. Enterprise IT: Cloud migration, system integration, network architecture, cybersecurity, IT infrastructure optimization
      3. Custom Software: Web/mobile apps, enterprise software, digital transformation, UX/UI design
      4. Hardware Solutions: Server infrastructure, procurement, maintenance, technical support

      APPROACH:
      - Understand each client's unique challenges
      - Propose tailored solutions (not one-size-fits-all)
      - Prioritize long-term partnerships
      - Blend global tech trends with local business context

      If asked for specifics you can't provide (pricing, ongoing projects, proprietary details), offer to connect them with our team at contact@rkicy.com or +212 07 07 07 2558.`,
      };

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [systemMessage, ...formattedMessages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = response.choices?.[0]?.message?.content?.trim() ?? "";

    if (!text) {
      // Rare, but keep UX clean
      console.warn(`[${cid}] Empty model response`);
      return ok({ message: maintenanceMessage, meta: { degraded: true, cid } }, { "x-rkicy-cid": cid });
    }

    return ok({ message: text, meta: { degraded: false, cid } }, { "x-rkicy-cid": cid });
  } catch (error: any) {
    // Log full details server-side only
    console.error(`[${cid}] Groq API error`, {
      message: error?.message,
      code: error?.code,
      status: error?.status,
      stack: error?.stack,
    });

    // Always return a friendly message to the client
    return ok({ message: maintenanceMessage, meta: { degraded: true, cid } }, { "x-rkicy-cid": cid });
  }
}