import BrCarousel from "@/components/carousel";
import LoginForm from "@/components/login_form";

export default function LoginScreen() {

  return (

    <main className="flex items-center justify-center min-h-screen pt-8 pb-12 gap-[10%]">
      <BrCarousel/>
      <LoginForm />
    </main>
  )
}
