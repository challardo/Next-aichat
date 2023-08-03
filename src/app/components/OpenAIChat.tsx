"use client";

import { useChat } from "ai/react";
import { Key } from "react";
import { toast } from "react-toastify";

export default function OpenAIChat() {
  const { handleInputChange, handleSubmit, messages, isLoading, input } =
    useChat({
      api: "/api/chat",
      onError: () => {
        toast.error("failed to call openAI");
      },
    });

  return (
    <form className="max-w-xl w-full" onSubmit={handleSubmit}>
      <div className="text-white max-h-96 h-full overflow-y-auto">
        {messages.map((message: { id: Key; role: string; content: string }) => (
          <div
            key={message.id}
            className={`flex flex-col mb-2 p-2 rounded-md ${
              message.role === "assistant"
                ? "self-end bg-gray-800"
                : "self-start bg-blue-700"
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
          className="bg-blue-600 text-white px-3 py-2 rounded-md focus:outline-none disabled:opacity-50"
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
        Ask OpenAI API
      </h1>
      <p className="mb-6 mt-1 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Using Vercel AI SDK
      </p>
    </form>
  );
}
