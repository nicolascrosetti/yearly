import { useState } from "react";
import { Modal, Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Gap from "./Gap";
import { AntDesign } from '@expo/vector-icons';
import CustomButton from "./CustomButton";
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function EditListModal({isEditModalOpened, setIsEditModalOpened, listTitle, listList, editHandler}) {
    const initialValues = {
        title: listTitle,
        list: listList,
      };
      
      const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        list: Yup.string().required("List is required"),
      });

    return(
        <Modal animationType="slide" transparent={true} visible={isEditModalOpened}>
            <View style={styles.modalContainer}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    editHandler(values.title,values.list);
                    setIsEditModalOpened(false);
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.modalContent}>
                      <TouchableOpacity style={styles.closeButton} onPress={() => setIsEditModalOpened(false)}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                      </TouchableOpacity>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Title"
                        onChangeText={handleChange("title")}
                        onBlur={handleBlur("title")}
                        value={values.title}
                       />
                      {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}
                      <Gap pixels={10} />
                      <TextInput
                        style={styles.textArea}
                        placeholder="List"
                        onChangeText={handleChange("list")}
                        onBlur={handleBlur("list")}
                        value={values.list}
                        multiline={true}
                        numberOfLines={10}
                       />
                      {touched.list && errors.list && <Text style={styles.error}>{errors.list}</Text>}
                      <Gap pixels={20} />
                      <CustomButton
                        buttonColor="#6ADA41"
                        buttonTitle="add"
                        onPress={handleSubmit}
                        iconName="plussquare"
                      />
                    </View>
                  )}
                </Formik>
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
        backgroundColor: '#FCFEFF',
        borderWidth: 0.3,
        borderColor: '#CDD4DA',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontFamily: 'Inter',
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
    },
    error: {
        fontFamily: 'Inter',
        color: '#DA416A'
    }
});