export default function BlogPostLoading() {
  return (
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl animate-pulse">
        <span className="sr-only">Loading article…</span>

        <div className="inline-block mb-8">
          <div className="h-10 w-40 bg-muted border-2 border-foreground" aria-hidden />
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-4 w-28 bg-muted" aria-hidden />
            <span className="h-1 w-1 bg-muted" aria-hidden />
            <div className="h-4 w-16 bg-muted" aria-hidden />
          </div>

          <div className="space-y-3 mb-6">
            <div className="h-10 md:h-12 w-5/6 bg-muted border-2 border-foreground" aria-hidden />
            <div className="h-10 md:h-12 w-4/6 bg-muted border-2 border-foreground" aria-hidden />
          </div>

          <div className="space-y-2 mb-8">
            <div className="h-5 w-11/12 bg-muted" aria-hidden />
            <div className="h-5 w-9/12 bg-muted" aria-hidden />
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 bg-muted border-2 border-foreground"
                aria-hidden
              />
            ))}
          </div>
        </header>

        <article className="prose prose-lg max-w-none">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted" aria-hidden />
              <div className="h-4 w-11/12 bg-muted" aria-hidden />
              <div className="h-4 w-10/12 bg-muted" aria-hidden />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full bg-muted" aria-hidden />
              <div className="h-4 w-9/12 bg-muted" aria-hidden />
            </div>

            <div className="h-48 w-full bg-card border-2 border-foreground" aria-hidden />

            <div className="space-y-2">
              <div className="h-4 w-full bg-muted" aria-hidden />
              <div className="h-4 w-10/12 bg-muted" aria-hidden />
              <div className="h-4 w-8/12 bg-muted" aria-hidden />
            </div>
          </div>
        </article>

        <div className="mt-16 pt-8 border-t-2 border-foreground">
          <div className="h-10 w-36 bg-muted border-2 border-foreground" aria-hidden />
        </div>
      </div>
    </section>
  );
}
