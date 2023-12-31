import connectMongoDB from "@/libs/db/mongodb";
import { NextResponse } from "next/server";
import { escapeRegex } from "@/libs/utils/escapeRegex";

import Creature from "@/models/creatures";

export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();

    // const newCreature = await Creature.create(body);
    // await Creature.insertMany(body);

    return NextResponse.json({
      message: "Successful Creature Post",
      // data: newCreature
    }, { status: 200 });

  } catch (error) {

    return NextResponse.json({
      message: "Internal Server Error",
      error
    }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();
    const params = req.nextUrl.searchParams;

    let query_limit = params.get('limit');
    let match_name = params.get('matchName');
    let query_id = params.get('id');

    let creature;

    if (match_name) {
      const queryStr = escapeRegex(match_name);
      console.log("Searching for match... ", queryStr, "original: ", match_name);

      creature = await Creature
        .find({
          "name": { "$regex": queryStr, "$options": "i" }
        })
        .limit(query_limit);

    } else if (query_id) {
      creature = await Creature
        .findById(query_id);

    } else {
      creature = await Creature
        .find()
        .limit(query_limit);
    }

    return NextResponse.json(
      creature, 
      { status: 200 }
    );

  } catch(error) {

    return NextResponse.json({ 
      message: "Internal Server Error", 
      error 
    }, { status: 500 });
  }
}
