'use client';

import { ImageCarousel } from '@/app/auth/login/components/carousel';
import { useAuth } from '@/context/auth_context';
import { useRouter } from 'next/navigation';
import { LoginForm } from './components/login_form';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <main className="flex items-center justify-center min-h-screen py-8 gap-[10%] px-4">
      <ImageCarousel className="hidden lg:block" />
      <LoginForm
        onLogin={async (cpfOrEmail: string, password: string) => {
          if (await login(cpfOrEmail, password)) {
            router.push('/select-role');
          }
        }}
      />
    </main>
  );
}
