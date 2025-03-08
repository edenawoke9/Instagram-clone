import { NextResponse } from "next/server";

export async function POST(req) {
    const { email, password } = await req.json();

    
    if (email === "test@example.com" && password === "password") {
        const response = NextResponse.json({ success: true });
        response.cookies.set("status", "true", { httpOnly: true, path: "/" });
        return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
