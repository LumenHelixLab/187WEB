"use client";

import { Component, type ReactNode } from "react";
import { ErrorState } from "./ErrorState";

/** Client error boundary (RESILIENCE.md #6) — contains a render crash to its
 *  island instead of blanking the page, with a reset path. */
type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorState onRetry={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}
