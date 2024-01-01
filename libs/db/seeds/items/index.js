const commandArgs = process.argv.slice(2);
const [seedFile, fileFunc, dataFileInput, dbEnv] = commandArgs;

const dbLocation = dbEnv || "dev";

import Items from "../../../../models/items/items";
import connectMongoDB from "../../mongodb";
import { WandData } from "../_datafiles";

export async function bulkInsert(data) {
  await connectMongoDB(dbLocation);
  await Items.insertMany(data);

  console.log(`Inserted bulk data (size: ${data.length})`);
}

export async function drop() {
  await connectMongoDB(dbLocation);
  await Items.deleteMany();

  console.log(`Dropped database 'Items'`);
}

export async function postOne(data) {
  await connectMongoDB(dbLocation);

  const newData = await Items.create(
  data || {
    name: "Test Item-" + (Math.floor(Math.random()*9999)),
    url: "www.wizard101.com/wiki/test",
    description: "Some random test document",
    category: "Item",
    type: "Robe"
  })

  console.log(`Created new test document for Items:`);
  console.log(newData);
}

export async function ping() {
  await connectMongoDB(dbLocation);
  const document = await Items.findOne();

  console.log(`Database is successfully connected. Pinged one document:`);
  console.log(document);
}

export async function pingAmulet() {
  await connectMongoDB(dbLocation);
  const document = await Items.findOne({ type: "Amulet" });

  console.log(`Database is successfully connected. Pinged one document:`);
  console.log(document);
}

export function getMetadata() {
  return {
    name: "Items",
    description: "Seed data API for all 'Item' documents"
  }
}
