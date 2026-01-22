"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

/* ================= TYPES ================= */

interface Message {
  id: number;
  text: string;
  time: string;
  sender: "user" | "bot";
  thinking?: boolean;
}

interface ChatResponse {
  ai_reply: string;
  session_id?: string;
}

interface SessionMessage {
  user?: string;
  ai?: string;
}

interface SessionResponse {
  session_id: string;
  user: number;
  created_at: string;
  messages: SessionMessage[];
}

/* ================= API CONFIG ================= */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

/* ================= INITIAL DATA ================= */

const initialMessages: Message[] = [];

/* ================= WORD TYPING HOOK ================= */

function useWordTyping(text: string, speed = 120) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    const words = text.split(" ");
    let index = 0;

    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText((prev) =>
        prev ? `${prev} ${words[index]}` : words[index]
      );

      index++;
      if (index >= words.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

/* ================= THINKING INDICATOR ================= */

function ThinkingIndicator() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="italic text-gray-500"
    >
      Thinking{dots}
    </motion.span>
  );
}

/* ================= BOT MESSAGE ================= */

function BotMessage({
  text,
  isTyping,
  isThinking,
}: {
  text: string;
  isTyping: boolean;
  isThinking?: boolean;
}) {
  if (isThinking) return <ThinkingIndicator />;

  const typedText = isTyping ? useWordTyping(text, 120) : text;
  return <>{typedText}</>;
}

