"use client";

import { useEffect } from "react";
import ErrorPage from "@/components/common/ErrorPage";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Application error", { message: error.message, digest: error.digest });
  }, [error]);

  return <ErrorPage statusCode={500} referenceId={error.digest} onRetry={reset} />;
}
