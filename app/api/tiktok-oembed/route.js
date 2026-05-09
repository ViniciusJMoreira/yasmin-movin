import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  const res = await fetch(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) return NextResponse.json({ error: "oEmbed failed" }, { status: 502 });

  const data = await res.json();
  const match = data.html?.match(/data-video-id="(\d+)"/);
  const videoId = match?.[1] ?? null;

  return NextResponse.json({ videoId, author: data.author_name, title: data.title });
}
