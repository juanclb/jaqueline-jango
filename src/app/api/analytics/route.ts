import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/analytics-storage";
import { AnalyticsRequest, AnalyticsApiResponse } from "@/types/analytics";

export async function POST(request: NextRequest) {
  try {
    const body: AnalyticsRequest = await request.json();

    switch (body.action) {
      case "pageView":
        const { isUniqueVisit, referrer: pageReferrer } = body.data as any;
        storage.recordPageView(isUniqueVisit, pageReferrer);
        break;

      case "buttonClick":
        const {
          buttonId,
          buttonName,
          referrer: clickReferrer,
        } = body.data as any;
        storage.recordButtonClick(buttonId, buttonName, clickReferrer);
        break;

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");

    // Obter dados do storage
    const dailyData = storage.getStats(days);
    const referrerStats = storage.getReferrerStats(days);
    const buttonStats = storage.getButtonStats(days);
    const globalStats = storage.calculateGlobalStats(days);

    const response: AnalyticsApiResponse = {
      global: globalStats,
      daily: dailyData,
      referrers: referrerStats,
      buttons: buttonStats,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
