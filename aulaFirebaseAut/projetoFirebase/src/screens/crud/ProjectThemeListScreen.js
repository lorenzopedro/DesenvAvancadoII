import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { firestore } from '../../services/credenciaisFirebase';
import { collection, onSnapshot, doc, deleteDoc, query, where } from 'firebase/firestore';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useFirebase';

// O `route.params.userRole` determinará a visualização
const ProjectThemeListScreen = ({ navigation, route }) => {
    const { user } = useAuth();
    const { userRole } = route.params;

    const [themes, setThemes] = useState([]);

    useEffect(() => {
        let themesQuery;
        // Define a consulta com base no perfil do usuário
        if (userRole === 'aluno') {
            // Alunos veem apenas seus próprios projetos
            themesQuery = query(collection(firestore, 'projectThemes'), where('proposerId', '==', user.uid));
        } else {
            // Admins e Avaliadores veem todos os projetos
            themesQuery = collection(firestore, 'projectThemes');
        }

        const unsubscribe = onSnapshot(themesQuery, (snapshot) => {
            const themesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setThemes(themesData);
        });
        return () => unsubscribe();
    }, [userRole, user]);

    const deleteTheme = async (id) => {
       // Apenas Admins podem deletar (a regra do firestore garante isso)
        try {
            await deleteDoc(doc(firestore, 'projectThemes', id));
            Alert.alert('Sucesso', 'Tema deletado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Você não tem permissão para deletar este tema.');
        }
    };

    return (
        <View style={styles.container}>
            {userRole !== 'avaliador' && (
                 <Button title="Propor Novo Tema" onPress={() => navigation.navigate('ProjectThemeForm')} />
            )}
            <FlatList
                data={themes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View>
                           <Text style={styles.itemText}>{item.title}</Text>
                           <Text>{item.description}</Text>
                        </View>
                        {userRole === 'admin' && (
                             <View style={styles.buttons}>
                                <Button title="Editar" onPress={() => navigation.navigate('ProjectThemeForm', { theme: item })} />
                                <Button title="Excluir" onPress={() => deleteTheme(item.id)} />
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    itemContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    itemText: { fontSize: 18, fontWeight: 'bold' },
    buttons: { flexDirection: 'row', marginTop: 10 }
});

export default ProjectThemeListScreen;
