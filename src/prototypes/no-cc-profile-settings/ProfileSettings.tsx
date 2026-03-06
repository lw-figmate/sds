import { useState } from "react";
import { AccountSecuritySection } from "./account-security-section";
import { DangerZoneSection } from "./danger-zone-section";
import { NotificationPreferencesSection } from "./notification-preferences-section";
import { PersonalInfoSection } from "./personal-info-section";

function UserIcon() {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ShieldIcon() {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function BellIcon() {
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
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

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

const TABS = [
  { id: "personal", label: "Personal Info", icon: <UserIcon /> },
  { id: "security", label: "Security", icon: <ShieldIcon /> },
  { id: "notifications", label: "Notifications", icon: <BellIcon /> },
  { id: "danger", label: "Danger Zone", icon: <AlertTriangleIcon /> },
];

export function ProfileSettings() {
  const [selectedTab, setSelectedTab] = useState("personal");

  return (
    <div style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>
      {/* Page header */}
      <div
        style={{
          background: "var(--sds-color-background-default-subtle)",
          padding: "var(--sds-size-space-600)",
          borderBottom: "1px solid var(--sds-color-border-default-subtle)",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h1
            style={{
              margin: "0 0 var(--sds-size-space-100)",
              fontSize: "var(--sds-font-size-heading-lg)",
              fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"],
              color: "var(--sds-color-text-default-default)",
            }}
          >
            Profile Settings
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "var(--sds-font-size-body-sm)",
              color: "var(--sds-color-text-default-secondary)",
            }}
          >
            Manage your account details, security, and notification preferences.
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "var(--sds-size-space-600)",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "var(--sds-size-space-400)",
          }}
        >
          {/* Tab list */}
          <div style={{ overflowX: "auto" }}>
            <div
              role="tablist"
              aria-label="Profile settings"
              style={{
                display: "flex",
                gap: "var(--sds-size-space-100)",
                borderBottom: "2px solid var(--sds-color-border-default-subtle)",
                whiteSpace: "nowrap",
              }}
            >
              {TABS.map((tab) => {
                const isSelected = selectedTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setSelectedTab(tab.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--sds-size-space-100)",
                      padding: "var(--sds-size-space-200) var(--sds-size-space-300)",
                      background: "none",
                      border: "none",
                      borderBottom: isSelected
                        ? "2px solid var(--sds-color-border-brand-default)"
                        : "2px solid transparent",
                      marginBottom: "-2px",
                      color: isSelected
                        ? "var(--sds-color-text-brand-default)"
                        : "var(--sds-color-text-default-secondary)",
                      fontSize: "var(--sds-font-size-body-md)",
                      fontWeight: isSelected
                        ? ("var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"])
                        : ("var(--sds-font-weight-regular)" as React.CSSProperties["fontWeight"]),
                      cursor: "pointer",
                      transition: "color 0.15s, border-color 0.15s",
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab panels */}
          {TABS.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              hidden={selectedTab !== tab.id}
            >
              {tab.id === "personal" && <PersonalInfoSection />}
              {tab.id === "security" && <AccountSecuritySection />}
              {tab.id === "notifications" && <NotificationPreferencesSection />}
              {tab.id === "danger" && <DangerZoneSection />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
