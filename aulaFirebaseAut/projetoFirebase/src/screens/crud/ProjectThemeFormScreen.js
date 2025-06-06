import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../../components/Button';
import globalStyles from '../../styles/globalStyles';
import { firestore } from '../../services/credenciaisFirebase';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../../hooks/useFirebase';

const ProjectThemeFormScreen = ({ navigation, route }) => {
    const { user } = useAuth();
    const existingTheme = route.params?.theme;

    const [title, setTitle] = useState(existingTheme ? existingTheme.title : '');
    const [description, setDescription] = useState(existingTheme ? existingTheme.description : '');

    const handleSave = async () => {
        if (!title) {
            Alert.alert('Erro', 'O título do tema é obrigatório.');
            return;
        }

        try {
            const themeData = { title, description, proposerId: user.uid };
            if (existingTheme) {
                // A regra do firestore só permite que o admin edite
                const themeRef = doc(firestore, 'projectThemes', existingTheme.id);
                await setDoc(themeRef, themeData, { merge: true }); // merge para não sobrescrever o proposerId
                Alert.alert('Sucesso', 'Tema atualizado!');
            } else {
                await addDoc(collection(firestore, 'projectThemes'), themeData);
                Alert.alert('Sucesso', 'Tema proposto com sucesso!');
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar o tema: ", error);
            Alert.alert('Erro', 'Não foi possível salvar o tema.');
        }
    };

    return (
        <View style={globalStyles.container}>
            <TextInput style={globalStyles.input} placeholder="Título do Tema" value={title} onChangeText={setTitle}/>
            <TextInput
                style={[globalStyles.input, { height: 150 }]}
                placeholder="Descrição detalhada do tema"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Button title="Salvar Tema" onPress={handleSave} />
        </View>
    );
};

export default ProjectThemeFormScreen;
