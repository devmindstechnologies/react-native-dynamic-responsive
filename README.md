# react-native-dynamic-responsive

The **best responsive package** for React Native! A **super lightweight**, production-ready responsive styling library built for the modern era of mobile apps.

Whether you are using **Expo** or **React Native CLI**, this package works seamlessly out of the box to handle dynamic orientation changes, foldable devices (inner/outer screen swapping), and tablets seamlessly—all without breaking a sweat!

If you are looking for the ultimate `react-native-size-matters` alternative that fully supports dynamic screen sizes and hooks, you've found it.

## 🌟 Features
- **Universal Compatibility**: 100% compatible with both **Expo** (managed & bare workflows) and **React Native CLI**.
- **Ultra Lightweight**: Zero dependencies (only peer dependencies on React & React Native).
- **Dynamic & Reactive**: Styles instantly recalculate when screen dimensions change (e.g., when a user unfolds a device or rotates their screen).
- **Familiar API**: Uses industry-standard scaling terminology (`ms`, `s`, `vs`) inspired by `react-native-size-matters`.
- **Hooks-First Architecture**: Built for modern React Native apps using a `useStyles` pattern to avoid stale `StyleSheet.create` evaluations.

---

## 🚀 Installation

```bash
npm install react-native-dynamic-responsive
# or
yarn add react-native-dynamic-responsive
```

---

## 📖 Quick Start

The best way to use this package is via the `useStyles` hook. This ensures your styles re-render instantly on fold/unfold or screen rotation.

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useStyles, useResponsive, ResponsiveUtils } from 'react-native-dynamic-responsive';

export const MyComponent = () => {
  // Optional: Pull device status if you need logic inside your component
  const { isTablet, isFold } = useResponsive();
  
  // 1. Pass the createStyles function to the hook
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isTablet ? 'Tablet View' : 'Phone View'}
      </Text>
    </View>
  );
};

// 2. Define your styles outside the component to keep things clean.
// The `r` parameter (ResponsiveUtils) gives you access to real-time scaling functions!
const createStyles = (r: ResponsiveUtils) => ({
  container: {
    // scale (s): Standard scaling based on width
    padding: r.s(16), 
    
    // moderateScale (ms): Smart scaling that prevents things from getting too big on tablets
    marginTop: r.ms(20), 
    
    // width/height percentages (wp/hp)
    width: r.isTablet ? r.wp(50) : r.wp(100), 
    
    backgroundColor: '#fff',
  },
  title: {
    // Use ms() for typography!
    fontSize: r.ms(24),
    fontWeight: 'bold',
  }
});
```

---

## 🛠 Advanced Usage

### Available Scaling Functions

When using `useStyles((r) => { ... })` or `const r = useResponsive()`, you have access to the following utilities on the `r` object:

| Function | Description | Best Used For |
| :--- | :--- | :--- |
| **`r.ms(size, factor?)`** | Moderate Scale. Scales based on width but less aggressively. | **Typography, icons, padding/margins** |
| **`r.s(size)`** | Standard Scale. Scales directly proportional to screen width. | Widths, horizontal spacing |
| **`r.vs(size)`** | Vertical Scale. Scales directly proportional to screen height. | Heights, vertical spacing |
| **`r.wp(percent)`** | Width Percentage. e.g., `r.wp(50)` = 50% of screen width | Containers, Modals |
| **`r.hp(percent)`** | Height Percentage. e.g., `r.hp(50)` = 50% of screen height | Containers, Modals |

### Available Device Flags

You can easily trigger different UI logic without importing `Platform` or `Dimensions` manually:

- `r.isTablet` (Width >= 768)
- `r.isFold` (Width >= 600 & < 768)
- `r.isPhone` (Width < 600)
- `r.isSmallPhone` (Width <= 360)
- `r.isLandscape` (Width > Height)

### Legacy / Static Usage (Not Recommended for Foldables)

If you have an older codebase and need to use the scaling utilities inside standard, static `StyleSheet.create`, you can still import them directly. 

*Note: These will evaluate only once when the file loads, so they will not update dynamically if a foldable device unfolds.*

```tsx
import { StyleSheet, View } from 'react-native';
import { ms, s, vs } from 'react-native-dynamic-responsive';

const StaticComponent = () => <View style={styles.box} />;

const styles = StyleSheet.create({
  box: {
    width: s(100),
    height: vs(100),
    padding: ms(10),
  }
});
```

---

## 👤 Author

**Dharmendra**  
App Developer  
[LinkedIn Profile](https://www.linkedin.com/in/dharmendra-appdeveloper)

---

## 📝 License

MIT License.
