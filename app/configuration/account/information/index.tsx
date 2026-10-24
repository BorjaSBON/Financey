import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';

import InformationElement from '@components/configuration/information-element';

import { useProfiles } from '@/src/hooks/useProfiles';

export default function AccountInformation() {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Get the profile
    const { profile, loadingProfiles } = useProfiles();

    // Variables
    const [ creationDate, setCreationDate ] = useState(languages['dateEmpty']);
    const [ lastActionDate, setLastActionDate ] = useState(languages['dateEmpty']);

    useEffect(() => {
        if (profile) {
            const formatDate = (date: string) => {
                return (new Date(date)).toLocaleDateString(languages['dateFormat'], { month: 'long', day: '2-digit', year: 'numeric' }) + ' - ' + new Date(date).toLocaleTimeString(languages['dateFormat']);
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
                        <ThemedText style={ styles.title } weight='medium'>{ languages['profile'] }</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title={ languages['username'] } data={ profile?.username || languages['username'] } />
                            <InformationElement title={ languages['creationDate'] } data={ creationDate } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='medium'>{ languages['actions'] }</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title={ languages['lastActionDate'] } data={ lastActionDate } />
                            <InformationElement title={ languages['lastAction'] } data={ profile?.last_action || 'actionEmpty' in languages ? languages[profile?.last_action as keyof typeof languages] : languages['actionEmpty']} />
                            <InformationElement title={ languages['numberActions'] } data={ String(profile?.number_actions) || '000' } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='medium'>{ languages['transactions'] }</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title={ languages['currentNumberTransactions'] } data={ String(profile?.number_transactions) || '000' } />
                            <InformationElement title={ languages['transactionsAdded'] } data={ String(profile?.number_transactions_added) || '000' } />
                            <InformationElement title={ languages['transactionsModified'] } data={ String(profile?.number_transactions_modified) || '000' } />
                            <InformationElement title={ languages['transactionsDeleted'] } data={ String(profile?.number_transactions_deleted) || '000' } />
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
            rowGap: Values.rowGapSection,
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
