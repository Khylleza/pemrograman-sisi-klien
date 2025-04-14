import LoginForm from "./components/organisms/LoginForm";
import LoginCard from "./components/templates/LoginCard";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <LoginCard>
        <LoginForm />
      </LoginCard>
    </div>
  );
};

export default LoginPage;
