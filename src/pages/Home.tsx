import About from "@/sections/About"
import Certifications from "@/sections/Certifications"
import Contact from "@/sections/Contact"
import Hero from "@/sections/Hero"
import Projects from "@/sections/Projects"
import Services from "@/sections/Services"
import TechStack from "@/sections/TechStack"

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <TechStack />
      <Projects />
      <Certifications />
      <Contact />
    </>
  )
}
