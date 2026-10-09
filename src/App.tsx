import { Route, Routes, useLocation } from "react-router-dom"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import JsonLd from "@/components/JsonLd"
import ScrollProgress from "@/components/ScrollProgress"
import ScrollToTop from "@/components/ScrollToTop"
import { Toaster } from "@/components/ui/toast"
import { useContent } from "@/data/use-content"
import dict from "@/i18n/dict"
import { useParallax } from "@/hooks/useParallax"
import { useReveal } from "@/hooks/useReveal"
import CaseStudy from "@/pages/CaseStudy"
import Home from "@/pages/Home"
import NotFound from "@/pages/NotFound"
import StyleGuide from "@/pages/StyleGuide"
import AdminPage from "@/admin/AdminPage"

function App() {
  const { profile, socials } = useContent()
  useReveal()
  useParallax()

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    url: "https://nikoagustio.com/",
    sameAs: socials.map((social) => social.href),
  }

  return (
    <div>
      {
        /* hanya /admin persis yang membuka panel admin.
           /admin-asal (kecoh ajaib) tetap ditangani route "*" -> NotFound. */
        useLocation().pathname === "/admin" ? (
        <AdminPage />
      ) : (
        <>
          <a
            className="fixed left-2 top-2 z-[100] -translate-y-[150%] border-3 border-ink bg-yellow p-3 font-bold text-black focus:translate-y-0"
            href="#main"
          >
            {dict.app.skipToContent}
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
        </>
      )}

      <Toaster />
    </div>
  )
}

export default App
