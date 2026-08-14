# 📱 react-native-dynamic-responsive

### Dynamic, Lightweight & TypeScript-First Responsive UI for React Native

Build React Native interfaces that adapt naturally to **different screen sizes, orientations, tablets, foldable devices, and dynamic window dimensions**.

`react-native-dynamic-responsive` provides a simple, familiar API for responsive scaling while giving modern React Native applications a **dynamic, hook-based styling approach**.

Built for:

- 📱 Phones
- 📲 Tablets
- 📖 Foldable devices
- ↔️ Portrait & landscape
- ⚛️ React Native CLI
- 🚀 Expo
- 🔷 TypeScript

**Zero runtime dependencies. No native configuration required.**

## 📱 Responsive UI Across Devices

Build once and adapt your interface across phones, landscape layouts, tablets, and foldable devices.

<p align="center">
  <img
    src="https://gitlab.com/code_dharmendra/react-native-dynamic-responsive/-/raw/main/assets/responsive-preview.png"
    alt="react-native-dynamic-responsive showing responsive UI across phone, landscape, tablet and foldable layouts"
    width="100%"
  />
</p>

<p align="center">
  <strong>Phone</strong> · <strong>Landscape</strong> · <strong>Tablet</strong> · <strong>Foldable</strong>
</p>

---

## ✨ Why react-native-dynamic-responsive?

Traditional responsive utilities are often designed around a fixed screen size.

Modern devices are different.

A React Native application can experience:

```
Phone
  ↓
Rotation
  ↓
Landscape
  ↓
Split Screen
  ↓
Tablet
  ↓
Foldable
  ↓
Inner / Outer Display

```

The available screen dimensions can change while your application is running.

`react-native-dynamic-responsive` is designed around this reality.

### The goal

> **Write responsive styles once and let the layout adapt to the current screen dimensions.**

```
const styles = useStyles((r) => ({
  container: {
    width: r.isTablet ? r.wp(70) : r.wp(90),
    padding: r.ms(16),
  },

  title: {
    fontSize: r.ms(24),
  },
}));

```

---

# 🚀 Installation

```
npm install react-native-dynamic-responsive

```

or:

```
yarn add react-native-dynamic-responsive

```

### No native setup

The library is designed to work without additional native configuration.

You can use it directly in:

- Expo
- Expo Router
- React Native CLI

---

# ⚡ Quick Start

The recommended API is `useStyles()`.

```
import React from 'react';
import { View, Text } from 'react-native';

import {
  useStyles,
  useResponsive,
  ResponsiveUtils,
} from 'react-native-dynamic-responsive';

export const MyComponent = () => {
  const { isTablet, isFold } = useResponsive();

  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isTablet ? 'Tablet View' : 'Phone View'}
      </Text>

      <Text>
        {isFold ? 'Foldable Device' : 'Standard Device'}
      </Text>
    </View>
  );
};

const createStyles = (r: ResponsiveUtils) => ({
  container: {
    width: r.isTablet ? r.wp(70) : r.wp(90),
    padding: r.ms(16),
  },

  title: {
    fontSize: r.ms(24),
    fontWeight: '700',
  },
});

```

---

# 🧠 How It Works

The library provides a responsive utility object containing scaling functions and device information.

Instead of calculating screen dimensions manually inside every component:

```
Dimensions.get('window')

```

you can use:

```
const styles = useStyles((r) => ({
  card: {
    width: r.wp(90),
    padding: r.ms(16),
  },
}));

```

The responsive style function receives the current responsive context.

When the relevant screen dimensions change, the hook can recalculate the responsive styles for the component.

This makes the API particularly useful for:

- orientation changes
- fold/unfold transitions
- tablet layouts
- dynamic window sizes
- split-screen layouts

---

# ⚡ Performance

Performance is a first-class consideration.

`react-native-dynamic-responsive` is designed to remain lightweight while providing dynamic responsive behavior.

## 🪶 Zero Runtime Dependencies

The package has:

```
0 Runtime Dependencies

```

React and React Native are used as peer dependencies.

This helps keep the dependency tree small and avoids introducing additional runtime libraries into your application.

---

## 🧩 No Native Module Setup

The responsive logic is designed to work from the React Native layer.

You don't need to install an additional native module just to perform responsive scaling.

That means:

