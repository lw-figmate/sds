import { useRef, useState } from "react";
import { IconCamera, IconCheck } from "icons";
import { Flex } from "layout";
import {
  Avatar,
  Button,
  ButtonGroup,
  InputField,
  Notification,
  SelectField,
  SelectItem,
  Text,
  TextHeading,
  TextSmall,
  TextStrong,
} from "primitives";

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
    <Flex direction="column" gap="400">
      <Flex direction="column" gap="100">
        <TextHeading elementType="h2">Personal Information</TextHeading>
        <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
          Update your profile details and photo.
        </TextSmall>
      </Flex>

      {saved && (
        <Notification variant="message" isDismissible>
          <Flex alignSecondary="center" gap="100">
            <IconCheck size="16" />
            <TextStrong>Changes saved</TextStrong>
          </Flex>
          <Text>Your personal information has been updated successfully.</Text>
        </Notification>
      )}

      {photoError && (
        <Notification variant="alert">
          <TextStrong>Upload failed</TextStrong>
          <Text>{photoError}</Text>
        </Notification>
      )}

      {/* Avatar upload */}
      <Flex direction="row" alignSecondary="center" gap="300">
        <div style={{ position: "relative", flexShrink: 0 }}>
          <Avatar src={photoUrl} initials="AJ" alt="Profile photo" size="large" />
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
            <IconCamera size="16" />
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
        <Flex direction="column" gap="100">
          <TextSmall>
            <TextStrong>Alex Johnson</TextStrong>
          </TextSmall>
          <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
            JPG or PNG · Max 2 MB
          </TextSmall>
        </Flex>
      </Flex>

      <form onSubmit={handleSave}>
        <Flex direction="column" gap="300">
          <Flex direction="row" gap="300">
            <div style={{ flex: 1, minWidth: 0 }}>
              <InputField
                label="First name"
                value={firstName}
                onChange={(v) => { setFirstName(v); setSaved(false); }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <InputField
                label="Last name"
                value={lastName}
                onChange={(v) => { setLastName(v); setSaved(false); }}
              />
            </div>
          </Flex>

          <InputField
            label="Bio"
            value={bio}
            onChange={(v) => { setBio(v); setSaved(false); }}
            placeholder="Tell us a little about yourself…"
            description="Appears on your public profile. Max 160 characters."
          />

          <SelectField
            label="Timezone"
            selectedKey={timezone}
            onSelectionChange={(key) => {
              setTimezone(key as string);
              setSaved(false);
            }}
          >
            {TIMEZONES.map((tz) => (
              <SelectItem key={tz} id={tz}>{tz}</SelectItem>
            ))}
          </SelectField>

          <ButtonGroup align="start">
            <Button type="submit" variant="primary">Save changes</Button>
          </ButtonGroup>
        </Flex>
      </form>
    </Flex>
  );
}
