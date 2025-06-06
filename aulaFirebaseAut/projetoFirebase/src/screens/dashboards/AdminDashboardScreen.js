import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useFirebase';

const AdminDashboardScreen = ({ navigation }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <Button title="Gerenciar Cursos" onPress={() => navigation.navigate('CourseList')} />
            <Button title="Gerenciar Alunos" onPress={() => { /* Navegar para a lista de alunos */ }} />
            <Button title="Gerenciar Temas" onPress={() => { /* Navegar para a lista de temas */ }} />
            <Button title="Gerenciar Usuários" onPress={() => navigation.navigate('UserList')} />
            <Button title="Sair" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
});

export default AdminDashboardScreen;