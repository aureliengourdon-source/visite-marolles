import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Les Marolles — Guide de visite",
  description:
    "Parcours à pied dans le plus ancien quartier populaire de Bruxelles, avec ses anecdotes historiques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
