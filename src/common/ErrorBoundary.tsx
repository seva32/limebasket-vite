import * as React from "react";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    logErrorToMyService(
      error,
      info.componentStack || "",
      (React as unknown as { captureOwnerStack?: () => string }).captureOwnerStack?.()
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function logErrorToMyService(
  error: Error,
  componentStack: string,
  ownerStack?: string
): void {
  console.error(error, componentStack, ownerStack);
}
