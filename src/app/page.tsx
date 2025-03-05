import Footer from "./component/Footer/Footer";
import Benefits from "./component/Hero/Benefits";
import Disclaimer from "./component/Hero/Disclaimer";
import Hero from "./component/Hero/Hero";
import TechImportance from "./component/Hero/TechImportance";
import Navbar from "./component/UI/Navbar";


export default function Home() {

  return (
    <>
    <Navbar />
    <Hero />
    <Disclaimer />
    <Benefits />
    <TechImportance />
    <Footer />
    </>
  );
}
