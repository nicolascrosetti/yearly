import { View } from 'react-native';

export default function Gap({pixels}) {
    return(
        <View style={{width: parseInt(pixels)}}></View>
    );
 }