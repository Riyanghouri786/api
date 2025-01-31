import { NextResponse } from "next/server";
import Imge from "../../../../models/Imge";
import connect from "../../../../lib/db";


export async function GET() {
  try {
    await connect()
    const images = await Imge.find();

    // Map images to prepare for response
    const imageData = images.map((img) => ({
      id: img._id,
      name: img.name,
      image: `data:${img.image.contentType};base64,${img.image.data.toString("base64")}`,
    }));

    return NextResponse.json(imageData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
