// ... (imports)
import { useAuth } from '../hooks/useFirebase';
import { firestore } from '../services/credenciaisFirebase';
import { doc, getDoc } from 'firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;

      // Buscar o perfil do usuário no Firestore
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Redirecionar com base no perfil
        switch (userData.role) {
          case 'admin':
            navigation.replace('AdminDashboard');
            break;
          case 'aluno':
            navigation.replace('StudentDashboard');
            break;
          case 'avaliador':
            navigation.replace('EvaluatorDashboard');
            break;
          default:
            navigation.replace('Login'); // Fallback
        }
      } else {
         Alert.alert('Erro', 'Perfil de usuário não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro de Login', error.message);
    }
  };
  
  // ... (return com a UI do formulário de login)
};

export default LoginScreen;