import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Re-introduced a constructor with `super(props)` to explicitly initialize component props and state. This resolves the error where `this.props` was not found on the `ErrorBoundary` component type, ensuring the component can correctly render its children.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

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