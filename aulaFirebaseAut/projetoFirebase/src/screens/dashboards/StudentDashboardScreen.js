import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useFirebase';

const StudentDashboardScreen = ({ navigation }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <Text>Olá, Aluno: {user?.email}</Text>
            <Button title="Ver Cursos" onPress={() => { /* Navegar para a lista de cursos (somente leitura) */ }} />
            <Button title="Meus Temas de Projeto" onPress={() => { /* Navegar para a lista de temas propostos */ }} />
            <Button title="Propor Novo Tema" onPress={() => { /* Navegar para o formulário de temas */ }} />
            <Button title="Sair" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
});

export default StudentDashboardScreen;