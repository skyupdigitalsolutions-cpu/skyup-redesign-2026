import React from "react";

// Temporary diagnostic error boundary.
// When a render/hydration error throws, React normally unmounts the whole tree
// and you get a blank white page. This catches that error and prints it ON the
// page (message + stack + component stack) so you can see exactly what failed.
// Once the underlying bug is fixed you can remove this wrapper from +Layout.

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    // Also log it so it shows in the browser console with a full stack.
    console.error("[ErrorBoundary] App crashed during render/hydration:", error, info);
  }

  render() {
    const { error, info } = this.state;
    if (!error) return this.props.children;

    const box = {
      maxWidth: 900,
      margin: "40px auto",
      padding: "24px 28px",
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
      background: "#fff",
      color: "#1b1b1b",
      border: "1px solid #e5e5e5",
      borderRadius: 12,
      boxShadow: "0 10px 40px -20px rgba(0,0,0,0.35)",
    };
    const pre = {
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      background: "#f6f6f6",
      padding: "12px 14px",
      borderRadius: 8,
      fontSize: 12.5,
      lineHeight: 1.55,
      overflowX: "auto",
    };

    return (
      <div style={box}>
        <h1 style={{ fontSize: 18, margin: "0 0 6px", color: "#b91c1c" }}>
          The page crashed while rendering
        </h1>
        <p style={{ fontSize: 13, margin: "0 0 16px", color: "#555" }}>
          (Diagnostic view from ErrorBoundary — copy this and send it over.)
        </p>

        <div style={{ fontWeight: 700, fontSize: 13, margin: "0 0 6px" }}>
          {String((error && error.message) || error)}
        </div>

        {error && error.stack && (
          <>
            <div style={{ fontSize: 12, color: "#666", margin: "14px 0 6px" }}>
              Stack trace
            </div>
            <pre style={pre}>{error.stack}</pre>
          </>
        )}

        {info && info.componentStack && (
          <>
            <div style={{ fontSize: 12, color: "#666", margin: "14px 0 6px" }}>
              Component stack
            </div>
            <pre style={pre}>{info.componentStack}</pre>
          </>
        )}
      </div>
    );
  }
}