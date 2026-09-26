import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-white px-4 text-center text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">404</p>
      <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">
        This page may have moved or the address may be incorrect.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          Back to Home
        </Link>
        <Link
          href="/#projects"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
        >
          View Projects
        </Link>
      </div>
    </main>
  )
}