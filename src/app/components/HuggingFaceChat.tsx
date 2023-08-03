"use client";

import { useChat } from "ai/react";
import { toast } from "react-toastify";

export default function HuggingFaceChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/hfchat",
      onError: () => toast.error("failed to process prompt"),
      onFinish: () => toast.success("Response generated"),
    });

  return (
    <div>
      <form className="max-w-xl w-full" onSubmit={handleSubmit}>
        <div className="text-white max-h-80 h-full overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col mb-2 p-2 rounded-md ${
                message.role === "assistant"
                  ? "self-end bg-gray-800"
                  : "self-start bg-green-600"
              }`}
            >
              <span
                className={`text-xs ${
                  message.role === "assistant" ? "text-right" : "text-left"
                }`}
              >
                {message.role}
              </span>{" "}
              {message.content}
            </div>
          ))}
        </div>
        <div className="flex justify-between my-4">
          <label className="text-white block font-bold my-2">
            Ask something...
          </label>
          <button
            className="bg-green-600 text-white px-3 py-2 rounded-md focus:outline-none disabled:opacity-50"
            disabled={isLoading || !input}
          >
            Send
          </button>
        </div>
        <textarea
          value={input}
          rows={4}
          placeholder="Type your message here..."
          className="text-black bg-slate-300 px-3 py-2 w-full rounded-md focus:outline-none"
          onChange={handleInputChange}
        />
        <h1 className="text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl text-white">
          Ask HF OpenAssistant Model
        </h1>
        <p className="mb-6 mt-1 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Using Vercel AI SDK
        </p>
      </form>
    </div>
  );
}
