"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css"; // Importando o CSS separado

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Falha no login. Verifique suas credenciais.");
      }

      router.push("/dashboard"); // Redireciona para a página principal após o login
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Bem-vindo de volta</h2>
        <form onSubmit={handleLogin}>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="login-button" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
