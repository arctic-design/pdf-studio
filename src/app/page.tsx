import { Hero } from '../components/landing/Hero';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { HowItWorks } from '../components/landing/HowItWorks';
import { PrivacyBanner } from '../components/landing/PrivacyBanner';
import { ComparisonStrip } from '../components/landing/ComparisonStrip';
import { CallToAction } from '../components/landing/CallToAction';
import { Footer } from '../components/landing/Footer';
import { LandingWrapper } from '../components/landing/LandingWrapper';

export default function LandingPage() {
  return (
    <LandingWrapper>
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
