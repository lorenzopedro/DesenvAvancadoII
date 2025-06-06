import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useFirebase';

const EvaluatorDashboardScreen = ({ navigation }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <Text>Bem-vindo, Avaliador: {user?.email}</Text>
            <Button
                title="Ver Temas de Projeto para Avaliar"
                onPress={() => navigation.navigate('ProjectThemeList', { userRole: 'avaliador' })}
            />
            <Button title="Sair" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
});

export default EvaluatorDashboardScreen;
