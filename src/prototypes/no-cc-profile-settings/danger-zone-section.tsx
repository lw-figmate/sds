import { useState } from "react";

function AlertTriangleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

const CONFIRM_PHRASE = "DELETE MY ACCOUNT";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "var(--sds-size-space-200) var(--sds-size-space-300)",
  border: "1px solid var(--sds-color-border-default-default)",
  borderRadius: "var(--sds-size-radius-100)",
  background: "var(--sds-color-background-default-default)",
  color: "var(--sds-color-text-default-default)",
  fontSize: "var(--sds-font-size-body-md)",
  lineHeight: "var(--sds-font-line-height-body-md)",
  boxSizing: "border-box",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "var(--sds-size-space-100)",
  fontSize: "var(--sds-font-size-body-md)",
  fontWeight: "var(--sds-font-weight-medium)" as React.CSSProperties["fontWeight"],
  color: "var(--sds-color-text-default-default)",
};

export function DangerZoneSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [deleted, setDeleted] = useState(false);

  const isConfirmed = input === CONFIRM_PHRASE;

  const handleDelete = () => {
    if (!isConfirmed) return;
    setDeleted(true);
    setInput("");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInput("");
  };

  if (deleted) {
    return (
      <div
        style={{
          padding: "var(--sds-size-space-500)",
          border: "1px solid var(--sds-color-border-danger-default)",
          borderRadius: "var(--sds-size-radius-200)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--sds-size-space-300)" }}>
          <p style={{ margin: 0, textAlign: "center", fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
            Your account has been scheduled for deletion. You have a{" "}
            <strong>30-day grace period</strong> before all data is permanently removed.
          </p>
          <button
            type="button"
            onClick={() => setDeleted(false)}
            style={{
              padding: "var(--sds-size-space-200) var(--sds-size-space-400)",
              background: "var(--sds-color-background-default-default)",
              color: "var(--sds-color-text-default-default)",
              border: "1px solid var(--sds-color-border-default-default)",
              borderRadius: "var(--sds-size-radius-100)",
              fontSize: "var(--sds-font-size-body-md)",
              fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
              cursor: "pointer",
            }}
          >
            Cancel deletion
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-400)" }}>
        {/* Section header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-100)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sds-size-space-200)", color: "var(--sds-color-text-danger-default)" }}>
            <AlertTriangleIcon />
            <h2
              style={{
                margin: 0,
                fontSize: "var(--sds-font-size-heading-md)",
                fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
                color: "var(--sds-color-text-danger-default)",
              }}
            >
              Danger Zone
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
            Permanently delete your account and all associated data. This cannot be undone after the 30-day grace period.
          </p>
        </div>

        {/* Delete account card */}
        <div
          style={{
            padding: "var(--sds-size-space-400)",
            border: "1px solid var(--sds-color-border-danger-default)",
            borderRadius: "var(--sds-size-radius-200)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--sds-size-space-300)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-100)", flex: 1 }}>
              <strong style={{ fontSize: "var(--sds-font-size-body-md)", color: "var(--sds-color-text-default-default)" }}>
                Delete this account
              </strong>
              <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
                Once deleted, all your settings, data, and preferences will be removed. You have 30 days to cancel.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              style={{
                flexShrink: 0,
                padding: "var(--sds-size-space-200) var(--sds-size-space-400)",
                background: "var(--sds-color-background-danger-default)",
                color: "var(--sds-color-text-on-danger)",
                border: "none",
                borderRadius: "var(--sds-size-radius-100)",
                fontSize: "var(--sds-font-size-body-md)",
                fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
                cursor: "pointer",
              }}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-desc"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={handleClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
            }}
          />
          {/* Dialog panel */}
          <div
            style={{
              position: "relative",
              background: "var(--sds-color-background-default-default)",
              borderRadius: "var(--sds-size-radius-300)",
              boxShadow: "var(--sds-effects-shadows-overlay)",
              padding: "var(--sds-size-space-600)",
              width: "100%",
              maxWidth: "480px",
              margin: "var(--sds-size-space-400)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--sds-size-space-300)",
            }}
          >
            <h2
              id="delete-dialog-title"
              style={{
                margin: 0,
                fontSize: "var(--sds-font-size-heading-md)",
                fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
                color: "var(--sds-color-text-default-default)",
              }}
            >
              Delete your account?
            </h2>
            <p
              id="delete-dialog-desc"
              style={{ margin: 0, fontSize: "var(--sds-font-size-body-md)", color: "var(--sds-color-text-default-secondary)" }}
            >
              This will permanently delete your account after a 30-day grace period. All data, settings, and history will be removed.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-300)" }}>
              <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-md)", color: "var(--sds-color-text-default-default)" }}>
                To confirm, type <strong>{CONFIRM_PHRASE}</strong> below:
              </p>
              <div>
                <label htmlFor="confirm-delete-input" style={labelStyle}>
                  Type to confirm
                </label>
                <input
                  id="confirm-delete-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={CONFIRM_PHRASE}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--sds-size-space-200)", marginTop: "var(--sds-size-space-100)" }}>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  padding: "var(--sds-size-space-200) var(--sds-size-space-400)",
                  background: "var(--sds-color-background-default-default)",
                  color: "var(--sds-color-text-default-default)",
                  border: "1px solid var(--sds-color-border-default-default)",
                  borderRadius: "var(--sds-size-radius-100)",
                  fontSize: "var(--sds-font-size-body-md)",
                  fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!isConfirmed}
                onClick={handleDelete}
                style={{
                  padding: "var(--sds-size-space-200) var(--sds-size-space-400)",
                  background: isConfirmed
                    ? "var(--sds-color-background-danger-default)"
                    : "var(--sds-color-background-default-disabled)",
                  color: isConfirmed
                    ? "var(--sds-color-text-on-danger)"
                    : "var(--sds-color-text-default-disabled)",
                  border: "none",
                  borderRadius: "var(--sds-size-radius-100)",
                  fontSize: "var(--sds-font-size-body-md)",
                  fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
                  cursor: isConfirmed ? "pointer" : "not-allowed",
                }}
              >
                Delete my account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
