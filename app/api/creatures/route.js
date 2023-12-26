import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

import Creature from "@/models/creatures";

export async function POST(req) {
  const body = await req.json();

  await connectMongoDB();

  // await Creature.create(body);
  await Creature.insertMany(body);

  return NextResponse.json({
    status: "Creature data was successfully created"
  }, {
    status: 201
  });
}

export async function GET(req) {
  await connectMongoDB();
  const creature = await Creature.find();

  console.log("creature: ", creature);

  return NextResponse.json(creature, { status: 201 });
}
