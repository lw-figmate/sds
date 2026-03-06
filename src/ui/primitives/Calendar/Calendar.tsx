import clsx from "clsx";
import { IconChevronLeft, IconChevronRight } from "icons";
import { Button } from "primitives";
import {
  Calendar as RACCalendar,
  CalendarCell as RACCalendarCell,
  CalendarGrid as RACCalendarGrid,
  CalendarGridBody as RACCalendarGridBody,
  CalendarGridHeader as RACCalendarGridHeader,
  CalendarHeaderCell as RACCalendarHeaderCell,
  Heading as RACHeading,
  RangeCalendar as RACRangeCalendar,
  type CalendarCellProps as RACCalendarCellProps,
  type CalendarGridBodyProps as RACCalendarGridBodyProps,
  type CalendarGridHeaderProps as RACCalendarGridHeaderProps,
  type CalendarGridProps as RACCalendarGridProps,
  type CalendarHeaderCellProps as RACCalendarHeaderCellProps,
  type CalendarProps as RACCalendarProps,
  type DateValue,
  type RangeCalendarProps as RACRangeCalendarProps,
} from "react-aria-components";
import "./calendar.css";

export type CalendarGridProps = RACCalendarGridProps;
export function CalendarGrid({ className, ...props }: CalendarGridProps) {
  return (
    <RACCalendarGrid
      className={clsx(className, "calendar-grid")}
      {...props}
    />
  );
}

export type CalendarGridHeaderProps = RACCalendarGridHeaderProps;
export function CalendarGridHeader({
  className,
  ...props
}: CalendarGridHeaderProps) {
  return (
    <RACCalendarGridHeader
      className={clsx(className, "calendar-grid-header")}
      {...props}
    />
  );
}

export type CalendarHeaderCellProps = RACCalendarHeaderCellProps;
export function CalendarHeaderCell({
  className,
  ...props
}: CalendarHeaderCellProps) {
  return (
    <RACCalendarHeaderCell
      className={clsx(className, "calendar-header-cell")}
      {...props}
    />
  );
}

export type CalendarGridBodyProps = RACCalendarGridBodyProps;
export function CalendarGridBody({
  className,
  ...props
}: CalendarGridBodyProps) {
  return (
    <RACCalendarGridBody
      className={clsx(className, "calendar-grid-body")}
      {...props}
    />
  );
}

export type CalendarCellProps = RACCalendarCellProps;
export function CalendarCell({ className, ...props }: CalendarCellProps) {
  return (
    <RACCalendarCell
      className={clsx(className, "calendar-cell")}
      {...props}
    />
  );
}

function CalendarNav() {
  return (
    <header className="calendar-header">
      <Button
        slot="previous"
        variant="subtle"
        size="small"
        aria-label="Previous month"
      >
        <IconChevronLeft />
      </Button>
      <RACHeading className="calendar-heading" />
      <Button
        slot="next"
        variant="subtle"
        size="small"
        aria-label="Next month"
      >
        <IconChevronRight />
      </Button>
    </header>
  );
}

function CalendarBody() {
  return (
    <CalendarGrid>
      <CalendarGridHeader>
        {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
      </CalendarGridHeader>
      <CalendarGridBody>
        {(date) => <CalendarCell date={date} />}
      </CalendarGridBody>
    </CalendarGrid>
  );
}

export type CalendarProps<T extends DateValue> = Omit<
  RACCalendarProps<T>,
  "children"
> & {
  className?: string;
};

export function Calendar<T extends DateValue>({
  className,
  ...props
}: CalendarProps<T>) {
  return (
    <RACCalendar className={clsx(className, "calendar")} {...props}>
      <CalendarNav />
      <CalendarBody />
    </RACCalendar>
  );
}

export type RangeCalendarProps<T extends DateValue> = Omit<
  RACRangeCalendarProps<T>,
  "children"
> & {
  className?: string;
};

export function RangeCalendar<T extends DateValue>({
  className,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <RACRangeCalendar className={clsx(className, "calendar")} {...props}>
      <CalendarNav />
      <CalendarBody />
    </RACRangeCalendar>
  );
}
