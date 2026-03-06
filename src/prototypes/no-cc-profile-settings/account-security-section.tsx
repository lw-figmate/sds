import { useState } from "react";

function EyeIcon() {
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
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
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function CheckIcon() {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

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

function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  description,
  errorMessage,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-describedby={description || errorMessage ? `${id}-hint` : undefined}
          style={{ ...inputStyle, paddingRight: "44px" }}
        />
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((s) => !s)}
          style={{
            position: "absolute",
            right: "var(--sds-size-space-200)",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--sds-color-text-default-secondary)",
            display: "flex",
            alignItems: "center",
            padding: "4px",
          }}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {(description || errorMessage) && (
        <p
          id={`${id}-hint`}
          style={{
            marginTop: "var(--sds-size-space-100)",
            fontSize: "var(--sds-font-size-body-sm)",
            color: errorMessage
              ? "var(--sds-color-text-danger-default)"
              : "var(--sds-color-text-default-secondary)",
          }}
        >
          {errorMessage ?? description}
        </p>
      )}
    </div>
  );
}

function SwitchRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--sds-size-space-300)",
        padding: "var(--sds-size-space-300) 0",
        borderBottom: "1px solid var(--sds-color-border-default-subtle)",
      }}
    >
      <div>
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontSize: "var(--sds-font-size-body-md)",
            fontWeight: "var(--sds-font-weight-medium)" as React.CSSProperties["fontWeight"],
            color: "var(--sds-color-text-default-default)",
            cursor: "pointer",
          }}
        >
          {label}
        </label>
        <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
          {description}
        </p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          flexShrink: 0,
          width: "44px",
          height: "24px",
          borderRadius: "var(--sds-size-radius-full)",
          border: "none",
          background: checked
            ? "var(--sds-color-background-brand-default)"
            : "var(--sds-color-background-default-tertiary)",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: checked ? "22px" : "2px",
            width: "20px",
            height: "20px",
            borderRadius: "var(--sds-size-radius-full)",
            background: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}

export function AccountSecuritySection() {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const validate = (pw: string) => {
    if (pw.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pw)) return "Must include at least one uppercase letter.";
    if (!/[0-9]/.test(pw)) return "Must include at least one number.";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate(newPw);
    if (validationError) { setError(validationError); return; }
    if (newPw !== confirm) { setError("Passwords do not match."); return; }
    if (!current) { setError("Please enter your current password."); return; }
    setError("");
    setSaved(true);
    setCurrent(""); setNewPw(""); setConfirm("");
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-400)" }}>
      {/* Change password */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-100)" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "var(--sds-font-size-heading-md)",
            fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
            color: "var(--sds-color-text-default-default)",
          }}
        >
          Change Password
        </h2>
        <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
          Use a strong password with at least 8 characters, one uppercase letter, and one number.
        </p>
      </div>

      {saved && (
        <div
          role="status"
          aria-live="polite"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--sds-size-space-200)",
            padding: "var(--sds-size-space-300)",
            background: "var(--sds-color-background-positive-subtle)",
            border: "1px solid var(--sds-color-border-positive-default)",
            borderRadius: "var(--sds-size-radius-200)",
            color: "var(--sds-color-text-positive-default)",
          }}
        >
          <CheckIcon />
          <div>
            <p style={{ margin: 0, fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"], fontSize: "var(--sds-font-size-body-md)" }}>
              Password updated
            </p>
            <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)" }}>
              Your password has been changed successfully.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          style={{
            padding: "var(--sds-size-space-300)",
            background: "var(--sds-color-background-danger-subtle)",
            border: "1px solid var(--sds-color-border-danger-default)",
            borderRadius: "var(--sds-size-radius-200)",
            color: "var(--sds-color-text-danger-default)",
            fontSize: "var(--sds-font-size-body-sm)",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-300)" }}>
          <PasswordInput
            id="current-password"
            label="Current password"
            value={current}
            onChange={(v) => { setCurrent(v); setSaved(false); }}
          />
          <PasswordInput
            id="new-password"
            label="New password"
            value={newPw}
            onChange={(v) => { setNewPw(v); setSaved(false); }}
            description="At least 8 characters, one uppercase, one number."
          />
          <PasswordInput
            id="confirm-password"
            label="Confirm new password"
            value={confirm}
            onChange={(v) => { setConfirm(v); setSaved(false); }}
          />
          <div>
            <button
              type="submit"
              style={{
                padding: "var(--sds-size-space-200) var(--sds-size-space-400)",
                background: "var(--sds-color-background-brand-default)",
                color: "var(--sds-color-text-on-brand)",
                border: "none",
                borderRadius: "var(--sds-size-radius-100)",
                fontSize: "var(--sds-font-size-body-md)",
                fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
                cursor: "pointer",
              }}
            >
              Update password
            </button>
          </div>
        </div>
      </form>

      {/* Security settings */}
      <div>
        <h3
          style={{
            margin: "0 0 var(--sds-size-space-100)",
            fontSize: "var(--sds-font-size-heading-sm)",
            fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
            color: "var(--sds-color-text-default-default)",
          }}
        >
          Security Settings
        </h3>
        <div>
          <SwitchRow
            id="mfa-toggle"
            label="Two-factor authentication"
            description="Require a verification code in addition to your password."
            checked={mfaEnabled}
            onChange={setMfaEnabled}
          />
          <SwitchRow
            id="login-alerts-toggle"
            label="Login alerts"
            description="Get notified by email when a new device signs in to your account."
            checked={loginAlerts}
            onChange={setLoginAlerts}
          />
        </div>
      </div>
    </div>
  );
}
