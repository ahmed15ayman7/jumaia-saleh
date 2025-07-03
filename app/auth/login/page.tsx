"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/ar");
    } else {
      setError("بيانات الدخول غير صحيحة");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">تسجيل دخول الأدمن</h2>
        <div className="mb-4">
          <label className="block mb-1 text-primary">البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gold rounded px-3 py-2 focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-primary">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gold rounded px-3 py-2 focus:outline-none focus:border-primary"
            required
          />
        </div>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-gold text-primary font-bold py-2 rounded hover:bg-primary hover:text-gold border border-gold transition"
        >
          دخول
        </button>
      </form>
    </div>
  );
} 