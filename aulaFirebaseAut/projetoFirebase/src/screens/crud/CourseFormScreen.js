import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../../components/Button';
import globalStyles from '../../styles/globalStyles';
import { firestore } from '../../services/credenciaisFirebase';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

const CourseFormScreen = ({ navigation, route }) => {
    // Verifica se está editando um curso existente
    const existingCourse = route.params?.course;

    const [name, setName] = useState(existingCourse ? existingCourse.name : '');
    const [description, setDescription] = useState(existingCourse ? existingCourse.description : '');

    const handleSave = async () => {
        if (!name) {
            Alert.alert('Erro', 'O nome do curso é obrigatório.');
            return;
        }

        try {
            if (existingCourse) {
                // Atualiza o documento existente
                const courseRef = doc(firestore, 'courses', existingCourse.id);
                await setDoc(courseRef, { name, description });
                Alert.alert('Sucesso', 'Curso atualizado com sucesso!');
            } else {
                // Cria um novo documento
                await addDoc(collection(firestore, 'courses'), { name, description });
                Alert.alert('Sucesso', 'Curso adicionado com sucesso!');
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar o curso: ", error);
            Alert.alert('Erro', 'Não foi possível salvar o curso.');
        }
    };

    return (
        <View style={globalStyles.container}>
            <TextInput
                style={globalStyles.input}
                placeholder="Nome do Curso"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={[globalStyles.input, { height: 100 }]}
                placeholder="Descrição (Opcional)"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Button title="Salvar Curso" onPress={handleSave} />
        </View>
    );
};

export default CourseFormScreen;
