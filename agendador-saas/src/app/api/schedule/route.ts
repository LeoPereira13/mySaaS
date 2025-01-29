import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Body recebido na requisição:", body); // Adicione este log

    if (!body) {
      return NextResponse.json(
        { error: "Nenhum dado foi enviado no corpo da requisição." },
        { status: 400 }
      );
    }

    const { userId, eventName, startTime, endTime, description } = body;

    // Validação de campos obrigatórios
    if (!userId || !eventName || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    // Criação de novo agendamento
    const newSchedule = await prisma.schedule.create({
      data: {
        userId,
        eventName,
        startTime: new Date(startTime), // Converta para Date se necessário
        endTime: new Date(endTime), // Converta para Date se necessário
        description,
      },
    });

    return NextResponse.json(newSchedule, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      include: {
        user: true, // Traz informações do usuário associado ao agendamento
      },
    });

    return NextResponse.json(schedules, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}
