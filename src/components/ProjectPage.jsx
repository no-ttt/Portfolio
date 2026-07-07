import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { CaseStudyPage } from './CaseStudyPage';
import { ALL_PROJECTS } from '../data/projects';

export function ProjectPage() {
  const { title } = useParams();
  const navigate = useNavigate();
  const project = ALL_PROJECTS.find(p => p.title === decodeURIComponent(title));

  useEffect(() => { window.scrollTo({ top: 0 }); }, [title]);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-grotesk)', fontSize: '1.2rem' }}>
        找不到專案 —{' '}
        <button onClick={() => navigate('/#work')} style={{ background: 'none', border: 'none', color: 'var(--red)', fontWeight: 800, cursor: 'pointer' }}>
          返回作品集
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <NavBar />
      <CaseStudyPage p={project} onBack={() => navigate(-1)} />
      <Footer />
    </div>
  );
}
