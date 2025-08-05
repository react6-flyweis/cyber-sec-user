import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { Layout } from "@/components/Layout";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthWrapper } from "./components/AuthWrapper";
import { LoadingScreen } from "@/components/LoadingScreen";

const Login = lazy(() => import("@/pages/Login"));
const HomePage = lazy(() => import("@/pages/Home"));
const UpdateProfilePage = lazy(() => import("@/pages/Update"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<div>Register Page</div>} />
        </Route>
        <Route
          element={
            <AuthWrapper>
              <Layout />
            </AuthWrapper>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/update" element={<UpdateProfilePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
