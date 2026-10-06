import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || '@tokenmingle';

    // Read background card synchronously from disk (bulletproof, no network)
    const bgPath = join(process.cwd(), 'public', 'card.png');
    const bgBase64 = readFileSync(bgPath).toString('base64');
    const bgUrl = `data:image/png;base64,${bgBase64}`;

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
          }}
        >
          {/* Card background */}
          <img
            src={bgUrl}
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: '1200px',
              height: '630px',
              objectFit: 'contain',
            }}
          />

          {/* Black avatar circle overlay */}
          <div
            style={{
              position: 'absolute',
              top: '227px',
              right: '80px',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              backgroundColor: '#000',
              border: '3px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="65" height="65" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>

          {/* Username below circle */}
          <div
            style={{
              position: 'absolute',
              top: '370px',
              right: '80px',
              width: '130px',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.05em',
              fontFamily: 'sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            {username}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (e: any) {
    console.log(e.message);
    return new Response('Failed to generate the image', { status: 500 });
  }
}
