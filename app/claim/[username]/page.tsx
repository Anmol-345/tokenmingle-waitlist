import { Metadata } from 'next';

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { username } = await params;
  const sp = await searchParams;
  const timestamp = sp?.t || Date.now().toString();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.waitlist.tokenmingle.fun';

  // &ext=.png tricks Twitter into treating this as a real image file URL
  // Encode username so @ becomes %40 and doesn't confuse X's image fetcher
  const ogImageUrl = `${baseUrl}/api/og?username=${encodeURIComponent(username)}&v=${timestamp}&ext=.png`;

  return {
    title: `${decodeURIComponent(username)} just joined the TokenMingle Waitlist!`,
    description: 'The future of token-powered communities is here. Join the waitlist now!',
    openGraph: {
      title: `${decodeURIComponent(username)} just joined the TokenMingle Waitlist!`,
      description: 'The future of token-powered communities is here.',
      url: `${baseUrl}/claim/${username}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `TokenMingle Waitlist Card for ${decodeURIComponent(username)}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${decodeURIComponent(username)} just joined the TokenMingle Waitlist!`,
      description: 'The future of token-powered communities is here.',
      images: [ogImageUrl],
    },
  };
}

// Twitter bots read the metadata above and stop — they don't run JS.
// Real users hit this script and get instantly redirected to the homepage.
export default function ClaimPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace('/');`,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#050505', color: '#fff', fontFamily: 'sans-serif' }}>
        <p>Redirecting to TokenMingle...</p>
      </div>
    </>
  );
}
