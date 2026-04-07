import { useState, useEffect } from 'react';
import { cases } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import styles from './Offer.module.css';

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

function formatTimeLeft(ms: number): string {
  if (ms <= 0) return 'EXPIRED';
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const stripeLinks: Record<string, string> = {
  water: import.meta.env.VITE_STRIPE_WATER_LINK ?? '#',
  asbestos: import.meta.env.VITE_STRIPE_ASBESTOS_LINK ?? '#',
  electrical: import.meta.env.VITE_STRIPE_ELECTRICAL_LINK ?? '#',
  gas: import.meta.env.VITE_STRIPE_GAS_LINK ?? '#',
  cooling: import.meta.env.VITE_STRIPE_COOLING_LINK ?? '#',
  bundle: import.meta.env.VITE_STRIPE_BUNDLE_LINK ?? '#',
};

export default function Offer() {
  const { firstVisitAt, setFirstVisit, isCaseUnlocked, bundleUnlocked } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(TWENTY_FOUR_HOURS);

  useEffect(() => {
    setFirstVisit();
  }, [setFirstVisit]);

  useEffect(() => {
    if (!firstVisitAt) return;
    const start = new Date(firstVisitAt).getTime();
    const tick = () => {
      const elapsed = Date.now() - start;
      setTimeLeft(Math.max(0, TWENTY_FOUR_HOURS - elapsed));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [firstVisitAt]);

  const isLaunchOffer = timeLeft > 0;
  const bundlePrice = isLaunchOffer ? '£15.99' : '£24.99';
  const lockedCases = cases.filter((c) => !c.free);

  if (bundleUnlocked) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.title}>All Cases Unlocked</div>
          <div className={styles.subtitle}>You have full access to all 6 cases.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>Unlock Cases</div>
        <div className={styles.subtitle}>Invest in your compliance knowledge</div>
      </div>

      <div className={styles.bundleCard}>
        <div className={styles.bundleTitle}>COMPLETE BUNDLE — ALL 6 CASES</div>
        <div className={styles.bundlePrice}>
          {bundlePrice}
          {isLaunchOffer && <span className={styles.bundleOriginal}>£24.99</span>}
        </div>
        <div className={styles.bundleDesc}>
          60 questions across fire, water, asbestos, electrical, gas & cooling tower compliance
        </div>
        {isLaunchOffer && (
          <div className={styles.countdown}>
            LAUNCH OFFER ENDS IN {formatTimeLeft(timeLeft)}
          </div>
        )}
        <a href={stripeLinks.bundle} target="_blank" rel="noopener noreferrer">
          <button className={styles.buyBtn}>BUY BUNDLE</button>
        </a>
      </div>

      <div className={styles.divider}>OR BUY INDIVIDUALLY</div>

      <div className={styles.caseGrid}>
        {lockedCases.map((c) => {
          const unlocked = isCaseUnlocked(c.id, c.free);
          return (
            <div key={c.id} className={styles.caseCard}>
              <div className={styles.caseName}>
                {c.icon} {c.title}
              </div>
              <div className={styles.caseReg}>{c.regulation}</div>
              {unlocked ? (
                <div className={styles.unlocked}>✓ UNLOCKED</div>
              ) : (
                <>
                  <div className={styles.casePrice}>£4.99</div>
                  <a href={stripeLinks[c.id]} target="_blank" rel="noopener noreferrer">
                    <button className={styles.caseBuyBtn}>UNLOCK CASE</button>
                  </a>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
