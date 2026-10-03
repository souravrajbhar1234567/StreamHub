import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-shell">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}