import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { differenceInDays, differenceInCalendarWeeks, differenceInCalendarMonths} from 'date-fns';
import { useFonts } from 'expo-font';
import { useTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import ProgressBar from '../components/ProgressBar';
import Gap from '../components/Gap';
import * as Location from 'expo-location';
import Snowflake from '../components/Seasons/Snowflake';
import Snowfall from '../components/Seasons/Snowfall';
import Leaf from '../components/Seasons/Leaf';
import LeafFall from '../components/Seasons/LeafFall';
import Summer from '../components/Seasons/Summer';
import Spring from '../components/Seasons/Spring';



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

  //Images
  const winterImage = require('../assets/images/winter.png');
  const autumnImage = require('../assets/images/autumn.png');
  const summerImage = require('../assets/images/summer.png');
  const springImage = require('../assets/images/spring.png');

  // useState
  const [today, setToday] = useState(new Date());
  const [yearPercentage, setYearPercentage] = useState(0);
  const [userHemisphere, setUserHemisphere] = useState(0);
  const [userSeason, setUserSeason] = useState(0);

  // useEffect
  useEffect(() => {
    //get users hemisphere
    getUserHemisphere()
    .then(hemisphere => {
      setUserHemisphere(hemisphere);
    })
    .catch(error => {
      console.log('Error getting user hemisphere:', error);
    });

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

  useEffect(() => {
    //get users season
    if (userHemisphere == 'southern') {
      if (monthNumber == 12 || monthNumber == 1 || monthNumber == 2) {
        setUserSeason('summer');
      } else if (monthNumber == 3) {
        if (dayNumber >= 1 && dayNumber < 21) {
          setUserSeason('autumn');
        } else {
          setUserSeason('summer');
        }
      } else if (monthNumber == 4 || monthNumber == 5) {
        setUserSeason('autumn');
      } else if (monthNumber == 6 || monthNumber == 7 || monthNumber == 8) {
        setUserSeason('winter');
      } else {
        setUserSeason('spring');
      }
    } else if (userHemisphere == 'northern') {
      if (monthNumber == 12 || monthNumber == 1 || monthNumber == 2) {
        setUserSeason('winter');
      } else if (monthNumber == 3) {
        if (dayNumber >= 1 && dayNumber < 20) {
          setUserSeason('winter');
        } else {
          setUserSeason('spring');
        }
      } else if (monthNumber == 4 || monthNumber == 5) {
        setUserSeason('spring');
      } else if (monthNumber == 6 || monthNumber == 7 || monthNumber == 8) {
        setUserSeason('summer');
      } else {
        setUserSeason('autumn');
      }
    }
    
  }, [userHemisphere]);
 
  //Variables and Functions
  //get users hemisphere
  const getUserHemisphere = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return null;
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude } = coords;
  
    if (latitude >= 0) {
      return 'northern';
    } else {
      return 'southern';
    }
  };

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
    
    <ImageBackground 
      source={
        userSeason == 'winter' ? winterImage 
        : userSeason == 'autumn' ? autumnImage 
          : userSeason == 'summer' ? summerImage 
            : userSeason == 'spring' ? springImage : null
      }
      style={styles.background} 
      opacity={0.4} 
      resizeMode='stretch'
    >
      <View style={styles.container} opacity={1}>
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
        <Gap pixels='15'></Gap>
        {/* Season visuals */}   
        {/* <Text style={styles.text}> {userSeason} </Text> */}

        <Gap pixels='25'></Gap>
        {/* Progress Bar */}
        <View style={styles.barContainer}>
          <ProgressBar percentage={yearPercentage}/>
          <Text style={[styles.textSm, {color: colors.text}]}>Year Progress</Text>
        </View>
      </View>

      {/* Season animation */}
      { userSeason == 'winter' 
        ? <Snowfall flakes={15} duration={5000} size={15} delay={500} />
        : userSeason  == 'autumn' ? 
          <LeafFall  count={7} />
          : userSeason == 'summer' ?
            <Summer />
            : userSeason == 'spring' ?
              <Spring /> : null
      }

    </ImageBackground> 
  
    
  );
}

//Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 150
    },
    greyOverlay: {
      flex: 1,
      backgroundColor: 'aliceblue'
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
    },
    background: {
      flex: 1,
      minHeight: '100%',
      minWidth: '100%'
    },
  });