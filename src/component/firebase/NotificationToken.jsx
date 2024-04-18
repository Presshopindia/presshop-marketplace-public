import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";
export const requestForToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        return getToken(messaging, { vapidKey: "BNFALdFhcWIXJjwETVmxzs2X5KnUGM4NZ7PdK0pQLnOklFyiQJMaYOZesPKmODpUoW6l_oUqj3Vzcwh7fMMoUKE" })
            .then((currentToken) => {
                if (currentToken) {
                    localStorage.setItem("DeviceToken", currentToken)
                    // console.log('current token for client: ', currentToken);
                    // Perform any other neccessary action with the token
                } else {
                    // Show permission request UI
                    // console.log('No registration token available. Request permission to generate one.');
                }
            })
            .catch((err) => {
                // console.log('An error occurred while retrieving token. ', err);
            });
    }
    else if (permission === 'denied') {
        // alert("Permission Denied")
    }

};