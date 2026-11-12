import { createSignal } from "solid-js";
import { ColorName, Theme } from "../constants/themes";
import { CustomThemeColors, ThemeName } from "@monkeytype/schemas/configs";

export type ThemeIdentifier = ThemeName | "custom";

// shown over the configured theme while set. the theme controller applies it
export const [getRandomTheme, setRandomTheme] = createSignal<{
  name: ThemeIdentifier;
  colors?: CustomThemeColors;
} | null>(null);

const defaultTheme: Theme & { name: ThemeIdentifier } = {
  name: "binolabs",
  bg: "#0a0b10",
  main: "#a78bfa",
  caret: "#8b5cf6",
  sub: "#6b7280",
  subAlt: "#14151d",
  text: "#f3f4f6",
  error: "#f87171",
  errorExtra: "#b91c1c",
  colorfulError: "#f87171",
  colorfulErrorExtra: "#b91c1c",
};

export const [getTheme, setTheme] = createSignal(defaultTheme);

/** The `:root` color variables for `theme`. */
export function getThemeColorsCss(theme: Theme): string {
  return `
:root {
    --bg-color: ${theme.bg};
    --main-color: ${theme.main};
    --caret-color: ${theme.caret};
    --sub-color: ${theme.sub};
    --sub-alt-color: ${theme.subAlt};
    --text-color: ${theme.text};
    --error-color: ${theme.error};
    --error-extra-color: ${theme.errorExtra};
    --colorful-error-color: ${theme.colorfulError};
    --colorful-error-extra-color: ${theme.colorfulErrorExtra};
}`;
}

/**
 * Stores the configured theme's colors for the inline script in index.html,
 * which applies them before the first paint to avoid an initial flash of the
 * default theme. Not for previews.
 */
export function cacheThemeColors(theme: Theme): void {
  localStorage.setItem("firstPaintThemeCss", getThemeColorsCss(theme));
}

export function updateThemeColor(key: ColorName, color: string): void {
  setTheme((prev) => ({
    ...prev,
    [key]: color,
  }));
}

// slider values while dragging in settings, before they are saved to the config
export const [
  getCustomBackgroundFilterPreview,
  setCustomBackgroundFilterPreview,
] = createSignal<[number, number, number, number] | null>(null);
// whether the custom background image is loaded (set by CustomBackground)
export const [isCustomBackgroundLoaded, setCustomBackgroundLoaded] =
  createSignal(false);
