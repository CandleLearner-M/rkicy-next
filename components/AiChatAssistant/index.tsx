"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Maximize2, 
  Minimize2, 
  X, 
  Sparkles,
  ChevronDown,
  CornerDownLeft,
  Bot,
  User
} from "lucide-react";
import Image from "next/image";
import styles from "./AiChatAssistant.module.scss";

// Sample messages to demonstrate UI
const initialMessages = [
  {
    id: "welcome-1",
    type: "assistant",
    content: "Hello! I'm the Rkicy AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000).toISOString()
  }
];

export default function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setHasNewMessage(false);
  };

  // Toggle chat minimized/maximized
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setHasNewMessage(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Sample send message functionality (just for UI demonstration)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "I can help you with that! Would you like more information about our technology solutions?",
        "Thanks for your question. Our team specializes in enterprise IT solutions for Moroccan businesses.",
        "Great question! Rkicy Technology offers a range of AI and hardware solutions. Would you like to know more about a specific service?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const newAiMessage = {
        id: `ai-${Date.now()}`,
        type: "assistant",
        content: randomResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      
      // If chat is minimized, show new message indicator
      if (isMinimized) {
        setHasNewMessage(true);
      }
    }, 1500);
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat launcher button */}
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
          <Sparkles size={24} />
          <span>AI Assistant</span>
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.chatContainer} ${isMinimized ? styles.minimized : ''}`}
            initial={{ opacity: 0, y: 20, height: isMinimized ? 60 : 500 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              height: isMinimized ? 60 : 500,
              width: isMinimized ? 300 : 380
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Chat header */}
            <div 
              className={styles.chatHeader}
              onClick={isMinimized ? toggleMinimize : undefined}
            >
              <div className={styles.headerContent}>
                <div className={styles.botIconContainer}>
                  <Image 
                    src="/icons/logo.svg" 
                    alt="Rkicy AI" 
                    width={28} 
                    height={28}
                    className={styles.botIcon}
                  />
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
                    <button 
                      className={styles.headerButton}
                      onClick={toggleMinimize}
                      aria-label="Maximize chat"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className={styles.headerButton}
                      onClick={toggleMinimize}
                      aria-label="Minimize chat"
                    >
                      <Minimize2 size={16} />
                    </button>
                    <button 
                      className={styles.headerButton}
                      onClick={toggleChat}
                      aria-label="Close chat"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Messages area - only shown when not minimized */}
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
                          <Bot size={20} />
                        </div>
                        <h4>Rkicy AI Assistant</h4>
                      </div>
                      <p>
                        I can answer questions about Rkicy's services, 
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
                              {message.content}
                            </div>
                            <div className={styles.messageTime}>
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                          <div className={styles.messageAvatar}>
                            {message.type === "assistant" ? (
                              <div className={styles.assistantAvatar}>
                                <Bot size={16} />
                              </div>
                            ) : (
                              <div className={styles.userAvatar}>
                                <User size={16} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing indicator */}
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
                              <Bot size={16} />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Empty div for scrolling to bottom */}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Suggestion chips */}
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

                  {/* Input area */}
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

            {/* Footer note - only when not minimized */}
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