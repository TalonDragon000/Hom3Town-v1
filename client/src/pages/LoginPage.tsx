import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="feature" style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <h2>Login</h2>
          <p style={{ color: '#888', marginBottom: '1.5rem' }}>
            Account system coming soon. Authentication with Supabase Auth is being integrated.
          </p>
          <span className="btn" style={{ opacity: 0.5, cursor: 'not-allowed' }}>Coming Soon</span>
        </div>
      </div>
      <Footer />
    </>
  );
}
