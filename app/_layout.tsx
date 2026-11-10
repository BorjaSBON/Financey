import { useEffect } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Stack, SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

	const { isReady: themeReady } = useTheme();
    const { isReady: languageReady } = useLanguage();
    const { isReady: currencyReady } = useCurrency();

    const allReady = themeReady && languageReady && currencyReady;

    useEffect(() => {
        if (allReady) SplashScreen.hideAsync();
    }, [allReady]);
	
    if (!allReady) return null;

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
            <Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: colors.backgroundPrimary },
                    animation: 'slide_from_right',
					presentation: 'card',
				}}
			/>
            <StatusBar style={ resolvedTheme === 'dark' ? 'light' : 'dark'} />
        </View>
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