```
npm install
      ↓
Import package
      ↓
Use responsive utilities

```

No additional native linking workflow is required.

---

## 🔄 Dynamic Updates Only When Dimensions Matter

Responsive styles are useful because screen dimensions can change.

Examples:

```
Portrait
   ↓
Landscape

Folded
   ↓
Unfolded

Outer Screen
   ↓
Inner Screen

Full Screen
   ↓
Split Screen

```

The recommended `useStyles()` API is intended for these dynamic scenarios.

For applications where dimensions never need to change dynamically, static utility functions are also available.

---

## ⚠️ Performance Best Practices

For the best performance:

### ✅ Keep style factories outside components

Recommended:

```
const createStyles = (r: ResponsiveUtils) => ({
  container: {
    padding: r.ms(16),
  },
});

const MyComponent = () => {
  const styles = useStyles(createStyles);

  return <View style={styles.container} />;
};

```

Avoid recreating the complete style factory unnecessarily inside the component.

---

### ✅ Use `useStyles()` for dynamic layouts

If your UI needs to react to:

- rotation
- fold/unfold
- window resizing

use:

```
useStyles()

```

---

### ✅ Use static utilities when dynamic behavior isn't required

For fixed/static styling:

```
import { ms, s, vs } from 'react-native-dynamic-responsive';

```

This can be useful for existing applications that don't need dynamic screen updates.

---

## 📦 Bundle & Dependency Philosophy

The library follows a simple philosophy:

```
Small API
   +
Zero runtime dependencies
   +
React Native primitives
   +
TypeScript
   =
Low complexity

```

There are no unnecessary UI components, animation systems, state managers, or styling frameworks bundled into the package.

The library focuses specifically on responsive calculations and responsive style handling.

---

# 🌟 Features

### 📱 Responsive Scaling

Scale dimensions according to the current screen size.

### 📐 Width & Height Percentages

Create layouts using percentage-based dimensions.

### 🔄 Dynamic Screen Updates

React to changes in screen dimensions.

### 📖 Foldable Support

Useful for devices where the available display area changes between folded and unfolded states.

### 📲 Tablet Detection

Easily adapt layouts for larger screens.

### ↔️ Orientation Detection

Detect portrait and landscape layouts.

### ⚛️ Hooks-First API

Modern React API using:

```
useStyles()
useResponsive()

```

### 🔷 TypeScript

Type-friendly responsive utilities.

### 🚀 Expo Compatible

Works with Expo applications.

### ⚛️ React Native CLI Compatible

Works with standard React Native CLI applications.

### 🪶 Lightweight

Zero runtime dependencies.

---

# 📐 Responsive Utilities

The responsive utility object provides familiar scaling functions.

```
const styles = useStyles((r) => ({
  container: {
    width: r.wp(90),
    height: r.hp(40),
    padding: r.s(16),
    marginTop: r.vs(20),
  },

  title: {
    fontSize: r.ms(24),
  },
}));

```

---

## Available Functions

| Function              | Description                 | Example    |
| --------------------- | --------------------------- | ---------- |
| `r.s(size)`           | Standard horizontal scaling | `r.s(16)`  |
| `r.ms(size, factor?)` | Moderate scaling            | `r.ms(24)` |
| `r.vs(size)`          | Vertical scaling            | `r.vs(20)` |
| `r.wp(percent)`       | Percentage of screen width  | `r.wp(90)` |
| `r.hp(percent)`       | Percentage of screen height | `r.hp(50)` |

---

# 📱 Device Detection

Use `useResponsive()` when your UI needs device-specific behavior.

```
const r = useResponsive();

```

You can then access:

```
r.isPhone
r.isTablet
r.isFold
r.isSmallPhone
r.isLandscape

```

---

## Device Flags

| Flag           | Condition             |
| -------------- | --------------------- |
| `isPhone`      | Width < 600           |
| `isFold`       | Width ≥ 600 and < 768 |
| `isTablet`     | Width ≥ 768           |
| `isSmallPhone` | Width ≤ 360           |
| `isLandscape`  | Width > Height        |

> These thresholds are intended as practical defaults. They should not be treated as a universal hardware classification standard.

---

# 🔄 Orientation

You can easily create different layouts for portrait and landscape.

```
const styles = useStyles((r) => ({
  container: {
    width: r.isLandscape
      ? r.wp(70)
      : r.wp(90),
  },
}));

```

