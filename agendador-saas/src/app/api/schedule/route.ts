// src/app/api/schedule/route.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// Criar um novo agendamento
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, eventName, startTime, endTime, description } = body;

    if (!userId || !eventName || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    const newSchedule = await prisma.schedule.create({
      data: {
        userId,
        eventName,   // Agora, este campo está no modelo do Prisma
        startTime,
        endTime,
        description,
      },
    });

    return NextResponse.json(newSchedule, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
