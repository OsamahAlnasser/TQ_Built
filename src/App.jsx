import { Component } from 'react';
import TQBuilt from './TQBuilt';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[TQBuilt] Render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#070707', color: '#EFE9DF', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', fontFamily: 'DM Sans, sans-serif', textAlign: 'center' }}>
          <div style={{ fontSize: 14, letterSpacing: 4, color: '#C9A550', marginBottom: 24, fontFamily: 'DM Mono, monospace', textTransform: 'uppercase' }}>TQ Built</div>
          <h1 style={{ fontSize: 28, marginBottom: 16, letterSpacing: 2 }}>Something went wrong</h1>
          <p style={{ color: '#9A9080', marginBottom: 32, maxWidth: 400 }}>
            We encountered an unexpected error. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ background: '#E85D04', color: '#fff', border: 'none', padding: '12px 28px', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <TQBuilt />
    </ErrorBoundary>
  );
}

export default App;
