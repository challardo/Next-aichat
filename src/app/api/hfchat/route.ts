import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";

export const runtime = "edge";

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await Hf.textGenerationStream({
    model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    inputs: experimental_buildOpenAssistantPrompt(messages),
    parameters: {
      max_new_tokens: 200,
      // @ts-expect-error -- The HfInference API doesn't have types for `typical_p` even though it's necessary
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
    },
  });

  const stream = HuggingFaceStream(response);

  return new StreamingTextResponse(stream);
}
