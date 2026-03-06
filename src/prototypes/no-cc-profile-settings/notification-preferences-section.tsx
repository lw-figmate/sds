import { useState } from "react";

interface NotifPref {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const initialPrefs: NotifPref[] = [
  {
    id: "product-updates",
    label: "Product updates",
    description: "New features, improvements, and release notes.",
    enabled: true,
  },
  {
    id: "account-alerts",
    label: "Account alerts",
    description: "Security events and important account activity.",
    enabled: true,
  },
  {
    id: "weekly-digest",
    label: "Weekly digest",
    description: "A summary of your activity and highlights from the past week.",
    enabled: false,
  },
  {
    id: "marketing",
    label: "Marketing & promotions",
    description: "Offers, surveys, and product announcements from our team.",
    enabled: false,
  },
];

const FREQUENCY_OPTIONS = [
  {
    value: "immediately",
    label: "Immediately",
    description: "Send each notification as it happens.",
  },
  {
    value: "daily",
    label: "Daily digest",
    description: "Bundle into one email per day.",
  },
  {
    value: "weekly",
    label: "Weekly digest",
    description: "Bundle into one email per week.",
  },
];

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
        <p
          style={{
            margin: 0,
            fontSize: "var(--sds-font-size-body-md)",
            fontWeight: "var(--sds-font-weight-medium)" as React.CSSProperties["fontWeight"],
            color: "var(--sds-color-text-default-default)",
          }}
        >
          {label}
        </p>
        <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        id={id}
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
      </button>
    </div>
  );
}

export function NotificationPreferencesSection() {
  const [prefs, setPrefs] = useState<NotifPref[]>(initialPrefs);
  const [frequency, setFrequency] = useState("immediately");

  const toggle = (id: string) =>
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-400)" }}>
      {/* Section header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-100)" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "var(--sds-font-size-heading-md)",
            fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
            color: "var(--sds-color-text-default-default)",
          }}
        >
          Notification Preferences
        </h2>
        <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
          Choose which emails to receive. Changes are saved automatically.
        </p>
      </div>

      {/* Toggle switches */}
      <div>
        {prefs.map((pref) => (
          <SwitchRow
            key={pref.id}
            id={`notif-${pref.id}`}
            label={pref.label}
            description={pref.description}
            checked={pref.enabled}
            onChange={() => toggle(pref.id)}
          />
        ))}
      </div>

      {/* Delivery frequency */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-200)" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "var(--sds-font-size-heading-sm)",
            fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
            color: "var(--sds-color-text-default-default)",
          }}
        >
          Delivery frequency
        </h3>
        <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
          Control how often we bundle notifications into a single email.
        </p>
        <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
          <legend className="sr-only">Notification delivery frequency</legend>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-200)" }}>
            {FREQUENCY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--sds-size-space-200)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="delivery-frequency"
                  value={opt.value}
                  checked={frequency === opt.value}
                  onChange={() => setFrequency(opt.value)}
                  style={{ marginTop: "2px", flexShrink: 0 }}
                />
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "var(--sds-font-size-body-md)",
                      fontWeight: "var(--sds-font-weight-medium)" as React.CSSProperties["fontWeight"],
                      color: "var(--sds-color-text-default-default)",
                    }}
                  >
                    {opt.label}
                  </span>
                  <span style={{ display: "block", fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
                    {opt.description}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
