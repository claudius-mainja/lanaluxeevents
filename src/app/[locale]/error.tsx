"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-content flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="font-display text-3xl text-navy sm:text-4xl">
        Something went wrong
      </h1>
      <p className="max-w-md text-navy-300">
        Sorry about that. Please try again, or contact us on WhatsApp and
        we&rsquo;ll help you directly.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-deep-pink px-6 text-sm font-medium text-white transition-colors hover:bg-deep-pink-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-pink"
      >
        Try again
      </button>
    </div>
  );
}
