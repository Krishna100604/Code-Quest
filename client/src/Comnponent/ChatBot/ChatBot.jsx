import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCommentDots } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
          import.meta.env.VITE_CHATBOT_API_KEY
        }`,
        method: "post",
        data: { contents: [{ parts: [{ text: userMessage }] }] },
      });

      const botResponse =
        response.data.candidates[0].content.parts[0].text ||
        "Error generating response";
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Failed to fetch response. Please try again later.",
        },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
          onClick={toggleChatbot}
        >
          <FaCommentDots size={24} />
        </motion.button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-6 w-72 bg-white bg-opacity-80 backdrop-blur-sm p-4 rounded-lg shadow-lg z-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Chatbot</h2>
            <button onClick={toggleChatbot} className="text-gray-600">
              ✕
            </button>
          </div>
          <div className="h-64 bg-white bg-opacity-60 p-2 rounded-lg overflow-y-auto flex flex-col">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg max-w-xs ${
                  message.sender === "user"
                    ? "bg-blue-500 self-end text-white"
                    : "bg-gray-300 self-start text-black"
                }`}
              >
                <p className="text-base leading-relaxed">{message.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;