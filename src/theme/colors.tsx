export interface ThemeColors {
    // General
    mainColor: string;

    // Background
    backgroundPrimary: string;
    backgroundSecondary: string;

    // Fonts
    fontPrimary: string;
    fontSecondary: string;

    // +/-
    positive: string;
    negative: string;

    // Button
    buttonFont: string;
    buttonBackgroundPrimary: string;
    buttonBackgroundSecondary: string;
    buttonBackgroundWarning: string;

    // Input
    inputFont: string;
    inputFontPlaceholder: string;
    inputBackground: string;
    inputBackgroundDropdown: string;

    // Input Mini
    inputMiniFont: string;
    inputMiniFontPlaceholder: string;
    inputMiniBackground: string;
    inputMiniBackgroundDropdown: string;

    // Hover
    hoverElement: string;

    // Popup
    popupShadow: string;

    // Icon
    iconColor: string;
    iconBackground: string;
}

export const LightColors: ThemeColors = {
    // General
    mainColor: '#0F172A',

    // Background
    backgroundPrimary: '#F7F7F7',
    backgroundSecondary: '#FFFFFF',

    // Fonts
    fontPrimary: '#0F172A',
    fontSecondary: '#0F172A80',

    // +/-
    positive: '#AED136',
    negative: '#F15A29',

    // Button
    buttonFont: '#FFFFFF',
    buttonBackgroundPrimary: '#111A30',
    buttonBackgroundSecondary: '#111A3080',
    buttonBackgroundWarning: '#F15A29',

    // Input
    inputFont: '#0F172A',
    inputFontPlaceholder: '#0F172A80',
    inputBackground: '#D9D9D933',
    inputBackgroundDropdown: '#FFFFFF',

    // Input Mini
    inputMiniFont: '#0F172A',
    inputMiniFontPlaceholder: '#0F172A80',
    inputMiniBackground: '#D9D9D933',
    inputMiniBackgroundDropdown: '#FFFFFF',

    // Hover
    hoverElement: '#111A301A',

    // Popup
    popupShadow: '#111A3040',

    // Icon
    iconColor: '#FFFFFF',
    iconBackground: '#111A30',
} as const;

export const DarkColors: ThemeColors = {
    // General
    mainColor: '#0F172A',

    // Background
    backgroundPrimary: '#111A30',
    backgroundSecondary: '#1D263B',

    // Fonts
    fontPrimary: '#FFFFFF',
    fontSecondary: '#FFFFFF80',

    // +/-
    positive: '#AED136',
    negative: '#F15A29',

    // Button
    buttonFont: '#FFFFFF',
    buttonBackgroundPrimary: '#5EEAD466',
    buttonBackgroundSecondary: '#5EEAD426',
    buttonBackgroundWarning: '#F15A29',

    // Input
    inputFont: '#0F172A',
    inputFontPlaceholder: '#0F172A80',
    inputBackground: '#FFFFFF66',
    inputBackgroundDropdown: '#FFFFFF',

    // Input Mini
    inputMiniFont: '#FFFFFF',
    inputMiniFontPlaceholder: '#FFFFFF',
    inputMiniBackground: '#5EEAD426',
    inputMiniBackgroundDropdown: '#111A30',

    // Hover
    hoverElement: '#FFFFFF1A',

    // Popup
    popupShadow: '#FFFFFF40',

    // Icon
    iconColor: '#111A30',
    iconBackground: '#FFFFFF',
} as const;

export const Themes = {
    light: LightColors,
    dark: DarkColors,
} as const;

export type ThemeName = keyof typeof Themes;
export type ThemePreference = ThemeName | 'system';