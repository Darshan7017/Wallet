importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAN4ywh6KSawZj2ROgsugBWd7V2YF5FBqM",
  authDomain: "smart-wallet-dboss.firebaseapp.com",
  projectId: "smart-wallet-dboss",
  storageBucket: "smart-wallet-dboss.appspot.com",
  messagingSenderId: "753281675889",
  appId: "1:753281675889:web:18ba58c19f2747037e61d0",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png', // Change icon path as needed
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});