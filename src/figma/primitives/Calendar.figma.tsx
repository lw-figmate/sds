import figma from "@figma/code-connect";
import { Calendar } from "primitives";

figma.connect(Calendar, "<FIGMA_CALENDAR_CALENDAR>", {
  example: () => <Calendar aria-label="Date" />,
});
