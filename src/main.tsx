import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Asharappareal caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAF7] text-[#111111] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md border border-[#D5D3CC] bg-white p-8 shadow-sm">
            <span className="font-serif text-2xl tracking-[0.2em] uppercase text-[#111111] block mb-2">
              Asharappareal
            </span>
            <p className="text-xs uppercase tracking-widest text-[#7E7B75] font-mono mb-4">
              Session Continuity Notice
            </p>
            <p className="text-xs text-[#5C5954] mb-6 leading-relaxed">
              An unexpected condition was encountered during session rendering.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#111111] text-[#FAFAF7] text-xs uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors"
            >
              Reload Atelier
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

