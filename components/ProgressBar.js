import { StyleSheet, Text, View } from 'react-native';

export default function ProgressBar({percentage}) {

    return(
        <View style={styles.container}>
            <View style={[styles.bar, {width: percentage}, parseInt(percentage)>=96 ? styles.barHundred : styles.barNormal]}>
            </View>
            <Text style={styles.barText}>{parseInt(percentage)}%</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d8d8d8',
        height: 35,
        width: 275,
        borderWidth: 0.15,
        borderColor: '#CDD4DA',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bar: {
        height:'100%',
        backgroundColor: '#6ADA41',
    },
    barNormal: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    barHundred: {
        borderRadius: 15
    },
    barText: {
        marginRight: 5,
        fontFamily: 'Inter-Bold',
        position: 'absolute',
        right: 5
    }
});