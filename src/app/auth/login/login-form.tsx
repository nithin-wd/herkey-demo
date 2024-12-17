"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginForm = ({ className }: { className: string }) => {
  const [loading, setLoading] = useState(false);
  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(event.target);
      const email = formData?.get("email");
      const password = formData?.get("password");
      await signIn("credentials", { email, password });
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };
  return (
    <form className={className} onSubmit={onFormSubmit}>
      <input
        disabled={loading}
        required
        name="email"
        type="email"
        placeholder="Email"
        className="min-w-full lg:min-w-[300px] min-h-[48px] rounded-lg px-3 outline-none"
      />

      <input
        height={50}
        disabled={loading}
        required
        name="password"
        type="password"
        placeholder="Password"
        className="min-w-full lg:min-w-[300px] min-h-[48px] rounded-lg px-3 outline-none"
      />

      <button
        disabled={loading}
        type="submit"
        className="min-w-full lg:min-w-[300px] min-h-[48px] border rounded-lg px-3 outline-none border-green bg-green text-white font-[600] tracking-tight text-[18px] mt-[5px]"
      
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
