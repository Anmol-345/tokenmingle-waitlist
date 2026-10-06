import type { Metadata } from 'next';

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ t?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { username } = await params;
  const { t } = await searchParams;
  const decodedUsername = decodeURIComponent(username);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tokenmingle-waitlist.vercel.app';

  // Trick: &ext=.png makes Twitter treat this as a real image file
  const ogImageUrl = `${baseUrl}/api/og?username=${encodeURIComponent(decodedUsername)}&v=${t || Date.now()}&ext=.png`;

  return {
    title: `${decodedUsername} just joined the TokenMingle Waitlist!`,
    description: 'The future of token-powered communities is here. Join the waitlist now!',
    openGraph: {
      title: `${decodedUsername} just joined the TokenMingle Waitlist!`,
      description: 'The future of token-powered communities is here.',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${decodedUsername}'s TokenMingle Waitlist Card`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${decodedUsername} just joined the TokenMingle Waitlist!`,
      description: 'The future of token-powered communities is here.',
      images: [ogImageUrl],
    },
  };
}

// Twitterbot does NOT run JS -- it reads metadata above and stops.
// Real users run the script and get instantly redirected home.
export default async function ClaimPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: `window.location.replace('/');` }}
      />
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
        Redirecting...
      </div>
    </>
  );
}