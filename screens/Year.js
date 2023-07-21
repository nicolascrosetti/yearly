import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator} from 'react-native';
import { differenceInDays, differenceInCalendarWeeks, differenceInCalendarMonths} from 'date-fns';
import { useFonts } from 'expo-font';
import { useTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import ProgressBar from '../components/ProgressBar';
import Gap from '../components/Gap';
import * as Location from 'expo-location';
import Snowfall from '../components/Seasons/Snowfall';
import LeafFall from '../components/Seasons/LeafFall';
import Summer from '../components/Seasons/Summer';
import Spring from '../components/Seasons/Spring';
import { Asset } from 'expo-asset';
import { StatusBar } from 'expo-status-bar';

export default function Year() {
  const { colors } = useTheme();
  //Load fonts
  /* const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter-ExtraLight.ttf'),
    'Inter': require('../assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Thin': require('../assets/fonts/Inter-Thin.ttf')
  }); */

  // useState
  const [today, setToday] = useState(new Date());
  const [yearPercentage, setYearPercentage] = useState(0);
  const [userHemisphere, setUserHemisphere] = useState(0);
  const [userSeason, setUserSeason] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userSeasonImage, setUserSeasonImage] = useState(0);
  const [hideCustomSplashScreen, setHideCustomSplashScreen] = useState(false);

  // Images
  let cacheResources = async () => {
    const images = [
      require('../assets/images/winter.png'),
      require('../assets/images/autumn.png'),
      require('../assets/images/summer.png'),
      require('../assets/images/spring.png'),
      require('../assets/images/splash.png')
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    });

    return Promise.all(cacheImages);
  }

  // useEffect
  useEffect(() => {
    //get users hemisphere
    getUserHemisphere()
    .then(hemisphere => {
      setUserHemisphere(hemisphere);
    })
    .catch(error => {
      setUserHemisphere('none');
    });

    //Load Images
    const loadResources = async () => {
      await cacheResources();
      setIsLoaded(true);
    }
    loadResources();

    //Set today's date
    setToday(new Date());

    //Set year progress percentage
    const percetange = ((dayNumber * 100) / 365)+ '%';
    setYearPercentage(percetange);

    setTimeout(() => {
      setHideCustomSplashScreen(true);
    }, 2000);
  }, []);

  //define seasons
  const seasons = {
    southern: {
      1: 'summer',
      2: 'summer',
      3: (dayOfTheMonth) => dayOfTheMonth < 21 ? 'summer' : 'autumn',
      4: 'autumn',
      5: 'autumn',
      6: (dayOfTheMonth) => dayOfTheMonth < 21 ? 'autumn' : 'winter',
      7: 'winter',
      8: 'winter',
      9: (dayOfTheMonth) => dayOfTheMonth < 21 ? 'winter' : 'spring',
      10: 'spring',
      11: 'spring',
      12: (dayOfTheMonth) => dayOfTheMonth < 21 ? 'spring' : 'summer',
    },
    northern: {
      1: 'winter',
      2: 'winter',
      3: (dayOfTheMonth) => dayOfTheMonth < 21 ? 'winter' : 'spring',
      4: 'spring',
      5: 'spring',
      6: (dayOfTheMonth) => dayOfTheMonth < 21 ? 'spring' : 'summer',
      7: 'summer',
      8: 'summer',
      9: (dayOfTheMonth) => dayOfTheMonth < 21 ? 'summer' : 'autumn',
      10: 'autumn',
      11: 'autumn',
      12: (dayOfTheMonth) => dayOfTheMonth < 21 ? 'autumn' : 'winter',
    },
  };
  
  //get user season
  function getUserSeason(userHemisphere, monthNumber, dayOfTheMonth) {
    const season = seasons[userHemisphere][monthNumber];
    if (typeof season === 'function') {
      return season(dayOfTheMonth);
    }

    return season;
  }
  // Call getUserSeason when userHemisphre updates
  useEffect(() => {
    const dayOfTheMonth = today.getDate();
    if(userHemisphere == 'northern' || userHemisphere == 'southern'){
      setUserSeason(getUserSeason(userHemisphere, monthNumber, dayOfTheMonth));
    }
  }, [userHemisphere]);

  //Set correct background image according to season
  useEffect(() => {
    userSeason == 'winter' ? setUserSeasonImage(require('../assets/images/winter.png'))
    : userSeason == 'autumn' ? setUserSeasonImage(require('../assets/images/autumn.png'))
    : userSeason == 'summer' ? setUserSeasonImage(require('../assets/images/summer.png'))
    : userSeason == 'spring' ? setUserSeasonImage(require('../assets/images/spring.png')) : null;

  }, [userSeason]);
  
 
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

  //Render
  return (
   <View>
   { hideCustomSplashScreen ?
    <ImageBackground 
      source={
        userSeasonImage
      }
      style={styles.background} 
      opacity={0.4} 
      resizeMode='stretch'
    >
      <StatusBar backgroundColor={colors.card} />
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
    : 
    //<ImageBackground source={require('../assets/images/splash.png')} style={styles.background} ></ImageBackground>
    <View style={styles.containerCenter}>
      <Text style={[styles.textLg, {color: colors.primary}]}>Yearly</Text>
      <Gap pixels='50'></Gap>
      <ActivityIndicator size="large" color="#7891DA" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} />
    </View>
     }
    </View>
    
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
    containerCenter: {
      flex: 1,
      minHeight: '100%',
      minWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 250
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
    textLg: {
      fontSize: 50,
      fontFamily: 'Inter'
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