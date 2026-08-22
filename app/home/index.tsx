import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

const HomeScreen = () => {
  return (
    <View style={ styles.container }>
        <ThemedText weight='light'>Welcome Borchax!</ThemedText>
        
        <View style={ styles.buttons}>
            <ThemedButton label='Configuration' type='default' onPress={ () => router.push('/configuration') } />
            <ThemedButton label='Add' type='default' onPress={ () => router.push('/products') } />
            <ThemedButton label='List' type='default' onPress={ () => router.push('/products') } />
            <ThemedButton label='Charts' type='default' onPress={ () => router.push('/products') } />
        </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        marginTop: 75,
    },

    buttons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 5,
        marginTop: 25,
    },
});