import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Telas de Autenticação
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Telas dos Perfis (Dashboards)
import AdminDashboardScreen from '../screens/dashboards/AdminDashboardScreen';
import StudentDashboardScreen from '../screens/dashboards/StudentDashboardScreen';
import EvaluatorDashboardScreen from '../screens/dashboards/EvaluatorDashboardScreen';

// Telas de CRUD para Cursos
import CourseListScreen from '../screens/crud/CourseListScreen';
import CourseFormScreen from '../screens/crud/CourseFormScreen';

// Telas de CRUD para Alunos
import StudentListScreen from '../screens/crud/StudentListScreen';
import StudentFormScreen from '../screens/crud/StudentFormScreen';

// Telas de CRUD para Temas de Projetos
import ProjectThemeListScreen from '../screens/crud/ProjectThemeListScreen';
import ProjectThemeFormScreen from '../screens/crud/ProjectThemeFormScreen';

// Telas de gerenciamento de Usuários (do projeto original)
import UserListScreen from '../screens/UserListScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';


const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
            headerStyle: {
                backgroundColor: '#005a9c', // Um azul institucional
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
    >
      {/* Grupo de Autenticação */}
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Crie sua Conta' }} />
      
      {/* Dashboards por Perfil */}
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Painel do Administrador' }} />
      <Stack.Screen name="StudentDashboard" component={StudentDashboardScreen} options={{ title: 'Painel do Aluno' }} />
      <Stack.Screen name="EvaluatorDashboard" component={EvaluatorDashboardScreen} options={{ title: 'Painel do Avaliador' }} />

      {/* Grupo de Gerenciamento de Cursos */}
      <Stack.Screen name="CourseList" component={CourseListScreen} options={{ title: 'Gerenciar Cursos' }} />
      <Stack.Screen name="CourseForm" component={CourseFormScreen} options={{ title: 'Formulário de Curso' }} />

      {/* Grupo de Gerenciamento de Alunos */}
      <Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: 'Gerenciar Alunos' }} />
      <Stack.Screen name="StudentForm" component={StudentFormScreen} options={{ title: 'Formulário de Aluno' }} />
      
      {/* Grupo de Gerenciamento de Temas */}
      <Stack.Screen name="ProjectThemeList" component={ProjectThemeListScreen} options={{ title: 'Temas de Projeto' }} />
      <Stack.Screen name="ProjectThemeForm" component={ProjectThemeFormScreen} options={{ title: 'Formulário de Tema' }} />
      
      {/* Grupo de Gerenciamento de Usuários */}
      <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Gerenciar Usuários' }} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={{ title: 'Detalhes do Usuário' }} />

    </Stack.Navigator>
  );
};

export default MainNavigator;
