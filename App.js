import 'react-native-gesture-handler';
import Year from "./screens/Year";
import Counter from './screens/Counter';
import Lists from './screens/Lists';
import { useColorScheme } from 'react-native';
import { NavigationContainer,DefaultTheme, DarkTheme} from "@react-navigation/native";
import { createDrawerNavigator} from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7891DA',
    card: '#FCFEFF',
    background: '#F0F8FF'
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#7891DA',
    card: '#444648',
    background: '#222324',
    border: '#666A6D'
  },
};


export default function App() {
  const scheme = useColorScheme();
  //Load fonts
  const [fontsLoaded] = useFonts({
    'Inter': require('./assets/fonts/Inter-ExtraLight.ttf'),
    'Inter': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf')
  });

   // useEffect
   useEffect(() => {
    //Prevent splash screen auto hiding to load fonts
    async function prepare(){
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

   //Check if Fonts Loaded
   if (!fontsLoaded){
    return undefined;
  } else {
    SplashScreen.hideAsync();
  } 

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyTheme}>
      <Drawer.Navigator>
        <Drawer.Screen 
        name="Year Progress"
        component={Year}
        options={{
          headerTitleStyle: {
            fontFamily: 'Inter-Regular',
          }
        }}
        />
        <Drawer.Screen 
        name="Objectives Counter"
        component={Counter}
        options={{
          headerTitleStyle: {
            fontFamily: 'Inter-Regular',
          }
        }}
        />
        <Drawer.Screen 
        name="Lists"
        component={Lists}
        options={{
          headerTitleStyle: {
            fontFamily: 'Inter-Regular',
          }
        }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

