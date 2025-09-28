"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";

export default function NotFound() {
  const location = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Grainy Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, hsl(var(--accent) / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsl(var(--secondary) / 0.05) 0%, transparent 50%),
              var(--noise)
            `,
            backgroundSize: "400px 400px, 300px 300px, 200px 200px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="brutalist-heading text-9xl md:text-[12rem] leading-none mb-4 electric-text">
              404
            </h1>
            <div className="h-1 w-32 bg-foreground mx-auto mb-8"></div>
          </div>

          {/* Error Messages */}
          <div className="space-y-4 mb-12">
            <h2 className="brutalist-heading text-2xl md:text-3xl text-foreground">
              PAGE NOT FOUND
            </h2>
            <p className="text-muted-foreground text-lg font-mono">
              The page{" "}
              <span className="text-accent font-bold">&quot;{location}&quot;</span>{" "}
              doesn&apos;t exist
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="brutalist-card hover:shadow-electric font-mono uppercase tracking-wider"
            >
              <Link href="/">← GO HOME</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              className="brutalist-card font-mono uppercase tracking-wider"
            >
              GO BACK
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-xs mx-auto opacity-20">
            <div className="h-1 bg-foreground"></div>
            <div className="h-1 bg-accent"></div>
            <div className="h-1 bg-foreground"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
