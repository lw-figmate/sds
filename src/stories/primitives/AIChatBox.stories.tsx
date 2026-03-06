import type { Meta, StoryObj } from "@storybook/react";
import { AIChatBox } from "primitives";

const meta: Meta<typeof AIChatBox> = {
  component: AIChatBox,
  title: "SDS Primitives/AI Chat Box",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof AIChatBox>;

export const StoryAIChatBox: Story = {
  name: "AI Chat Box",
  args: {
    placeholder: "What would you like to know?",
    isDisabled: false,
  },
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
    isDisabled: {
      control: { type: "boolean" },
    },
  },
  render: (args) => (
    <div style={{ width: 560 }}>
      <AIChatBox {...args} />
    </div>
  ),
};
