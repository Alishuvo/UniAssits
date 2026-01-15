"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";

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

  return <span className="italic text-gray-500">Thinking{dots}</span>;
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
  const chatContainerRef = useRef<HTMLDivElement>(null);

  /* Auto scroll */
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  /* Send message */
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

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

  return (
    <div className="flex flex-col h-full rounded-xl">
      {/* CHAT BODY */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-6 overflow-y-auto space-y-4"
      >
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          const isTyping = msg.sender === "bot" && msg.id === typingBotId;

          return (
            <div
              key={msg.id}
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
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="flex justify-between items-center bg-[#DC6D1833] rounded-full py-2 px-5 w-full max-w-3xl mx-auto">
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
      </div>
    </div>
  );
};

export default Page;
