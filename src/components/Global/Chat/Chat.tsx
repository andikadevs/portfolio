/** @format */

"use client";

import { useState, useEffect, useRef } from "react";
import { useSpring, animated, config, useTransition } from "@react-spring/web";
import { FaRobot, FaTimes, FaPaperPlane, FaRegLightbulb } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import {
  saveChatMessage,
  getChatHistory,
  ChatMessage,
  geminiModel,
} from "@/utils/Global";

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const visitorId = useRef<string>("");
  const [isStreaming, setIsStreaming] = useState(false);

  // Add welcome message function
  const addWelcomeMessage = async () => {
    const welcomeMessage: Omit<ChatMessage, "id" | "created_at"> = {
      visitor_id: visitorId.current,
      message: "👋 Hi there! I'm Tejo, Andika's AI assistant. I'm here to help answer your questions about Andika's work, experience, and anything else you'd like to discuss. How can I assist you today?",
      is_bot: true,
    };

    await saveChatMessage(welcomeMessage);
    setMessages([welcomeMessage as ChatMessage]);
  };

  // Initialize chat and load history
  useEffect(() => {
    const initChat = async () => {
      try {
        setIsHistoryLoading(true);
        
        // Get visitor ID from localStorage or create new one
        let storedVisitorId = localStorage.getItem("chat_visitor_id");
        if (!storedVisitorId) {
          storedVisitorId = Math.random().toString(36).substring(7);
          localStorage.setItem("chat_visitor_id", storedVisitorId);
        }
        visitorId.current = storedVisitorId;

        // Load chat history
        const history = await getChatHistory(visitorId.current);
        console.log('Loaded chat history:', history); // Debug log
        
        if (history.length === 0) {
          // If this is a new chat, add the welcome message
          await addWelcomeMessage();
        } else {
          setMessages(history);
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
      } finally {
        setIsHistoryLoading(false);
      }
    };

    initChat();
  }, []);

  // Scroll to bottom effect - update to handle both messages changes and initial open
  useEffect(() => {
    if (chatRef.current && (messages.length > 0 || isOpen)) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]); // Add isOpen to dependencies

  // Optional: Add a smooth scroll function for better UX
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Update the setIsOpen handler to trigger scroll
  const handleOpenChat = () => {
    setIsOpen(true);
    // Use setTimeout to ensure the chat window is rendered before scrolling
    setTimeout(scrollToBottom, 100);
  };

  // Enhanced animations
  const springProps = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.8)',
    config: {
      mass: 1,
      tension: 280,
      friction: 20,
    },
  });

  // Floating button animation
  const buttonSpring = useSpring({
    scale: isOpen ? 0 : 1,
    rotate: isOpen ? '360deg' : '0deg',
    config: config.wobbly,
  });

  // Message transitions
  const transitions = useTransition(messages, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 20 },
  });

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Omit<ChatMessage, "id" | "created_at"> = {
      visitor_id: visitorId.current,
      message: message.trim(),
      is_bot: false,
    };

    setMessages((prev) => [...prev, userMessage as ChatMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      await saveChatMessage(userMessage);

      // Update system prompt to reflect Tejo's personality
      const systemPrompt = `You are Tejo, Andika's friendly and knowledgeable AI assistant. Your responses should be:
- Warm and approachable, like a helpful friend
- Professional yet conversational
- Knowledgeable about Andika's work and experience
- Concise but informative
- Include relevant emojis occasionally (but not too many)

Remember to:
- Stay focused on helping users learn about Andika and his work
- Be enthusiastic about technology and development
- Show personality while maintaining professionalism
- Provide helpful context when discussing Andika's projects
- Be direct in your answers`;

      const context = messages
        .slice(-5)
        .map((m) => `${m.is_bot ? "Assistant" : "User"}: ${m.message}`)
        .join("\n");

      const model = geminiModel("gemini-1.5-flash-002");
      const prompt = `${systemPrompt}\n\nPrevious conversation:\n${context}\n\nUser: ${message.trim()}\nAssistant:`;
      
      const result = await model.generateContentStream({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });

      // Create a temporary bot message for streaming
      const tempBotMessage: Omit<ChatMessage, "id" | "created_at"> = {
        visitor_id: visitorId.current,
        message: "",
        is_bot: true,
        context,
      };
      
      setMessages((prev) => [...prev, tempBotMessage as ChatMessage]);
      setIsStreaming(true);
      let fullResponse = "";

      // Process the stream
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        
        // Update the temporary message with the accumulated response
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.is_bot) {
            lastMessage.message = fullResponse;
          }
          return newMessages;
        });
      }

      // Save the complete message to Supabase
      const finalBotMessage: Omit<ChatMessage, "id" | "created_at"> = {
        visitor_id: visitorId.current,
        message: fullResponse,
        is_bot: true,
        context,
      };

      await saveChatMessage(finalBotMessage);
      
      // Update the message one final time with the saved version
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.is_bot) {
          lastMessage.message = fullResponse;
        }
        return newMessages;
      });

    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage: Omit<ChatMessage, "id" | "created_at"> = {
        visitor_id: visitorId.current,
        message: "I apologize, but I'm having trouble responding right now. Could you please try again? 🙏",
        is_bot: true,
      };
      
      setMessages((prev) => [...prev, errorMessage as ChatMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <animated.button
        style={buttonSpring}
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 bg-[var(--main)] 
          text-[var(--text)] p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 
          transition-all duration-300 z-50 group border border-[var(--secondary)]"
      >
        <div className="relative">
          <FaRobot size={24} className="transform group-hover:rotate-12 transition-transform" />
          <animated.div
            style={useSpring({
              loop: true,
              from: { opacity: 0.5, transform: 'scale(1)' },
              to: { opacity: 0, transform: 'scale(1.5)' },
              config: { duration: 2000 },
            })}
            className="absolute inset-0 bg-[var(--secondary)] rounded-full"
          />
        </div>
      </animated.button>

      {isOpen && (
        <animated.div
          style={springProps}
          className="fixed bottom-6 right-6 w-96 h-[500px] bg-[var(--main)] rounded-lg 
            shadow-2xl flex flex-col z-50 border border-[var(--secondary)]"
        >
          {/* Header */}
          <div className="p-4 bg-[var(--secondary)] rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaRegLightbulb className="text-[var(--text)] animate-pulse" />
              <h3 className="font-semibold text-[var(--text)]">Tejo - Andika`s AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[var(--text)] hover:rotate-90 transition-transform duration-300"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--main)]">
            {isHistoryLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--secondary)]"></div>
              </div>
            ) : (
              transitions((style, msg) => (
                <animated.div
                  style={style}
                  className={`flex ${msg.is_bot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.is_bot
                        ? "bg-[var(--secondary)] text-[var(--text)]"
                        : "bg-[var(--main)] text-[var(--text)] border border-[var(--secondary)]"
                    } shadow-lg`}
                  >
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                  </div>
                </animated.div>
              ))
            )}
            {isLoading && !isStreaming && (
              <div className="flex justify-start">
                <div className="bg-[var(--secondary)] p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[var(--text)] rounded-full animate-bounce" 
                         style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[var(--text)] rounded-full animate-bounce" 
                         style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[var(--text)] rounded-full animate-bounce" 
                         style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input section */}
          <div className="p-4 border-t border-[var(--secondary)] bg-[var(--main)]">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-[var(--secondary)] text-[var(--text)] border border-[var(--secondary)] 
                  rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--text)] focus:border-transparent
                  placeholder-[var(--text)] placeholder-opacity-50"
                disabled={isHistoryLoading || isStreaming}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || isHistoryLoading || isStreaming}
                className="bg-[var(--secondary)] text-[var(--text)] p-2 rounded-lg hover:shadow-lg 
                  transform hover:scale-105 transition-all duration-300 
                  disabled:opacity-50 disabled:transform-none shrink-0"
              >
                <FaPaperPlane className="transform rotate-0 hover:rotate-45 transition-transform" />
              </button>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

