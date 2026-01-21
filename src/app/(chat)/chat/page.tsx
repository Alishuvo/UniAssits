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

/* ================= INITIAL DATA ================= */

const initialMessages: Message[] = [
  {
    id: 2,
    text: "How do I apply for admission?",
    time: "12:57 am",
    sender: "user",
  },
  {
    id: 1,
    text: "Hello, I want to make enquiries about your product",
    time: "12:55 am",
    sender: "bot",
  },
];

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

  const chatContainerRef = useRef<HTMLDivElement>(null);

  /* Auto scroll */
  useEffect(() => {
    if (!hasStarted) return;

    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, hasStarted]);

  /* Send message */
  const handleSendMessage = () => {
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
    setInputValue("");

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

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId
            ? {
                ...msg,
                text: `This is a simulated response to "${userMessage.text}"`,
                thinking: false,
              }
            : msg
        )
      );

      setTypingBotId(thinkingId);
    }, 1800);
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
            <Image src="/chat/logo.svg" width={300} height={300} alt="orb" />
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
              className="p-4 rounded-full bg-[linear-gradient(137deg,#E07522_4.45%,#F8A65D_97.83%)]"
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
            className="p-4 rounded-full bg-[linear-gradient(137deg,#E07522_4.45%,#F8A65D_97.83%)]"
          >
            <FaArrowUp className="text-white text-2xl" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Page;
