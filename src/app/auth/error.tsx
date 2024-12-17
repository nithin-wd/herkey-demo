"use client"; // Required for error components

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error caught by error.tsx:", error);
  }, [error]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Auth: Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        onClick={() => {
          reset(); // Attempt to recover by resetting the error boundary
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        Try Again
      </button>

      <button
        onClick={() => router.push("/")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          marginLeft: "10px",
          marginTop: "20px",
        }}
      >
        Go Home
      </button>

      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}
