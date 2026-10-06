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

          {/* Black avatar circle overlay
               Card is 720x720 original, rendered at 630x630 (objectFit:contain) centered in 1200x630
               Card left offset = (1200-630)/2 = 285px  |  scale = 0.875
               In page.tsx: top:50%, right:6.5%, transform:translate(0%,-60%), size:110.6px
               → size: 110.6*0.875 ≈ 97px
               → top: 315 - 0.6*97 = 257px
               → left: 285 + 630 - 6.5%*630 - 97 = 777px
          */}
          <div
            style={{
              position: 'absolute',
              top: '257px',
              left: '777px',
              width: '97px',
              height: '97px',
              borderRadius: '50%',
              backgroundColor: '#000',
              border: '3px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>

          {/* Username below circle: top = 257 + 97 + 9 = 363px, centered on circle (left 777, width 97) */}
          <div
            style={{
              position: 'absolute',
              top: '363px',
              left: '777px',
              width: '97px',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 600,
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
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (e: any) {
    console.log(e.message);
    return new Response('Failed to generate the image', { status: 500 });
  }
}
