import { useState } from "react";
import {
  IconAlertTriangle,
  IconBell,
  IconShield,
  IconUser,
} from "icons";
import { Flex, Section } from "layout";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextSmall,
  TextTitlePage,
} from "primitives";
import { useMediaQuery } from "hooks";
import { AccountSecuritySection } from "./account-security-section";
import { DangerZoneSection } from "./danger-zone-section";
import { NotificationPreferencesSection } from "./notification-preferences-section";
import { PersonalInfoSection } from "./personal-info-section";

export function ProfileSettings() {
  const [selectedTab, setSelectedTab] = useState("personal");
  const { isMobile } = useMediaQuery();

  return (
    <div style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>
      <Section padding="600" variant="subtle">
        <Flex direction="column" gap="100" container>
          <TextTitlePage>Profile Settings</TextTitlePage>
          <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
            Manage your account details, security, and notification preferences.
          </TextSmall>
        </Flex>
      </Section>

      <Section padding="600">
        <Flex container direction="column" gap="400">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
          >
            <div style={{ overflowX: "auto" }}>
              <TabList aria-label="Profile settings">
                <Tab id="personal">
                  <Flex alignSecondary="center" gap="100">
                    <IconUser size="16" />
                    {!isMobile && <span>Personal Info</span>}
                  </Flex>
                </Tab>
                <Tab id="security">
                  <Flex alignSecondary="center" gap="100">
                    <IconShield size="16" />
                    {!isMobile && <span>Security</span>}
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
