// pages/_error/+Page.jsx — custom 404 / error page. Additive; no shared layout changes.
import CosmicBg from "@/components/ui/CosmicBg";

export default function ErrorPage() {
  return (
     <>
    <CosmicBg />
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        color: "#F5F7FF",
        textAlign: "center",
        padding: "2rem",
        position: "relative",
        zIndex: 1,
        fontFamily: "Poppins, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <p style={{ fontSize: "0.9rem", letterSpacing: "0.2em", color: "#FA9F43", textTransform: "uppercase", marginBottom: "1rem" }}>
          404 — Page not found
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
          This page drifted off course
        </h1>
        <p style={{ opacity: 0.8, marginBottom: "2rem", lineHeight: 1.6 }}>
          The page you're looking for doesn't exist or has moved. Let's get you
          back to something useful.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ padding: "0.75rem 1.5rem", borderRadius: 999, background: "#0037CA", color: "#fff", textDecoration: "none", fontWeight: 600 }}>
            Back to home
          </a>
          <a href="/service" style={{ padding: "0.75rem 1.5rem", borderRadius: 999, border: "1px solid rgba(245,247,255,0.25)", color: "#F5F7FF", textDecoration: "none", fontWeight: 600 }}>
            View services
          </a>
        </div>
      </div>
    </main>
    </>
  );
}
