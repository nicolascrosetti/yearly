import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import GapRow from './GapRow';

export default function CustomButton({ buttonTitle, onPress, buttonColor, iconName }){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, {backgroundColor:buttonColor}]}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
                <GapRow pixels='5' />
                <AntDesign name={iconName} size={20} color="white" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Inter-Medium',
        textTransform: 'uppercase',
        fontSize: 15,
        textAlign: 'center'
    }
});