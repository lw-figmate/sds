import { useState } from "react";
import { Flex } from "layout";
import {
  RadioField,
  RadioGroup,
  SwitchField,
  SwitchGroup,
  TextHeading,
  TextSmall,
} from "primitives";

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

export function NotificationPreferencesSection() {
  const [prefs, setPrefs] = useState<NotifPref[]>(initialPrefs);
  const [frequency, setFrequency] = useState("immediately");

  const toggle = (id: string) =>
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    );

  return (
    <Flex direction="column" gap="400">
      <Flex direction="column" gap="100">
        <TextHeading elementType="h2">Notification Preferences</TextHeading>
        <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
          Choose which emails to receive. Changes are saved automatically.
        </TextSmall>
      </Flex>

      <SwitchGroup>
        {prefs.map((pref) => (
          <SwitchField
            key={pref.id}
            isSelected={pref.enabled}
            onChange={() => toggle(pref.id)}
            description={pref.description}
          >
            {pref.label}
          </SwitchField>
        ))}
      </SwitchGroup>

      <Flex direction="column" gap="200">
        <TextHeading elementType="h3">Delivery frequency</TextHeading>
        <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
          Control how often we bundle notifications into a single email.
        </TextSmall>
        <RadioGroup
          value={frequency}
          onChange={setFrequency}
          aria-label="Notification delivery frequency"
        >
          <RadioField
            value="immediately"
            label="Immediately"
            description="Send each notification as it happens."
          />
          <RadioField
            value="daily"
            label="Daily digest"
            description="Bundle into one email per day."
          />
          <RadioField
            value="weekly"
            label="Weekly digest"
            description="Bundle into one email per week."
          />
        </RadioGroup>
      </Flex>
    </Flex>
  );
}
