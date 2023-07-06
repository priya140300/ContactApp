import React, { useState, useEffect } from 'react'
import { 
   View,
   Text,
   FlatList,
   StyleSheet,
   Image,
   TouchableOpacity,
   
   
} from 'react-native';

import {PermissionsAndroid} from 'react-native';
import ContactCard from '../components/ContactCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';

import { useIsFocused } from '@react-navigation/native';


export default function MyContacts({ navigation }) {

   const isFocused = useIsFocused();

   const [myContacts, setMyContacts] = useState([]);

   useEffect(() => {
      getAllContacts();
   }, [isFocused])

   async function getAllContacts() {
      try {
         const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
         );
         if(permission === 'granted') {
            const contacts = await Contacts.getAll();
            console.log(myContacts);
            setMyContacts(contacts);
         }
      } catch (error) {
         console.log(error);
      }
   }

   
   return (
      <View>
        <TouchableOpacity
         onPress={() => navigation.navigate('CreateContact')}
         >
         
         <Image 
           source={require('../src/plus.png')}
           style={{width:30,height:30}}
         />
              
      </TouchableOpacity>
     

      <FlatList
      data={myContacts}
      keyExtractor={(item) => item.recordID}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile', {
            contactInfo: { id: item.recordID }
         })}>
            <ContactCard contactInfo={item} />
         </TouchableOpacity>   



      )}
      
      
      
      />
         
      </View>
   )
}

const styles = StyleSheet.create({
  
})