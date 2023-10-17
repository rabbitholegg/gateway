import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { FaBug } from 'react-icons/fa';
import SEO from '@/components/SEO/SEO';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { ToastContainer } from '@/components/Toast';
import { AllTheProviders } from '@/contexts/AllTheProviders';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary
      id="_app"
      fallbackRender={({ error }) => {
        return (
          <div className="text-center w-full h-screen flex flex-col items-center justify-center">
            <FaBug />
            <p className="text-lg font-semibold mb-2">
              There was an uncaught error and this page could not be rendered.
            </p>
            {error instanceof Error ? (
              <div>
                <p>{error.message}</p>
                <p className="text-xs opacity-50">{error.stack}</p>
              </div>
            ) : null}
          </div>
        );
      }}
    >
      <AllTheProviders>
        <SEO />
        <Component {...pageProps} />
        <ToastContainer />
      </AllTheProviders>
    </ErrorBoundary>
  );
};

export default MyApp;
