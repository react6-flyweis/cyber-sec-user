import { Navigate } from "react-router";
import { LoginForm } from "@/components/login/LoginForm";
import { useAuthStore } from "@/store/authStore";

export default function Login() {
  const token = useAuthStore((state) => state.token);
  if (token) {
    return <Navigate replace to="/" />;
  }
  return <LoginForm />;
}
