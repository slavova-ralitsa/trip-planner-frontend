import { getFriendlyError } from "../api/errorTranslations";

function ErrorAlert({ statusCode, onAction, onClose }) {
  const errorInfo = getFriendlyError(statusCode);

  const colors = {
    auth: { bg: "#FFF0F2", border: "#D32F2F", text: "#7A1C1C", btn: "#800020" },
    error: { bg: "#FDF2F2", border: "#E53E3E", text: "#9B2C2C", btn: "#9B2C2C" },
    warning: { bg: "#FFFAF0", border: "#DD6B20", text: "#9C4221", btn: "#DD6B20" }
  };

  const currentStyle = colors[errorInfo.type] || colors.error;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      backgroundColor: currentStyle.bg,
      borderLeft: `5px solid ${currentStyle.border}`,
      padding: "16px",
      borderRadius: "6px",
      margin: "15px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      position: "relative"
    }}>
      {onClose && (
        <button onClick={onClose} style={{
          position: "absolute", top: "10px", right: "12px",
          background: "none", border: "none", cursor: "pointer", fontSize: "16px",
          color: currentStyle.text, opacity: 0.6
        }}>✕</button>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "20px" }}>
          {errorInfo.type === 'auth' ? '🔒' : errorInfo.type === 'warning' ? '⚠️' : '❌'}
        </span>
        <h4 style={{ margin: 0, color: currentStyle.text, fontWeight: "700", fontSize: "16px" }}>
          {errorInfo.title} <span style={{ fontSize: "12px", opacity: 0.6 }}>(Отказ {statusCode})</span>
        </h4>
      </div>

      <p style={{ margin: "0 0 5px 0", color: currentStyle.text, fontSize: "14px", lineHeight: "1.4" }}>
        {errorInfo.message}
      </p>

      {errorInfo.actionLabel && onAction && (
        <button 
          onClick={onAction}
          style={{
            alignSelf: "flex-start",
            backgroundColor: currentStyle.btn,
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px",
            marginTop: "5px",
            transition: "opacity 0.2s"
          }}
          onMouseOver={(e) => e.target.style.opacity = 0.9}
          onMouseOut={(e) => e.target.style.opacity = 1}
        >
          {errorInfo.actionLabel}
        </button>
      )}
    </div>
  );
}

export default ErrorAlert;