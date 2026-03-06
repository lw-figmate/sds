import type { Meta, StoryObj } from "@storybook/react";
import { ProfileSettings } from "../../prototypes/no-cc-profile-settings/ProfileSettings";

const meta: Meta<typeof ProfileSettings> = {
  component: ProfileSettings,
  title: "SDS Prototypes/No-CC Profile Settings",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A full Profile Settings page prototype built with native HTML elements and CSS variables only — no Code Connect components. Includes tabs for Personal Info, Security, Notifications, and Danger Zone.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProfileSettings>;

export const StoryProfileSettings: Story = {
  name: "Profile Settings",
};

export const StoryPersonalInfo: Story = {
  name: "Personal Info tab",
  render: () => <ProfileSettings />,
};

export const StoryMobile: Story = {
  name: "Mobile viewport",
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => <ProfileSettings />,
};
