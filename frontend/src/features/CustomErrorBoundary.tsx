import React, { ErrorInfo, PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import { useDeviceDetect } from '../utils/useDeviceDetect';
import { ErrorIcon } from 'react-hot-toast';

export const CustomErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  const { browser, resolution, platform, fullBrowserVersion } = useDeviceDetect();
  const location = useLocation();

  const logError = (error: Error, info: ErrorInfo) => {
    const body = JSON.stringify({
      location: location?.pathname,
      stack: error?.stack,
      componentStack: info?.componentStack,
      browser,
      fullBrowserVersion,
      platform,
      resolution,
    });
    fetch('/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  };

  return (
    <ErrorBoundary fallback={<ErrorIcon />} onError={logError}>
      {children}
    </ErrorBoundary>
  );
};
