import { useNavigate } from 'react-router-dom';

export default function Leagues() {
  const navigate = useNavigate();

  return (
    <div style={{ flex: 1, maxWidth: 720, margin: '0 auto', width: '100%', padding: '32px 16px' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'var(--color-accent)',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
          textAlign: 'center' as const,
          marginBottom: 8,
        }}
      >
        Leagues
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--color-dim)',
          textAlign: 'center' as const,
          marginBottom: 32,
        }}
      >
        Coming in Phase 3
      </div>
      <div
        style={{
          padding: 24,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          color: 'var(--color-dim)',
          lineHeight: 1.8,
          textAlign: 'center' as const,
        }}
      >
        Regional leagues, compliance stream leagues, company leagues, and custom leagues are coming
        soon. Complete cases now to be ready for the season.
      </div>
      <div style={{ textAlign: 'center' as const, marginTop: 24 }}>
        <button onClick={() => navigate('/')}>← BACK TO FIXTURES</button>
      </div>
    </div>
  );
}