Example:

```
        PORTRAIT

      ┌──────────┐
      │          │
      │  Content │
      │          │
      └──────────┘


             ↓ ROTATE


        LANDSCAPE

   ┌──────────────────┐
   │      Content     │
   └──────────────────┘

```

---

# 📖 Foldable Devices

Foldable devices introduce an additional responsive challenge.

The available display area can change significantly between:

```
Folded
  ↓
Outer Display

Unfolded
  ↓
Inner Display

```

A responsive layout should not assume that the original screen dimensions remain constant.

Using:

```
const styles = useStyles((r) => ({
  container: {
    width: r.isFold
      ? r.wp(90)
      : r.wp(70),
  },
}));

```

your component can adapt its layout according to the current responsive state.

---

# 📲 Tablet Layouts

Tablet layouts often require different proportions from phone layouts.

Instead of maintaining completely separate styles:

```
const styles = useStyles((r) => ({
  container: {
    width: r.isTablet
      ? r.wp(70)
      : r.wp(92),

    padding: r.isTablet
      ? r.ms(24)
      : r.ms(16),
  },
}));

```

This keeps the responsive logic close to the styles that use it.

---

# 🎨 Responsive Typography

Responsive scaling can also be used for typography.

```
const styles = useStyles((r) => ({
  heading: {
    fontSize: r.ms(28),
    lineHeight: r.ms(34),
  },

  body: {
    fontSize: r.ms(16),
    lineHeight: r.ms(24),
  },
}));

```

Use moderate scaling where aggressive scaling could make typography or spacing unnecessarily large on bigger screens.

---

# 🧩 `useStyles()`

`useStyles()` is the recommended API for dynamic responsive styles.

```
const styles = useStyles((r) => ({
  container: {
    padding: r.ms(16),
    width: r.wp(90),
  },

  title: {
    fontSize: r.ms(24),
  },
}));

```

### Why use it?

It keeps responsive calculations together with the style definition while allowing the styles to respond to the current responsive state.

---

# 🔍 `useResponsive()`

Use `useResponsive()` when you need responsive information directly inside your component.

```
const {
  isPhone,
  isTablet,
  isFold,
  isSmallPhone,
  isLandscape,
} = useResponsive();

```

Example:

```
return (
  <View>
    {isTablet ? (
      <TabletNavigation />
    ) : (
      <MobileNavigation />
    )}
  </View>
);

```

---

# 🛠️ ResponsiveUtils

The style factory receives a `ResponsiveUtils` object.

```
const createStyles = (r: ResponsiveUtils) => ({
  container: {
    width: r.wp(90),
    padding: r.ms(16),
  },
});

```

This gives you access to the responsive scaling utilities and device state from one place.

---

# 🆚 Dynamic vs Static Usage

## Dynamic usage

Recommended when dimensions can change:

```
const styles = useStyles((r) => ({
  container: {
    width: r.wp(90),
    padding: r.ms(16),
  },
}));

```

Use this for:

- foldables
- orientation changes
- tablets
- split-screen
- dynamic window dimensions

---

## Static usage

Useful for existing codebases or styles that don't need to react to dimension changes.

```
import { StyleSheet } from 'react-native';
import {
  ms,
  s,
  vs,
} from 'react-native-dynamic-responsive';

const styles = StyleSheet.create({
  box: {
    width: s(100),
    height: vs(100),
    padding: ms(10),
  },
});

```

### Important

Static utilities are evaluated as normal JavaScript values when your styles are created.

If your application needs to respond to changing screen dimensions, prefer:

```
useStyles()

```

---

# 🛍️ Real-World Use Cases

## E-commerce

Responsive:

- product grids
- product cards
- filters
- banners
- checkout screens

## Dashboards

Adapt layouts between:

```
Phone → Tablet → Large Screen

```

## Social Applications

Responsive:

- feeds
- profile layouts
- media cards
- navigation

## Enterprise Applications

Support different company devices without maintaining completely separate layouts.

## Foldable Applications

Adapt the UI when available display dimensions change.

## Design Systems

Create reusable responsive spacing and typography rules across an application.

---

# 🔐 Security & Dependencies

The package is intentionally lightweight.

### Runtime dependencies

```
0

```

### Peer dependencies

