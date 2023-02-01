import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyDKzbDBrYc6GAiVefJd84B9skkst9_aqBw",
  authDomain: "pushnotify-3979gg.firebaseapp.com",
  projectId: "pushnotify-3979gg",
  storageBucket: "pushnotify-3979gg.appspot.com",
  messagingSenderId: "430197872085",
  appId: "1:430197872085:web:6dfe5eb6ffaf0ae6cb195c",
  measurementId: "G-TS3EEBGYXC",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

//  function get token -> ở bước này có thể lấy token từ log và sd trực tiếp trên Firebase
export async function getTokenFromFirebase() {
  let tokenUser = "";
  await getToken(messaging, {
    vapidKey:
      "BByL8OwCx8VOzqwOET5eIw0qzUdMtLX-ucj8tas-LOxSaX3QPEHLDL8RyWTeEwOwGJwE91eZ6JJfghYWIhqjKjU",
  })
    .then((currentToken) => {
      if (currentToken) {
        tokenUser = currentToken;
        console.log("current token for client: ", currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
  return tokenUser;
}

//This function listens to push messages on the server

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const requestPermission = () => {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
};
