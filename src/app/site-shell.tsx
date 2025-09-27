import Navigation from "~/components/Navigation";
import Footer from "~/components/Footer";
import GrainOverlay from "~/components/GrainOverlay";
// import ScanlineOverlay from "~/components/ScanlineOverlay";
// import GlitchOverlay from "~/components/GlitchOverlay";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background grainy-gradient transition-colors duration-300">
      {/* Animated grain overlay (old-TV style), very subtle by default */}
      <GrainOverlay opacity={0.045} fps={24} maxResolution={360} />
      {/* Subtle CRT scanlines (dark, overlay blend) */}
      {/* <ScanlineOverlay opacity={0.06} lineHeight={3} lineThickness={1} driftPx={1} driftDurationSec={14} /> */}
      {/* Occasional tinted horizontal glitch bars */}
      {/* <GlitchOverlay avgIntervalSec={3.5} burstDurationMs={140} maxShiftPx={12} opacity={0.18} /> */}
      <div className="flex flex-col relative z-10 min-h-screen">
        <Navigation />
        <main className="flex-grow flex-1 flex flex-col">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
