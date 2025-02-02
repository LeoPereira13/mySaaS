"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext"; // Ajuste o caminho conforme necessário
import "./newSchedule.css";

export default function NewSchedule() {
  const { user } = useContext(AuthContext); // Acessando o contexto de autenticação
  const [userId, setUserId] = useState(user?.id || "");
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          eventName,
          startTime,
          endTime,
          description,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar agendamento");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar agendamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Novo Agendamento</h1>
        <form onSubmit={handleSubmit}>
          <label>Nome do Evento</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />

          <label>Data e Hora de Início</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />

          <label>Data e Hora de Término</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />

          <label>Descrição (opcional)</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Criar Agendamento"}
          </button>
        </form>
      </div>
    </div>
  );
}