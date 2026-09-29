import { useRef, useState } from 'react';
import { View, Pressable, FlatList, StyleSheet, Modal } from 'react-native';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

export type DropdownItem<T extends string = string> = {
    label: string;
    value: T;
};

interface DropdownProps<T extends string = string> {
    data: DropdownItem<T>[];
    value: T;
    onSelect: (item: DropdownItem<T>) => void;
}

export function ThemedSelectInputMini<T extends string = string>({ data, value, onSelect }: DropdownProps<T>) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Data
    const [open, setOpen] = useState(false);

    const [dropdownPosition, setDropdownPosition] = useState({
        x: 0,
        y: 0,
        width: 0,
    });

    const selectRef = useRef<View>(null);

    const selectedItem = data.find(
        item => item.value === value
    );

    const openDropdown = () => {
        selectRef.current?.measureInWindow(
            (x, y, width, height) => {
                setDropdownPosition({
                    x,
                    y: y + height + 5,
                    width,
                });

                setOpen(true);
            }
        );
    };

    const closeDropdown = () => {
        setOpen(false);
    };

    const handleSelect = (item: DropdownItem<T>) => {
        onSelect(item);
        closeDropdown();
    };

    return (
        <View>
            <View style={ styles.container }>
                <Pressable ref={ selectRef } style={ styles.select } onPress={ openDropdown }>
                    <ThemedText style={styles.selectedText} weight='light'>{ selectedItem?.label ?? 'Select' }</ThemedText>
                </Pressable>
            </View>

            <Modal
                visible={ open }
                transparent
                animationType="none"
                onRequestClose={ closeDropdown }
            >
                <View style={ styles.modalContainer }>
                    <Pressable style={ StyleSheet.absoluteFill } onPress={ closeDropdown } />

                    <View
                        style={[
                            styles.dropdown,
                            { top: dropdownPosition.y, left: dropdownPosition.x, width: dropdownPosition.width },
                        ]}
                    >
                        <FlatList
                            data={ data }
                            keyExtractor={ item => item.value }
                            showsVerticalScrollIndicator
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <Pressable style={[ styles.option, item.value === value && styles.selectedOption ]} onPress={ () => handleSelect(item) }>
                                    <ThemedText style={[ styles.optionText, item.value === value && styles.selectedOptionText ]} weight='light'>{ item.label }</ThemedText>
                                </Pressable>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            width: '100%',
        },

        select: {
            width: 75,
            paddingHorizontal: 15,
            paddingVertical: 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            backgroundColor: colors.inputMiniBackground,
            borderRadius: 5,
        },

        selectedText: {
            width: '100%',
            textAlign: 'center',
            fontSize: 11,
            color: colors.inputMiniFont,
        },

        modalContainer: {
            flex: 1,
        },

        dropdown: {
            position: 'absolute',
            maxHeight: 390,
            backgroundColor: colors.inputMiniBackgroundDropdown,
            borderWidth: 1,
            borderColor: colors.inputMiniBackgroundDropdown,
            borderRadius: 5,
            elevation: 10,

            shadowColor: colors.inputMiniBackgroundDropdown,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 8,
        },

        option: {
            height: 30,
            paddingHorizontal: 15,
            justifyContent: 'center',
        },

        selectedOption: {
            backgroundColor: colors.inputMiniBackground,
        },

        optionText: {
            width: '100%',
            textAlign: 'center',
            fontSize: 10,
            color: colors.inputMiniFontPlaceholder,
        },

        selectedOptionText: {
            color: colors.inputMiniFont,
        },
    }
);