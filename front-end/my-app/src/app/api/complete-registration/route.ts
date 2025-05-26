import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId, role, projectId, authorName } = await req.json();

    const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
    const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

    if (!STRAPI_API_TOKEN) {
        console.error("STRAPI_API_TOKEN não configurado.");
        return NextResponse.json(
            { error: "Configuração de API Token ausente." },
            { status: 500 }
        );
    }

    try {
        const authorRes = await fetch(`${STRAPI_URL}/api/authors`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${STRAPI_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    authorName: authorName,
                    academicStatus: role,
                    authorDescription: "",
                },
            }),
        });

        if (!authorRes.ok) {
            const error = await authorRes.json();
            console.error("Erro ao criar Author:", error);
            return NextResponse.json(
                { error: "Erro ao criar Author", details: error },
                { status: 500 }
            );
        }

        const enrollmentRes = await fetch(`${STRAPI_URL}/api/enrollments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${STRAPI_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    users_permissions_users: userId,
                    sci_sci_projects: projectId,
                    role: role,
                },
            }),
        });

        if (!enrollmentRes.ok) {
            const error = await enrollmentRes.json();
            console.error("Erro ao criar Enrollment:", error);
            return NextResponse.json(
                { error: "Erro ao criar Enrollment", details: error },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: "Registro completo!" });
    } catch (err) {
        console.error("Erro no Complete Registration:", err);
        return NextResponse.json(
            { error: "Erro no processamento do registro." },
            { status: 500 }
        );
    }
}
