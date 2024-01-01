"use server";

// Database remote connect
import connectMongoDB from "@/libs/db/mongodb";

// In-house utilities
import { escapeRegex } from "@/libs/utils/escapeRegex";
import { toSimpleArray } from "@/libs/utils/api-utils";

// Data models
import Items from "./items";


export async function getAll() {
  // "use server";
  try {
    await connectMongoDB();

    const allItems = await Items.find();

    return {
      ok: true,
      payload: toSimpleArray(allItems),
    }
  } catch(error) {

    console.log(error);

    return { 
      ok: false,
      message: error 
    }
  }
}

export async function searchBarFetch(options={}) {
  // "use server";
  await connectMongoDB(options.db_env);

  let {
    exclude,
    limit,
    query
  } = options;

  if (exclude.length === 0) {
    exclude = [{ name: '' }];
  } else {
    exclude = exclude.map(v => ({ name: v }));
  }

  const data = await Items.find({
    $nor: exclude,
    $and: [ { name: {"$regex": escapeRegex(query), "$options": "i"}} ]
  })
  .limit(limit);

  // simulated delay
  // await new Promise(r => setTimeout(r, 6000));

  return toSimpleArray(data);
}

export async function ping(options={}) {
    // "use server";
  try {
    await connectMongoDB(options.db_env);

    const oneItem = await Items.findOne();

    return {
      ok: true,
      payload: toSimpleArray([oneItem]),
    }
  } catch(error) {

    console.log(error);

    return { 
      ok: false,
      message: error 
    }
  }
}

