import { Suspense } from "react";
import RoomPageClient from "@/components/RoomPageClient";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  return (
    <Suspense fallback={<div>Loading room...</div>}>
      <RoomPageClient roomId={resolvedParams.slug} />
    </Suspense>
  );
}