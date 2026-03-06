import { useRef, useState } from "react";
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconBell,
  IconCamera,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconShield,
  IconUser,
} from "icons";
import { Flex, Section } from "layout";
import {
  Avatar,
  Button,
  ButtonDanger,
  ButtonGroup,
  Dialog,
  DialogBody,
  DialogDescription,
  DialogModal,
  DialogTitle,
  DialogTrigger,
  IconButton,
  InputField,
  SwitchField,
  SwitchGroup,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextHeading,
  TextSmall,
  TextStrong,
  TextTitlePage,
} from "primitives";
import { FormBox } from "compositions";
import { useMediaQuery } from "hooks";

// ─── Personal Info ────────────────────────────────────────────────────────────

function PersonalInfoSection() {
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Johnson");
  const [displayName, setDisplayName] = useState("alexjohnson");
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?w=200&q=80",
  );
  const [saved, setSaved] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isMobile, isTablet } = useMediaQuery();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError("");
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setPhotoError("Only JPG and PNG files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("File must be smaller than 2MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Flex direction="column" gap="300">
      <TextHeading elementType="h2">Personal Information</TextHeading>
      <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
        Update your personal details and profile photo.
      </TextSmall>

      <Flex
        direction={isMobile ? "column" : "row"}
        alignSecondary="center"
        gap="300"
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            type="button"
            aria-label="Upload profile photo"
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: "block",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              borderRadius: "var(--sds-size-radius-full)",
              position: "relative",
            }}
          >
            <Avatar
              src={photoUrl}
              initials="AJ"
              alt="Profile photo"
              size="large"
            />
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "var(--sds-size-radius-full)",
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-hidden="true"
            >
              <IconCamera size="16" />
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
            aria-hidden="true"
          />
        </div>

        <Flex
          direction="column"
          gap="100"
          alignSecondary={isMobile ? "center" : "start"}
        >
          <TextSmall>Click avatar to upload a new photo</TextSmall>
          <TextSmall
            style={{ color: "var(--sds-color-text-default-secondary)" }}
          >
            JPG or PNG. Max 2MB.
          </TextSmall>
          {photoError && (
            <TextSmall
              style={{ color: "var(--sds-color-text-danger-default)" }}
            >
              {photoError}
            </TextSmall>
          )}
        </Flex>
      </Flex>

      <FormBox
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <Flex direction="column" gap="300">
          <Flex
            direction={isMobile || isTablet ? "column" : "row"}
            gap="300"
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <InputField
                label="First name"
                value={firstName}
                onChange={(v) => {
                  setFirstName(v);
                  setSaved(false);
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <InputField
                label="Last name"
                value={lastName}
                onChange={(v) => {
                  setLastName(v);
                  setSaved(false);
                }}
              />
            </div>
          </Flex>

          <InputField
            label="Display name"
            value={displayName}
            onChange={(v) => {
              setDisplayName(v);
              setSaved(false);
            }}
          />

          <ButtonGroup align="start">
            <Button type="submit">Save changes</Button>
            {saved && (
              <Flex alignSecondary="center" gap="100">
                <IconCheck size="16" />
                <TextSmall
                  style={{ color: "var(--sds-color-text-positive-default)" }}
                >
                  Saved
                </TextSmall>
              </Flex>
            )}
          </ButtonGroup>
        </Flex>
      </FormBox>
    </Flex>
  );
}

// ─── Account & Security ───────────────────────────────────────────────────────

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  description,
  errorMessage,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
}) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <InputField
        label={label}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        description={description}
        errorMessage={errorMessage}
      />
      <div
        style={{
          position: "absolute",
          right: "var(--sds-size-space-200)",
          top: "24px",
          height: "40px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          variant="subtle"
          aria-label={show ? "Hide password" : "Show password"}
          onPress={onToggle}
        >
          {show ? <IconEyeOff size="16" /> : <IconEye size="16" />}
        </IconButton>
      </div>
    </div>
  );
}

