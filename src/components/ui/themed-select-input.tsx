import React, { useRef, useState } from 'react';
import { View, Pressable, FlatList, StyleSheet, Modal } from 'react-native';

import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

type DropdownItem = {
    label: string;
    value: string;
};

interface DropdownProps {
    // Variables
    data: DropdownItem[];
    value: string;

    // Methods
    onSelect: (item: DropdownItem) => void;
}

export function ThemedSelectInput({ data, value, onSelect }: DropdownProps) {
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

    const handleSelect = (item: DropdownItem) => {
        onSelect(item);
        closeDropdown();
    };

    return (
        <View>
            <View style={styles.container}>
                <Pressable ref={ selectRef } style={ styles.select } onPress={ openDropdown }>
                    <ThemedText style={styles.selectedText} weight='light'>{ selectedItem?.label ?? 'Select' }</ThemedText>
                    <ThemedText style={styles.arrow} weight="light">{ open ? '▲' : '▼' }</ThemedText>
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
                            {
                                top: dropdownPosition.y,
                                left: dropdownPosition.x,
                                width: dropdownPosition.width,
                            },
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

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    select: {
        height: 40,
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: Colors.inputBackground,
        borderRadius: 12,
    },

    selectedText: {
        fontSize: 13,
        color: Colors.fontPrimary,
    },

    arrow: {
        fontSize: 18,
        color: Colors.fontPrimary,
    },

    modalContainer: {
        flex: 1,
    },

    dropdown: {
        position: 'absolute',
        maxHeight: 390,
        backgroundColor: Colors.backgroundPrimary,
        borderWidth: 1,
        borderColor: Colors.inputBackground,
        borderRadius: 12,
        elevation: 10,

        shadowColor: Colors.primaryColor,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },

    option: {
        height: 35,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },

    selectedOption: {
        backgroundColor: Colors.inputBackground,
    },

    optionText: {
        fontSize: 12,
        color: Colors.inputTextUnselected,
    },

    selectedOptionText: {
        color: Colors.fontPrimary,
    },
});