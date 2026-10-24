import { useEffect } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Slot, SplashScreen } from 'expo-router';

import { initializeAppDatabase } from '@db/init';

import { ThemeProvider } from '@theme/ThemeContext';
import { useTheme } from '@theme/useTheme';

import { CurrencyProvider } from '@currency/CurrencyContext';

import { LanguageProvider } from '@language/LanguageContext';

SplashScreen.preventAutoHideAsync();

const RootLayoutContent = () => {
	// Theme
    const { colors, resolvedTheme } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
            <Slot />
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

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) return null;

    return (
		<ThemeProvider>
			<CurrencyProvider>
				<LanguageProvider>
					<RootLayoutContent />
				</LanguageProvider>
			</CurrencyProvider>
		</ThemeProvider>
	);
};

export default RootLayout;