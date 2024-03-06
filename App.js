import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import { collection, addDoc, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import db from './firebaseConfig';

export default function App() {
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "cities"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setCities(data);
  };

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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}, {item.country}</Text>
      <TouchableOpacity onPress={() => updateCity(item.id)}>
        <Text style={styles.action}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteCity(item.id)}>
        <Text style={styles.action}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityName}
        onChangeText={text => setCityName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter country name"
        value={countryName}
        onChangeText={text => setCountryName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addCity}>
        <Text style={styles.text}>Add City</Text>
      </TouchableOpacity>
      <FlatList
        data={cities}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
    paddingTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
  action: {
    color: 'blue',
    marginLeft: 10,
  },
});
