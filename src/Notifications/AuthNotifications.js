import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {useEffect, useState} from 'react';

export const useNotificaiton = () => {
  async function displayNotification(title, body) {
    const channelId = await notifee.createChannel({
      id: 'importance',
      name: 'Important Notification',
      importance: AndroidImportance.HIGH,
      badge: true,
    });

    await notifee.requestPermission();
    const notficationId = notifee.displayNotification({
      title: 'one time password',
      body: body,

      android: {
        channelId,
        largeIcon: 'https://cdn-icons-png.flaticon.com/512/1621/1621635.png',
        importance: AndroidImportance.HIGH,
        color: 'red',
        actions: [
          {
            title: 'Copy',
            icon: 'https://cdn-icons-png.flaticon.com/512/1621/1621635.png',
            pressAction: {id: 'dance'},
          },
        ],
      },
    });
    return notficationId;
  }
  return {
    displayNotification,
  };
};
