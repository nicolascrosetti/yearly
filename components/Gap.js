import { View } from 'react-native';

export default function Gap({pixels}) {
    return(
        <View style={{height: parseInt(pixels)}}></View>
    );
 }