import type { Meta, StoryObj } from "@storybook/react";
import { ProfileSettings } from "../../prototypes/profile-settings/ProfileSettings";

const meta: Meta<typeof ProfileSettings> = {
  component: ProfileSettings,
  title: "SDS Prototypes/Profile Settings",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A full Profile Settings page prototype built with SDS components that have Figma Code Connect integration. Includes tabs for Personal Info, Security, Notifications, and Danger Zone.",
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
