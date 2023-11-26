import { adjectives, animals } from "../data"

const generatedName = () => {
  const selectedAnimal = animals[Math.floor(Math.random() * animals.length)]
  const selectedAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  return `${selectedAdjective} ${selectedAnimal}`
}

export default generatedName
