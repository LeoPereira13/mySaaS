import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        // Configurar cookie com o token
        const response = NextResponse.json({ message: "Login bem-sucedido" }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60, // 1 hora
        });

        return response;
    } catch (error) {
        console.error("Erro no login:", error);
        return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
    }
}
