import { StyleSheet, Text, View, Button, ScrollView, Alert, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useTheme } from '@react-navigation/native';
import ObjectiveFormModal from '../components/ObjectiveFormModal';
import Gap from '../components/Gap';
import GapRow from '../components/GapRow';
import ProgressBar from '../components/ProgressBar';
import { AntDesign } from '@expo/vector-icons';
import uuid from 'react-uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GreyBackdrop from '../components/GreyBackdrop';
import { StatusBar } from 'expo-status-bar';

export default function Counter() {
    const { colors } = useTheme();
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
    const [objectives, setObjectives] = useState([]);

    //Async storage functions
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@objectives', jsonValue)
      } catch (e) {
        // saving error
        console.log(e);
      }
    }
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@objectives')
        if(value !== null) {
          // value previously stored
          setObjectives(JSON.parse(value))
        }
      } catch(e) {
        // error reading value
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

    //Store data in async storage when objetives state updates
    useEffect(() => {
      storeData(objectives);
    }, [objectives]);


    //Functions
    const buttonHandler = () => {
        setIsModalOpened(true);
    }

    const plusHandler = (id) => {
      // loop over the objectives list and find the provided id.
      let updatedList = objectives.map(objective => 
        {
          if (objective.key == id){
            //Check if percentage is less than 100, if so calculate it
            let newPercentage = objective.percentage;
            if(parseInt(objective.percentage) < 100){
              newPercentage = (((objective.count+1)*100)/objective.total)+'%';
            }
            
            return {
              ...objective,
              count: (objective.count+1),
              percentage: newPercentage
            }; //gets everything that was already in objective, and updates "count"
          }
          return objective; // else return unmodified objective
        });
      
      setObjectives(updatedList); // set state to new object with updated list
    }

    const minusHandler = (id) => {
      // loop over the objectives list and find the provided id.
      let updatedList = objectives.map(objective => 
        {
          if (objective.key == id){
            //Check if percentage is less than 100, if so calculate it
            let newPercentage = objective.percentage;
            let newCount = objective.count;
            //check if count is higher than 0
            if(parseInt(objective.count) > 0){
              //only updates percentage if the count is less than the objective total
              if(parseInt(objective.count) <= objective.total){
                newPercentage = (((objective.count-1)*100)/objective.total)+'%';  
              }
              newCount = objective.count-1;
            }
            
            return {
              ...objective,
              count: newCount,
              percentage: newPercentage
            }; //gets everything that was already in objective, and updates "count"
          }
          return objective; // else return unmodified objective
        });
      
      setObjectives(updatedList); // set state to new object with updated list
    }

    const confirmDeletionHadler = (currentObjectiveKey) => {
      return Alert.alert(
          "Delete",
          "Are you sure you want to remove this objetive counter?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                deleteObjectiveHandler(currentObjectiveKey);
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
    }

    const deleteObjectiveHandler = (currentObjectiveKey) => {
      //create a new list of list without the current list with filter() and SetLists to that new list
      setObjectives(objectives => objectives.filter((element) => element.key !== currentObjectiveKey));
    }



    const modalHandler = (title,total) => {
      const newObjective = {
        title: title,
        count: 0,
        total: total,
        percentage: '0%',
        key: uuid()
      }

      setObjectives([...objectives,newObjective]);
    }

    //Check if Fonts Loaded
    if (!fontsLoaded){
      return undefined;
    } else {
      SplashScreen.hideAsync();
    } 

    //Render
    return(
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <StatusBar backgroundColor={colors.card} />
            <ScrollView>
            {objectives.map(objective => {
                return(
                    <View style={[styles.objectiveItem, {backgroundColor: colors.notification, borderColor: colors.border, shadowColor: colors.border}]} key={objective.key}>
                        <Text style={[styles.textSm, {color: colors.text}]}>{objective.title} - {objective.count}/{objective.total}</Text>
                        <Gap pixels='10'/>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => minusHandler(objective.key)}>
                              <AntDesign name="minuscircleo" size={24} color={colors.text} />
                            </TouchableOpacity>
                            <GapRow pixels='10'/>
                            <TouchableOpacity onPress={() => plusHandler(objective.key)}>
                              <AntDesign name="pluscircleo" size={24} color={colors.text}  />
                            </TouchableOpacity>
                        </View>
                        <Gap pixels='10'/>
                        <ProgressBar  percentage={objective.percentage}/>
                        <View style={styles.deleteButton}>
                          <TouchableOpacity onPress={() => {confirmDeletionHadler(objective.key)}}>
                            <AntDesign name='delete' size={18} color="white" />
                          </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
            </ScrollView>

            <Gap pixels='20'/>

            <CustomButton 
                buttonColor='#7891DA'
                buttonTitle='Add objective'
                onPress={buttonHandler}
                iconName='plussquare'
             />
             
             <Gap pixels='20'/>
             <ObjectiveFormModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} modalHandler={modalHandler} />
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
        paddingTop: 20,
      },
      objectiveItem: {
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        borderWidth: 0.3,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 10,
      },
      row: {
        display: 'flex',
        flexDirection: 'row'
      },
      textSm: {
        fontSize: 20,
        fontFamily: 'Inter-Medium'
      },
      deleteButton: {
        backgroundColor: '#DA416A',
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 3,
        borderRadius: 5,
        elevation: 2,
        shadowColor: 'black'
      }

});