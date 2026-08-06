import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';

import { Colors } from './src/constants/colors';
import Header from './src/components/header';

import AccountInformation from './src/components/account-information';
import AppInformation from './src/components/app-information';

export default function App() {
	const [loaded] = useFonts({
		MontserratThin: require('./assets/fonts/Montserrat-Thin.otf'),
		MontserratExtraLight: require('./assets/fonts/Montserrat-ExtraLight.otf'),
		MontserratLight: require('./assets/fonts/Montserrat-Light.otf'),
		MontserratRegular: require('./assets/fonts/Montserrat-Regular.otf'),
		MontserratMedium: require('./assets/fonts/Montserrat-Medium.otf'),
		MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.otf'),
		MontserratBold: require('./assets/fonts/Montserrat-Bold.otf'),
		MontserratExtraBold: require('./assets/fonts/Montserrat-ExtraBold.otf'),
		MontserratBlack: require('./assets/fonts/Montserrat-Black.otf'),
	});

	if (!loaded) {
		return null;
	}

	return (
		<View style={ styles.container }>
			<Header />
			
			<AppInformation />

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.backgroundPrimary,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
