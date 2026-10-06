import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawUsername = searchParams.get('username') || '@tokenmingle';
    const username = rawUsername.replace('@', '');

    // Read background card synchronously from disk (bulletproof, no network)
    const bgPath = join(process.cwd(), 'public', 'card.png');
    const bgBase64 = readFileSync(bgPath).toString('base64');
    const bgUrl = `data:image/png;base64,${bgBase64}`;

    // Read the outer card-bg.png background
    const outerBgPath = join(process.cwd(), 'public', 'card-bg.png');
    const outerBgBase64 = readFileSync(outerBgPath).toString('base64');
    const outerBgUrl = `data:image/png;base64,${outerBgBase64}`;

    // Read the Montserrat ExtraBold font
    const fontPath = join(process.cwd(), 'public', 'fonts', 'Montserrat-ExtraBold.ttf');
    const fontData = readFileSync(fontPath);

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
          {/* Outer gradient background */}
          <img
            src={outerBgUrl}
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: '1200px',
              height: '630px',
              objectFit: 'cover',
            }}
          />

          {/* Card ticket image */}
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

          {/* Avatar circle removed by user request, keeping only text */}

          {/* Username on the new card: left-aligned above 'is getting mingle' */}
          <div
            style={{
              position: 'absolute',
              top: '207px',
              left: '124px',
              display: 'flex',
              justifyContent: 'flex-start',
              fontSize: 74,
              fontWeight: 800,
              color: '#000000',
              fontFamily: '"Montserrat"',
              letterSpacing: '-0.02em',
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
        fonts: [
          {
            name: 'Montserrat',
            data: fontData,
            weight: 800,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(e.message);
    return new Response('Failed to generate the image', { status: 500 });
  }
}
