import { Hero } from '../components/landing/Hero';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { HowItWorks } from '../components/landing/HowItWorks';
import { PrivacyBanner } from '../components/landing/PrivacyBanner';
import { ComparisonStrip } from '../components/landing/ComparisonStrip';
import { CallToAction } from '../components/landing/CallToAction';
import { Footer } from '../components/landing/Footer';
import { LandingWrapper } from '../components/landing/LandingWrapper';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PDF Studio',
  url: 'https://pdf.bpstack.com',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Merge, split, rotate, watermark, compress and password-protect PDFs entirely in your browser. No uploads, no servers — your files never leave your device.',
  author: {
    '@type': 'Person',
    name: 'Barun Prasad',
    url: 'https://www.barunprasad.com',
  },
  featureList: [
    'Merge PDFs',
    'Rotate pages',
    'Add watermarks',
    'Compress files',
    'Password protect',
    'Add page numbers',
    'Client-side processing',
    'No file uploads',
  ],
};

export default function LandingPage() {
  return (
    <LandingWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen dark:bg-gray-950">
        <Hero />
        <FeatureGrid />
        <HowItWorks />
        <PrivacyBanner />
        <ComparisonStrip />
        <CallToAction />
        <Footer />
      </main>
    </LandingWrapper>
  );
}
