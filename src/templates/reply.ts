const reply = (text: string | undefined, name: string) => {
  if (!text || !name) {
    console.error("Missing attributes in create function")
    throw Error("Missing attributeas for create")
  }
  return {
    content: "",
    tts: false,
    embeds: [
      {
        description: text,
        color: 2326507,
        fields: [],
        author: {
          name: name
        }
      }
    ]
  }
}

export default reply
