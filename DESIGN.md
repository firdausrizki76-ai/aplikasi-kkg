---
name: Teacher Working Group Design System
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fc'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1eb'
  on-surface: '#1a1b22'
  on-surface-variant: '#444653'
  inverse-surface: '#2f3037'
  inverse-on-surface: '#f1f0fa'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#611e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#872d00'
  on-tertiary-container: '#ffa583'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#802a00'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1eb'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

## Brand & Style

The design system is anchored in the concepts of **Academic Authority** and **Digital Efficiency**. It is designed for the Teacher Working Group (KKG) context, where clarity and speed of use are paramount. The visual language balances the traditional reliability of educational institutions with the frictionless experience of modern SaaS applications.

The chosen style is **Corporate / Modern Minimalism**. It utilizes a "content-first" approach, where the interface recedes to highlight data and actionable tasks. The aesthetic is defined by large areas of white space, a disciplined blue-scale palette, and precise, soft-edged geometry. This ensures the application feels like a professional tool rather than a social platform, fostering a sense of trust and organization.

## Colors

The palette is intentionally restrained to maintain a professional atmosphere.
- **Primary Blue (#1E40AF):** Used for navigation, primary actions, and brand identification. It conveys stability and institutional trust.
- **Secondary White (#FFFFFF):** Serves as the primary canvas color to maximize legibility and provide a "clean" feel.
- **Accent Sky Blue (#DBEAFE):** A low-saturation tint used for soft highlights, active states in lists, and background fills for secondary buttons.
- **Neutrals:** A cool-grey scale is used for typography and subtle borders to maintain harmony with the blue primary color.

Color should be used functionally: blue for progress/action, and grey for metadata/structural elements.

## Typography

This design system utilizes **Inter** for all roles to leverage its exceptional legibility and systematic feel. The type hierarchy is designed to guide the teacher’s eye through dense attendance lists and schedules.

- **Headlines:** Use a tighter letter-spacing and heavier weights to create clear section anchoring.
- **Body Text:** Standard weight (400) with generous line-height to ensure reading comfort during long administrative sessions.
- **Labels:** Used for metadata (e.g., "Status," "Time," "Location"). Small labels use a semi-bold weight and occasionally all-caps for distinct visual separation from body text.

## Layout & Spacing

The layout follows a **8px grid system**, ensuring all elements scale proportionally. 

- **Desktop:** Uses a fixed-width central container (1200px) for administrative dashboards to prevent eye strain from long horizontal lines. A 12-column grid is standard.
- **Mobile:** Shifts to a fluid single-column layout with 16px horizontal margins.
- **Rhythm:** Vertical spacing between cards and list items should be generous (stack-lg) to emphasize the "clean" aesthetic and avoid a cluttered, overwhelming feel.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layering** to create a sense of hierarchy without heavy gradients.

1.  **Level 0 (Base):** The main background uses Neutral 50.
2.  **Level 1 (Cards/Surface):** White surfaces with a subtle border (1px, Neutral 100) and a soft, diffused shadow: `0px 4px 12px rgba(30, 64, 175, 0.05)`. This slight blue tint in the shadow keeps the elevation harmonious with the brand.
3.  **Level 2 (Interaction):** Hover states for cards increase the shadow spread and opacity slightly, signaling interactability.
4.  **Level 3 (Overlays):** Modals and dropdowns use a more pronounced shadow to separate them from the work surface.

## Shapes

The shape language is defined by **Friendly Geometry**. Elements use a consistent radius to feel approachable yet structured.

- **Small Components:** Checkboxes and small tags use a 4-6px radius.
- **Standard Components:** Buttons, input fields, and small cards use an 8px radius (Level 2).
- **Large Containers:** Dashboard widgets and modal windows use a 12px radius to soften the professional tone.

## Components

- **Buttons:** Primary buttons are solid Navy Blue (#1E40AF) with white text. Secondary buttons use the Accent Sky Blue (#DBEAFE) fill with Primary Blue text. All buttons have an 8px corner radius.
- **Input Fields:** Use a white background with a 1px Neutral 200 border. On focus, the border transitions to Primary Blue with a subtle 2px outer glow of the Accent color.
- **Attendance Chips:** Status indicators (Present, Absent, Late) use rounded pills with light background fills and high-contrast text (e.g., Light Green fill with Dark Green text).
- **Attendance Lists:** Rows should have high vertical padding (16px) and a subtle bottom border. Highlighting a row on hover using Neutral 50 is recommended for tracking.
- **Cards:** Used for meeting summaries or group stats. Cards should have a white fill, 12px corner radius, and the standard Level 1 shadow.
- **Calendar Picker:** A custom-styled component using the primary Navy Blue for selected dates, ensuring teachers can quickly navigate meeting schedules.