# 📱 react-native-dynamic-responsive

[![npm version](https://img.shields.io/npm/v/react-native-dynamic-responsive.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/react-native-dynamic-responsive)
[![license](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/devmindstechnologies/react-native-dynamic-responsive/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/devmindstechnologies/react-native-dynamic-responsive?style=flat-square)](https://github.com/devmindstechnologies/react-native-dynamic-responsive/issues)
[![GitHub stars](https://img.shields.io/github/stars/devmindstechnologies/react-native-dynamic-responsive?style=flat-square)](https://github.com/devmindstechnologies/react-native-dynamic-responsive/stargazers)
[![Maintained by DevMinds Technologies](https://img.shields.io/badge/Maintained%20by-DevMinds%20Technologies-6366f1?style=flat-square)](https://devminds.in)

> **Dynamic, Lightweight & TypeScript-First Responsive Styling with Full Theme Support for React Native & Expo.**

Build React Native interfaces that adapt effortlessly to different screen sizes, orientations, tablets, foldable devices, and dynamic themes.

<p align="center">
  <img
    src="https://cdn.jsdelivr.net/gh/devmindstechnologies/react-native-dynamic-responsive@main/assets/responsive-preview.png"
    alt="react-native-dynamic-responsive showing responsive UI across phone, landscape, tablet and foldable layouts"
    width="100%"
  />
</p>

<p align="center">
  <strong>Phone</strong> · <strong>Landscape</strong> · <strong>Tablet</strong> · <strong>Foldable</strong>
</p>

---

## ✨ Highlights

- ⚡ **Dynamic & Reactive**: Automatically adapts when devices rotate, split screen, fold/unfold, or resize.
- 🎨 **Dynamic Theme Support**: Seamlessly updates styles on Dark/Light mode and custom theme changes.
- 🪶 **Zero Runtime Dependencies**: Ultra-lightweight with no native dependencies needed.
- 📱 **Multi-Device Ready**: Built-in support for phones, tablets, foldables, and landscape mode.
- 🔷 **TypeScript-First**: Complete type safety and autocomplete out of the box.
- 🚀 **Universal Compatibility**: Works with Expo, Expo Router, and React Native CLI.

---

## 🚀 Installation

```bash
npm install react-native-dynamic-responsive
```

or

```bash
yarn add react-native-dynamic-responsive
```

---

## ⚡ Quick Start

Use `useStyles()` to create styles that automatically adapt to your screen:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useStyles, useResponsive } from 'react-native-dynamic-responsive';

export const WelcomeCard = () => {
  const { isTablet } = useResponsive();
  const styles = useStyles(createStyles);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {isTablet ? 'Welcome to Tablet View' : 'Welcome'}
      </Text>
    </View>
  );
};

const createStyles = (r) => ({
  card: {
    width: r.isTablet ? r.wp(60) : r.wp(90),
    padding: r.ms(16),
    borderRadius: r.s(12),
  },
  title: {
    fontSize: r.ms(20),
    fontWeight: '600',
  },
});
```

---

## 🎯 Best Use Cases & Examples

### 1. 🎨 Dynamic Theme Switching (Dark Mode / Custom Themes)

`useStyles()` automatically recalculates styles when a user or system switches themes without requiring an app reload or screen rotation.

#### Pass `theme` directly into `useStyles` (Recommended)

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useStyles, ResponsiveUtils } from 'react-native-dynamic-responsive';
import { useTheme } from './ThemeContext';

export const ThemedCard = () => {
  const theme = useTheme();
  
  // Recalculates on theme change AND device rotation/window resize
  const styles = useStyles(createStyles, theme);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Adaptive & Themed</Text>
    </View>
  );
};

// Define style factory outside the component for best performance
const createStyles = (r: ResponsiveUtils, theme: any) => ({
  card: {
    backgroundColor: theme.colors.cardBackground,
    padding: r.ms(16),
    borderRadius: r.s(8),
  },
  title: {
    color: theme.colors.text,
    fontSize: r.ms(18),
  },
});
```

#### Using with Dependency Array

```tsx
const { colors } = useTheme();

const styles = useStyles(
  (r) => ({
    container: {
      backgroundColor: colors.surface,
      padding: r.ms(16),
    },
  }),
  [colors] // 👈 Recalculates immediately when theme colors change
);
```

---

### 2. 📲 Tablet & Multi-Column Layouts

Adapt layouts between single-column phone displays and multi-column tablet screens:

```tsx
const styles = useStyles((r) => ({
  grid: {
    flexDirection: r.isTablet ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: r.ms(12),
  },
  gridItem: {
    width: r.isTablet ? r.wp(45) : r.wp(90),
    padding: r.ms(16),
  },
}));
```

---

### 3. 📖 Foldable & Dual-Screen Devices

Gracefully transition layouts when a foldable device is opened or closed:

```tsx
const styles = useStyles((r) => ({
  container: {
    flexDirection: r.isFold ? 'row' : 'column',
    padding: r.ms(r.isFold ? 24 : 16),
  },
  sidebar: {
    width: r.isFold ? r.wp(35) : '100%',
  },
  content: {
    width: r.isFold ? r.wp(60) : '100%',
  },
}));
```

---

### 4. ↔️ Orientation Handling (Portrait vs Landscape)

Respond smoothly to orientation changes without app reloads:

```tsx
const styles = useStyles((r) => ({
  banner: {
    height: r.isLandscape ? r.hp(40) : r.hp(25),
    width: '100%',
  },
}));
```

---

### 5. 🔍 Using `useResponsive()` in Logic & JSX

Use `useResponsive()` when you need device dimensions or device flags in your component logic:

```tsx
import { useResponsive } from 'react-native-dynamic-responsive';

export const Header = () => {
  const { isTablet, isLandscape, width } = useResponsive();

  return (
    <View>
      {isTablet ? <TabletNav /> : <MobileDrawer />}
      <Text>Screen Width: {width}px</Text>
    </View>
  );
};
```

---

### 6. 📐 Static Responsive Utilities

For simple apps, constants, or code outside React components, static scaling functions are always available:

```tsx
import { s, vs, ms, wp, hp, scale, verticalScale, moderateScale } from 'react-native-dynamic-responsive';

const staticStyles = StyleSheet.create({
  box: {
    width: wp('85%'),
    height: hp('20%'),
    paddingHorizontal: s(16),
    paddingVertical: vs(12),
    fontSize: ms(16, 0.3),
  },
});
```

---

## 🛠️ API Reference

### `ResponsiveUtils` (Available in `useResponsive()` & `useStyles`)

| Property / Method | Description | Example |
| :--- | :--- | :--- |
| `s(size)` / `scale(size)` | Scale proportionally based on screen width | `r.s(20)` |
| `vs(size)` / `verticalScale(size)` | Scale proportionally based on screen height | `r.vs(40)` |
| `ms(size, factor?)` / `moderateScale` | Scale moderately with a dampening factor (default 0.25) | `r.ms(16)` |
| `wp(percent)` | Width percentage of the current window (0 - 100) | `r.wp(80)` or `r.wp('80%')` |
| `hp(percent)` | Height percentage of the current window (0 - 100) | `r.hp(50)` or `r.hp('50%')` |
| `width` | Current window width in pixels | `r.width` |
| `height` | Current window height in pixels | `r.height` |
| `isPhone` | `true` when width is less than 600px | `r.isPhone` |
| `isSmallPhone` | `true` when width is 360px or smaller | `r.isSmallPhone` |
| `isFold` | `true` for foldable device screen ranges (600px - 767px) | `r.isFold` |
| `isTablet` | `true` when width is 768px or greater | `r.isTablet` |
| `isLandscape` | `true` when width is greater than height | `r.isLandscape` |

---

## 💡 Best Practices

1. **Define style factories outside components**: Pass `(r, theme) => ({ ... })` to `useStyles(createStyles, theme)` to keep function references clean and memory-efficient.
2. **Use moderateScale (`ms`) for typography and padding**: Keeps text and cards comfortable and readable across large screens and tablets.
3. **Combine percentage helpers and flexbox**: Use `wp` and `hp` for top-level containers and let Flexbox handle internal alignments.
4. **Leverage built-in device flags**: Use `isTablet`, `isFold`, and `isLandscape` for clean, readable conditional layouts.

---

## 🤝 Contributing & Raising Issues

We welcome contributions, bug reports, and suggestions from anyone in the developer community!

- 🐛 **Found a bug or issue?** Please report it on [GitHub Issues](https://github.com/devmindstechnologies/react-native-dynamic-responsive/issues).
- 💡 **Have a feature idea?** Submit a [Feature Request](https://github.com/devmindstechnologies/react-native-dynamic-responsive/issues/new?template=feature_request.md).
- 🛠️ **Want to contribute code?** Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) guide and submit a Pull Request.

---

## 🏢 Maintained by DevMinds Technologies

This package is actively developed and maintained by **[DevMinds Technologies](https://devminds.in)**.

We partner with ambitious startups and enterprises to architect, design, and deploy scalable mobile apps, web systems, and cloud infrastructure using React Native, TypeScript, and modern cloud architecture.

- 🌐 **Website**: [devminds.in](https://devminds.in)
- ✉️ **Inquiries & Custom Software**: [contact@devminds.in](mailto:contact@devminds.in)
- 👨‍💻 **Lead Author**: [Dharmendra](https://www.linkedin.com/in/dharmendra-appdeveloper)

---

## 📄 License

MIT © [DevMinds Technologies](https://devminds.in) & [Dharmendra](https://www.linkedin.com/in/dharmendra-appdeveloper)