```
React
React Native

```

The package does not require additional runtime libraries for responsive calculations.

For security-sensitive production environments, always review the exact package version and dependency tree used by your application.

---

# 🧪 Testing & Production Readiness

Responsive behavior should be tested on more than one screen size.

Recommended testing matrix:

| Device Type    | Portrait | Landscape |
| -------------- | -------- | --------- |
| Small Phone    | ✅       | ✅        |
| Standard Phone | ✅       | ✅        |
| Large Phone    | ✅       | ✅        |
| Tablet         | ✅       | ✅        |
| Foldable       | ✅       | ✅        |

Also test:

- screen rotation
- split-screen mode where supported
- navigation transitions
- modal layouts
- keyboard interaction
- safe-area handling
- very small and very large content
- text scaling/accessibility settings

> Responsive scaling solves dimension-related layout problems. It does not replace good accessibility, safe-area handling, content wrapping, or platform-specific UI testing.

---

# ⚠️ What This Library Does NOT Do

`react-native-dynamic-responsive` is focused on responsive calculations and responsive style handling.

It does **not** attempt to replace:

- React Native `SafeAreaView`
- accessibility APIs
- navigation libraries
- animation libraries
- design systems
- state management
- device-specific business logic

Use the right tool for each responsibility.

---

# 💡 When Should I Use This?

Use this package when your application needs:

```
Different screen sizes
        +
Dynamic dimensions
        +
Responsive spacing
        +
Responsive typography
        +
Tablet layouts
        +
Orientation handling
        +
Foldable support

```

It is especially useful when you want a simple responsive API without introducing a large styling framework.

---

# 🤔 Frequently Asked Questions

## Does it work with Expo?

Yes.

The package is designed to work with Expo projects.

---

## Does it work with Expo Router?

Yes.

Expo Router is built on top of React Native navigation patterns, so the responsive utilities can be used inside your screens and components normally.

---

## Does it work with React Native CLI?

Yes.

No separate React Native CLI-specific implementation is required for normal usage.

---

## Does it require native configuration?

The package is designed to be used without additional native configuration.

Install it and import the utilities directly.

---

## Does it support TypeScript?

Yes.

The package is written for a TypeScript-friendly development experience.

---

## Does it support tablets?

Yes.

You can use:

```
r.isTablet

```

and responsive width/height utilities to create tablet-specific layouts.

---

## Does it support foldable devices?

The responsive APIs are designed to respond to changing screen dimensions, making them suitable for foldable layouts.

You can also use:

```
r.isFold

```

for the package's configured fold-device classification.

---

## Does it automatically make my entire application responsive?

No.

The library provides the tools.

Your application still needs responsive layout decisions.

For example:

```
r.isTablet
  ? tabletLayout
  : mobileLayout

```

The package handles the responsive calculations; your UI determines how those calculations should be used.

---

## Is it a replacement for Flexbox?

No.

React Native Flexbox remains the primary layout system.

This library complements Flexbox by providing responsive dimensions, scaling and device information.

---

## Is it a replacement for `Dimensions`?

Not completely.

You can still use React Native's APIs when you need low-level device/window information.

This library provides a more convenient responsive styling layer on top of those concepts.

---

## Does it work with `StyleSheet.create()`?

Yes, through the static utilities:

```
ms()
s()
vs()

```

However, if your layout needs to react to changing dimensions, use:

```
useStyles()

```

---

## Does it work with React Native Web?

The core API is designed around React Native responsive behavior.

If React Native Web compatibility is important for your application, test the specific APIs you use against your target web environment before relying on device-specific flags.

---

## Will it make my app slower?

The library is designed to be lightweight and has zero runtime dependencies.

Dynamic responsive behavior necessarily involves responding to dimension changes. The recommended approach is to use `useStyles()` for components that actually need dynamic responsive behavior rather than unnecessarily applying responsive hooks everywhere.

---

## Does it use a state management library?

No.

It does not require Redux, Zustand, MobX, Recoil or another state management library.

---

## Does it require Reanimated?

No.

Responsive scaling and dimension handling do not require React Native Reanimated.

---

## Does it provide UI components?

No.

This package focuses on responsive utilities and styling rather than providing buttons, cards, modals or other UI components.

---

## Can I use it with my existing design system?

Yes.

