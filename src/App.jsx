import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PageDecorations } from './components/PageDecorations';
import { ProjectPage } from './components/ProjectPage';

function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <PageDecorations />
      <NavBar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:title" element={<ProjectPage />} />
    </Routes>
  );
}
