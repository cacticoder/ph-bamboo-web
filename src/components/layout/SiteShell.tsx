import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CopyrightBanner } from "./CopyrightBanner";
import { VisitorTracker } from "@/components/VisitorTracker";

export function SiteShell() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="pointer-events-none absolute inset-0 texture-bamboo opacity-30" aria-hidden />
      <Navbar />
      <main className="flex-1 relative">
        <Outlet />
      </main>
      <Footer />
      <CopyrightBanner />
      <VisitorTracker />
    </div>
  );
}
