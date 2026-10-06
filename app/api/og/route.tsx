import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get('username') || '@tokenmingle';
    
    // Pass the absolute GitHub URLs directly into the src string. Satori will fetch them automatically.
    const cardUrl = 'https://raw.githubusercontent.com/Anmol-345/tokenmingle-waitlist/main/public/card.png';
    const heroUrl = 'https://raw.githubusercontent.com/Anmol-345/tokenmingle-waitlist/main/public/hero.png';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            position: 'relative',
          }}
        >
          {/* Hero background */}
          <img 
            src={heroUrl} 
            alt="Hero Background" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} 
          />

          {/* Card container */}
          <div style={{ display: 'flex', position: 'relative' }}>
            <img src={cardUrl} alt="TokenMingle Card" width={630} height={630} style={{ objectFit: 'contain' }} />
            
            {/* The Custom Overlay */}
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                top: '50%',
                right: '6.5%',
                transform: 'translate(0%, -60%)',
                gap: '8px',
              }}
            >
              {/* Black circle */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '97px',
                  height: '97px',
                  borderRadius: '50%',
                  backgroundColor: 'black',
                  border: '3px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
              >
                <svg width="50" height="50" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              
              {/* Username text */}
              <div
                style={{
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.025em',
                  whiteSpace: 'nowrap',
                }}
              >
                {username}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image`, {
      status: 500,
    });
  }
}
