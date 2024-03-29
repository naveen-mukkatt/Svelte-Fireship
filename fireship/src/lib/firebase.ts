// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

const firebaseConfig = {
    apiKey: "AIzaSyDnRkBXcSRV7yuez7VkYxi10Pwp3Jv2naw",
    authDomain: "svelte-tutorial-b1f00.firebaseapp.com",
    projectId: "svelte-tutorial-b1f00",
    storageBucket: "svelte-tutorial-b1f00.appspot.com",
    messagingSenderId: "713052081932",
    appId: "1:713052081932:web:10e696c36745942b598329",
    measurementId: "G-ZPGZC6R0C8"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

function userStore() {
    let unsubscribe: () => void;
    
    if (!auth || !globalThis.window) {
        console.warn('Auth not initialized or not in a browser.');
        const { subscribe } = writable<User | null>(null);

        return {
            subscribe,
        }
    }
    
    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        });

        return () => subscribe();
    });

    return {
        subscribe,
    };


}

export const user = userStore();