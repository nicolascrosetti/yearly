import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import GapRow from './GapRow';

export default function CustomButton({ buttonTitle, onPress, buttonColor, iconName }){
    return(
        <TouchableOpacity style={[styles.button, {backgroundColor:buttonColor}]} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
            <GapRow pixels='5' />
            <AntDesign name={iconName} size={20} color="white" />
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
        elevation: 2,
        shadowColor: 'black'
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Inter-Medium',
        textTransform: 'uppercase',
        fontSize: 15,
        textAlign: 'center'
    }
});