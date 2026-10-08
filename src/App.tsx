import { Route, Routes } from "react-router-dom"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import JsonLd from "@/components/JsonLd"
import ScrollProgress from "@/components/ScrollProgress"
import ScrollToTop from "@/components/ScrollToTop"
import { Toaster } from "@/components/ui/toast"
import dict from "@/i18n/dict"
import { profile, socials } from "@/data/portfolio"
import { useParallax } from "@/hooks/useParallax"
import { useReveal } from "@/hooks/useReveal"
import { useLang } from "@/i18n/use-lang"
import CaseStudy from "@/pages/CaseStudy"
import Home from "@/pages/Home"
import NotFound from "@/pages/NotFound"
import StyleGuide from "@/pages/StyleGuide"

function App() {
  const { lang } = useLang()
  useReveal()
  useParallax()

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role[lang],
    email: `mailto:${profile.email}`,
    url: "https://nikoagustio.com/",
    sameAs: socials.map((social) => social.href),
  }

  return (
    <div>
      <a
        className="fixed left-2 top-2 z-[100] -translate-y-[150%] border-3 border-ink bg-yellow p-3 font-bold text-black focus:translate-y-0"
        href="#main"
      >
        {dict.app.skipToContent[lang]}
      </a>

      <JsonLd data={personSchema} />

      <ScrollProgress />
      <ScrollToTop />

      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/styleguide" element={<StyleGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <Toaster />
    </div>
  )
}

export default App
