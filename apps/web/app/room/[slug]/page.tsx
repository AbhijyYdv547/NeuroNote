import { Suspense } from "react";
import RoomPageClient from "@/components/RoomPageClient";

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  return (
    <Suspense fallback={<div>Loading room...</div>}>
      <RoomPageClient roomId={resolvedParams.slug} />
    </Suspense>
  );
}