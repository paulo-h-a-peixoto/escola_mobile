import React, {useState, useEffect, useContext} from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../services/api';
import { Alert } from 'react-native';
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './styled';

import SignInput from '../../components/SignInput';
// import UserIcon from '../../assets/person.svg';
export default () => {
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');

    const handleSignClick = () => {
        if(emailField != ''){
            
        //     let res = await Api.esqueci(emailField);
            
        //     if(res.error == '') {

        //         alert(res.result);

        //         navigation.reset({
        //             routes:[{name:'LoginScreen'}]
        //         });
        //     }else{
        //         alert(res.error);
        //     }
        // }else{
        //     alert('Preencha o E-mail!');
        Alert.alert('Atenção!', `Foi enviado o link para recuperar senha no e-mail ${emailField}  `, [
            {text: 'Fechar'}
        ]);

        navigation.navigate('LoginScreen');
        }
    }   

    const handleMessageButtonClick = () => {
        navigation.navigate('LoginScreen');
    }

   

    return (
        <Container>
            <Image source={require('../../assets/colegionovo.jpg')} style={{width: 300, height:300}} />
           <InputArea>
                <SignInput 
                    placeholder="Digite seu E-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                    keyboardType="default"
                />
                
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Recuperar Senha</CustomButtonText>
                </CustomButton>
                <SignMessageButton onPress={handleMessageButtonClick}>
                    <SignMessageButtonText>Lembrou da senha?</SignMessageButtonText>
                    <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
                </SignMessageButton>
               
            </InputArea>
            
        </Container>
    );
}