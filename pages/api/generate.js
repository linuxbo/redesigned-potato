import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
    max_tokens: 144,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three titles for an product release note, make it as clear as possible, write like Roger Ebert, write like Nilay Patel, make it sound smart, do not include numbers when listing titles.
Product: Data
Title: Improved Support for Non-USD Currencies, Deal, and POI Targeting, Updates to Audience, Deal, and POI Targeting, Increased Autonomy for Data Ops and Partnerships in Admin UI
Product: DSP
Title: Advertiser Filtering Improvements, DSP Planning Revamp, User Filtering Improvements
Product: ${capitalizedAnimal}
Title:`;
}
