import FormLoginGroup from "../molecules/FormLoginGroup";
import Button from "../atoms/Button";

const LoginForm = () => {
  return (
    <>
      <p className="mb-5 text-3xl text-blue-600 font-semibold text-center">
        Login
      </p>

      <form method="POST" action="">
        <FormLoginGroup
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Masukkan Email"
          required
        />
        <FormLoginGroup
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Masukkan Password"
          required
        />

        <div className="flex justify-between mt-4">
          <div className="flex gap-1 items-center">
            <input type="checkbox" name="ingatkan" id="ingatkan" />
            <label htmlFor="ingatkan" className="text-xs">
              Ingatkan Saya
            </label>
          </div>
          <a href="/" className="text-blue-600 text-xs">
            Lupa Password?
          </a>
        </div>

        <div className="flex items-center justify-end my-6">
          <Button>Login</Button>
        </div>

        <p className="text-sm text-center text-neutral-700">
          <span>Belum punya akun? </span>
          <a href="#">
            <span className="font-medium text-primary hover:underline text-blue-600">
              Daftar
            </span>
          </a>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
