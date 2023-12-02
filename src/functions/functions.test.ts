import getGuildFromInteraction from "./getGuildFromInteraction"
import { describe, it, expect } from "bun:test"
describe("getGuildFromInteraction", () => {
  it("Should spit out a correct object", () => {
    expect(getGuildFromInteraction("createthread~123123123123123")).toEqual({
      action: "createthread",
      guildId: "123123123123123"
    })
  })
  it("Should fail gracefully", () => {
    expect(getGuildFromInteraction("")).toEqual({})
    //@ts-expect-error Just a test
    expect(getGuildFromInteraction(123)).toEqual({})
    //@ts-expect-error Just a test
    expect(getGuildFromInteraction()).toEqual({})
  })
})
