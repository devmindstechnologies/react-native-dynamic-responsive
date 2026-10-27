import { useMemo, DependencyList } from 'react';
import { Dimensions, PixelRatio, useWindowDimensions, StyleSheet } from 'react-native';

/**
 * ==========================================================
 * Base Design Size (iPhone 15 / Modern Design Reference)
 * ==========================================================
 */
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

/**
 * ==========================================================
 * Prevent excessive scaling on Tablets / Fold Open
 * ==========================================================
 */
const MAX_SCALE_WIDTH = 420;
const MAX_SCALE_HEIGHT = 932;

/**
 * ==========================================================
 * Current Window (Static - Evaluated Once)
 * ==========================================================
 */
const getWindow = () => Dimensions.get('window');

export const SCREEN_WIDTH = () => getWindow().width;
export const SCREEN_HEIGHT = () => getWindow().height;

export const IS_TABLET = () => SCREEN_WIDTH() >= 768;
export const IS_FOLD = () => SCREEN_WIDTH() >= 600 && SCREEN_WIDTH() < 768;
export const IS_PHONE = () => SCREEN_WIDTH() < 600;
export const IS_SMALL_PHONE = () => SCREEN_WIDTH() <= 360;
export const IS_LANDSCAPE = () => SCREEN_WIDTH() > SCREEN_HEIGHT();

/**
 * ==========================================================
 * Static Responsive Scale (For backward compatibility)
 * ==========================================================
 */
const effectiveWidth = () => Math.min(SCREEN_WIDTH(), MAX_SCALE_WIDTH);
const effectiveHeight = () => Math.min(SCREEN_HEIGHT(), MAX_SCALE_HEIGHT);

export const scale = (size: number) => (effectiveWidth() / BASE_WIDTH) * size;
export const s = scale;

export const verticalScale = (size: number) => (effectiveHeight() / BASE_HEIGHT) * size;
export const vs = verticalScale;

export const moderateScale = (size: number, factor: number = 0.25) =>
  size + (scale(size) - size) * factor;
export const ms = moderateScale;

export const wp = (percent: number | string) => {
  const value = typeof percent === 'number' ? percent : parseFloat(percent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH() * value) / 100);
};

export const hp = (percent: number | string) => {
  const value = typeof percent === 'number' ? percent : parseFloat(percent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT() * value) / 100);
};

/**
 * ==========================================================
 * Dynamic React Hooks (Production-Ready)
 * Automatically updates on:
 * - Rotation
 * - Fold / Unfold
 * - Multi Window
 * ==========================================================
 */

export type ResponsiveUtils = {
  s: (size: number) => number;
  scale: (size: number) => number;
  vs: (size: number) => number;
  verticalScale: (size: number) => number;
  ms: (size: number, factor?: number) => number;
  moderateScale: (size: number, factor?: number) => number;
  wp: (percent: number | string) => number;
  hp: (percent: number | string) => number;
  width: number;
  height: number;
  isTablet: boolean;
  isFold: boolean;
  isPhone: boolean;
  isSmallPhone: boolean;
  isLandscape: boolean;
};

export const useResponsive = (): ResponsiveUtils => {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const eWidth = Math.min(width, MAX_SCALE_WIDTH);
    const eHeight = Math.min(height, MAX_SCALE_HEIGHT);

    const _s = (size: number) => (eWidth / BASE_WIDTH) * size;
    const _vs = (size: number) => (eHeight / BASE_HEIGHT) * size;
    const _ms = (size: number, factor = 0.25) => size + (_s(size) - size) * factor;
    const _wp = (percent: number | string) => {
      const value = typeof percent === 'number' ? percent : parseFloat(percent);
      return PixelRatio.roundToNearestPixel((width * value) / 100);
    };
    const _hp = (percent: number | string) => {
      const value = typeof percent === 'number' ? percent : parseFloat(percent);
      return PixelRatio.roundToNearestPixel((height * value) / 100);
    };

    return {
      s: _s,
      scale: _s,
      vs: _vs,
      verticalScale: _vs,
      ms: _ms,
      moderateScale: _ms,
      wp: _wp,
      hp: _hp,
      width,
      height,
      isSmallPhone: width <= 360,
      isPhone: width < 600,
      isFold: width >= 600 && width < 768,
      isTablet: width >= 768,
      isLandscape: width > height,
    };
  }, [width, height]);
};

/**
 * Hook to create dynamic stylesheets that recalculate on dimension changes,
 * theme switching, or custom dependency updates.
 *
 * Usage:
 * 1. Responsive only:
 *    const styles = useStyles((r) => ({
 *      container: { padding: r.ms(16) }
 *    }));
 *
 * 2. With Theme / Custom Props (recommended for dynamic theming):
 *    const styles = useStyles((r, theme) => ({
 *      container: { backgroundColor: theme.colors.background, padding: r.ms(16) }
 *    }), theme);
 *
 * 3. With Dependency Array:
 *    const styles = useStyles((r) => ({
 *      container: { backgroundColor: theme.colors.background, padding: r.ms(16) }
 *    }), [theme]);
 */
export function useStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  createStyles: (utils: ResponsiveUtils) => T | StyleSheet.NamedStyles<T>,
  deps?: DependencyList
): T;

export function useStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
  P = undefined
>(
  createStyles: (utils: ResponsiveUtils, props: P) => T | StyleSheet.NamedStyles<T>,
  props?: P,
  deps?: DependencyList
): T;

export function useStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
  P = undefined
>(
  createStyles: (utils: ResponsiveUtils, props?: P) => T | StyleSheet.NamedStyles<T>,
  propsOrDeps?: P | DependencyList,
  deps?: DependencyList
): T {
  const responsive = useResponsive();

  const isDepsArray = Array.isArray(propsOrDeps);
  const resolvedProps = (isDepsArray ? undefined : propsOrDeps) as P;
  const extraDeps = (isDepsArray ? (propsOrDeps as DependencyList) : deps) || [];

  return useMemo(
    () => StyleSheet.create(createStyles(responsive, resolvedProps) as any),
    [responsive.width, responsive.height, resolvedProps, ...extraDeps]
  );
}
