export async function GET() {
    return new Response(JSON.stringify({ message: "Hello from App Router!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  