import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.formData();

    let event;
    try {
      event = Object.fromEntries(data.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid form data format", error: e },
        { status: 400 }
      );
    }

    // get image file
    const file = data.get("image") as File | null;
    if (!file) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    let tags = JSON.parse(data.get("tags") as string);
    let agenda = JSON.parse(data.get("agenda") as string);
    event.tags = tags;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "events",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    if (!uploadResult || typeof uploadResult !== "object") {
      return NextResponse.json(
        { message: "Failed to upload image" },
        { status: 500 }
      );
    }

    const secureUrl = (uploadResult as any).secure_url;
    event.image = secureUrl;

    // Save event in DB
    const newEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });

    return NextResponse.json(
      { message: "Event created successfully", data: newEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error creating event:", e);
    return NextResponse.json(
      {
        message: "Error creating event",
        error: e instanceof Error ? e.message : e,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events fetched successfully", data: events },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching events:", e);
    return NextResponse.json(
      {
        message: "Error fetching events",
        error: e instanceof Error ? e.message : e,
      },
      { status: 500 }
    );
  }
}
