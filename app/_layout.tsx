import { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Stack, SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Transition, { type ScreenTransitionConfig, } from 'react-native-screen-transitions';
import { interpolate } from 'react-native-reanimated';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BlankStack } from "react-native-screen-transitions/expo-router";

import { initializeAppDatabase } from '@db/init';

import { ThemeProvider } from '@theme/ThemeContext';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';
import { useCurrency } from '@currency/useCurrency';

import { CurrencyProvider } from '@currency/CurrencyContext';

import { LanguageProvider } from '@language/LanguageContext';

import '@language/locales/calendar-locale';

SplashScreen.preventAutoHideAsync();

const RootLayoutContent = () => {
	// Theme
    const { colors, resolvedTheme } = useTheme();

	// Systems ready
	const { isReady: themeReady } = useTheme();
    const { isReady: languageReady } = useLanguage();
    const { isReady: currencyReady } = useCurrency();

    const allReady = themeReady && languageReady && currencyReady;

    useEffect(() => {
        if (allReady) SplashScreen.hideAsync();
    }, [allReady]);
	
    if (!allReady) return null;

    const horizontalTransition: ScreenTransitionConfig = {
        gestureEnabled: Platform.OS === 'ios',
        gestureDirection: 'horizontal',
        transitionSpec: {
            open: Transition.Specs.DefaultSpec,
            close: {
				stiffness: 150,
				damping: 25,
				mass: 1,
				overshootClamping: true,
			},
        },
        screenStyleInterpolator: ({ current, progress }) => {
            'worklet';

            const width = current.layouts.screen.width;
            const translateX = interpolate(
                progress,
                [0, 1, 2],
                [width, 0, -width * 0.3],
                'clamp'
            );

            return {
                content: {
                    backgroundColor: colors.backgroundPrimary,
                    transform: [{ translateX }],
                },
            };
        },
    };

    return (
        <GestureHandlerRootView
            style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
        >
            <BlankStack screenOptions={horizontalTransition} />
            <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
        </GestureHandlerRootView>
    );
};

const RootLayout = () => {
	// Initialize the database
	useEffect(() => {
		const initialize = async () => {
			try {
				await initializeAppDatabase();
			} catch (error) {
				console.error('Error while initializing DB:', error);
				return null;
			}
		};

		initialize();
	}, []);

	// Load custom fonts
    const [fontsLoaded, error] = useFonts({
		MontserratThin: require('@fonts/Montserrat-Thin.ttf'),
		MontserratExtraLight: require('@fonts/Montserrat-ExtraLight.ttf'),
		MontserratLight: require('@fonts/Montserrat-Light.ttf'),
		MontserratRegular: require('@fonts/Montserrat-Regular.ttf'),
		MontserratMedium: require('@fonts/Montserrat-Medium.ttf'),
		MontserratSemiBold: require('@fonts/Montserrat-SemiBold.ttf'),
		MontserratBold: require('@fonts/Montserrat-Bold.ttf'),
		MontserratExtraBold: require('@fonts/Montserrat-ExtraBold.ttf'),
		MontserratBlack: require('@fonts/Montserrat-Black.ttf'),
	});

	// Handle font loading and errors
	useEffect(() => {
        if (error) throw error;
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) return null;

    return (
		<SafeAreaProvider>
			<ThemeProvider>
				<CurrencyProvider>
					<LanguageProvider>
						<RootLayoutContent />
					</LanguageProvider>
				</CurrencyProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export default RootLayout;