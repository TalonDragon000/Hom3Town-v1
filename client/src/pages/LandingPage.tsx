import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar variant="bg" />
      <header>
        <div className="hero">
          <h1>Welcome to Hom3Town!</h1>
          <p>Your adventure awaits in this exciting online game.</p>
          <Link to="/create-avatar" className="btn">Play Now</Link>
        </div>
      </header>

      <section className="features">
        <div className="container flex">
          <div className="feature">
            <h2>Create</h2>
            <p>Customize your avatar and home.</p>
          </div>
          <div className="feature">
            <h2>Build</h2>
            <p>Create your own shop and sell in the marketplace.</p>
          </div>
          <div className="feature">
            <h2>Explore</h2>
            <p>Take your character to visit other homes, shops, and worlds — play games and more!</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
