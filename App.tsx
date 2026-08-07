import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';

import { Colors } from '@constants/colors';
import Header from '@components/layout/header';

import AccountInformation from '@components/configuration/account-information';
import AppInformation from '@components/configuration/app-information';
import DataList from '@components/data/data-list';
import Filter from '@components/data/filter';

export default function App() {
	const [loaded] = useFonts({
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

	if (!loaded) {
		return null;
	}

	return (
		<View style={ styles.container }>
			<Header />
			
			<Filter />

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
