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
    heightCm: 120,
    color: ['czerwony', 'biały', 'różowy', 'żółty'],
    compatibleWith: ['Lawenda', 'Kocimiętka']
  },
  {
    name: 'Lawenda wąskolistna',
    latinName: 'Lavandula angustifolia',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Lavandula_angustifolia_001.JPG',
    species: 'Krzewinka',
    soil: 'sucha, wapienna, przepuszczalna',
    waterRequirement: 'low',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 8 },
    heightCm: 60,
    color: ['fioletowy'],
    compatibleWith: ['Róża ogrodowa', 'Rozmaryn']
  },
  {
    name: 'Tawuła japońska',
    latinName: 'Spiraea japonica',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Spiraea_x_bumalda.JPG/1280px-Spiraea_x_bumalda.JPG',
    species: 'Krzew',
    soil: 'żyzna, lekko wilgotna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 9 },
    heightCm: 100,
    color: ['różowy', 'biały'],
    compatibleWith: ['Berberys', 'Bukszpan']
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