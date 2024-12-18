"use client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const LoginForm = ({ className, error }: { className: string, error: any }) => {
  const [loading, setLoading] = useState(false);
  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(event.target);
      const username = formData?.get("username");
      const password = formData?.get("password");
      await signIn("credentials", { username, password });
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  useEffect(() => {
    if (error) setLoading(false);
  }, [error])
  return (
    <form className={className} onSubmit={onFormSubmit}>
      <input
        disabled={loading}
        required
        name="username"
        // type="email"
        placeholder="Username"
        className="min-w-full lg:min-w-[320px] min-h-[48px] rounded-lg px-3 outline-none"
      />

      <input
        height={50}
        disabled={loading}
        required
        name="password"
        type="password"
        placeholder="Password"
        className="min-w-full lg:min-w-[320px] min-h-[48px] rounded-lg px-3 outline-none"
      />

      <button
        disabled={loading}
        type="submit"
        className="min-w-full lg:min-w-[320px] min-h-[48px] border rounded-lg px-3 outline-none border-green bg-green text-white font-[600] tracking-tight text-[18px] mt-[5px]"

      >
      {loading?"Loading":  "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
