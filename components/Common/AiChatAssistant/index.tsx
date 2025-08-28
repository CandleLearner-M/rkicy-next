"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Maximize2, Minimize2, X, CornerDownLeft, User } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import styles from "./AiChatAssistant.module.scss";

// Initial assistant message
const initialMessages = [
  {
    id: "welcome-1",
    type: "assistant",
    content: "Hello! I'm the Rkicy AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
];

export default function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      (messagesEndRef.current as any).scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setHasNewMessage(false);
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setHasNewMessage(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Send the conversation to our API and append the assistant reply
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const newUserMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    // Optimistically add user message and show typing
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].map((m) => ({
            type: m.type,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      const content =
        res.ok && data?.message
          ? data.message
          : data?.error || "Sorry, I couldn't process that right now. Please try again.";

      const newAiMessage = {
        id: `ai-${Date.now()}`,
        type: "assistant",
        content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newAiMessage]);
      if (isMinimized) setHasNewMessage(true);
    } catch (err) {
      console.error("Chat error:", err);
      const newAiMessage = {
        id: `ai-${Date.now()}`,
        type: "assistant",
        content: "Sorry, there was a network or server error. Please try again in a moment.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newAiMessage]);
      if (isMinimized) setHasNewMessage(true);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          className={styles.chatLauncher}
          onClick={toggleChat}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.launcherGlow} />
          <Image src="/ai/logo.svg" alt="Rkicy AI" width={30} height={30} className={styles.launcherIcon} />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.chatContainer} ${isMinimized ? styles.minimized : ""}`}
            initial={{ opacity: 0, y: 20, height: isMinimized ? 60 : 500 }}
            animate={{ opacity: 1, y: 0, height: isMinimized ? 60 : 500, width: isMinimized ? 300 : 380 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.chatHeader} onClick={isMinimized ? toggleMinimize : undefined}>
              <div className={styles.headerContent}>
                <div className={styles.botIconContainer}>
                  <Image src="/ai/logo.svg" alt="Rkicy AI" width={28} height={28} className={styles.botIcon} />
                </div>
                <div className={styles.headerInfo}>
                  <h3>Rkicy AI Assistant</h3>
                  <div className={styles.botStatus}>
                    <span className={styles.statusDot}></span>
                    <span>Online</span>
                  </div>
                </div>
              </div>

              <div className={styles.headerControls}>
                {isMinimized ? (
                  <>
                    {hasNewMessage && <div className={styles.newMessageDot} />}
                    <button className={styles.headerButton} onClick={toggleMinimize} aria-label="Maximize chat">
                      <Maximize2 size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button className={styles.headerButton} onClick={toggleMinimize} aria-label="Minimize chat">
                      <Minimize2 size={16} />
                    </button>
                    <button className={styles.headerButton} onClick={toggleChat} aria-label="Close chat">
                      <X size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div className={styles.messagesContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div className={styles.messagesWrapper}>
                    <div className={styles.welcomeBox}>
                      <div className={styles.welcomeBoxHeader}>
                        <div className={styles.welcomeIcon}>
                          <Image src="/ai/logo.svg" alt="Rkicy AI Logo" width={22} height={22} />
                        </div>
                        <h4>Rkicy AI Assistant</h4>
                      </div>
                      <p>
                        I can answer questions about Rkicy&apos;s services, technology solutions, and help you find the information you need.
                      </p>
                    </div>

                    <div className={styles.messages}>
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`${styles.messageGroup} ${
                            message.type === "assistant" ? styles.assistantGroup : styles.userGroup
                          }`}
                        >
                          <div className={styles.messageBubble}>
                            <div className={styles.messageContent}>
                              {message.type === "assistant" ? (
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  rehypePlugins={[rehypeSanitize]}
                                  components={{
                                    a: (props) => (
                                      <a {...props} target="_blank" rel="noopener noreferrer" />
                                    ),
                                  }}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              ) : (
                                <span>{message.content}</span>
                              )}
                            </div>
                            <div className={styles.messageTime}>{formatTime(message.timestamp)}</div>
                          </div>
                          <div className={styles.messageAvatar}>
                            {message.type === "assistant" ? (
                              <div className={styles.assistantAvatar}>
                                <Image src="/ai/logo.svg" alt="Rkicy AI Logo" width={20} height={20} />
                              </div>
                            ) : (
                              <div className={styles.userAvatar}>
                                <User size={16} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className={`${styles.messageGroup} ${styles.assistantGroup}`}>
                          <div className={`${styles.messageBubble} ${styles.typingBubble}`}>
                            <div className={styles.typingIndicator}>
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                          <div className={styles.messageAvatar}>
                            <div className={styles.assistantAvatar}>
                              <Image src="/ai/logo.svg" alt="Rkicy AI Logo" width={17} height={17} />
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  <div className={styles.suggestionChips}>
                    <button className={styles.chip} onClick={() => setInputValue("Tell me about your services")}>
                      Services
                    </button>
                    <button className={styles.chip} onClick={() => setInputValue("How can I contact sales?")}>
                      Contact sales
                    </button>
                    <button className={styles.chip} onClick={() => setInputValue("What industries do you serve?")}>
                      Industries
                    </button>
                  </div>

                  <form className={styles.inputArea} onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Type your message..."
                      className={styles.chatInput}
                    />
                    <button type="submit" className={styles.sendButton} disabled={!inputValue.trim()}>
                      <Send size={18} />
                    </button>
                    <div className={styles.returnKeyHint}>
                      <CornerDownLeft size={14} />
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {!isMinimized && (
              <div className={styles.chatFooter}>
                <p>
                  Powered by <span>Rkicy AI</span>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}