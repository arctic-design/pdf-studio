import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'PDF Studio — Free browser-based PDF toolkit';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#080b14',
          fontFamily: 'Inter, system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left: branding */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 520,
            paddingLeft: 72,
            position: 'relative',
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              display: 'flex',
              width: 68,
              height: 68,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 36,
              boxShadow:
                '0 16px 48px rgba(37,99,235,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <path
                d="M10 6h7l5 5v15a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
                fill="white"
                fillOpacity="0.95"
              />
              <path
                d="M17 6l5 5h-4a1 1 0 0 1-1-1V6z"
                fill="white"
                fillOpacity="0.45"
              />
              <rect x="12" y="15" width="8" height="1.5" rx="0.75" fill="#2563eb" fillOpacity="0.5" />
              <rect x="12" y="19" width="6" height="1.5" rx="0.75" fill="#2563eb" fillOpacity="0.35" />
              <rect x="12" y="23" width="7" height="1.5" rx="0.75" fill="#2563eb" fillOpacity="0.2" />
            </svg>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 52,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            PDF Studio
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 20,
              color: '#94a3b8',
              lineHeight: 1.5,
              marginBottom: 36,
              maxWidth: 380,
            }}
          >
            Merge, rotate, watermark, compress and protect PDFs — entirely in your browser.
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Merge', 'Rotate', 'Watermark', 'Compress', 'Protect'].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    padding: '6px 14px',
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#cbd5e1',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
        </div>

        {/* Right: app mockup */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Window frame */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 540,
              height: 370,
              borderRadius: 12,
              background: '#111827',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow:
                '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Title bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 36,
                paddingLeft: 14,
                paddingRight: 14,
                background: '#0f1623',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: '#ef4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: 5, background: '#eab308' }} />
                <div style={{ width: 10, height: 10, borderRadius: 5, background: '#22c55e' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  fontSize: 11,
                  color: '#475569',
                  fontWeight: 500,
                }}
              >
                PDF Studio
              </div>
            </div>

            {/* App body */}
            <div style={{ display: 'flex', flex: 1 }}>
              {/* Sidebar */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 120,
                  padding: '12px 10px',
                  background: '#0c1120',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                  gap: 8,
                }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 76,
                        height: 52,
                        borderRadius: 4,
                        background: n === 1 ? 'rgba(37,99,235,0.12)' : 'rgba(255,255,255,0.04)',
                        border: n === 1 ? '1.5px solid rgba(37,99,235,0.5)' : '1px solid rgba(255,255,255,0.06)',
                        padding: '8px 10px',
                        gap: 4,
                      }}
                    >
                      <div style={{ display: 'flex', height: 3, width: '90%', borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
                      <div style={{ display: 'flex', height: 3, width: '70%', borderRadius: 2, background: 'rgba(255,255,255,0.08)' }} />
                      <div style={{ display: 'flex', height: 3, width: '80%', borderRadius: 2, background: 'rgba(255,255,255,0.06)' }} />
                    </div>
                    <div style={{ display: 'flex', fontSize: 9, color: '#475569' }}>{n}</div>
                  </div>
                ))}
              </div>

              {/* Canvas area */}
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#141c2e',
                }}
              >
                {/* Page preview */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 190,
                    height: 260,
                    background: 'white',
                    borderRadius: 4,
                    padding: '22px 18px',
                    gap: 7,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  <div style={{ display: 'flex', height: 5, width: '65%', borderRadius: 3, background: '#1e293b' }} />
                  <div style={{ display: 'flex', height: 3, width: '100%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 3, width: '90%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 3, width: '95%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 3, width: '40%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 10 }} />
                  <div style={{ display: 'flex', height: 5, width: '55%', borderRadius: 3, background: '#1e293b' }} />
                  <div style={{ display: 'flex', height: 3, width: '100%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 3, width: '85%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 3, width: '92%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 3, width: '70%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 10 }} />
                  <div style={{ display: 'flex', height: 3, width: '100%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 3, width: '80%', borderRadius: 2, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', height: 3, width: '60%', borderRadius: 2, background: '#e2e8f0' }} />
                </div>
              </div>

              {/* Right panel */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 110,
                  padding: '14px 10px',
                  background: '#0c1120',
                  borderLeft: '1px solid rgba(255,255,255,0.05)',
                  gap: 10,
                }}
              >
                {['Watermark', 'Numbers', 'Compress', 'Password'].map((tool) => (
                  <div
                    key={tool}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 8px',
                      borderRadius: 4,
                      background: tool === 'Watermark' ? 'rgba(37,99,235,0.12)' : 'transparent',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: tool === 'Watermark' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        fontSize: 9,
                        color: tool === 'Watermark' ? '#93c5fd' : '#475569',
                        fontWeight: tool === 'Watermark' ? 600 : 400,
                      }}
                    >
                      {tool}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 72,
            paddingRight: 72,
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div style={{ display: 'flex', fontSize: 14, fontWeight: 600, color: '#64748b' }}>
            pdf.bpstack.com
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              color: '#475569',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your files never leave your device
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
