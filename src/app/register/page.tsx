/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAppNavigation } from "@/src/hooks/useAppNavigation";
import { useAuthActions } from "@/src/hooks/useAuthActions";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { goToDashboard } = useAppNavigation();
    const { register } = useAuthActions();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // 1. Создаем пользователя в Firebase Auth
            await register(email, password)

            // 2. После успеха триггер 'onUserCreate' на бэкенде создаст профиль в БД.
            // Перенаправляем пользователя на главную или в личный кабинет.
            goToDashboard();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleRegister}
                className="p-8 bg-white shadow-md rounded-lg w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Регистрация
                </h1>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded text-black outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full p-2 mb-6 border rounded text-black outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                    {loading ? "Загрузка..." : "Создать аккаунт"}
                </button>
            </form>
        </div>
    );
}
