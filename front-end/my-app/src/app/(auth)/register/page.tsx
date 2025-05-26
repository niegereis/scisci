"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdWork,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import toast from "react-hot-toast";

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha precisa ter pelo menos 6 caracteres."),
  role: z.enum(["Professor", "Aluno"]),
  projectId: z.string().min(1, "Projeto é obrigatório"),
});

export default function RegisterPage() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Professor",
    password: "",
    projectId: "",
  });

  useEffect(() => {
    async function fetchProjects() {
      setLoadingProjects(true);
      const res = await fetch(
        "http://localhost:1337/api/sci-sci-projects?populate=*"
      );
      const data = await res.json();
      setProjects(data.data);
      setLoadingProjects(false);
    }
    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = registerSchema.safeParse(form);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      toast.error("Por favor, corrija os erros.", {
        style: {
          border: "1px solid #f87171",
          padding: "8px 16px",
          color: "#7f1d1d",
          background: "#fee2e2",
          borderRadius: "8px",
        },
      });
      return;
    }

    setFormErrors({});

    try {
      console.log("Form enviado:", form);

      const userRes = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const userData = await userRes.json();

      if (userData.jwt) {
        await fetch("/api/complete-registration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userData.user.id,
            role: form.role,
            projectId: form.projectId,
            authorName: form.name,
          }),
        });

        toast.success("Cadastro realizado com sucesso!", {
          style: {
            border: "1px solid #4ade80",
            padding: "8px 16px",
            color: "#166534",
            background: "#dcfce7",
            borderRadius: "8px",
          },
        });

        // setTimeout(() => {
        //   tela de login
        // }, 2000);
      } else {
        toast.error(userData.error.message, {
          style: {
            border: "1px solid #f87171",
            padding: "8px 16px",
            color: "#7f1d1d",
            background: "#fee2e2",
            borderRadius: "8px",
          },
        });
      }
    } catch (err: any) {
      toast.error("Erro inesperado: " + err.message, {
        style: {
          border: "1px solid #f87171",
          padding: "8px 16px",
          color: "#7f1d1d",
          background: "#fee2e2",
          borderRadius: "8px",
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Cadastro</h1>

        <div>
          <div className="flex items-center border border-gray-300 rounded-md p-3 w-full focus-within:ring-2 focus-within:ring-black">
            <MdPerson className="text-gray-500 mr-2" />
            <input
              name="name"
              placeholder="Nome"
              onChange={handleChange}
              value={form.name}
              className="w-full focus:outline-none bg-transparent"
            />
          </div>
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        <div>
          <div className="flex items-center border border-gray-300 rounded-md p-3 w-full focus-within:ring-2 focus-within:ring-black">
            <MdEmail className="text-gray-500 mr-2" />
            <input
              name="email"
              type="text"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              className="w-full focus:outline-none bg-transparent"
            />
          </div>
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div>
          <div className="flex items-center border border-gray-300 rounded-md p-3 w-full focus-within:ring-2">
            <MdLock className="text-gray-500 mr-2" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              onChange={handleChange}
              value={form.password}
              className="w-full focus:outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-500focus:outline-none"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <div>
          <h2 className="block mb-1">Papel</h2>
          <div className="flex items-center border border-gray-300 rounded-md p-3 w-full focus-within:ring-2 ">
            <MdWork className="text-gray-500 mr-2" />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full focus:outline-none bg-transparent"
            >
              <option value="Professor">Professor</option>
              <option value="Aluno">Aluno</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1">Projeto</label>
          {loadingProjects ? (
            <div className="flex items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-black"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <p>Carregando projetos...</p>
            </div>
          ) : (
            <select
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Selecione um projeto</option>
              {projects.map((proj: any) => (
                <option key={proj.id} value={proj.id}>
                  {proj.projectTitle ?? "Sem título"}
                </option>
              ))}
            </select>
          )}
          {formErrors.projectId && (
            <p className="text-red-500 text-sm mt-1">{formErrors.projectId}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors w-full"
        >
          Cadastrar
        </button>
      </motion.form>
    </div>
  );
}
