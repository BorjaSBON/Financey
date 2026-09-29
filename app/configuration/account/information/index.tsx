import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import InformationElement from '@components/configuration/information-element';

import { useProfiles } from '@/src/hooks/useProfiles';

export default function AccountInformation() {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Get the profile
    const { profile, loadingProfiles } = useProfiles();

    // Variables
    const [ creationDate, setCreationDate ] = useState('Month DD, YYYY - HH:MM:SS');
    const [ lastActionDate, setLastActionDate ] = useState('Month DD, YYYY - HH:MM:SS');

    useEffect(() => {
        if (profile) {
            const formatDate = (date: string) => {
                return (new Date(date)).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) + ' - ' + new Date(date).toLocaleTimeString('en-GB');
            };

            setCreationDate(formatDate(profile.creation_date));
            setLastActionDate(formatDate(profile.last_action_date));
        }
    }, [profile]);

    // Check if the profile is loaded
    if (loadingProfiles) {
        return <ActivityIndicator />
    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Profile</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title='Username' data={ profile?.username || 'Username' } />
                            <InformationElement title='Creation date' data={ creationDate } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Actions</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title='Last action date' data={ lastActionDate } />
                            <InformationElement title='Last action' data={ profile?.last_action || 'Action name' } />
                            <InformationElement title='Number of actions' data={ String(profile?.number_actions) || '000' } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Transactions</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title='Current number of transactions' data={ String(profile?.number_transactions) || '000' } />
                            <InformationElement title='Number of transactions added' data={ String(profile?.number_transactions_added) || '000' } />
                            <InformationElement title='Number of transactions modified' data={ String(profile?.number_transactions_modified) || '000' } />
                            <InformationElement title='Number of transactions deleted' data={ String(profile?.number_transactions_deleted) || '000' } />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            top: Values.topIfHeader,
            width: '100%',
            paddingTop: 5,
        },

        sections: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 15,
            paddingHorizontal: Values.paddingApp,
            paddingBottom: 125,
        },

        section: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 8,
        },

        title: {
            fontSize: 13,
        },

        elements: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
        },
    }
);