/* ================= CHAT PAGE ================= */

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [typingBotId, setTypingBotId] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  /* Get token from localStorage on mount */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  /* Load previous session when token is available */
  useEffect(() => {
    if (token) {
      loadPreviousSession();
    }
  }, [token]);

  /* Auto scroll */
  useEffect(() => {
    if (!hasStarted) return;

    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, hasStarted]);

  /* Start chat - first message */
  const startChat = async (message: string): Promise<ChatResponse | null> => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Add authorization token from localStorage
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chatbot/start/`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          message: message,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Status:", response.status, "Response:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data: ChatResponse = await response.json();
      setSessionId(data.session_id || null);
      return data;
    } catch (error) {
      console.error("Error starting chat:", error);
      return null;
    }
  };

  /* Continue chat - subsequent messages */
  const continueChat = async (
    message: string,
    sId: string
  ): Promise<ChatResponse | null> => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Add authorization token from localStorage
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chatbot/continue/`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          message: message,
          session_id: sId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Status:", response.status, "Response:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error continuing chat:", error);
      return null;
    }
  };

  /* Load previous session messages */
  const loadPreviousSession = async () => {
    try {
      // Get token from localStorage directly (not from state)
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        console.log("No token available, skipping session load");
        return;
      }

      // Get session ID from URL or localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const sessionIdFromUrl = urlParams.get("session_id");
      const sessionIdFromStorage = localStorage.getItem("currentSessionId");
      const sId = sessionIdFromUrl || sessionIdFromStorage;

      console.log("Loading session:", sId);

      if (!sId) {
        console.log("No session ID found");
        return;
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${storedToken}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chatbot/sessions/${sId}/`,
        {
          method: "GET",
          headers,
        }
      );

      if (!response.ok) {
        console.error("Failed to load session:", response.status);
        return;
      }

      const data: SessionResponse = await response.json();
      
      // Set the session ID
      setSessionId(data.session_id);
      localStorage.setItem("currentSessionId", data.session_id);

      // Parse messages from the API response
      const parsedMessages: Message[] = data.messages.map((msgObj, index) => {
        const isUser = !!msgObj.user;
        const text = msgObj.user || msgObj.ai || "";

        return {
          id: Date.now() + index, // Unique ID for each message
          text,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sender: isUser ? "user" : "bot",
        };
      });

      // Set messages and mark that chat has started
      if (parsedMessages.length > 0) {
        console.log("Loaded previous messages:", parsedMessages.length);
        setMessages(parsedMessages);
        setHasStarted(true);
      }
    } catch (error) {
      console.error("Error loading previous session:", error);
    }
  };

  /* Send message */
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!hasStarted) setHasStarted(true);

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue("");
    setIsLoading(true);

    const thinkingId = Date.now() + 1;

    const thinkingMessage: Message = {
      id: thinkingId,
      text: "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "bot",
      thinking: true,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, thinkingMessage]);
    }, 400);

    try {
      let apiResponse: ChatResponse | null = null;

      if (!sessionId) {
        // Start new chat
        apiResponse = await startChat(messageText);
      } else {
        // Continue existing chat
        apiResponse = await continueChat(messageText, sessionId);
      }

      if (apiResponse) {
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === thinkingId
                ? {
                    ...msg,
                    text: apiResponse!.ai_reply,
                    thinking: false,
                  }
                : msg
            )
          );

          setTypingBotId(thinkingId);

          // Save session ID to localStorage for persistence
          if (apiResponse.session_id && !sessionId) {
            localStorage.setItem("currentSessionId", apiResponse.session_id);
          }
        }, 1800);
      } else {
        // Handle error - replace thinking message with error message
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === thinkingId
                ? {
                    ...msg,
                    text: "Sorry, I encountered an error. Please try again.",
                    thinking: false,
                  }
                : msg
            )
          );
        }, 1800);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error - replace thinking message with error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId
            ? {
                ...msg,
                text: "Sorry, I encountered an error. Please try again.",
                thinking: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const session = useSession();

  return (
    <div className="relative flex flex-col h-full rounded-xl">
      {/* ================= WELCOME SCREEN ================= */}
      {!hasStarted && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex-1 flex flex-col items-center justify-center text-center gap-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          >
            <Image src="/chat/logo.svg" width={300} height={300} alt="orb" loading="eager" />
          </motion.div>

          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.1, ease: "easeOut" }}
            className="text-5xl font-bold text-[#2C1A0F]"
          >
            Good Morning, {session.data?.user?.name?.split(" ")[0]}
          </motion.h1>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 1.1, ease: "easeOut" }}
            className="text-4xl font-bold text-[#2C1A0F]"
          >
            How Can I{" "}
            <span className="text-[#E07522]">Assist You Today?</span>
          </motion.h2>

          {/* INPUT */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.1, ease: "easeOut" }}
            className="mt-4 flex justify-between items-center bg-[#DC6D1833] rounded-full py-2 px-5 w-full max-w-3xl"
          >
            <div className="flex items-center gap-5 w-full">
              <GrAttachment className="text-2xl text-[#E07522]" />
              <input
                type="text"
                placeholder="Ask anything"
                className="outline-0 bg-transparent w-full"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="p-4 rounded-full bg-[linear-gradient(137deg,#E07522_4.45%,#F8A65D_97.83%)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaArrowUp className="text-white text-2xl" />
            </button>
          </motion.div>

          {/* Suggestion chips */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.1, ease: "easeOut" }}
          >
            <div className="flex gap-8">
              {[
                "Account office",
                "CSE Faculty",
                "Fee Deadlines",
                "Route A bus",
              ].map((label, i) => (
                <motion.button
                  key={label}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 1 + i * 0.12,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="bg-[#DC6D1833] rounded-full px-6 font-bold text-orange-400 py-2"
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ================= CHAT BODY ================= */}
      {hasStarted && (
        <div
          ref={chatContainerRef}
          className="flex-1 p-6 overflow-y-auto space-y-4 pb-28"
        >
          <AnimatePresence>
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const isTyping =
                msg.sender === "bot" && msg.id === typingBotId;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-end gap-3 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <Image
                      src="/photos/cat.jpg"
                      height={48}
                      width={48}
                      alt="avatar"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}

                  <div
                    className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed
                    ${
                      isUser
                        ? "bg-[#FFEAD1] rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-none"
                        : "bg-gray-200 rounded-tr-xl rounded-tl-xl rounded-br-xl rounded-bl-none"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <BotMessage
                        text={msg.text}
                        isTyping={isTyping}
                        isThinking={msg.thinking}
                      />
                    ) : (
                      msg.text
                    )}
                  </div>

                  {isUser && (
                    <Image
                      src="/photos/cat.jpg"
                      height={48}
                      width={48}
                      alt="avatar"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* ================= INPUT — FIXED BOTTOM ================= */}
      {hasStarted && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-between items-center bg-[#DC6D1833] rounded-full py-2 px-5 w-full max-w-3xl"
        >
          <div className="flex items-center gap-5 w-full">
            <GrAttachment className="text-2xl text-[#E07522]" />
            <input
              type="text"
              placeholder="Ask anything"
              className="outline-0 bg-transparent w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="p-4 rounded-full bg-[linear-gradient(137deg,#E07522_4.45%,#F8A65D_97.83%)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaArrowUp className="text-white text-2xl" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Page;
