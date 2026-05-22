import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
      
    </div>
  );
}

export default MainLayout;