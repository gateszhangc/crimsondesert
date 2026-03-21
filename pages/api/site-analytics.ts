import type { NextApiRequest, NextApiResponse } from "next";

type SiteAnalyticsResponse = {
  googleAnalyticsId: string;
  clarityProjectId: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<SiteAnalyticsResponse>,
) {
  const env = process.env;

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    googleAnalyticsId: env.GOOGLE_ANALYTICS_ID ?? env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "",
    clarityProjectId: env.CLARITY_PROJECT_ID ?? env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "",
  });
}
