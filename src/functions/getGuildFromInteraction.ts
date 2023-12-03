const getGuildFromInteraction = (customId: string) => {
  if (!customId)
    return {
      action: null,
      guildId: null
    }
  if (typeof customId !== "string")
    return {
      action: null,
      guildId: null
    }
  if (!customId)
    return {
      action: null,
      guildId: null
    }
  const array = customId.split("~")

  return {
    action: array[0],
    guildId: array[1],
    threadId: array[2] || null
  }
}

export default getGuildFromInteraction
