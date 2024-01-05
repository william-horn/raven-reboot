const commandArgs = process.argv.slice(2);
const [seedFile, fileFunc, dataFileInput, dbEnv] = commandArgs;

const dbLocation = dbEnv || "dev";

import TestModel from "../../../../models/testmodel/testmodel";
import connectMongoDB from "../../mongodb";

export async function bulkInsert(data) {
  await connectMongoDB(dbLocation);
  await TestModel.insertMany(data);

  console.log(`Inserted bulk data (size: ${data.length})`);
}

export async function drop() {
  await connectMongoDB(dbLocation);
  await TestModel.deleteMany();

  console.log(`Dropped database 'TestModel'`);
}

export async function postOne(data) {
  await connectMongoDB(dbLocation);

  const newData = await TestModel.create(
  data || {
    name: "Test Item-" + (Math.floor(Math.random()*9999)),
  })

  console.log(`Created new test document for TestModel:`);
  console.log(newData);
}

export async function ping() {
  await connectMongoDB(dbLocation);
  const document = await TestModel.findOne();

  console.log(`Database is successfully connected. Pinged one document:`);
  console.log(document);
}


export function getMetadata() {
  return {
    name: "TestModel",
    description: "Seed data API for all 'TestModel' documents"
  }
}
