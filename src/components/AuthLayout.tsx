import React from "react";

export default function AuthLayout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex mt-20 justify-center">
      <div className="h-fit">
        {title && <h2 className="text-2xl font-semibold">{title}</h2>}
        <p className="text-xl mt-4 text-gray-500">
          Funkcja dostępna wyłącznie dla zalogowanych uzytkowników
        </p>
        {children}
      </div>
    </div>
  );
}
