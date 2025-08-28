"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Maximize2, Minimize2, X, CornerDownLeft, User } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import styles from "./AiChatAssistant.module.scss";

const initialMessages = [
  {
    id: "welcome-1",
    type: "assistant",
    content: "Hello! I'm the Rkicy AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000).toISOString()
  }
];

const localFallbackMessage = `
### Rkicy AI is temporarily unavailable

We're making improvements right now. Please reach out and we'll help you directly:

- Email: contact@rkicy.com  
- Phone: +212 07 07 07 2558

Thanks for your patience!
`.trim();

export default function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);

  

  // Notify other components of chat state
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("rkicy:chat-state", { detail: { open: isOpen } }));
    }
  }, [isOpen]);

  // Listen for global open/toggle events from the mobile nav
  useEffect(() => {
    const openChat = () => {
      setIsOpen(true);
      setIsMinimized(false);
      setHasNewMessage(false);
      // Removed auto-focus on mobile; desktop-only:
    };

    const toggleChat = () => {
      setIsOpen((prev) => {
        const next = !prev;
        if (next) {
          setIsMinimized(false);
          setHasNewMessage(false);
        }
        return next;
      });
    };

    window.addEventListener("rkicy:open-chat", openChat);
    window.addEventListener("rkicy:toggle-chat", toggleChat);
    return () => {
      window.removeEventListener("rkicy:open-chat", openChat);
      window.removeEventListener("rkicy:toggle-chat", toggleChat);
    };
  }, []);

  // Keep scroll at bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      (messagesEndRef.current as any).scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  const toggleChatLocal = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setHasNewMessage(false);
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
    if (isMinimized) setHasNewMessage(false);
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const newUserMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: text,
      timestamp: new Date().toISOString()
    };

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

      let content = "";
      if (res.ok) {
        const data = await res.json().catch(() => null);
        content = typeof data?.message === "string" && data.message.trim()
          ? data.message
          : localFallbackMessage;
      } else {
        content = localFallbackMessage;
      }

      const newAiMessage = {
        id: `ai-${Date.now()}`,
        type: "assistant",
        content,
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, newAiMessage]);
      if (isMinimized) setHasNewMessage(true);
    } catch {
      const newAiMessage = {
        id: `ai-${Date.now()}`,
        type: "assistant",
        content: localFallbackMessage,
        timestamp: new Date().toISOString()
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
      {/* Desktop floating launcher only; hidden on mobile via CSS */}
      {!isOpen && (
        <motion.button
          className={styles.chatLauncher}
          onClick={toggleChatLocal}
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
                    <button className={`${styles.headerButton} ${styles.closeBTN}`} onClick={toggleChatLocal} aria-label="Close chat">
                      <X size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div 
                  className={styles.messagesContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.messagesWrapper}>
                    <div className={styles.welcomeBox}>
                      <div className={styles.welcomeBoxHeader}>
                        <div className={styles.welcomeIcon}>
                          <Image src="/ai/logo.svg" alt="Rkicy AI Logo" width={22} height={22} />
                        </div>
                        <h4>Rkicy AI Assistant</h4>
                      </div>
                      <p>
                        I can answer questions about Rkicy&apos;s services, 
                        technology solutions, and help you find the information you need.
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
                                    a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
                                  }}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              ) : (
                                <span>{message.content}</span>
                              )}
                            </div>
                            <div className={styles.messageTime}>
                              {formatTime(message.timestamp)}
                            </div>
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
                    <button 
                      type="submit" 
                      className={styles.sendButton}
                      disabled={!inputValue.trim()}
                    >
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
                <p>Powered by <span>Rkicy AI</span></p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}