import { StyleSheet, Text, View, Modal, Button, Alert } from 'react-native';
import Gap from './Gap';
import GapRow from './GapRow';
import { useState } from 'react';
import EditListModal from './EditListModal';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from './CustomButton';
import GreyBackdrop from './GreyBackdrop';
import { useTheme } from '@react-navigation/native';

export default function List({isListOpened, setIsListOpened, listTitle, listList, deleteListHandler,editHandler}) {
    const {colors} = useTheme(); 

    const [isEditModalOpened, setIsEditModalOpened] = useState(false);

    const confirmDeletionHadler = () => {
        return Alert.alert(
            "Delete",
            "Are you sure you want to remove this list?",
            [
              // The "Yes" button
              {
                text: "Yes",
                onPress: () => {
                  deleteListHandler();
                },
              },
              // The "No" button
              // Does nothing but dismiss the dialog when tapped
              {
                text: "No",
              },
            ]
          );
    }
    
    return(
        <Modal transparent={true} visible={isListOpened}>
            <View style={[styles.modalContainer, {backgroundColor: colors.background}]}>
                <Text style={[styles.textMd, {color: colors.text}]}>{listTitle}</Text>
                <Gap pixels='50' />
                    <View style={[styles.list, {backgroundColor: colors.card, borderColor: colors. border}]}>
                            <ScrollView>
                                <Text style={[styles.textSm, {color: colors.text}]}>{listList}</Text>
                            </ScrollView>
                    </View>
                
                <Gap pixels='50' />
                <View style={styles.row}>
                    <CustomButton 
                        buttonColor='#6ADA41'
                        buttonTitle='edit'
                        onPress={() => {setIsEditModalOpened(true)}}
                        iconName='edit'
                    />
                    <GapRow pixels='5' />
                    <CustomButton 
                        buttonColor='#DA416A'
                        buttonTitle='delete'
                        onPress={() => confirmDeletionHadler()}
                        iconName='delete'
                    />
                </View>
                <Gap pixels='10' />
                <CustomButton 
                        buttonColor='#7891DA'
                        buttonTitle='go back to lists'
                        onPress={() => {setIsListOpened(false)}}
                        iconName='back'
                />
                
            </View>

            <EditListModal isEditModalOpened={isEditModalOpened} setIsEditModalOpened={setIsEditModalOpened} editHandler={editHandler} listTitle={listTitle} listList={listList}/>
            { isEditModalOpened ?  <GreyBackdrop></GreyBackdrop> : null}
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aliceblue',
        
    },
    textSm: {
        fontSize: 20,
        fontFamily: 'Inter',
    },
    textMd: {
        fontSize: 25,
        fontFamily: 'Inter-Medium',        
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    list: {
        backgroundColor: '#FCFEFF',
        borderWidth: 0.3,
        borderColor: '#CDD4DA',
        borderRadius: 5,
        padding: 20,
        height: 400,
        width: 250,
        elevation: 8,
        shadowColor: '#CDD4DA'
    }
});