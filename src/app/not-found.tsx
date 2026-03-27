import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-4xl text-gray-900">4*4</h1>
      <p className="text-gray-500">Page not found</p>
      <Link
        className="text-gray-500 underline transition-colors hover:text-gray-900"
        href="/"
      >
        Go home
      </Link>
    </main>
  );
}
