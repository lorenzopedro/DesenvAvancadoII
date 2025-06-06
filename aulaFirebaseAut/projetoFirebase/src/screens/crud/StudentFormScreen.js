import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../../components/Button';
import globalStyles from '../../styles/globalStyles';
import { firestore } from '../../services/credenciaisFirebase';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

const StudentFormScreen = ({ navigation, route }) => {
    const existingStudent = route.params?.student;

    const [name, setName] = useState(existingStudent ? existingStudent.name : '');
    const [email, setEmail] = useState(existingStudent ? existingStudent.email : '');
    const [period, setPeriod] = useState(existingStudent ? existingStudent.period : '');
    // Aqui você poderia adicionar um Picker para selecionar o curso a partir da coleção 'courses'
    const [courseId, setCourseId] = useState(existingStudent ? existingStudent.courseId : '');


    const handleSave = async () => {
        if (!name || !email) {
            Alert.alert('Erro', 'Nome e Email são obrigatórios.');
            return;
        }

        try {
            const studentData = { name, email, period, courseId };
            if (existingStudent) {
                const studentRef = doc(firestore, 'students', existingStudent.id);
                await setDoc(studentRef, studentData);
                Alert.alert('Sucesso', 'Aluno atualizado com sucesso!');
            } else {
                await addDoc(collection(firestore, 'students'), studentData);
                Alert.alert('Sucesso', 'Aluno adicionado com sucesso!');
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar o aluno: ", error);
            Alert.alert('Erro', 'Não foi possível salvar o aluno.');
        }
    };

    return (
        <View style={globalStyles.container}>
            <TextInput style={globalStyles.input} placeholder="Nome do Aluno" value={name} onChangeText={setName}/>
            <TextInput style={globalStyles.input} placeholder="Email do Aluno" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
            <TextInput style={globalStyles.input} placeholder="Período" value={period} onChangeText={setPeriod}/>
            <TextInput style={globalStyles.input} placeholder="ID do Curso" value={courseId} onChangeText={setCourseId}/>
            <Button title="Salvar Aluno" onPress={handleSave} />
        </View>
    );
};

export default StudentFormScreen;
