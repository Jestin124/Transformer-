// Deprecated: this file is intentionally left as a safe no-op so the app does not
// depend on the optional Capacitor FCM package during build or development.

export async function registerNativeAndroidPush() {
  return { available: false, reason: 'not-configured' };
}

export async function requestAndroidPushPermission() {
  return { available: false, reason: 'not-configured' };
}
