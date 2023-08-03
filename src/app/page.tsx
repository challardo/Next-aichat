"use client";

import HuggingFaceChat from "./components/HuggingFaceChat";

function HomePage() {
  return (
    <section className="flex justify-center items-center h-screen">
      <HuggingFaceChat />
      {/* <OpenAIChat /> */}
    </section>
  );
}

export default HomePage;
