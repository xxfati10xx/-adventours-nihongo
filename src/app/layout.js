import "./globals.css";

export const metadata = {
  title: "AdventoursCR Nihongo",
  description: "Aprende japonés con AdventoursCR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
