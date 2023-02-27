import { useState } from "react";
import { Modal, Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Gap from "./Gap";
import { AntDesign } from '@expo/vector-icons';
import CustomButton from "./CustomButton";


export default function ListFormModal({isModalOpened, setIsModalOpened, modalHandler}) {
    const [title, setTitle] = useState(0);
    const [list, setList] = useState(0);

    const sendHandler = () => {
        modalHandler(title,list);
        setIsModalOpened(false);
    }

    return(
        <Modal animationType="slide" transparent={true} visible={isModalOpened}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity  style={styles.closeButton} onPress={() => {setIsModalOpened(false)}} >
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="title"
                        onChangeText={(text) => setTitle(text)}
                    />
                    <Gap pixels={10}/>
                    <TextInput
                        style={styles.textArea}
                        placeholder="list"
                        onChangeText={(text) => setList(text)}
                        multiline = {true}
                        numberOfLines = {10} 
                    />
                    <Gap pixels={20}/>
                    <CustomButton 
                        buttonColor='#6ADA41'
                        buttonTitle='add'
                        onPress={sendHandler}
                        iconName='plussquare'
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: 300,
        height: 400,
        backgroundColor: '#F3F9FF',
        borderWidth: 0.3,
        borderColor: '#CDD4DA',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        fontSize: 18,
        borderBottomWidth: 0.3,
        borderColor: '#CDD4DA',
        borderRadius: 5,
        width: 200,
        padding: 10
    },
    textArea: {
        fontFamily: 'Inter',
        fontSize: 18,
        borderWidth: 0.15,
        borderColor: 'grey',
        borderRadius: 5,
        height: 225,
        width: 200,
        padding: 10
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 30
    }
});