export async function POST(req: Request) {
    try {
      console.log("Requisição recebida:", req.method);
  
      // Verifique se o método é POST
      if (req.method !== "POST") {
        console.error("Método não permitido:", req.method);
        return new Response(JSON.stringify({ error: "Método não permitido." }), {
          status: 405,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // Parse do body
      const body = await req.json();
      console.log("Body recebido:", body);
  
      const { name, email, password } = body;
  
      // Validação do body
      if (!name || !email || !password) {
        console.error("Nome, email ou senha ausente no body.");
        return new Response(
          JSON.stringify({ error: "Nome, email e senha são obrigatórios." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
  
      // Resposta de sucesso (simulada)
      return new Response(
        JSON.stringify({ message: `Usuário registrado com sucesso: ${name}` }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Erro no servidor:", error);
      return new Response(JSON.stringify({ error: "Erro no servidor." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  