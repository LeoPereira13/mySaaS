import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Usuário já existe" }, { status: 400 });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ message: "Usuário criado com sucesso!", user: newUser });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao registrar usuário" }, { status: 500 });
  }
}
