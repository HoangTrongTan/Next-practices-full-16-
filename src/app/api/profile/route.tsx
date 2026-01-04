import { NextResponse } from "next/server";
import profileJSON from "@/db/profile.json";

export async function GET() {
  return NextResponse.json(profileJSON);
}
