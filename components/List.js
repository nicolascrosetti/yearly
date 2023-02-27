import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import Gap from './Gap';
import GapRow from './GapRow';
import { useState } from 'react';
import EditListModal from './EditListModal';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from './CustomButton';

export default function List({isListOpened, setIsListOpened, listTitle, listList, deleteListHandler,editHandler}) {
    const [isEditModalOpened, setIsEditModalOpened] = useState(false);
    
    return(
        <Modal transparent={true} visible={isListOpened}>
            <View style={styles.modalContainer}>
                <Text style={styles.textMd}>{listTitle}</Text>
                <Gap pixels='50' />
                    <View style={styles.list}>
                            <ScrollView>
                                <Text style={styles.textSm}>{listList}</Text>
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
                        onPress={() => deleteListHandler()}
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
        width: 250
    }
});