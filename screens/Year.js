import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { differenceInDays, differenceInCalendarWeeks, differenceInCalendarMonths } from 'date-fns';
import { useFonts } from 'expo-font';
import { useTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import ProgressBar from '../components/ProgressBar';
import Gap from '../components/Gap';



export default function Year() {
  const { colors } = useTheme();
  //Load fonts
  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter-ExtraLight.ttf'),
    'Inter': require('../assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Thin': require('../assets/fonts/Inter-Thin.ttf')
  });

  // useState
  const [today, setToday] = useState(new Date());
  const [yearPercentage, setYearPercentage] = useState(0);

  // useEffect
  useEffect(() => {
    //Set today's date
    setToday(new Date());

    //Set year progress percentage
    const percetange = ((dayNumber * 100) / 365)+ '%';
    setYearPercentage(percetange);

    //Prevent splash screen auto hiding to load fonts
    async function prepare(){
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
 
  //Variables and Functions
  const dayNumber = differenceInDays(
    today,
    new Date(2023, 0, 0)
  )

  const weekNumber = differenceInCalendarWeeks(
    today,
    new Date(2023, 0, 0)
  )

  const monthNumber = differenceInCalendarMonths(
    today,
    new Date(2023, 0, 0)
  )

  const pixelsGap = '30';

  //Check if Fonts Loaded
  if (!fontsLoaded){
    return undefined;
  } else {
    SplashScreen.hideAsync();
  } 

  //Render
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Progress Text */}   
      <Text style={[styles.text, {color: colors.text}]}>
        Day 
        <Text style={styles.green}> {dayNumber} </Text> 
        of 
        <Text style={styles.red}> 365 </Text> 
      </Text>
      <Gap pixels={pixelsGap}></Gap>
      <Text style={[styles.text, {color: colors.text}]}>
        Week
        <Text style={styles.green}> {weekNumber} </Text> 
        of 
        <Text style={styles.red}> 52 </Text> 
      </Text>
      <Gap pixels={pixelsGap}></Gap>
      <Text style={[styles.text, {color: colors.text}]}>
        Month
        <Text style={styles.green}> {monthNumber} </Text> 
        of 
        <Text style={styles.red}> 12 </Text> 
      </Text>
      <Gap pixels='75'></Gap>
      {/* Progress Bar */}
      <View style={styles.barContainer}>
        <ProgressBar percentage={yearPercentage}/>
        <Text style={[styles.textSm, {color: colors.text}]}>Year Progress</Text>
      </View>
    </View>
  );
}

//Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F8FF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 150
    },
    barContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    text: {
      fontSize: 30,
      fontFamily: 'Inter'
      
    },
    textSm: {
      fontSize: 20,
      fontFamily: 'Inter-Thin',
    },
    green: {
      color: '#6ADA41'
    },
    red: {
      color: '#DA416A'
    }
  });