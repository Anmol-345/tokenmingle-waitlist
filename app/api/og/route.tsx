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
              top: '-45px',
              left: '0px',
              width: '1200px',
              height: '630px',
              objectFit: 'contain',
            }}
          />

          {/* Black avatar circle overlay
               Card original size: 711x351. Scaled to 1200 wide -> 1200x592.4
               Vertical center of 630px box is at Y=315.
               Scale factor from 720px web view to 1200px OG view = 1200/720 = 1.666
               Web view right: 6.5%. OG view right offset: 6.5% of 1200 = 78px.
               Circle width: 110.6 * 1.666 = 184px.
               Left: 1200 - 78 - 184 = 938px.
               Container top shift (-60% of total height 224px) = -134px.
               Original Top: 315 - 134 = 181px.
               Shifted up by 45px -> 136px
          */}
          <div
            style={{
              position: 'absolute',
              top: '136px',
              left: '938px',
              width: '184px',
              height: '184px',
              borderRadius: '50%',
              backgroundColor: '#000',
              border: '4px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="95" height="95" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>

          {/* Username below circle: top = 181 + 184 + 17 = 382px (shifted up by 45px -> 337px) */}
          <div
            style={{
              position: 'absolute',
              top: '337px',
              left: '938px',
              width: '184px',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 19,
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
