/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyDKzbDBrYc6GAiVefJd84B9skkst9_aqBw",
  authDomain: "pushnotify-3979gg.firebaseapp.com",
  projectId: "pushnotify-3979gg",
  storageBucket: "pushnotify-3979gg.appspot.com",
  messagingSenderId: "430197872085",
  appId: "1:430197872085:web:6dfe5eb6ffaf0ae6cb195c",
  measurementId: "G-TS3EEBGYXC",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
