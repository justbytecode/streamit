import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="wrapper page">
        <section className="empty-state">
          <figure>
            <Image
              src="/assets/icons/video.svg"
              alt="Not Found"
              width={46}
              height={46}
            />
          </figure>
          <article>
            <h1>Content Not Found</h1>
            <p>The content you're looking for doesn't exist or has been removed.</p>
          </article>
          <Link
            href="/"
            className="py-2.5 px-5 text-sm font-semibold text-white bg-pink-100 rounded-4xl inline-block mt-4"
          >
            Back to Home
          </Link>
        </section>
      </main>
    </>
  );
}