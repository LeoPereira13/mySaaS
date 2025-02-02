import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
    try {
        const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

        if (!token) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        return NextResponse.json(decoded, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
}
