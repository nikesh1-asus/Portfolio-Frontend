import { DefaultSeoProps } from 'next-seo/pages';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Nikesh - Portfolio',
  defaultTitle: 'Nikesh - Creative Full-Stack Developer',
  description: 'Creative Full-Stack Developer specializing in React, Next.js, Node.js, and modern web application development. Explore my portfolio, services, skills, and insights.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nikesh.dev/',
    siteName: 'Nikesh Portfolio',
    images: [
      {
        url: 'https://nikesh.dev/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nikesh - Full-Stack Developer & Designer Portfolio',
      },
    ],
  },
  twitter: {
    handle: '@nikesh_dev',
    site: '@nikesh_dev',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};

export default config;
