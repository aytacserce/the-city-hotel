import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import "./globals.css";

import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | The City Hotel",
    default: "Welcome | The City Hotel",
  },
  description: "Your place in the city",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} min-h-screen text-primary-100 bg-primary-950 antialiased flex flex-col`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider> {children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
