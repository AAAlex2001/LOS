import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h2>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</p>
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1e40af',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
