import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center px-6 py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddb27a]">404</p>
      <h1 className="mt-4 font-heading text-5xl font-semibold text-white">
        This trail ends here.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-8 text-white/64">
        The page you requested is not part of this Crimson Desert companion. Head back to the
        homepage and continue through the main sections instead.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ddb37a] px-5 py-3 text-sm font-semibold text-[#19110f] transition hover:bg-[#edc391]"
      >
        Return home
      </Link>
    </main>
  );
}
