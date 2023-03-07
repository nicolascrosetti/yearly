import { useState } from "react";
import { Modal, Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Gap from "./Gap";
import { AntDesign } from '@expo/vector-icons';
import CustomButton from "./CustomButton";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from "@react-navigation/native";

export default function ListFormModal({isModalOpened, setIsModalOpened, modalHandler}) {
  const { colors } = useTheme();

  const initialValues = {
      title: '',
      list: '',
    };
    
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please enter a title'),
    list: Yup.string().required('Please enter a list'),
  });

  return(
      <Modal animationType="slide" transparent={true} visible={isModalOpened}>
          <View style={styles.modalContainer}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  modalHandler(values.title, values.list);
                  setIsModalOpened(false);
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View style={[styles.modalContent, {backgroundColor: colors.card, borderColor: colors.border}]}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalOpened(false)}>
                      <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.textInput, {color: colors.text, borderColor: colors.border}]}
                      placeholder="title"
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                    />
                    {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}
                    <Gap pixels={10} />
                    <TextInput
                      style={[styles.textArea, {color: colors.text, borderColor: colors.border}]}
                      placeholder="list"
                      onChangeText={handleChange('list')}
                      onBlur={handleBlur('list')}
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