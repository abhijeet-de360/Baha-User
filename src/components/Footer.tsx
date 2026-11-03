import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand placeholder */}
        <p className="font-primary text-2xl text-brand-primary">
          Baha Kids
        </p>

        {/* Footer links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-secondary text-sm text-brand-accent-2/80 hover:text-brand-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="font-secondary text-sm text-brand-accent-2/80 hover:text-brand-primary transition-colors"
          >
            Products
          </Link>
        </div>

        {/* Copyright */}
        <p className="font-secondary text-xs text-brand-accent-2/60">
          &copy; 2025 Baha Kids. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
