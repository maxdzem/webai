import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="inline-block h-5 w-5 rounded bg-gradient-to-br from-violet-500 to-indigo-500" />
            Motion <span className="text-gradient">Web</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Animated templates, sections and backgrounds designed to convert, impress, and amaze.
            Copy the prompt, paste, and launch.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Browse</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/?category=landing" className="hover:text-foreground">Landing Pages</Link></li>
            <li><Link href="/?category=hero" className="hover:text-foreground">Hero Sections</Link></li>
            <li><Link href="/?category=background" className="hover:text-foreground">Backgrounds</Link></li>
            <li><Link href="/?category=saas" className="hover:text-foreground">SaaS</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Product</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link href="/register" className="hover:text-foreground">Create account</Link></li>
            <li><Link href="/login" className="hover:text-foreground">Log in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Motion Web. All rights reserved.
      </div>
    </footer>
  );
}
