import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

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

    const queryParams = {
      limit: params.get('limit') || 1
    }

    const creature = await Creature.find({}).limit(queryParams.limit);

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
