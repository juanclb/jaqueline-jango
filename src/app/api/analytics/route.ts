import { NextRequest, NextResponse } from "next/server";
import {
  getStoredData,
  saveStoredData,
  formatDateKey,
  incrementDateCounter,
  incrementButtonCounter,
  incrementGlobalButtonCounter,
} from "@/utils/server-storage";
import {
  AnalyticsRequest,
  AnalyticsResponse,
  PageViewPayload,
  ContactClickPayload,
} from "@/utils/analytics-types";

export const runtime = "edge";

/**
 * API para obter dados de analytics
 */
export async function GET(): Promise<NextResponse<any>> {
  try {
    const data = getStoredData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao processar requisição GET de analytics:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * API para registrar eventos de analytics
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<AnalyticsResponse>> {
  try {
    const body = (await req.json()) as AnalyticsRequest;
    const { action, data } = body;

    if (!action || !data) {
      return NextResponse.json(
        {
          success: false,
          message: "Requisição inválida: action e data são obrigatórios",
        },
        { status: 400 }
      );
    }

    const storedData = getStoredData();
    const todayKey = formatDateKey();

    switch (action) {
      case "pageView": {
        const payload = data as PageViewPayload;
        const { isUniqueVisit } = payload;

        // Incrementa sempre o contador de visitas
        storedData.global.totalVisits += 1;

        // Incrementa o contador de visitantes únicos apenas se for uma visita única
        // Isso é determinado pelo cliente através do sistema de cookies
        if (isUniqueVisit) {
          storedData.global.uniqueVisitors += 1;
        }

        // Atualiza estatísticas por data
        storedData.byDate = incrementDateCounter(
          storedData.byDate,
          todayKey,
          isUniqueVisit
        );

        break;
      }

      case "contactClick": {
        const payload = data as ContactClickPayload;
        const { buttonId, buttonName } = payload;

        // Atualiza contadores globais de botões
        storedData.globalButtons = incrementGlobalButtonCounter(
          storedData.globalButtons,
          buttonId,
          buttonName
        );

        // Atualiza estatísticas por data
        storedData.byDate = incrementButtonCounter(
          storedData.byDate,
          todayKey,
          buttonId
        );

        break;
      }

      default:
        return NextResponse.json(
          { success: false, message: `Ação não reconhecida: ${action}` },
          { status: 400 }
        );
    }

    // Salva os dados atualizados
    saveStoredData(storedData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar requisição POST de analytics:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
