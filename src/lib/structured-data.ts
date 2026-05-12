export function generatePersonSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andika Dwi Saputra',
    url: baseUrl,
    jobTitle: 'Fullstack Developer',
    sameAs: [
      'https://github.com/andikadevs',
      'https://instagram.com/andikads__',
      'https://wa.me/6285743699909',
      'https://linkedin.com/in/andikadwisaputra',
      'https://medium.com/@andikads',
      'https://youtube.com/@andikads__',
    ],
    image: `${baseUrl}/static/img/person.webp`,
  };
}

export function generateWebsiteSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    name: 'Andika Dwi Saputra | Fullstack Developer',
    description: 'Personal portfolio of Andika Dwi Saputra, a Fullstack Developer with expertise in web development and modern technologies.',
    author: {
      '@type': 'Person',
      name: 'Andika Dwi Saputra',
    },
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  publishedDate: string;
}, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.imageUrl ? [article.imageUrl] : undefined,
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    url: `${baseUrl}/articles/${article.slug}`,
    author: {
      '@type': 'Person',
      name: 'Andika Dwi Saputra',
    },
    publisher: {
      '@type': 'Person',
      name: 'Andika Dwi Saputra',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/static/img/person.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/articles/${article.slug}`,
    },
  };
} 