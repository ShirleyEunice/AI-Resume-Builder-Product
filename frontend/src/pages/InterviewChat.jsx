import API from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const InterviewChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  useEffect(() => {
    try {
      const fetchChats = async () => {
        const res = await API.get("/agent/chats");
        setChats(res.data);
      };
      fetchChats();
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, []);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };

    setMessages([...messages, userMessage]);
    setLoading(true);
    setInput("");
    try {
      const res = await API.post("/agent/interview", {
        message: userMessage.content,
        chatId,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);

      setChatId(res.data.chatId);
    } catch (error) {
      console;
    } finally {
      setLoading(false);
    }
  };

  const loadChat = (chat) => {
    setMessages(chat.messages);
    setChatId(chat._id);
  };

  const newChat = () => {
    setMessages([]);
    setChatId(null);
  };
  return (
    <div className="flex h-[85vh]">
      {/* Sidebar */}
      <div className="w-64 border-r p-4 bg-gray-50 dark:bg-gray-900">
        <button
          onClick={newChat}
          className="w-full mb-3 bg-green-500 text-white px-3 py-2 rounded"
        >
          + New Chat
        </button>

        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => loadChat(chat)}
              className="p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {chat.title || "Untitled Chat"}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-4 py-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-lg max-w-[70%] text-sm leading-relaxed shadow
        ${
          msg.role === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {/* Loader */}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse">
                AI is typing...
              </div>
            </div>
          )}
        </div>
        <div ref={endRef}></div>

        {/* Input */}
        <div className="flex gap-2 border-t pt-3 px-4 ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border rounded px-3 py-2 flex-1 focus:outline-none"
            placeholder="Type your message..."
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewChat;
