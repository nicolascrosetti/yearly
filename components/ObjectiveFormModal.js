import { useState } from "react";
import { Modal, Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Gap from "./Gap";
import CustomButton from "./CustomButton";
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';


export default function ObjectiveFormModal({isModalOpened, setIsModalOpened, modalHandler}) {
    const initialValues = {
        title: '',
        total: '',
      };
      
      const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        total: Yup.number()
          .typeError('Objective total must be a number')
          .required('Objective total is required'),
      });

      
    return(
        <Modal animationType="slide" transparent={true} visible={isModalOpened}>
            <View style={styles.modalContainer}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    modalHandler(values.title, values.total);
                    setIsModalOpened(false);
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.modalContent}>
                      <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalOpened(false)}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                      </TouchableOpacity>
                
                      <TextInput
                        style={styles.textInput}
                        placeholder="title"
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                      />
                      {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}
                
                      <Gap pixels={10} />
                
                      <TextInput
                        style={styles.textInput}
                        placeholder="objective total"
                        onChangeText={handleChange('total')}
                        onBlur={handleBlur('total')}
                        value={values.total}
                        keyboardType="numeric"
                      />
                      {touched.total && errors.total && <Text style={styles.error}>{errors.total}</Text>}
                
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
        fontSize: 18,
        borderBottomWidth: 0.3,
        borderColor: '#CDD4DA',
        borderRadius: 5,
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