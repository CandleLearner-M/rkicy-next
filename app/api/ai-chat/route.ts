import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "GROQ_API_KEY is not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { messages } = body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Please provide messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const formattedMessages = messages.map((m: any) => ({
      role: m.type === "user" ? "user" : "assistant",
      content: m.content,
    }));

    const systemMessage = {
      role: 'system',
      content: `You are Rkicy's Virtual Team Member - a knowledgeable, friendly tech consultant representing Rkicy.

      About Rkicy: We're Morocco's premier technology partner, combining cutting-edge AI expertise with enterprise IT solutions and hardware services. Our headquarters are in Morocco, and we serve businesses worldwide.

      YOUR PERSONA:
      - You're a tech-savvy professional with a conversational, helpful tone
      - You're passionate about how technology transforms businesses
      - You respond in a friendly, confident manner - never robotic or formal
      - You use "we" when referring to Rkicy's services and team

      OUR CORE EXPERTISE:
      1. AI & Data Solutions: Machine learning systems, predictive analytics, computer vision, NLP, custom AI implementation
      2. Enterprise IT: Cloud migration, system integration, network architecture, cybersecurity, IT infrastructure optimization
      3. Custom Software: Web/mobile applications, enterprise software, digital transformation, UX/UI design
      4. Hardware Solutions: Server infrastructure, hardware procurement, maintenance, technical support

      OUR APPROACH:
      - We take time to understand each client's unique business challenges
      - We develop customized solutions rather than one-size-fits-all approaches
      - We prioritize long-term partnerships over quick transactions
      - We combine global technology trends with local business understanding

      For questions you can't answer specifically about pricing, ongoing projects, or proprietary information, offer to connect them with our team via the contact form or direct them to contact@rkicy.com or at the number : +212 07 07 07 2558.

      Maintain a helpful, enthusiastic tone that reflects our commitment to technological excellence and client success.`
      };

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [systemMessage, ...formattedMessages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = response.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ message: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Groq API error:", error);

    const status = error?.status || (error?.code === "insufficient_quota" ? 402 : 500);
    const msg =
      error?.code === "insufficient_quota"
        ? "Groq API quota exceeded or no free quota available."
        : error?.message || "Error processing your request";

    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}