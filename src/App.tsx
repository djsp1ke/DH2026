import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import TabNav from './components/layout/TabNav';
import Home from './pages/Home';
import CaseIntro from './pages/CaseIntro';
import CasePlaying from './pages/CasePlaying';
import CaseResult from './pages/CaseResult';
import Certificate from './pages/Certificate';
import Offer from './pages/Offer';
import Leagues from './pages/Leagues';
import { useGameStore } from './store/useGameStore';

function UnlockHandler() {
  const [searchParams] = useSearchParams();
  const { unlockBundle } = useGameStore();

  useEffect(() => {
    if (searchParams.get('unlocked') === 'true') {
      unlockBundle();
    }
  }, [searchParams, unlockBundle]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <UnlockHandler />
      <TabNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:id/intro" element={<CaseIntro />} />
        <Route path="/case/:id/play" element={<CasePlaying />} />
        <Route path="/case/:id/result" element={<CaseResult />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/unlock" element={<Offer />} />
        <Route path="/leagues" element={<Leagues />} />
      </Routes>
    </BrowserRouter>
  );
}
