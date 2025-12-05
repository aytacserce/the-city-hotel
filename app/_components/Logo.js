import Image from "next/image";

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-4 z-10">
      <Image
        src="/logo.png"
        height="60"
        width="60"
        alt="The City Hotel Logo"
      ></Image>
      <span className="text-xl font-semibold text-primary-100">
        The City Hotel
      </span>
    </a>
  );
}
