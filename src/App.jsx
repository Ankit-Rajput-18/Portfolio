import Header from "./components/layout/Header";
import Socials from "./sections/Socials"; 
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import AboutMe from "./sections/AboutMe";
import Skills from "./sections/Skills";
import WorkTimeline from "./sections/WorkTimeline";
import ProjectGallery from "./sections/ProjectGallery";
import Achievements from "./sections/Achievements";
import ContactForm from "./sections/ContactForm";
import ThemeToggle from './components/ui/ThemeToggle';
import CursorFollower from "./components/ui/CursorFollower";

export default function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4">
        <Hero />
         <CursorFollower />
         <ThemeToggle /> 
        <AboutMe />
        <Skills />
        <WorkTimeline />
        <ProjectGallery />
       <Achievements />
        <Socials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}