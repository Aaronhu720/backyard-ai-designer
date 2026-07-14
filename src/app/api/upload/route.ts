import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { v4 as uuidv4 } from "uuid";

const BUCKET = "backyard-photos";

async function ensureBucket() {
  const { data } = await supabaseAdmin.storage.getBucket(BUCKET);
  if (!data) {
    await supabaseAdmin.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/heic"],
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureBucket();

    const formData = await req.formData();
    const files = formData.getAll("photos") as File[];
    const labels = formData.getAll("labels") as string[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploaded: { url: string; label: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const label = labels[i] || `Photo ${i + 1}`;
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${uuidv4()}.${ext}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const { error } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(path, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        continue;
      }

      const { data: urlData } = supabaseAdmin.storage
        .from(BUCKET)
        .getPublicUrl(path);

      uploaded.push({ url: urlData.publicUrl, label });
    }

    return NextResponse.json({ uploaded, count: uploaded.length });
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
