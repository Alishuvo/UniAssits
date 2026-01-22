"use client";

import Link from "next/link";
import { PiNotePencilLight } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ChatSession {
  session_id: string;
  user: number;
  created_at: string;
  messages: Array<{ user?: string; ai?: string }>;
}

const SideNav = () => {
  const session = useSession();
  const router = useRouter();

  const [showLogout, setShowLogout] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all chat sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // Refetch sessions when token changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchSessions();
    }
  }, []);

  // Fetch sessions from API
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.log("No token found");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/chatbot/sessions/`;
      console.log("Fetching from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch sessions:", response.status, errorText);
        return;
      }

      const data: ChatSession[] = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load a specific session
  const handleSessionClick = (sessionId: string) => {
    localStorage.setItem("currentSessionId", sessionId);
    router.push(`/chat?session_id=${sessionId}`);
  };

  // Get preview text for each session
  const getSessionPreview = (messages: ChatSession["messages"]) => {
    if (messages.length === 0) return "No messages";
    const lastMessage = messages[messages.length - 1];
    const text = lastMessage.user || lastMessage.ai || "";
    return text.substring(0, 30) + (text.length > 30 ? "..." : "");
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const handleLogout = async () => {
    setShowLogout(false);
    await signOut({ callbackUrl: "/login" });
  };

  const userImage =
    session.data?.user?.image || "/profile/profile_image.png";

  return (
    <aside className="w-64 h-screen bg-[#FFF4E4] rounded-xl border-r border-gray-200 flex flex-col justify-between fixed">
      {/* Top section */}
      <div className="flex flex-col gap-10 items-center p-5">
        <Link href="/">
          <Image src={"/logo/logo.png"} width={127} height={33} alt="logo" />
        </Link>

        <nav className="flex flex-col gap-2">
          <Link
            href="/chat"
            className="flex gap-3 items-center px-4 py-2 rounded-lg hover:bg-orange-100 transition"
          >
            <PiNotePencilLight /> <span>New Chat</span>
          </Link>

          <Link
            href="/chat"
            className="flex gap-3 items-center px-4 py-2 rounded-lg hover:bg-orange-100 transition"
          >
            <RiSearchLine /> <span>Search</span>
          </Link>

          <h1 className="text-2xl font-bold bg-gray-200 text-orange-400 px-6 py-2 rounded-sm">
            Chats
          </h1>

          {/* Chat sessions list */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-2 text-gray-500 text-center">Loading chats...</div>
            ) : sessions.length === 0 ? (
              <div className="px-4 py-2 text-gray-500 text-center">No chats yet</div>
            ) : (
              sessions.map((sess) => (
                <button
                  key={sess.session_id}
                  onClick={() => handleSessionClick(sess.session_id)}
                  className="w-full text-left rounded-sm px-4 py-2 mb-1 hover:bg-gray-300 cursor-pointer transition group"
                >
                  <div className="truncate font-medium text-sm text-gray-800 group-hover:text-gray-900">
                    {getSessionPreview(sess.messages)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(sess.created_at)}
                  </div>
                </button>
              ))
            )}
          </div>
        </nav>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-200 bg-[#F8E0C9]">
        <button
          onClick={() => setShowLogout((prev) => !prev)}
          className="w-full flex gap-4 items-center p-5 hover:bg-black/5 transition"
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#DC6D18]">
            <Image
              src={userImage}
              fill
              alt="profile_image"
              className="object-cover"
            />
          </div>

          <div className="text-left">
            <h3 className="text-black font-bold text-lg leading-tight">
              {session.data?.user?.name || "Unknown User"}
            </h3>
            <p className="text-gray-700 text-sm">
              {session.data?.user?.email || "example@gmail.com"}
            </p>
          </div>
        </button>

        <div
          className={`transition-all duration-200 ease-out overflow-hidden
          ${
            showLogout
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-5 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full bg-[#DC6D18] hover:bg-[#c85f14]
              text-white py-2 rounded-lg transition font-semibold"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
