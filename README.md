# Setting up Firebase in an Android App
### 1. Configure Android App

Create an Android app with a package name matching the one specified in your app.json. Ensure you have an adaptive icon configured, and the package name set to "com.ascaryaaa.cicd".

```
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.ascaryaaa.cicd"
    },
```

### 2. Download google-services.json

Download the google-services.json file from Firebase for your project.

### 3. Add google-services.json to Project Root

Place the downloaded google-services.json file in the root directory of your Android project.

![image](https://github.com/ascaryaaa/expo-cicd/assets/73589875/c4234c84-b695-4090-a9f9-d7e43fa7ae2d)

### 4. Install Firebase SDK

Install the Firebase SDK by running the following command:

```
npx expo install firebase
```


### 5. Initialize Firebase SDK

Create a `firebaseConfig.js` file and initialize the Firebase SDK by passing the configuration object to initializeApp() method.

```
import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

```


### 6. Configure Firebase for Web

Add another app configuration for web with a nickname example: "learn" in Firebase console.

### 7. Copy the web cofiguration to the `firebaseConfig.js`
```
const firebaseConfig = {
    apiKey: "AIzaSyDWPwQTep1CwjYrH0Y8sOv4tSTWk8U8w5M",
    authDomain: "testapp-71422.firebaseapp.com",
    projectId: "testapp-71422",
    storageBucket: "testapp-71422.appspot.com",
    messagingSenderId: "667703682475",
    appId: "1:667703682475:web:881b7f9e970afdd6aa5eee",
    measurementId: "G-PH0125NDRY"
  };
```

Inside `firebaseConfig.js` to become:
```
import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDWPwQTep1CwjYrH0Y8sOv4tSTWk8U8w5M",
    authDomain: "testapp-71422.firebaseapp.com",
    projectId: "testapp-71422",
    storageBucket: "testapp-71422.appspot.com",
    messagingSenderId: "667703682475",
    appId: "1:667703682475:web:881b7f9e970afdd6aa5eee",
    measurementId: "G-PH0125NDRY"
  };

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

```

### 8. Import Firebase Modules

Import necessary Firebase modules like Firestore into your firebaseConfig.js file.

```
import { getFirestore } from 'firebase/firestore';
//
const db = getFirestore(app);
export default db;
```

### 9. Add Firestore Snippet

Add Firestore snippet to perform basic CRUD operations. For example:

```
  useEffect(() => {
    const addCity = async () => {
      try {
        const docRef = await addDoc(collection(db, "cities"), {
          name: "tokyo",
          country: "Japan"
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error writting document: ", error)
      }
    };
    addCity();
  }, []);
```

To app.js, to become like this:

```
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { doc, setDoc, collection, addDog } from "firebase/firestore";
import db from "./firebaseConfig";
import { useEffect } from 'react';

export default function App() {
  
  useEffect(() => {
    const addCity = async () => {
      try {
        const docRef = await addDoc(collection(db, "cities"), {
          name: "tokyo",
          country: "Japan"
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error writting document: ", error)
      }
    };
    addCity();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


```

### 10. Integrate Firestore in App

- Import Firestore Modules: Import necessary Firestore modules such as doc, setDoc, collection, and addDog from "firebase/firestore".

```
import { doc, setDoc, collection, addDog } from "firebase/firestore";
```

- Initialize Firestore: Import the db object from your firebaseConfig.js file to initialize Firestore within your app.js.

```
import db from "./firebaseConfig";
```

### 11. Setup Databse in Firebase

- Navigate to firestore database, then create database testing
- Set the rule allow read, write to `true`

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
- run the program

check in databse firestore

![image](https://github.com/ascaryaaa/react-native-firebase-firestore/assets/73589875/d80403dc-3a14-47e0-aab2-aec682b901b0)
