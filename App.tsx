import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { Colors } from './src/constants/colors';

import { ThemedText } from './src/components/ui/themed-text';
import { ThemedButton } from './src/components/ui/themed-button';

import BalanceResume from './src/components/balance-resume';
import TypeButtons from './src/components/type-buttons';
import ListElement from './src/components/list-element';
import Header from './src/components/header';

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
			<ThemedText style={ styles.welcome }>Welcome Borchax!</ThemedText>

			<BalanceResume incomes={ 12000.58 } expenses={ 5000.36 } squareEnable={ false } />
			<View style={ styles.listElements }>
				<ScrollView>
					<ListElement type={ 'expense' } category={ 'Supermercado' } value={ 32.17 } date={ '06 / 08 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Comida fuera' } value={ 25.8 } date={ '05 / 08 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Farmacia' } value={ 60.5 } date={ '05 / 08 / 2026' } />
					<ListElement type={ 'income' } category={ 'Nómina' } value={ 1000.25 } date={ '03 / 08 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Ocio' } value={ 15 } date={ '02 / 08 / 2026' } />
					<ListElement type={ 'income' } category={ 'Otros' } value={ 170 } date={ '02 / 08 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Supermercado' } value={ 3.57 } date={ '01 / 07 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Supermercado' } value={ 21.99 } date={ '30 / 07 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Deporte' } value={ 42.99 } date={ '29 / 07 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Otros' } value={ 4.99 } date={ '24 / 07 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Otros' } value={ 4.99 } date={ '24 / 07 / 2026' } />
					<ListElement type={ 'income' } category={ 'Comida fuera' } value={ 33 } date={ '23 / 07 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Luz' } value={ 16.32 } date={ '22 / 07 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Gas' } value={ 41.58 } date={ '19 / 07 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Wifi' } value={ 31 } date={ '19 / 07 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Agua' } value={ 14.16 } date={ '17 / 06 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Alquiler' } value={ 1129 } date={ '16 / 06 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Otros' } value={ 5.65 } date={ '16 / 06 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Supermercado' } value={ 0.6 } date={ '16 / 06 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Supermercado' } value={ 25.21 } date={ '15 / 06 / 2026' } />
					<ListElement type={ 'expense' } category={ 'Transporte' } value={ 10.5 } date={ '15 / 06 / 2026' } />
				</ScrollView>
			</View>


			<TypeButtons/>
			<ThemedButton label='Delete' type='delete'/>

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
		paddingLeft: 25,
		paddingRight: 25,
	},

	welcome: {
		fontSize: 20,
	},

	listElements: {
		width: '100%',
		height: 350,
		marginTop: 20,
		marginBottom: 20,
	},
});
