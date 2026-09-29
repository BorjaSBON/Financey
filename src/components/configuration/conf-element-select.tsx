import { StyleSheet, Pressable } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors, ThemePreference } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';
import { ThemedSelectInputMini } from '@ui/themed-select-input-mini';

type ThemeSelectItem = {
    label: string;
    value: ThemePreference;
};

interface Props {
    title: string;
}

export default function ConfElementSelect({ title }: Props) {
    // Theme
    const { colors, themePreference, setThemePreference } = useTheme();
    const styles = createStyles(colors);

    // Select data
    let dataSelect: ThemeSelectItem[] = [];
    let valueSelect: ThemePreference = 'system';

    switch (title) {
        case 'Theme':
            dataSelect = [
                {
                    label: 'Light',
                    value: 'light',
                },
                {
                    label: 'Dark',
                    value: 'dark',
                },
                {
                    label: 'System',
                    value: 'system',
                },
            ];

            valueSelect = themePreference;

            break;
    }

    const onSelect = (item: ThemeSelectItem) => {
        switch (title) {
            case 'Theme':
                setThemePreference(item.value);
                break;
        }
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.informationElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
        >
            <ThemedText style={styles.title} weight='light'>{ title }</ThemedText>
            <ThemedSelectInputMini data={ dataSelect } value={ valueSelect } onSelect={ onSelect }/>
        </Pressable>
    );
}


const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        informationElement: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 6,
            paddingBottom: 6,
            paddingHorizontal: Values.paddingElement,
        },

        title: {
            fontSize: 14,
            color: colors.fontPrimary,
        },
    });