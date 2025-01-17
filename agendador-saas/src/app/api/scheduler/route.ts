export async function GET() {
    try {
      console.log("Requisição recebida: GET /schedules");
  
      // Simulação de retorno de agendamentos
      const schedules = [
        { id: 1, title: "Reunião com João", time: "2025-01-08T10:00:00Z" },
        { id: 2, title: "Revisão do projeto", time: "2025-01-09T15:00:00Z" },
      ];
  
      console.log("Agendamentos retornados:", schedules);
  
      return new Response(JSON.stringify(schedules), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Erro no servidor:", error);
      return new Response(JSON.stringify({ error: "Erro no servidor." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
  export async function POST(req: Request) {
    try {
      console.log("Requisição recebida: POST /schedules");
  
      // Parse do body
      const body = await req.json();
      console.log("Body recebido:", body);
  
      const { title, time } = body;
  
      // Validação do body
      if (!title || !time) {
        console.error("Título ou horário ausente no body.");
        return new Response(
          JSON.stringify({ error: "Título e horário são obrigatórios." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
  
      // Simulação de criação de agendamento
      const newSchedule = { id: Math.random(), title, time };
      console.log("Agendamento criado:", newSchedule);
  
      return new Response(
        JSON.stringify({
          message: "Agendamento criado com sucesso.",
          schedule: newSchedule,
        }),
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
  