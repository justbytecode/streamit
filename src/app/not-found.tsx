import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple navbar without client components */}
      <header className="navbar">
        <nav>
          <Link href="/">
            <h1>RecordIt</h1>
          </Link>
          <Link
            href="/"
            className="py-2.5 px-5 text-sm font-semibold text-white bg-pink-100 rounded-4xl"
          >
            Go Home
          </Link>
        </nav>
      </header>

      <main className="wrapper page flex-1">
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
            <h1>Page Not Found</h1>
            <p>The page you're looking for doesn't exist or has been moved.</p>
          </article>
          <Link
            href="/"
            className="py-2.5 px-5 text-sm font-semibold text-white bg-pink-100 rounded-4xl inline-block mt-4"
          >
            Back to Home
          </Link>
        </section>
      </main>
    </div>
  );
}