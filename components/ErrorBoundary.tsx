import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Replaced the constructor with a direct state initialization as a class property.
  // This is a more modern and concise approach that avoids potential `this` context issues and resolves the type errors where `state` and `props` were not being recognized.
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-mist">
            <div className="text-center p-8 bg-pearl border border-silver rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-saffron mb-4">Something went wrong.</h1>
                <p className="text-jet">Please try refreshing the page. If the problem persists, please contact support.</p>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
