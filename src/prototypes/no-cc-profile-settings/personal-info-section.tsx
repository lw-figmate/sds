import { useRef, useState } from "react";

const TIMEZONES = [
  "(UTC-08:00) Pacific Time",
  "(UTC-07:00) Mountain Time",
  "(UTC-06:00) Central Time",
  "(UTC-05:00) Eastern Time",
  "(UTC+00:00) UTC",
  "(UTC+01:00) Central European Time",
  "(UTC+05:30) India Standard Time",
  "(UTC+08:00) China Standard Time",
  "(UTC+09:00) Japan Standard Time",
];

function CameraIcon() {
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
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
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

const descriptionStyle: React.CSSProperties = {
  marginTop: "var(--sds-size-space-100)",
  fontSize: "var(--sds-font-size-body-sm)",
  color: "var(--sds-color-text-default-secondary)",
};

export function PersonalInfoSection() {
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Johnson");
  const [bio, setBio] = useState("");
  const [timezone, setTimezone] = useState(TIMEZONES[3]);
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?w=200&q=80",
  );
  const [photoError, setPhotoError] = useState("");
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError("");
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please upload a valid image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("File must be smaller than 2 MB.");
      return;
    }
    setPhotoUrl(URL.createObjectURL(file));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

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
          Personal Information
        </h2>
        <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
          Update your profile details and photo.
        </p>
      </div>

      {/* Success notification */}
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
              Changes saved
            </p>
            <p style={{ margin: 0, fontSize: "var(--sds-font-size-body-sm)" }}>
              Your personal information has been updated successfully.
            </p>
          </div>
        </div>
      )}

      {/* Photo error notification */}
      {photoError && (
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
          <strong>Upload failed: </strong>{photoError}
        </div>
      )}

      {/* Avatar upload */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--sds-size-space-300)" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={photoUrl}
            alt="Profile photo"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "var(--sds-size-radius-full)",
              objectFit: "cover",
              display: "block",
            }}
          />
          <button
            type="button"
            aria-label="Upload profile photo"
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.45)",
              borderRadius: "var(--sds-size-radius-full)",
              border: "none",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <CameraIcon />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
            aria-hidden="true"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-100)" }}>
          <span style={{ fontSize: "var(--sds-font-size-body-sm)", fontWeight: "var(--sds-font-weight-semibold)" as React.CSSProperties["fontWeight"], color: "var(--sds-color-text-default-default)" }}>
            Alex Johnson
          </span>
          <span style={{ fontSize: "var(--sds-font-size-body-sm)", color: "var(--sds-color-text-default-secondary)" }}>
            JPG or PNG · Max 2 MB
          </span>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sds-size-space-300)" }}>
          {/* First/Last name row */}
          <div style={{ display: "flex", gap: "var(--sds-size-space-300)" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <label htmlFor="firstName" style={labelStyle}>First name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setSaved(false); }}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <label htmlFor="lastName" style={labelStyle}>Last name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setSaved(false); }}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" style={labelStyle}>Bio</label>
            <input
              id="bio"
              type="text"
              value={bio}
              maxLength={160}
              onChange={(e) => { setBio(e.target.value); setSaved(false); }}
              placeholder="Tell us a little about yourself…"
              style={inputStyle}
            />
            <p style={descriptionStyle}>Appears on your public profile. Max 160 characters.</p>
          </div>

          {/* Timezone */}
          <div>
            <label htmlFor="timezone" style={labelStyle}>Timezone</label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => { setTimezone(e.target.value); setSaved(false); }}
              style={{ ...inputStyle, appearance: "auto" }}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

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
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
