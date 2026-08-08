import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

import { Colors } from '@constants/colors';

type DropdownItem = {
    label: string;
    value: string;
};

interface DropdownProps  {
    // Variables
    data: DropdownItem[];
    value: string;

    // Methods
    onSelect: (item: DropdownItem) => void;
}

export function ThemedSelectInput({ data, value, onSelect }: DropdownProps ) {
    const [open, setOpen] = useState(false);

    const selectedItem = data.find(item => item.value === value);

    return (
        <View style={ styles.container } pointerEvents="box-none">
            <Pressable
                style={ styles.select }
                onPress={() => setOpen(prev => !prev)}
            >
                <Text style={styles.selectedText}>{selectedItem?.label ?? 'Seleccionar...'}</Text>
                <Text style={styles.arrow}>
                    {open ? '▲' : '▼'}
                </Text>
            </Pressable>

            { open && (
                <View style={styles.dropdown} pointerEvents="auto">
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.value}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable
                                style={[
                                    styles.option,
                                    item.value === value && styles.selectedOption,
                                ]}
                                onPress={() => {
                                    onSelect(item);
                                    setOpen(false);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        item.value === value && styles.selectedOptionText,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </Pressable>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        zIndex: 100,
        elevation: 100,
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

    dropdown: {
        position: 'absolute',
        zIndex: 100,
        elevation: 100,
        top: 45,
        width: '100%',
        maxHeight: 400,
        backgroundColor: Colors.backgroundPrimary,
        borderWidth: 1,
        borderColor: Colors.inputBackground,
        borderRadius: 12,
        overflow: 'hidden',
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