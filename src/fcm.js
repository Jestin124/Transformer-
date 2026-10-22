import { Capacitor } from '@capacitor/core';
import { FCM } from '@capacitor-community/fcm';

export async function registerNativeAndroidPush(options = {}) {
  const { onMessage, onTokenRefresh, onError } = options;

  if (!Capacitor.isNativePlatform()) {
    console.info('FCM registration skipped: not running on a native mobile platform.');
    return { available: false, reason: 'not-native' };
  }

  try {
    const permissionResult = await FCM.requestPermissions();
    const hasPermission = permissionResult?.receive === true || permissionResult?.granted === true || permissionResult === true;

    if (!hasPermission) {
      const err = new Error('FCM permission denied.');
      if (typeof onError === 'function') onError(err);
      return { available: false, reason: 'permission-denied', error: err };
    }

    if (typeof onTokenRefresh === 'function') {
      FCM.addListener('tokenRefresh', (event) => {
        const refreshedToken = event?.token || event?.value || null;
        if (refreshedToken) onTokenRefresh(refreshedToken);
      });
    }

    if (typeof onMessage === 'function') {
      FCM.addListener('notificationReceived', (payload) => {
        onMessage(payload);
      });
    }

    const tokenResult = await FCM.getToken();
    const token = tokenResult?.token || tokenResult?.value || tokenResult || null;

    return { available: true, token };
  } catch (error) {
    console.warn('FCM registration failed. Ensure Firebase Android config and the native plugin are installed.', error);
    if (typeof onError === 'function') onError(error);
    return { available: false, reason: 'not-configured', error };
  }
}

export async function requestAndroidPushPermission(options = {}) {
  const { onError } = options;

  if (!Capacitor.isNativePlatform()) {
    return { available: false, reason: 'not-native' };
  }

  try {
    const permissionResult = await FCM.requestPermissions();
    return {
      available: true,
      granted: permissionResult?.receive === true || permissionResult?.granted === true || permissionResult === true,
      result: permissionResult
    };
  } catch (error) {
    if (typeof onError === 'function') onError(error);
    console.warn('Android push permission request failed.', error);
    return { available: false, reason: 'not-configured', error };
  }
}
