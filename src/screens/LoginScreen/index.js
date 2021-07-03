import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';
import { Text, View } from 'react-native';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import InfoModal from '../../components/InfoModal';
export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLoginButton = async () => {
        if(cpf && password) {
            let result = await api.login(cpf, password);
           
            if(result.error === '') {
            
                dispatch({type: 'setToken', payload: {token: result.token}});
                dispatch({type: 'setUser', payload: {user: result.user}});

                navigation.reset({
                    index: 1,
                    routes:[{name: 'MainDrawer'}]
                });
            } else {
                alert(result.error);
            }
        } else {
            alert("Preencha os campos");
        }
    }

    const handleInfoChoose = () => {
        setShowModal(true);
    }

    const handleRegisterButton = () => {
        navigation.navigate('RegisterScreen');
    }

    const handleEsqueciButtonClick = () => {
        navigation.navigate('Esqueci');
    }

    return (
        <C.Container>
            <C.Logo
                source={require('../../assets/colegionovo.jpg')}
                resizeMode="contain"
            />
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                marginBottom: 50,
                
            }}>
                <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color:'#1676d2',
                }}
                >Bem Vindo(a) de volta a jornada</Text>
            </View>

            <C.Field
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={t=>setCpf(t)}
            />
            <C.Field
                placeholder="Digite sua Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={t=>setPassword(t)}
            />

            <C.ButtonArea onPress={handleLoginButton}>
                <C.ButtonText>LOGAR</C.ButtonText>
            </C.ButtonArea>

            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR-SE</C.ButtonText>
            </C.ButtonArea>
            <C.SignMessageButton onPress={handleEsqueciButtonClick}>
                    <C.SignMessageButtonText>Esqueceu sua senha?</C.SignMessageButtonText>
                    <C.SignMessageButtonTextBold>Clique aqui</C.SignMessageButtonTextBold>
            </C.SignMessageButton>

            {/* <C.Information onPress={()=>handleInfoChoose()}>
                <Icon name="info-circle" size={40} color="#28A745" />
                <C.InformationText>Conheça nosso App Docens.</C.InformationText>
            </C.Information> */}
            <InfoModal 
                show={showModal}
                setShow={setShowModal}
            />
        </C.Container>
    );
}