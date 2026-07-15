import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BalanceResume from './src/components/balance-resume';
import Header from './src/components/header';

export default function App() {
	return (
		<View style={ styles.container }>
			<Header />
			<BalanceResume />

			<Text style={ styles.welcome }>Welcome Borchax!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 25,
		marginRight: 25,
	},

	welcome: {
		fontSize: 20,
	}
});
