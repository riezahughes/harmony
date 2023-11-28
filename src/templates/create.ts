const create = (
  title: string | undefined,
  text: string | undefined,
  name: string
) => {
  if (!title || !text || !name) {
    console.error("Missing attributes in create function")
    throw Error("Missing attributeas for create")
  }
  return {
    content: "",
    tts: false,
    embeds: [
      {
        title: title,
        description: text,
        color: 2326507,
        fields: [],
        author: {
          name: name
        }
      }
    ],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 4,
            label: "Report Thread",
            disabled: true,
            emoji: {
              name: "⚠️",
              animated: false
            },
            customId: "reportthread"
          }
        ]
      }
    ]
  }
}

export default create
