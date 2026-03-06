import { useState } from "react";
import { IconCheck, IconEye, IconEyeOff, IconShield } from "icons";
import { Flex } from "layout";
import {
  Button,
  ButtonGroup,
  IconButton,
  InputField,
  Notification,
  SwitchField,
  SwitchGroup,
  Text,
  TextHeading,
  TextSmall,
  TextStrong,
} from "primitives";

function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  description,
  errorMessage,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
}) {
  const [show, setShow] = useState(false);
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
          onPress={() => setShow((s) => !s)}
        >
          {show ? <IconEyeOff size="16" /> : <IconEye size="16" />}
        </IconButton>
      </div>
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
    <Flex direction="column" gap="400">
      {/* Password section */}
      <Flex direction="column" gap="100">
        <TextHeading elementType="h2">Change Password</TextHeading>
        <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
          Use a strong password with at least 8 characters, one uppercase letter,
          and one number.
        </TextSmall>
      </Flex>

      {saved && (
        <Notification variant="message" isDismissible>
          <Flex alignSecondary="center" gap="100">
            <IconCheck size="16" />
            <TextStrong>Password updated</TextStrong>
          </Flex>
          <Text>Your password has been changed successfully.</Text>
        </Notification>
      )}

      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="300">
          <PasswordInput
            label="Current password"
            value={current}
            onChange={(v) => { setCurrent(v); setError(""); }}
          />
          <Flex direction="row" gap="300">
            <div style={{ flex: 1, minWidth: 0 }}>
              <PasswordInput
                label="New password"
                value={newPw}
                onChange={(v) => { setNewPw(v); setError(""); }}
                errorMessage={error || undefined}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <PasswordInput
                label="Confirm new password"
                value={confirm}
                onChange={(v) => { setConfirm(v); setError(""); }}
              />
            </div>
          </Flex>

          <ButtonGroup align="start">
            <Button type="submit" variant="primary">Update password</Button>
          </ButtonGroup>
        </Flex>
      </form>

      {/* 2FA & login alerts */}
      <Flex direction="column" gap="100">
        <Flex alignSecondary="center" gap="200">
          <IconShield size="16" />
          <TextHeading elementType="h2">Security Settings</TextHeading>
        </Flex>
        <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
          Add extra protection to your account.
        </TextSmall>
      </Flex>

      <SwitchGroup>
        <SwitchField
          isSelected={mfaEnabled}
          onChange={setMfaEnabled}
          description="Use an authenticator app or SMS to verify logins."
        >
          Two-factor authentication
        </SwitchField>
        <SwitchField
          isSelected={loginAlerts}
          onChange={setLoginAlerts}
          description="Receive an email when a new device signs in to your account."
        >
          Login alerts
        </SwitchField>
      </SwitchGroup>
    </Flex>
  );
}
