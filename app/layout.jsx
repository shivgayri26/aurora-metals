export const metadata = {
  title: "Aurora Metals",
  description: "Real-time metal prices & analytics — built for pros",
}

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
