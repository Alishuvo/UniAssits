"use client";
import { Headline } from "@/components/common/Headline";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";

interface Message {
  user?: string;
  ai?: string;
}

interface ChatResponse {
  ai_reply: string;
  session_id?: string;
}

const ChatPage = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const getAccessToken = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "accessToken") {
        return value;
      }
    }
    return null;
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { user: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");

    const accessToken = getAccessToken();
    if (!accessToken) {
      // Handle unauthorized state
      console.error("No access token found");
      return;
    }

    try {
      let response;
      let data: ChatResponse;

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!sessionId) {
        // Start a new chat
        response = await fetch(`${apiBaseUrl}/chatbot/start/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ message: inputMessage }),
        });
        data = await response.json();
        if (response.ok) {
          setSessionId(data.session_id || null);
          setMessages((prevMessages) => [
            ...prevMessages,
            { ai: data.ai_reply },
          ]);
        }
      } else {
        // Continue existing chat
        response = await fetch(`${apiBaseUrl}/chatbot/continue/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            message: inputMessage,
            session_id: sessionId,
          }),
        });
        data = await response.json();
        if (response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { ai: data.ai_reply },
          ]);
        }
      }

      if (!response.ok) {
        console.error("Error sending message:", data);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full p-4">
      {messages.length === 0 ? (
        <div className="flex flex-col gap-10 justify-center items-center h-full">
          <Headline text="Good Morning, Ali" />
          <h1 className="sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl">
            How Can I <span className="text-[#DC6D18]">Assist You Today?</span>
          </h1>
        </div>
      ) : (
        <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 ${msg.user ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.user ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {msg.user || msg.ai}
              </div>
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex justify-between items-center bg-[#DC6D1833] rounded-full py-2 px-5 w-full max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-5 w-full">
          <GrAttachment className="text-2xl text-[#E07522]" />
          <input
            type="text"
            name="message"
            placeholder="Ask anything"
            id="message"
            className="outline-0 bg-transparent w-full"
            value={inputMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputMessage(e.target.value)
            }
          />
        </div>
        <button
          type="submit"
          className="p-4 rounded-full bg-[linear-gradient(137deg,#E07522_4.45%,#F8A65D_97.83%)] cursor-pointer"
        >
          <FaArrowUp className="text-white text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
