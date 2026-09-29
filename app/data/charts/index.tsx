import { StyleSheet, View } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

const DataCharts = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={ styles.container }>
            <ThemedText>Charts</ThemedText>
        </View>
    );
};

export default DataCharts;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            top: Values.topNotHeader,
            width: '100%',
            paddingBottom: 125,
        },
    }
);
