/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CinematicDoorEntrance } from './components/CinematicDoorEntrance';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { ScratchToReveal } from './components/ScratchToReveal';
import { LiveCountdown } from './components/LiveCountdown';
import { CoupleIntroduction } from './components/CoupleIntroduction';
import { FamilySection } from './components/FamilySection';
import { WeddingProgramme } from './components/WeddingProgramme';
import { VenuesSection } from './components/VenuesSection';
import { GuestWishesSection } from './components/GuestWishesSection';
import { BlessingFooter } from './components/BlessingFooter';
import { MusicController } from './components/MusicController';
import { PetalParticles } from './components/PetalParticles';
import { Language } from './types/wedding';
import { weddingAudio } from './utils/audioEngine';

export default function App() {
  const [doorsOpened, setDoorsOpened] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  // Sync music state with engine
  const handleTogglePlayMusic = () => {
    const newState = weddingAudio.toggle();
    setIsMusicPlaying(newState);
    if (newState) setIsMusicMuted(false);
  };

  const handleToggleMuteOnEntrance = () => {
    setIsMusicMuted(!isMusicMuted);
    if (!isMusicMuted) {
      weddingAudio.pause();
      setIsMusicPlaying(false);
    }
  };

  const handleDoorsOpened = () => {
    setDoorsOpened(true);
    if (!isMusicMuted) {
      setIsMusicPlaying(true);
    }
  };

  const handleReplayDoors = () => {
    setDoorsOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  const togglePetals = () => {
    setPetalsEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] min-h-[100svh] w-full bg-[#120407] text-[#FAF7F0] font-sans selection:bg-[#B38728] selection:text-white relative overflow-x-hidden">
      {/* 3D Palace Gate Entrance Overlay */}
      {!doorsOpened && (
        <CinematicDoorEntrance
          onDoorsOpened={handleDoorsOpened}
          lang={lang}
          onToggleLang={toggleLanguage}
          isMusicMuted={isMusicMuted}
          onToggleMute={handleToggleMuteOnEntrance}
        />
      )}

      {/* Floating Ambient Rose Petals */}
      <PetalParticles enabled={petalsEnabled} />

      {/* Top Navigation Bar */}
      <TopNav
        lang={lang}
        onToggleLang={toggleLanguage}
        petalsEnabled={petalsEnabled}
        onTogglePetals={togglePetals}
      />

      {/* Main Wedding Invitation Sections */}
      <main className="relative min-h-[100dvh] min-h-[100svh] w-full">
        {/* 1. Hero Entrance Section */}
        <HeroSection lang={lang} />

        {/* 2. Interactive Scratch to Reveal Date */}
        <ScratchToReveal lang={lang} />

        {/* 3. Live Auspicious Countdown */}
        <LiveCountdown lang={lang} />

        {/* 4. Couple Introduction & Royal Monogram */}
        <CoupleIntroduction lang={lang} />

        {/* 5. Family Lineage & Parents' Blessings */}
        <FamilySection lang={lang} />

        {/* 6. Wedding Programme (Ceremonies Timeline) */}
        <WeddingProgramme lang={lang} />

        {/* 7. Venues & Google Maps Navigation */}
        <VenuesSection lang={lang} />

        {/* 8. Dedicated Guest Wishes & Blessings Board */}
        <GuestWishesSection lang={lang} />
      </main>

      {/* 9. Final Vedic Blessing Footer & Replay Controls */}
      <BlessingFooter lang={lang} onReplayDoors={handleReplayDoors} />

      {/* Persistent Floating Background Wedding Music Controller */}
      <MusicController
        isPlaying={isMusicPlaying}
        onTogglePlay={handleTogglePlayMusic}
        lang={lang}
      />
    </div>
  );
}
