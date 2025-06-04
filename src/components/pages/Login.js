import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import { login, resetLoginStatus } from '../redux/store/slice/authslice';

export default function LoginScreen({ navigation }) {
  const [secureText, setSecureText] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { isAuthenticated, loginStatus } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login({ username: username.trim(), password: password.trim() }));
  };

  useEffect(() => {
    if (loginStatus === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
      setTimeout(() => {
        navigation.replace('ProductList');
        dispatch(resetLoginStatus());
      }, 500);
    } else if (loginStatus === 'failed') {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid username or password',
      });
      dispatch(resetLoginStatus());
    }
  }, [loginStatus]);

  return (
    
    <View style={styles.container}>
   
      <Image source={require('../../assests/logo.png')} style={styles.logo} />
      
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
        placeholderTextColor="black"
      />
       <View style={styles.passwordContainer}>

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={secureText}
          style={[styles.input, { flex: 1 }]}
          placeholderTextColor="black"
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
          <Icon name={secureText ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
       <Toast/>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9eee8',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderColor: 'black',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    color: 'black',
  },
  loginButton: {
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
   
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});