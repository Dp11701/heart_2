// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAqEYAC1isVQRHf8q9LRwKxPARVsWvn9jE",
  authDomain: "tracking-event-server-adjust.firebaseapp.com",
  projectId: "tracking-event-server-adjust",
  storageBucket: "tracking-event-server-adjust.firebasestorage.app",
  messagingSenderId: "911004696184",
  appId: "1:911004696184:web:718e5eb907ea877c44f78d",
  measurementId: "G-79HK0D6V8X",
};

// Initialize Firebase app once. This is safe on server and client.
const app = initializeApp(firebaseConfig);

// Lazily initialize Analytics only on the client to avoid SSR "window is not defined".
let analyticsInstance: Analytics | null = null;

function getClientAnalytics(): Analytics | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (!analyticsInstance) {
    try {
      analyticsInstance = getAnalytics(app);
    } catch {
      // Analytics not supported (e.g., unsupported environment)
      return null;
    }
  }
  return analyticsInstance;
}

export class FirebaseUtils {
  static trackingIntro(
    actionName: string,
    extraInfo: Record<string, string> = {}
  ) {
    const defaultInfo = {
      action_type: "screen",
      action_name: actionName,
    };
    const params = { ...defaultInfo, ...extraInfo };
    const analytics = getClientAnalytics();
    if (!analytics) return;
    logEvent(analytics, "screen_active", params);
  }

  static trackingPayment(
    actionName: string,
    extraInfo: Record<string, string> = {}
  ) {
    const defaultInfo = {
      action_type: "paywall",
      action_name: actionName,
    };
    const params = { ...defaultInfo, ...extraInfo };
    const analytics = getClientAnalytics();
    if (!analytics) return;
    logEvent(analytics, "purchased_new", params);
  }
}
