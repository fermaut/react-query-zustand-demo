import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface DevToolsProps {
  children: ReactNode;
}

export const DevTools = ({ children }: DevToolsProps) => {
  const isDevelopment = import.meta.env.DEV;

  if (!isDevelopment) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}; 