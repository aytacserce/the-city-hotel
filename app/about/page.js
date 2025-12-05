import Image from "next/image";

import about1 from "@/public/about-1.jpg";

import { getEntry } from "@/app/lib/contentful";

export const metadata = {
  title: "About",
};

export default async function Page() {
  const entry = await getEntry("5zInjr7RqhsUGqbdJgfWZ2");

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          {entry ? entry.fields.header1 : "Welcome"}
        </h1>
        <div className="space-y-8">
          {/* quotes are backup text in case contentful content fails
          tırnak içleri yedek metin */}
          <p>
            {entry
              ? entry.fields.text1
              : "Where vibrant city life and refined comfort meet in perfect harmony."}
          </p>
          <p>
            {entry
              ? entry.fields.text2
              : "Our modern suites offer a cozy sanctuary, yet the true energy awaits just outside your door."}
          </p>
          <p>
            {entry ? entry.fields.text3 : "This is where memories are made."}
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image src={about1} alt="hotel corridor" placeholder="blur" />
      </div>

      {/* what if we cant import image at the top (eg. coming from db with fetch)
görseli önceden import edip kullanama durumuna karşı workaround */}
      <div className="relative aspect-square col-span-2">
        <Image
          src="/about-2.jpg"
          fill
          className="object-cover"
          alt="city view from hotel room"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Managed by Family Since 1962
        </h1>
        <div className="space-y-8">
          <p>
            Since 1962, The City Hotel has been a beloved family-run
            destination. Founded by our grandparents, this urban retreat has
            grown with the city itself, reflecting our commitment to heartfelt
            hospitality and timeless elegance.
          </p>
          <p>
            Through the years, we’ve preserved the spirit of The City Hotel —
            blending metropolitan charm with the personal warmth only a family
            business can offer. Here, you’re not just a guest; you’re part of
            our story. Join us soon at The City Hotel, where tradition meets
            modern comfort, and every visit feels like coming home.
          </p>
        </div>
      </div>
    </div>
  );
}
