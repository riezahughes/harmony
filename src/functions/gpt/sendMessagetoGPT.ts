import OpenAI from "openai"
const sendMessageToGPT = async (message: string) => {
  const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY // defaults to process.env["OPENAI_API_KEY"]
  })
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "assistant",
        content:
          "You are to take what i say and reply back to me with only a rewording my input. Any personal information must be reworded to be anonymous. Replace any names with only a random capital letter. example: Edward could be C. Maximum number of characters is 1800."
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

// sendMessageToGPT(
//   "My bloody wife has decided to leave me and my daughter, kirstin, has broken down into alcoholism. It's been 3 months and every day i see her on another bottle of fucking wine. She left us both for a woman in the bahamas and i don't know what the fuck to do. I feel so fucking awful right now."
// )

export default sendMessageToGPT
