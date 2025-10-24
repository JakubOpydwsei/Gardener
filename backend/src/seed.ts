import { connectDB } from "./db";
import { PlantModel } from "./models/Plant";
import dotenv from "dotenv";

dotenv.config();

const plants = [
  {
    name: 'Róża ogrodowa',
    latinName: 'Rosa',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Rose_flower.jpg',
    species: 'Krzew',
    soil: 'żyzna, dobrze przepuszczalna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 9 },
    plantingPeriod: { start: 3, end: 4 }, 
    heightCm: 120,
    color: ['czerwony', 'biały', 'różowy', 'żółty'],
    compatibleWith: ['Lawenda', 'Kocimiętka'],
    soilPh: 6.5,
    growthRate: 'medium',
    toxicity: false,
    careTips:
      'Przycinaj wczesną wiosną, usuń przekwitłe kwiaty, regularnie podlewaj w okresach suszy.',
    temp: { min: -20, max: 30 },
    wateringDesc: 'Podlewaj co 2–3 dni w czasie upałów, raz w tygodniu w pozostałych okresach.',
    lifespan: 'perennial',
  },
  {
    name: 'Lawenda wąskolistna',
    latinName: 'Lavandula angustifolia',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/58/Lavandula_angustifolia_001.JPG',
    species: 'Krzewinka',
    soil: 'sucha, wapienna, przepuszczalna',
    waterRequirement: 'low',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 8 },
    plantingPeriod: { start: 4, end: 5 },
    heightCm: 60,
    color: ['fioletowy'],
    compatibleWith: ['Róża ogrodowa', 'Rozmaryn'],
    soilPh: 7.5,
    growthRate: 'slow',
    toxicity: false,
    careTips:
      'Nie lubi nadmiaru wody, warto przycinać po kwitnieniu, aby zachować ładny kształt.',
    temp: { min: -15, max: 35 },
    wateringDesc: 'Podlewaj raz na tydzień, tylko gdy ziemia jest bardzo sucha.',
    lifespan: 'perennial',
  },
  {
    name: 'Tawuła japońska',
    latinName: 'Spiraea japonica',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Spiraea_x_bumalda.JPG/1280px-Spiraea_x_bumalda.JPG',
    species: 'Krzew',
    soil: 'żyzna, lekko wilgotna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 9 },
    plantingPeriod: { start: 4, end: 5 },
    heightCm: 100,
    color: ['różowy', 'biały'],
    compatibleWith: ['Berberys', 'Bukszpan'],
    soilPh: 6.8,
    growthRate: 'fast',
    toxicity: false,
    careTips:
      'Przycinaj po kwitnieniu, usuń stare pędy, aby pobudzić wzrost nowych.',
    temp: { min: -25, max: 35 },
    wateringDesc: 'Podlewaj umiarkowanie, ziemia powinna być lekko wilgotna.',
    lifespan: 'perennial',
  },
];

async function seed() {
  await connectDB();
  await PlantModel.deleteMany({}); 
  await PlantModel.insertMany(plants);
  console.log("Seed completed!");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});