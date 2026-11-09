import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function setupNotifications(): Promise<boolean> {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('budget', {
            name: 'Budget alert',
            importance: Notifications.AndroidImportance.HIGH,
            sound: 'default',
        });
    }

    const { status: existing } = await Notifications.getPermissionsAsync();
    let status = existing;

    if (existing !== 'granted') {
        ({ status } = await Notifications.requestPermissionsAsync());
    }

    return status === 'granted';
}

export async function sendLocalNotification(title: string, body: string) {
    await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: Platform.OS === 'android' ? { channelId: 'budget' } : null,
    });
}