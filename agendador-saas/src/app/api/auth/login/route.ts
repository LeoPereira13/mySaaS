import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";

const SECRET_KEY = process.env.JWT_SECRET || "chave-secreta";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Senha incorreta" }, { status: 401 });
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });

    return NextResponse.json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao fazer login" }, { status: 500 });
  }
}
