import { NextResponse } from "next/server";
import multer from "multer";

import { promisify } from "util";
import connect from "../../../../lib/db";
import Imge from "../../../../models/Imge";

const upload = multer({ storage: multer.memoryStorage() });
const uploadMiddleware = promisify(upload.single("screenshot"));

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData(); // Extracts file data
    const file = formData.get("screenshot");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    await connect()

    const buffer = await file.arrayBuffer(); // Convert Blob to Buffer
    const newImage = new Imge({
      name: file.name,
      image: {
        data: Buffer.from(buffer),
        contentType: file.type,
      },
    });

    await newImage.save();
    return NextResponse.json({ message: "Screenshot uploaded successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Error uploading image" }, { status: 500 });
  }
}
