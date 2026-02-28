
# Color Palette Enforcement Plan

I have strictly enforced the following 4-color palette across the entire application:

1.  `#8c8c4f` (Olive) - Used as the primary background and light/white replacement.
2.  `#21492f` (Dark Green) - Used as the primary text, dark element background, and black replacement.
3.  `#22aa4f` (Bright Green) - Used for primary actions, buttons, and highlights.
4.  `#a6763f` (Brown) - Used for secondary accents, destructive actions, and warnings.

## Changes Implemented

### 1. Global CSS (`src/app/globals.css`)
- Updated all CSS variables (`--background`, `--foreground`, `--primary`, etc.) in `:root` and `.dark` to use only these 4 colors.
- Mapped standard UI concepts (card, popover, muted) to this palette.

### 2. Tailwind Configuration (`tailwind.config.js`)
- Created a strict configuration that overrides **all** default Tailwind colors.
- Mapped standard color names (`red`, `blue`, `gray`, `white`, `black`, etc.) to the 4-color palette.
    - `white` -> `#8c8c4f`
    - `black` -> `#21492f`
    - `gray-*`, `slate-*`, etc. -> `#8c8c4f` (light shades) or `#21492f` (dark shades).
    - `red-*`, `yellow-*`, `orange-*` -> `#a6763f`.
    - `blue-*`, `indigo-*` -> `#21492f`.
    - `green-*`, `emerald-*`, `teal-*` -> `#22aa4f` (mid) or `#21492f` (dark).

### 3. Component Updates
Manually replaced hardcoded hex values in the following critical files:
- `src/component/productcard.css`: Replaced all hex codes.
- `src/app/page.js`: Updated category background colors and hardcoded styles.
- `src/component/Header.js`: Updated background, text, and border colors.
- `src/component/Navbar.js`: Updated branding colors, borders, and backgrounds.
- `src/component/Footer.js`: specific social icon hover states and text colors.
- `src/app/login/page.js` & `src/app/signup/page.js`: Updated form styles, shadows, and text colors.
- `src/component/Organic.js` & `src/component/Card.js`: Updated hardcoded props.

This ensures that even if utility classes were used (e.g., `bg-red-500`), they will now render as one of the approved colors (likely Brown `#a6763f`). The strict enforcement is handled at both the configuration and source code levels.
