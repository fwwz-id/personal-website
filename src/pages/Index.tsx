import Navigation from "~/components/Navigation";
import Hero from "~/components/Hero";
import Projects from "~/components/Projects";
import About from "~/components/About";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background noise-bg transition-colors duration-300">
      <Navigation />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;