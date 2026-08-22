import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
		MontserratThin: require('@fonts/Montserrat-Thin.otf'),
		MontserratExtraLight: require('@fonts/Montserrat-ExtraLight.otf'),
		MontserratLight: require('@fonts/Montserrat-Light.otf'),
		MontserratRegular: require('@fonts/Montserrat-Regular.otf'),
		MontserratMedium: require('@fonts/Montserrat-Medium.otf'),
		MontserratSemiBold: require('@fonts/Montserrat-SemiBold.otf'),
		MontserratBold: require('@fonts/Montserrat-Bold.otf'),
		MontserratExtraBold: require('@fonts/Montserrat-ExtraBold.otf'),
		MontserratBlack: require('@fonts/Montserrat-Black.otf'),
	});

	 useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) return null;

    return <Slot />;
};

export default RootLayout;