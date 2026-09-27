export interface BlogPostSchemaProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  coverImage?: string;
}

export function getOrganizationSchema() {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Nikesh Portfolio',
      'url': 'https://nikesh.dev',
      'logo': 'https://nikesh.dev/images/logo.png',
      'sameAs': [
        'https://github.com/nikesh',
        'https://linkedin.com/in/nikesh',
        'https://twitter.com/nikesh_dev'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+977-XXXXXXXXXX',
        'contactType': 'customer service',
        'areaServed': 'Worldwide',
        'availableLanguage': 'English'
      }
    })
  };
}

export function getBlogPostingSchema(post: BlogPostSchemaProps) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://nikesh.dev/blog/${post.slug}`
      },
      'headline': post.title,
      'description': post.excerpt,
      'image': post.coverImage || 'https://nikesh.dev/images/og-image.png',
      'datePublished': new Date(post.date).toISOString(),
      'dateModified': new Date(post.date).toISOString(),
      'author': {
        '@type': 'Person',
        'name': 'Nikesh',
        'url': 'https://nikesh.dev/about'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Nikesh Portfolio',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://nikesh.dev/images/logo.png'
        }
      }
    })
  };
}
