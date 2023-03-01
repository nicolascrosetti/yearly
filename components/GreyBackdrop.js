import { View, StyleSheet } from "react-native";

export default function GreyBackdrop() {
    return(
        <View style={styles.greyBackdrop}></View>
    );
}

const styles = StyleSheet.create({
    greyBackdrop: {
        height: '200%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.4,
        position: 'absolute',
        top: 0,
        left: 0,
      }
});