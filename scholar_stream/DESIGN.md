# Design System Strategy: The Digital Atelier

## 1. Overview & Creative North Star
The North Star for this design system is **"The Digital Atelier."** 

Standard educational platforms often feel like rigid digital filing cabinets—stiff, boxed-in, and overwhelming. This system rejects that "template" aesthetic in favor of a high-end, editorial experience. We treat student resources not as mere files, but as curated knowledge.

The design breaks the traditional grid through **intentional asymmetry and tonal depth**. By utilizing "The Layering Principle," we replace restrictive lines with expansive breathing room and sophisticated surface transitions. The goal is a mobile-first environment that feels like a premium workspace: professional, trustworthy, and distraction-free.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a professional "Calm Blue" (`primary`), but its execution moves beyond flat UI.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. 
Structure must be defined through:
1.  **Background Color Shifts:** Placing a `surface-container-low` card on a `surface` background.
2.  **Tonal Transitions:** Using depth rather than lines to dictate where one concept ends and another begins.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum. 
- **Base Layer:** `surface` (#f7f9fb)
- **Content Zones:** Use `surface-container-low` to group related items.
- **Interactive Elements:** Use `surface-container-lowest` (Pure White) for the highest visual "pop" and focus.
- **Nesting:** An inner search bar within a header should transition from `surface-container` to `surface-container-highest` to create an "inset" feel without a stroke.

### The "Glass & Gradient" Rule
To escape the "out-of-the-box" feel:
- **Glassmorphism:** For mobile navigation bars and floating action buttons, use `surface` with 80% opacity and a `20px` backdrop-blur. This allows the educational content to bleed through softly.
- **Signature Textures:** Hero sections and primary CTAs must use a subtle linear gradient (from `primary` #004ac6 to `primary-container` #2563eb) at a 135-degree angle. This adds "soul" and prevents the interface from feeling static.

---

## 3. Typography
We utilize a high-contrast scale to create an editorial rhythm.

- **Display & Headlines (Plus Jakarta Sans):** Chosen for its modern, geometric clarity. 
    - *Usage:* `display-lg` and `headline-lg` should be used with tight letter-spacing (-0.02em) to create an authoritative, "magazine-cover" feel for course titles.
- **Body & Labels (Inter):** The workhorse of the system. 
    - *Usage:* `body-lg` is the standard for student reading. We prioritize legibility by maintaining a 1.6 line-height, ensuring the "distraction-free" promise is met.
- **Hierarchical Contrast:** Pair a `headline-sm` title with a `label-md` uppercase subtitle (using `on-surface-variant`) to create a sophisticated, curated information architecture.

---

## 4. Elevation & Depth
We achieve hierarchy through **Tonal Layering** rather than traditional drop shadows.

### The Layering Principle
Depth is a result of stacking. A "PDF Download Card" should not use a heavy shadow; instead, it sits as `surface-container-lowest` atop a `surface-container-low` background. This creates a soft, natural lift.

### Ambient Shadows
When a floating effect is required (e.g., a modal or a primary download button):
- **Specs:** Blur: `24px`, Y-Offset: `8px`, Spread: `0`.
- **Color:** Use a 6% opacity version of `on-surface` (#191c1e). 
- **The Tint:** Always tint shadows with the surface color to mimic natural light, avoiding "dirty" grey shadows.

### The "Ghost Border" Fallback
If accessibility requirements demand a border:
- **Requirement:** Use `outline-variant` at 15% opacity. 
- **Prohibition:** 100% opaque, high-contrast borders are strictly forbidden.

---

## 5. Components

### Buttons (The "Soft-Touch" Action)
- **Primary:** Gradient fill (`primary` to `primary-container`), `xl` (1.5rem) rounded corners. Use `on-primary` text.
- **Secondary:** `secondary-container` background with `on-secondary-container` text. No border.
- **Tertiary:** No background. Bold `primary` text. Use for "Cancel" or "View Details."

### Cards (The "Knowledge Container")
- **Style:** No dividers. Separate content using `40px` (2.5rem) of vertical white space.
- **Radius:** `lg` (1rem) for standard cards; `xl` (1.5rem) for hero containers.
- **Interaction:** On tap, the card should scale to 0.98 and transition to `surface-container-high`.

### Input Fields
- **Style:** "Floating" style. `surface-container-highest` background, no border.
- **Focus State:** A 2px `primary` "Ghost Border" (20% opacity) and the label shifting to `primary` color.

### PDF Progress Chips
- **Style:** Use `tertiary` (#006229) for "Completed" downloads. 
- **Shape:** `full` (pill) radius. The background should be `tertiary-fixed` with `on-tertiary-fixed` text for a soft, encouraging glow.

---

## 6. Do's and Don'ts

### Do
- **DO** embrace white space. If a screen feels "empty," it’s working.
- **DO** use the `secondary` (Soft Purple) for "Encouraging" moments, like completing a module or a "Well Done!" snackbar.
- **DO** use `xl` (1.5rem) corner radii for large layout containers to emphasize the "Soft Minimalism" personality.

### Don't
- **DON'T** use black (#000000) for text. Always use `on-surface` (#191c1e) to maintain a premium, softer contrast.
- **DON'T** use standard 1px dividers between list items. Use a 12px vertical gap or a subtle background shift (`surface-container-low`).
- **DON'T** use "Safety Green" for accents. Only use the `tertiary` (#006229) and its variants to ensure the "Professional" persona remains intact.