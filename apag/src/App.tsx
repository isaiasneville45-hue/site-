import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'

import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Contact } from '@/components/sections/Contact'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { Footer } from '@/components/sections/Footer'
import { Hero } from '@/components/sections/Hero'
import { Location } from '@/components/sections/Location'
import { Navbar } from '@/components/sections/Navbar'
import { Process } from '@/components/sections/Process'
import { Products } from '@/components/sections/Products'
import { Segments } from '@/components/sections/Segments'
import { Services } from '@/components/sections/Services'
import { Stats } from '@/components/sections/Stats'
import { WhyApag } from '@/components/sections/WhyApag'
import { ServiceIntentProvider } from '@/context/service-intent'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ServiceIntentProvider>
          <Navbar />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            <Hero />
            <Segments />
            <Services />
            <Products />
            <Stats />
            <WhyApag />
            <Process />
            <Faq />
            <FinalCta />
            <Contact />
            <Location />
          </main>
          <Footer />
          <WhatsAppButton />
        </ServiceIntentProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
