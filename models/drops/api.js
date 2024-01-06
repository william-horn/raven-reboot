"use server";

// Database remote connect
import connectMongoDB from "@/libs/db/mongodb";

// In-house utilities
import { escapeRegex } from "@/libs/utils/escapeRegex";
import { toSimpleArray } from "@/libs/utils/api-utils";

// Data models
import Drops from "./drops";


export async function getAll() {
  // "use server";
  try {
    await connectMongoDB();

    const allDrops = await Drops.find();

    return {
      ok: true,
      payload: toSimpleArray(allDrops),
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


  /*
    !important:

    Eventually, find some way to perform a single query for search bar fetching. Ideally,
    the fetch should return all beginning-of-word matches FIRST, then start looking for 
    general match cases.

    Current solution does just that - but requires two separate queries. Find solution
    with only one query later.
  */

  // let data0 = await Drops.findOne({
  //   $nor: exclude,
  //   $and: [ 
  //     { name: {"$regex": "^" + escapeRegex(query) + "$", "$options": "i"} },
  //   ]
  // })

  // if (data0) {
  //   limit--;
  //   data0 = [data0];
  // } else {
  //   data0 = [];
  // }


  // Query 1: Find beginning-of-word matches
  const data = await Drops.find({
    $nor: exclude,
    $and: [ 
      { name: {"$regex": "^" + escapeRegex(query), "$options": "i"} },
    ]
  })
  .limit(limit);


  // Query 2: Find general matches
  const newExl = data.map(v => ({ name: v }));
  console.log(newExl);
  let data2 = null;

  if (data.length < limit) {
    data2 = await Drops.find({
      $nor: [...exclude, ...newExl],
      $and: [ 
        { name: {"$regex": escapeRegex(query), "$options": "i"} },
      ],
    })
    .limit(limit - data.length);
  } else {
    data2 = [];
  }

  // simulated delay
  // await new Promise(r => setTimeout(r, 6000));

  return toSimpleArray([...data, ...data2]);
  // return toSimpleArray(data);
}

export async function ping(options={}) {
    // "use server";
  try {
    await connectMongoDB(options.db_env);

    const oneItem = await Drops.findOne();

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

