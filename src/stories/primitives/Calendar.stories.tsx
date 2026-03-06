import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, RangeCalendar } from "primitives";

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: "SDS Primitives/Calendar",
  parameters: { layout: "centered" },
};
export default meta;

export const StoryCalendar: StoryObj<typeof Calendar> = {
  name: "Calendar",
  render: () => <Calendar aria-label="Date" />,
};

export const StoryRangeCalendar: StoryObj<typeof RangeCalendar> = {
  name: "Range Calendar",
  render: () => <RangeCalendar aria-label="Date range" />,
};
