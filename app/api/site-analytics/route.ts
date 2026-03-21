import { headers } from "next/headers";

export async function GET() {
  // Access request-time data so the handler resolves env values at runtime.
  await headers();

  return Response.json(
    {
      googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "",
      clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
