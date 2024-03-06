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

### 9. Add CRUD operation

Add Firestore snippet to perform basic CRUD operations. For example, adding add:

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
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { useEffect } from 'react';
import db from './firebaseConfig';

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

To integrate Firestore into your app.js, follow these steps:

- Import Firestore Modules: Import necessary Firestore modules such as collection, addDoc, getDoc, doc, and setDoc from "firebase/firestore".

```
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
```

- Initialize Firestore: Import the db object from your firebaseConfig.js file to initialize Firestore within your app.js.

```
import db from "./firebaseConfig";
```

### 11. Setup Database in Firebase

- Navigate to the Firestore database section in your Firebase console.

- Create a new Firestore database or choose an existing one for testing purposes.

- Update Firestore Rules: Set the Firestore security rules to allow read and write operations by setting them to `true`.

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
- run the program and then check firestore databse

![image](https://github.com/ascaryaaa/react-native-firebase-firestore/assets/73589875/d80403dc-3a14-47e0-aab2-aec682b901b0)

### 12. add more CRUD Implementatrion: 

### Get

Implement a function to retrieve data from Firestore using the getDoc() function. Replace "cities" and "SF" with your collection name and document ID respectively.

```
    const getCity = async () => {
      const docRef = doc(db, "cities", "SF");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getCity();
```

Change SF to firebase document token

```
    const getCity = async () => {
      const docRef = doc(db, "cities", "maIfJJZQOe4pU5HawVgE");
```

Result:
![image](https://github.com/ascaryaaa/react-native-firebase-firestore/assets/73589875/cd5786bc-92fd-42d6-b85f-b87fdd9363f7)

### Update

Implement a function to update data in Firestore using the setDoc() function. Replace "cities", "SD", and the object with your collection name, document ID, and new data respectively.

```
    const updateCity = async () => {
      await setDoc(doc(db, "cities", "SD"), {
        name: "Los Angles",
        state: "CA",
        country: "USA"
      })
    }
    updateCity();
```

Change SF to firebase document token

```
    const updateCity = async () => {
      await setDoc(doc(db, "cities", "maIfJJZQOe4pU5HawVgE"), {
```

Result:
![image](https://github.com/ascaryaaa/react-native-firebase-firestore/assets/73589875/1d8af841-4be9-4fdb-a25a-e7536c3b3ae1)

### Delete

```
    const deleteCity = async () => {
      await deleteDoc(doc(db, "cities", "DC"), {
        name: "Los Angles",
        state: "CA",
        country: "USA"
      })
    }
    deleteCity();
```
Change DC to firebase document token

```
    const deleteCity = async () => {
      await deleteDoc(doc(db, "cities", "maIfJJZQOe4pU5HawVgE"), {
```

### 13.Implementing Real-Time Data Fetching with Firestore

To enhance the application's functionality, real-time data fetching is implemented using Firebase Firestore. With real-time data fetching, the application can update its UI automatically whenever there's a change in the database.

Before integrating real-time data fetching, the application manually fetched data from Firestore when needed. Now, with the useEffect hook, the application fetches data upon component mount, ensuring that the latest data is always displayed to the user.

```
useEffect(() => {
  fetchData();
}, []);
```

The fetchData function retrieves data from the Firestore collection "cities" and updates the cities state with the retrieved data.

```
const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "cities"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  setCities(data);
};
```

### 14. Updating Add City Functionality

Previously, the "Add City" functionality only updated the local state with the newly added city. Now, it also adds the city to the Firestore database in real-time.

```
const addCity = async () => {
  try {
    const docRef = await addDoc(collection(db, "cities"), {
      name: cityName,
      country: countryName
    });
    console.log("Document written with ID: ", docRef.id);
    setCities([...cities, { id: docRef.id, name: cityName, country: countryName }]);
    setCityName('');
    setCountryName('');
  } catch (error) {
    console.error("Error writing document: ", error)
  }
};

```

### 15. Enhancing Update and Delete Functionality

Previously, the "Update City" and "Delete City" functionalities only operated on the local state. Now, they also update or delete the corresponding document in the Firestore database in real-time.

```
const updateCity = async (id) => {
  try {
    await setDoc(doc(db, "cities", id), {
      name: cityName,
      country: countryName
    });
    console.log("Document updated");
    const updatedCities = cities.map(city => {
      if (city.id === id) {
        return { ...city, name: cityName, country: countryName };
      }
      return city;
    });
    setCities(updatedCities);
    setCityName('');
    setCountryName('');
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

const deleteCity = async (id) => {
  try {
    await deleteDoc(doc(db, "cities", id));
    console.log("Document deleted");
    const updatedCities = cities.filter(city => city.id !== id);
    setCities(updatedCities);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

```

These enhancements ensure that the application interacts seamlessly with the Firestore database, providing users with a real-time experience when adding, updating, or deleting cities.