The scaling utilities can be used inside your existing component and design-system architecture.

For example:

```
const spacing = r.ms(16);
const radius = r.ms(12);
const titleSize = r.ms(24);

```

---

# 🔄 Migration From `react-native-size-matters`

If your application already uses concepts such as:

```
ms()
s()
vs()

```

the familiar scaling terminology can make migration easier.

Example:

```
import {
  ms,
  s,
  vs,
} from 'react-native-dynamic-responsive';

```

For dynamic responsive behavior, prefer:

```
const styles = useStyles((r) => ({
  container: {
    padding: r.ms(16),
  },
}));

```

### Important

This package is not intended to be a drop-in replacement for every API or behavior of another responsive library.

Review your existing scaling configuration and test your UI across your target devices after migration.

---

# 📊 Responsive Design Example

### Without responsive rules

```
┌──────────────┐
│    PHONE     │
│              │
│  ┌────────┐  │
│  │  CARD  │  │
│  └────────┘  │
└──────────────┘


        ↓


┌────────────────────────┐
│         TABLET         │
│                        │
│  ┌──────────────────┐  │
│  │      CARD        │  │
│  └──────────────────┘  │
│                        │
└────────────────────────┘

```

### With responsive rules

```
const styles = useStyles((r) => ({
  card: {
    width: r.isTablet
      ? r.wp(45)
      : r.wp(90),

    padding: r.ms(16),

    borderRadius: r.ms(12),
  },
}));

```

The same component can use different dimensions based on the available screen.

---

# 🎯 Design Philosophy

`react-native-dynamic-responsive` follows a few simple principles:

### 1. Keep the API small

Developers should not need to learn an entire styling framework.

### 2. Prefer familiar concepts

Functions such as:

```
s()
ms()
vs()
wp()
hp()

```

are intentionally easy to understand.

### 3. Dynamic where it matters

Dynamic responsive behavior is useful when the available screen changes.

### 4. Avoid unnecessary dependencies

Zero runtime dependencies keeps the package focused.

### 5. TypeScript-friendly

The API should be comfortable for modern React Native projects.

### 6. Don't hide React Native

The library complements React Native rather than trying to replace its layout system.

---

# 🛣️ Roadmap

Potential future improvements may include:

- More responsive breakpoint utilities
- Additional device classification options
- Improved responsive configuration
- More examples
- Performance benchmarks
- Expanded test coverage
- Additional documentation
- Community feedback-driven improvements

The roadmap may change based on real-world usage and developer feedback.

---

# 🐛 Troubleshooting

## Styles are not updating after rotation

Make sure you are using:

```
useStyles()

```

for dynamic styles rather than creating static values with `StyleSheet.create()`.

---

## Tablet layout is not triggering

Check the current width used by your application and the configured tablet threshold.

You can inspect:

```
const r = useResponsive();

console.log({
  isTablet: r.isTablet,
  isFold: r.isFold,
  isPhone: r.isPhone,
  isLandscape: r.isLandscape,
});

```

---

## My layout is still overflowing

Responsive scaling does not automatically solve every layout problem.

Also check:

- Flexbox configuration
- `flexShrink`
- `flexWrap`
- text length
- minimum/maximum dimensions
- safe areas
- keyboard behavior
- accessibility font scaling

---

# 📦 Package Philosophy

This library intentionally focuses on one problem:

> **Making React Native layouts easier to adapt to changing screen dimensions.**

It does not try to become:

- a UI framework
- a navigation library
- an animation framework
- a state manager
- a complete design system

Small responsibility.

Simple API.

Predictable behavior.

---

# ⭐ Support the Project

If this library helps you build responsive React Native applications:

### ⭐ Star the project

Stars help other developers discover the library.

### 📦 Install it

Try it in your next React Native project.

### 🐛 Report issues

Found something unexpected? Open an issue with a reproducible example.

### 💡 Share feedback

Ideas and real-world use cases help shape future releases.

### 🤝 Contribute

Pull requests and documentation improvements are welcome.

---

# 👨‍💻 Author

## Dharmendra

React Native / Full Stack Developer

Building tools for modern React Native applications.

---

# 📄 License

MIT License

Copyright © Dharmendra

---

## 📱 Build Once. Adapt Everywhere.

### `react-native-dynamic-responsive`

**Responsive UI for modern React Native applications.**
