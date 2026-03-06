# Figma Make Guidelines

## Strict Rule: Use @laurelma/sds Only

All generated code **must** use components, design tokens, and utilities exclusively from the `@laurelma/sds` package. Do not introduce any other UI libraries, component kits, design systems, or custom styling solutions.

---

## Package Installation

```bash
npm install @laurelma/sds
```

Also import the required stylesheet in your entry point:

```ts
import "@laurelma/sds/dist/lib/sds.css";
```

---

## Component Imports

Import all components directly from `@laurelma/sds`:

```tsx
import {
  // Layout
  Flex,
  Section,
  Grid,

  // Primitives
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Checkbox,
  Dialog,
  Fieldset,
  Icon,
  IconButton,
  Image,
  Input,
  Link,
  ListBox,
  Logo,
  Menu,
  Navigation,
  NavigationPill,
  NavigationButton,
  Notification,
  Pagination,
  Radio,
  Search,
  Select,
  Slider,
  Switch,
  Tab,
  Table,
  Tag,
  Text,
  TextHeading,
  TextSmall,
  TextContentHeading,
  TextContentTitle,
  Textarea,
  Tooltip,

  // Compositions
  Card,
  Footer,
  Header,

  // Data hooks & providers
  useAuth,
  usePricing,
  useProducts,
  AuthProvider,
  PricingProvider,
  ProductsProvider,
  AllProviders,

  // UI hooks
  useMediaQuery,
} from "@laurelma/sds";
```

---

## Absolute Prohibitions

- **No** hardcoded colors, spacing values, font sizes, border radii, or shadows — use CSS variables only.
- **No** custom CSS layout with `display: flex`, `display: grid`, `margin`, or `padding` inline styles — use `<Flex>` and `<Section>` layout components.
- **No** importing from `@react-aria`, `@react-stately`, `react-aria-components`, or any other component library.
- **No** Tailwind CSS, Bootstrap, Material UI, Chakra UI, Radix UI, shadcn/ui, or any third-party component or utility library.
- **No** custom SVG icons — use the icon components exported from `@laurelma/sds`.
- **No** custom font or color definitions — all typography and color must come from `@laurelma/sds` CSS variables.

---

## Design Tokens (CSS Variables)

All design tokens are exposed as CSS custom properties by importing `sds.css`. Always reference them via `var(--sds-*)`:

| Category     | Variable pattern                          | Example                                     |
|--------------|-------------------------------------------|---------------------------------------------|
| Colors       | `--sds-color-*`                           | `var(--sds-color-text-default-default)`      |
| Spacing      | `--sds-size-space-*`                      | `var(--sds-size-space-400)`                  |
| Border radius| `--sds-size-radius-*`                     | `var(--sds-size-radius-200)`                 |
| Typography   | `--sds-typography-*` / `--sds-font-*`     | `var(--sds-typography-body-size)`            |
| Shadows      | `--sds-effects-shadows-*`                 | `var(--sds-effects-shadows-overlay)`         |

### Example

```css
.my-element {
  background: var(--sds-color-background-default-default);
  color: var(--sds-color-text-default-default);
  padding: var(--sds-size-space-400);
  border-radius: var(--sds-size-radius-200);
}
```

---

## Layout Guidelines

Use `<Flex>` and `<Section>` for all layout. Never write custom CSS for positioning.

```tsx
// Responsive section with a three-column flex layout
<Section padding="800">
  <Flex direction="row" gap="400" type="third">
    <Card />
    <Card />
    <Card />
  </Flex>
</Section>
```

Responsive behavior should use the `useMediaQuery` hook from `@laurelma/sds`:

```tsx
const { isMobile } = useMediaQuery();

<Section padding={isMobile ? "600" : "1600"}>
  <Flex direction={isMobile ? "column" : "row"} gap="400">
    ...
  </Flex>
</Section>
```

---

## Summary

| Allowed                              | Not Allowed                              |
|--------------------------------------|------------------------------------------|
| `@laurelma/sds` components           | Any other component library              |
| `var(--sds-*)` CSS variables         | Hardcoded colors, spacing, or typography |
| `<Flex>`, `<Section>`, `<Grid>`      | Custom CSS layout                        |
| Icons from `@laurelma/sds`           | Custom SVGs or third-party icon packs    |
| `useMediaQuery` from `@laurelma/sds` | CSS media queries in custom styles       |
