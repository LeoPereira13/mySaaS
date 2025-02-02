"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css"; // Importando o CSS

type Schedule = {
  id: number;
  eventName: string;
  startTime: string;
  endTime: string;
  description?: string;
};

export default function Dashboard() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch("/api/schedule", { credentials: "include" });
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data: Schedule[] = await res.json();
        setSchedules(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [router]);

  if (loading) return <p className="text-center mt-8">Carregando...</p>;

  return (
    <div className="container">
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h2>Meus Agendamentos</h2>
        {schedules.length === 0 ? (
          <p>Você não possui agendamentos.</p>
        ) : (
          <ul className="schedule-list">
            {schedules.map((schedule) => (
              <li key={schedule.id} className="schedule-item">
                <h3>{schedule.eventName}</h3>
                <p>
                  <strong>Início:</strong>{" "}
                  {new Date(schedule.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>Término:</strong>{" "}
                  {new Date(schedule.endTime).toLocaleString()}
                </p>
                {schedule.description && (
                  <p>
                    <strong>Descrição:</strong> {schedule.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => router.push("/dashboard/new")}>
          Novo Agendamento
        </button>
      </div>
    </div>
  );
}
