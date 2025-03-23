import Anthropic from "@anthropic-ai/sdk"

const sendMessageToClaude = async (message: string) => {
  const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY // defaults to process.env["OPENAI_API_KEY"]
  })

  const chatCompletion = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 8192,
    messages: [
      { role: "assistant", content: process.env.GPT_PROMPT as string },
      { role: "user", content: message }
    ]
  })

  ///@ts-expect-error bug
  return chatCompletion.content[0].text as TextBlock
}

export default sendMessageToClaude
