'use client'
import BrCarousel from "@/components/carousel";
import LoginForm from "@/components/login_form";
import { useAuth } from "@/context/auth_context";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <main className="flex items-center justify-center min-h-screen pt-8 pb-12 gap-[10%]">
      <BrCarousel />
      <LoginForm onLogin={(cpfOrEmail: string, password: string) => {
        if (login(cpfOrEmail, password)) {
          router.push("/select-role");
        }
      }} />
    </main>
  )
}
