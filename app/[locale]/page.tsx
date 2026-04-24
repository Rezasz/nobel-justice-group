import Hero from '@/components/home/Hero'
import AboutSnippet from '@/components/home/AboutSnippet'
import FamousClientsCarousel from '@/components/home/FamousClientsCarousel'
import AttorneyAbroadBanner from '@/components/home/AttorneyAbroadBanner'
import InternationalOffices from '@/components/home/InternationalOffices'
import ClientLogos from '@/components/home/ClientLogos'
import BlogPreview from '@/components/home/BlogPreview'
import FAQPreview from '@/components/home/FAQPreview'
import ConsultationCTA from '@/components/home/ConsultationCTA'
import CoreValues from '@/components/home/CoreValues'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <FamousClientsCarousel />
      <AttorneyAbroadBanner />
      <InternationalOffices />
      <ClientLogos />
      <BlogPreview />
      <FAQPreview />
      <ConsultationCTA />
      <CoreValues />
    </>
  )
}
