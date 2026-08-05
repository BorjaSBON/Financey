import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Colors } from './src/constants/colors';

import { ThemedText } from './src/components/ui/themed-text';
import { ThemedButton } from './src/components/ui/themed-button';

import BalanceResume from './src/components/balance-resume';
import TypeButtons from './src/components/type-buttons';
import Header from './src/components/header';

export default function App() {
	const [loaded] = useFonts({
		Montserrat: require('./assets/fonts/Montserrat.ttf')
	});

	if (!loaded) {
		return null;
	}

	return (
		<View style={ styles.container }>
			<Header />
			<ThemedText style={ styles.welcome }>Welcome Borchax!</ThemedText>

			<BalanceResume incomes={ 12000.58 } expenses={ 5000.36 } squareEnable={ false } />
			
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
		fontWeight: '500'
	}
});
