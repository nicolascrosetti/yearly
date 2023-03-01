import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import ListFormModal from '../components/ListFormModal';
import uuid from 'react-uuid';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Gap from '../components/Gap';
import List from '../components/List';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GreyBackdrop from '../components/GreyBackdrop';

export default function Lists() {
    //Load fonts
    const [fontsLoaded] = useFonts({
        'Inter': require('../assets/fonts/Inter-ExtraLight.ttf'),
        'Inter': require('../assets/fonts/Inter-Light.ttf'),
        'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
        'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf')
    });

    // useState
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isListOpened, setIsListOpened] = useState(false);
    const [currentList, setCurrentList] = useState(0);
    const [lists, setLists] = useState([
        {
            title: 'Albums of 2023',
            list: 'First Album\nSecond Album\nThird Album',
            key: uuid()
        },
        {
            title: 'Albums (not 2023)',
            list: 'Ants From Up There\nHellfire\nCaveworld',
            key: uuid()
        }
    ]);

    //Async storage functions
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@lists', jsonValue)
        } catch (e) {
          // saving error
          console.log(e);
        }
      }
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@lists')
          if(value !== null) {
            // value previously stored
            setLists(JSON.parse(value))
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }

    // useEffect
    //initial render
    useEffect(() => {
        //Prevent splash screen auto hiding to load fonts
        async function prepare(){
            await SplashScreen.preventAutoHideAsync();
          }
          prepare();

        //get previous data from async storage
        getData();
    }, []);

    //Store data in async storage when lists state updates
    useEffect(() => {
        storeData(lists);
    }, [lists]);

    //functions
    const modalHandler = (title, list) => {
        const newList = {
            title: title,
            list: list,
            key: uuid()
        }

        setLists([...lists, newList]);
    }

    const listPressHandler = (list) => {
        setIsListOpened(true);
        setCurrentList(list);
    }

    const editHandler = (editedTitle,editedList) => {
        // loop over the lists and find the current list
        let updatedList = lists.map(list => 
          {
            if (list.key == currentList.key){
                setCurrentList({
                    ...list,
                    title: editedTitle,
                    list: editedList
                });
                return {
                  ...list,
                  title: editedTitle,
                  list: editedList
                }; //gets everything that was already in list, and updates "title" and "list"
            }
            return list; // else return unmodified list
          });
        
        setLists(updatedList); // set state to new object with updated list
    }

    const deleteListHandler = () => {
        //create a new list of list without the current list with filter() and SetLists to that new list
        setLists(lists => lists.filter((element) => element.key !== currentList.key));
        setIsListOpened(false);
    }

    //Check if Fonts Loaded
    if (!fontsLoaded){
        return undefined;
      } else {
        SplashScreen.hideAsync();
      } 

    //Render
    return(
        <View style={styles.container}>
            <ScrollView>
                {lists.map(list => {
                    return(
                        <TouchableOpacity key={list.key} onPress={() => listPressHandler(list)}>
                            <View  style={styles.listItem}>
                                <Text style={styles.textSm} >{list.title}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <List 
                isListOpened={isListOpened}
                setIsListOpened={setIsListOpened} 
                listTitle={currentList.title} 
                listList={currentList.list} 
                deleteListHandler={deleteListHandler} 
                editHandler={editHandler}
            />

             <CustomButton 
                buttonColor='#7891DA'
                buttonTitle='Add list'
                onPress={() => setIsModalOpened(true)}
                iconName='plussquare'
             />
            <Gap  pixels='20' />
            <ListFormModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} modalHandler={modalHandler} />
            { isModalOpened ?  <GreyBackdrop></GreyBackdrop> : null}
        </View>
    );
}

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'aliceblue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#DEE7FF',
        borderWidth: 0.15,
        borderColor: '#CDD4DA',
        paddingLeft: 80,
        paddingRight: 80,
        marginBottom: 5,
        elevation: 5,
        shadowColor: '#CDD4DA',
    },
    textSm: {
        fontSize: 20,
        fontFamily: 'Inter-Medium'
      }
});