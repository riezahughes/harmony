import OpenAI from "openai"
const sendMessageToGPT = async (message: string) => {
  const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY // defaults to process.env["OPENAI_API_KEY"]
  })
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "assistant",
        content: process.env.GPT_PROMPT as string
      },
      {
        role: "user",
        content: message
      }
    ],
    model: "gpt-3.5-turbo"
  })

  return chatCompletion.choices[0].message.content as string
}

export default sendMessageToGPT
