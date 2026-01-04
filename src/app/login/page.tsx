'use client'

import { useAppNavigation } from "@/src/hooks/useAppNavigation";
import { useAuthActions } from "@/src/hooks/useAuthActions";
import { useState } from "react";

export default function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { goToDashboard, goToRegister } = useAppNavigation();
    const { login } = useAuthActions();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            goToDashboard();
        } catch (err) {
            setError("Login or password is incorrect");
            console.error(err);
        } finally{
            setLoading(false);
        }

    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleLogin}
                className="p-8 bg-white shadow-md rounded-lg w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Вход
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
                    {loading ? "Загрузка..." : "Войти"}
                </button>
                <button 
                    onClick={() => goToRegister()}
                    className="text-blue-500 underline"
                >
                    Регистрация
                </button>
            </form>
        </div>
    );
}