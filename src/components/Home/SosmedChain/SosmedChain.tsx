import { Tooltip } from "@/components/Global";
import Link from "next/link";
import { BsEnvelope, BsGithub, BsInstagram, BsLinkedin, BsWhatsapp } from "react-icons/bs";

interface SocialLink {
  id: string;
  href: string;
  icon: JSX.Element;
  label: string;
  ariaLabel: string;
  platform: string;
}

const socialLinks: SocialLink[] = [
  {
    id: 'email',
    href: 'mailto:andikadwisaputra.dev@gmail.com',
    icon: <BsEnvelope aria-hidden="true" />,
    label: 'Email Me!',
    ariaLabel: 'Send email to Andika Dwi Saputra',
    platform: 'Email'
  },
  {
    id: 'instagram',
    href: 'https://instagram.com/andikads__',
    icon: <BsInstagram aria-hidden="true" />,
    label: 'Visit my Instagram Profile',
    ariaLabel: 'Follow Andika Dwi Saputra on Instagram',
    platform: 'Instagram'
  },
  {
    id: 'whatsapp',
    href: 'https://wa.me/6285743699909',
    icon: <BsWhatsapp aria-hidden="true" />,
    label: 'Chat Me!',
    ariaLabel: 'Chat with Andika Dwi Saputra on WhatsApp',
    platform: 'WhatsApp'
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/andikadwisaputra',
    icon: <BsLinkedin aria-hidden="true" />,
    label: 'Connect with me!',
    ariaLabel: 'Connect with Andika Dwi Saputra on LinkedIn',
    platform: 'LinkedIn'
  },
  {
    id: 'github',
    href: 'https://github.com/Andikss',
    icon: <BsGithub aria-hidden="true" />,
    label: 'Checkout my GitHub Account!',
    ariaLabel: 'Visit Andika Dwi Saputra on GitHub',
    platform: 'GitHub'
  }
];

// Social profiles structured data
const socialSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Andika Dwi Saputra",
  "sameAs": socialLinks.map(link => link.href)
};

export const SosmedChain = () => {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(socialSchema)
        }}
      />

      <div 
        className="absolute bottom-6 right-6 flex flex-col gap-4 items-center"
        role="navigation"
        aria-label="Social media links"
      >
        <div 
          className="top-6 right-6 w-0 h-[120px] border border-1 border-accent z-[1]"
          aria-hidden="true"
        />

        <div 
          className="flex flex-col gap-3 text-text text-2xl z-[2]"
          itemScope 
          itemType="https://schema.org/Person"
        >
          {socialLinks.map((link) => (
            <Tooltip
              key={link.id}
              hasArrow
              position="left"
              label={link.label}
            >
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 transform hover:rotate-[-15deg]"
                aria-label={link.ariaLabel}
                itemProp="sameAs"
              >
                {link.icon}
                <span className="sr-only">
                  {`Follow Andika Dwi Saputra on ${link.platform}`}
                </span>
              </Link>
            </Tooltip>
          ))}
        </div>

        {/* Hidden SEO content */}
        <div className="sr-only">
          <div itemScope itemType="https://schema.org/Person">
            <meta itemProp="name" content="Andika Dwi Saputra" />
            {socialLinks.map((link) => (
              <link key={link.id} itemProp="sameAs" href={link.href} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};