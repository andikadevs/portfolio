import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://andikads.my.id'

  // Main sections from your navbar
  const sections = [
    { label: "Home", path: "#home" },
    { label: "About", path: "#about" },
    { label: "Skills", path: "#skills" },
    { label: "Education", path: "#education" },
    { label: "Experience", path: "#experience" },
    { label: "Portfolio", path: "#portfolio" },
  ]

  // Create the main page entry
  const mainPage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }

  // Create section entries (all pointing to main page with different priorities)
  const sectionEntries = sections.map(section => ({
    url: `${baseUrl}${section.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [mainPage, ...sectionEntries]
} 