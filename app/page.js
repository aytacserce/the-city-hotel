import Image from "next/image";

import bg from "../public/home.jpg";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Hotel outer image"
      ></Image>

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to "The City"
        </h1>
        <a
          href="/rooms"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore our rooms
        </a>
      </div>
    </main>
  );
}
