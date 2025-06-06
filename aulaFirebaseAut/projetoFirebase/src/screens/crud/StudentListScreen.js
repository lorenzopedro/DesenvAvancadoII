import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { firestore } from '../../services/credenciaisFirebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import Button from '../../components/Button';

const StudentListScreen = ({ navigation }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'students'), (snapshot) => {
            const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsData);
        });
        return () => unsubscribe();
    }, []);

    const deleteStudent = async (id) => {
        try {
            await deleteDoc(doc(firestore, 'students', id));
            Alert.alert('Sucesso', 'Aluno deletado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível deletar o aluno.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Adicionar Novo Aluno" onPress={() => navigation.navigate('StudentForm')} />
            <FlatList
                data={students}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text>{item.email}</Text>
                        </View>
                        <View style={styles.buttons}>
                           <Button title="Editar" onPress={() => navigation.navigate('StudentForm', { student: item })} />
                           <Button title="Excluir" onPress={() => deleteStudent(item.id)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    itemText: { fontSize: 18, fontWeight: 'bold' },
    buttons: { flexDirection: 'row' }
});

export default StudentListScreen;
