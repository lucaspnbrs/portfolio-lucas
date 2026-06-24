import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { AudioProvider }    from "@/providers/AudioProvider";
import Navbar    from "@/components/Navbar";
import SoundToggle from "@/components/SoundToggle";
import Hero      from "@/components/sections/Hero";
import Marquee   from "@/components/sections/Marquee";
import About     from "@/components/sections/About";
import Services  from "@/components/sections/Services";
import Projects  from "@/components/sections/Projects";
import Contact   from "@/components/sections/Contact";

export default function Home() {
  return (
    <AudioProvider>
      <SmoothScrollProvider>
        <Navbar />
        <SoundToggle />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Projects />
          <Contact />
        </main>
      </SmoothScrollProvider>
    </AudioProvider>
  );
}
