import { StyleSheet, Text, View } from 'react-native';

export default function ProgressBar({percentage}) {

    return(
        <View style={styles.container}>
            <View style={[
                styles.bar,
                {width: percentage},
                parseInt(percentage)>=96 ? styles.barHundred : styles.barNormal,
                parseInt(percentage) <= 5 ? 
                    parseInt(percentage) <= 3 ? 
                        parseInt(percentage) <= 2 ?
                            parseInt(percentage) == 1 ? styles.barOne : styles.barTwo
                        : styles.barThree
                    : styles.barFive
                : null
            ]}>
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
        alignItems: 'center',
        elevation: 5,
        shadowColor: 'grey'
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
    barFive: {
        height: '95%'
    },  
    barThree: {
        height: '80%'
    },
    barTwo: {
        height: '60%'
    },
    barOne: { 
        height: '40%'
    },
    barText: {
        marginRight: 5,
        fontFamily: 'Inter-Bold',
        position: 'absolute',
        right: 5
    }
});