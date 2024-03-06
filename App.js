import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { collection, addDoc, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useEffect } from 'react';
import db from './firebaseConfig';

export default function App() {

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

    const getCity = async () => {
      const docRef = doc(db, "cities", "follow the output of addCity");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getCity();
    
    const updateCity = async () => {
      await setDoc(doc(db, "cities", "follow the output of addCity"), {
        name: "Los Angles",
        state: "CA",
        country: "USA"
      })
    }
    updateCity();

    const deleteCity = async () => {
      await deleteDoc(doc(db, "cities", "follow the output of addCity"), {
        name: "Los Angles",
        state: "CA",
        country: "USA"
      })
    }
    deleteCity();
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity style={styles.button} onPress={ () => { addCity() } }>
        <Text style={styles.text}>addCity</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={ () => { getCity() } }>
        <Text style={styles.text}>getCity</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={ () => { updateCity() } }>
        <Text style={styles.text}>updateCity</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={ () => { deleteCity() } }>
        <Text style={styles.text}>deleteCity</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: 'cyan',
    margin: 10,
  },
  text: {
    padding: 10,
  }
});