function AccountSecuritySection() {
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [emailPassword, setEmailPassword] = useState("");
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { isMobile } = useMediaQuery();

  const validatePassword = (pw: string) => {
    if (pw.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pw)) return "Must contain at least 1 uppercase letter.";
    if (!/[0-9]/.test(pw)) return "Must contain at least 1 number.";
    return "";
  };

  const handleEmailSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailPassword) {
      setEmailError("Please enter your current password to update email.");
      return;
    }
    setEmailError("");
    setEmailSaved(true);
    setEmailPassword("");
    setTimeout(() => setEmailSaved(false), 3000);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePassword(newPassword);
    if (err) {
      setPasswordError(err);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <Flex direction="column" gap="400">
      <Flex direction="column" gap="300">
        <TextHeading elementType="h2">Email Address</TextHeading>
        <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
          Update the email address associated with your account.
        </TextSmall>
        <FormBox onSubmit={handleEmailSave}>
          <Flex direction="column" gap="300">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(v) => {
                setEmail(v);
                setEmailSaved(false);
              }}
            />
            <PasswordField
              label="Current password"
              value={emailPassword}
              onChange={(v) => {
                setEmailPassword(v);
                setEmailError("");
              }}
              show={showEmailPassword}
              onToggle={() => setShowEmailPassword((s) => !s)}
              placeholder="Enter your current password"
              errorMessage={emailError}
            />
            <ButtonGroup align="start">
              <Button type="submit">Update email</Button>
              {emailSaved && (
                <Flex alignSecondary="center" gap="100">
                  <IconCheck size="16" />
                  <TextSmall
                    style={{
                      color: "var(--sds-color-text-positive-default)",
                    }}
                  >
                    Email updated
                  </TextSmall>
                </Flex>
              )}
            </ButtonGroup>
          </Flex>
        </FormBox>
      </Flex>

      <Flex direction="column" gap="300">
        <TextHeading elementType="h2">Change Password</TextHeading>
        <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
          Choose a strong password with at least 8 characters, 1 uppercase
          letter, and 1 number.
        </TextSmall>
        <FormBox onSubmit={handlePasswordSave}>
          <Flex direction="column" gap="300">
            <PasswordField
              label="Current password"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrent}
              onToggle={() => setShowCurrent((s) => !s)}
            />
            <Flex direction={isMobile ? "column" : "row"} gap="300">
              <div style={{ flex: 1, minWidth: 0 }}>
                <PasswordField
                  label="New password"
                  value={newPassword}
                  onChange={(v) => {
                    setNewPassword(v);
                    setPasswordError("");
                  }}
                  show={showNew}
                  onToggle={() => setShowNew((s) => !s)}
                  errorMessage={passwordError || undefined}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <PasswordField
                  label="Confirm new password"
                  value={confirmPassword}
                  onChange={(v) => {
                    setConfirmPassword(v);
                    setPasswordError("");
                  }}
                  show={showConfirm}
                  onToggle={() => setShowConfirm((s) => !s)}
                />
              </div>
            </Flex>
            {passwordError && (
              <Flex alignSecondary="center" gap="100">
                <IconAlertCircle size="16" />
                <TextSmall
                  style={{ color: "var(--sds-color-text-danger-default)" }}
                >
                  {passwordError}
                </TextSmall>
              </Flex>
            )}
            <ButtonGroup align="start">
              <Button type="submit">Update password</Button>
              {passwordSaved && (
                <Flex alignSecondary="center" gap="100">
                  <IconCheck size="16" />
                  <TextSmall
                    style={{
                      color: "var(--sds-color-text-positive-default)",
                    }}
                  >
                    Password updated
                  </TextSmall>
                </Flex>
              )}
            </ButtonGroup>
          </Flex>
        </FormBox>
      </Flex>
    </Flex>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────

interface NotificationPref {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const defaultPrefs: NotificationPref[] = [
  {
    id: "product-updates",
    label: "Product updates",
    description: "Receive emails about new features, improvements, and tips.",
    enabled: true,
  },
  {
    id: "account-alerts",
    label: "Account alerts",
    description:
      "Get notified about security events and important account changes.",
    enabled: true,
  },
  {
    id: "marketing-emails",
    label: "Marketing emails",
    description:
      "Occasional promotions, surveys, and partnership announcements.",
    enabled: false,
  },
];

function NotificationPreferencesSection() {
  const [prefs, setPrefs] = useState<NotificationPref[]>(defaultPrefs);

  const handleToggle = (id: string) => {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    );
  };

  return (
    <Flex direction="column" gap="300">
      <TextHeading elementType="h2">Notification Preferences</TextHeading>
      <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
        Choose which emails you'd like to receive. Changes save automatically.
      </TextSmall>
      <SwitchGroup>
        {prefs.map((pref) => (
          <SwitchField
            key={pref.id}
            isSelected={pref.enabled}
            onChange={() => handleToggle(pref.id)}
            description={pref.description}
          >
            {pref.label}
          </SwitchField>
        ))}
      </SwitchGroup>
    </Flex>
  );
}

// ─── Danger Zone ──────────────────────────────────────────────────────────────

