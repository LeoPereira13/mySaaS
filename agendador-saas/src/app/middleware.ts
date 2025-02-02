import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const authRoutes = ["/dashboard", "/agendamentos"]; // Adicione aqui as rotas protegidas

    if (authRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/agendamentos/:path*"], // Aplica o middleware apenas nessas rotas
};
