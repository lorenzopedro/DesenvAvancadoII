import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { firestore } from '../../services/credenciaisFirebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import Button from '../../components/Button';

const CourseListScreen = ({ navigation }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'courses'), (snapshot) => {
            const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCourses(coursesData);
        });
        return () => unsubscribe();
    }, []);

    const deleteCourse = async (id) => {
        try {
            await deleteDoc(doc(firestore, 'courses', id));
            Alert.alert('Sucesso', 'Curso deletado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível deletar o curso.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Adicionar Novo Curso" onPress={() => navigation.navigate('CourseForm')} />
            <FlatList
                data={courses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Button title="Editar" onPress={() => navigation.navigate('CourseForm', { course: item })} />
                        <Button title="Excluir" onPress={() => deleteCourse(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    itemText: { fontSize: 18 },
});

export default CourseListScreen;