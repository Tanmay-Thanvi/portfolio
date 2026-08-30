import { useCallback, useEffect, useState } from "react";
import {
  Briefcase,
  FolderKanban,
  Handshake,
  Sparkles,
  UserRound,
  Waypoints,
} from "lucide-react";
import { ContactBand } from "./components/ContactBand/ContactBand";
import { DetailModal } from "./components/DetailModal/DetailModal";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { LocationCard } from "./components/LocationCard/LocationCard";
import { MobileDock } from "./components/MobileDock/MobileDock";
import { PortfolioCard } from "./components/PortfolioCard/PortfolioCard";
import {
  ConnectPreview,
  ExperiencePreview,
  GlancePreview,
  HowIWorkPreview,
  ProjectsPreview,
  StrengthsPreview,
} from "./components/previews/CardPreviews";
import { SearchOverlay } from "./components/SearchOverlay/SearchOverlay";
import type { SectionId } from "./data/portfolio";
import { useOverlayLock } from "./hooks/useOverlayLock";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [section, setSection] = useState<SectionId | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const overlayOpen = Boolean(section) || searchOpen;
  useOverlayLock(overlayOpen);

  const openSection = useCallback((id: SectionId) => {
    if (id === "howIWork") return;
    setSection(id);
  }, []);
  const closeSection = useCallback(() => setSection(null), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => {
          setSection(null);
          setSearchOpen(true);
        }}
      />
      <main id="main" className="app-main">
        <div className="hero-row">
          <Hero />
          <LocationCard />
        </div>
        <section className="recruiter-grid" aria-label="Recruiter information">
          <PortfolioCard id="glance" icon={<UserRound size={18} />} onOpen={openSection}>
            <GlancePreview />
          </PortfolioCard>
          <PortfolioCard
            id="experience"
            icon={<Briefcase size={18} />}
            onOpen={openSection}
          >
            <ExperiencePreview />
          </PortfolioCard>
          <PortfolioCard id="projects" icon={<FolderKanban size={18} />} title="Selected projects" onOpen={openSection}>
            <ProjectsPreview />
          </PortfolioCard>
          <PortfolioCard id="strengths" icon={<Sparkles size={18} />} onOpen={openSection}>
            <StrengthsPreview />
          </PortfolioCard>
          <PortfolioCard id="howIWork" icon={<Waypoints size={18} />} expandable={false} onOpen={openSection}>
            <HowIWorkPreview />
          </PortfolioCard>
          <PortfolioCard id="connect" icon={<Handshake size={18} />} onOpen={openSection}>
            <ConnectPreview />
          </PortfolioCard>
        </section>
      </main>
      <ContactBand />
      <div className="mobile-dock-space" />
      <MobileDock />
      {section ? <DetailModal section={section} onClose={closeSection} onChange={setSection} /> : null}
      {searchOpen ? <SearchOverlay onClose={closeSearch} onOpenSection={openSection} /> : null}
    </div>
  );
}