const CONFIRM_TEXT = "DELETE MY ACCOUNT";

function DangerZoneSection() {
  const [confirmInput, setConfirmInput] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isConfirmed = confirmInput === CONFIRM_TEXT;

  const handleDelete = () => {
    if (!isConfirmed) return;
    setDeleted(true);
    setConfirmInput("");
    setIsOpen(false);
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
        <Flex direction="column" gap="300" alignSecondary="center">
          <TextSmall style={{ textAlign: "center" }}>
            Your account has been scheduled for deletion. You have a{" "}
            <TextStrong>30-day grace period</TextStrong> before all data is
            permanently removed.
          </TextSmall>
          <Button variant="neutral" onPress={() => setDeleted(false)}>
            Cancel deletion
          </Button>
        </Flex>
      </div>
    );
  }

  return (
    <Flex direction="column" gap="300">
      <Flex alignSecondary="center" gap="200">
        <IconAlertTriangle size="16" />
        <TextHeading
          elementType="h2"
          style={{ color: "var(--sds-color-text-danger-default)" }}
        >
          Danger Zone
        </TextHeading>
      </Flex>
      <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
        Permanently delete your account and all associated data. This action
        cannot be undone after the 30-day grace period.
      </TextSmall>

      <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <ButtonDanger>Delete my account</ButtonDanger>
        <DialogModal isDismissable>
          <Dialog>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete your account after a 30-day grace
              period. All your data, settings, and preferences will be removed.
            </DialogDescription>
            <DialogBody>
              <Flex direction="column" gap="300">
                <TextSmall>
                  To confirm, type{" "}
                  <TextStrong elementType="span">{CONFIRM_TEXT}</TextStrong>{" "}
                  below:
                </TextSmall>
                <InputField
                  label="Confirmation"
                  value={confirmInput}
                  onChange={setConfirmInput}
                  placeholder={CONFIRM_TEXT}
                />
                <ButtonGroup align="end">
                  <Button
                    variant="neutral"
                    onPress={() => {
                      setIsOpen(false);
                      setConfirmInput("");
                    }}
                  >
                    Cancel
                  </Button>
                  <ButtonDanger
                    isDisabled={!isConfirmed}
                    onPress={handleDelete}
                  >
                    Delete my account
                  </ButtonDanger>
                </ButtonGroup>
              </Flex>
            </DialogBody>
          </Dialog>
        </DialogModal>
      </DialogTrigger>
    </Flex>
  );
}

// ─── ProfileSettings ──────────────────────────────────────────────────────────

export function ProfileSettings() {
  const [selectedTab, setSelectedTab] = useState<string>("personal");
  const { isMobile } = useMediaQuery();

  return (
    <div style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>
      <Section padding="600">
        <Flex direction="column" gap="100" container>
          <TextTitlePage>Profile Settings</TextTitlePage>
          <TextSmall
            style={{ color: "var(--sds-color-text-default-secondary)" }}
          >
            Manage your account details, security, and preferences.
          </TextSmall>
        </Flex>
      </Section>

      <Section padding="600">
        <Flex container direction="column" gap="400">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            style={{ width: "100%" }}
          >
            <div style={{ width: "100%", overflowX: "auto" }}>
              <TabList style={{ width: "100%" }}>
                <Tab id="personal">
                  <Flex alignSecondary="center" gap="100">
                    <IconUser size="16" />
                    {!isMobile && <span>Personal Info</span>}
                  </Flex>
                </Tab>
                <Tab id="security">
                  <Flex alignSecondary="center" gap="100">
                    <IconShield size="16" />
                    {!isMobile && <span>Account &amp; Security</span>}
                  </Flex>
                </Tab>
                <Tab id="notifications">
                  <Flex alignSecondary="center" gap="100">
                    <IconBell size="16" />
                    {!isMobile && <span>Notifications</span>}
                  </Flex>
                </Tab>
                <Tab id="danger">
                  <Flex alignSecondary="center" gap="100">
                    <IconAlertTriangle size="16" />
                    {!isMobile && <span>Danger Zone</span>}
                  </Flex>
                </Tab>
              </TabList>
            </div>

            <TabPanel id="personal">
              <PersonalInfoSection />
            </TabPanel>
            <TabPanel id="security">
              <AccountSecuritySection />
            </TabPanel>
            <TabPanel id="notifications">
              <NotificationPreferencesSection />
            </TabPanel>
            <TabPanel id="danger">
              <DangerZoneSection />
            </TabPanel>
          </Tabs>
        </Flex>
      </Section>
    </div>
  );
}
