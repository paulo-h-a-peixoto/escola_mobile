import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpandIcon from '../assets/expand.svg';
import api from '../services/api';

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex:1;
    background-color: rgba(0,0,0, 0.5);
    justify-content: flex-end;
`;

const ModalBody = styled.View`
    background-color: #87CEFA;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const ModalItem = styled.View``;


const Field =  styled.TextInput`
    border-width: 1px;
    border-color: #CCC;
    background-color: #FFF;
    border-radius: 5px;
    color: #000;
    font-size: 15px;
    padding: 15px;
    margin-top: 15px;
    margin-bottom: 30px;
    
`;

const FinishButton = styled.TouchableOpacity`
    background-color: #79b9e1;
    height: 60px;
    justify-content: center;
    align-items: center;  
    border-radius: 10px;
    margin-bottom: 10px;
`;

const FinishButtonText = styled.Text`
    color: #FFFFFF;
    font-weight: bold;
    font-size: 17px;
    
`;


export default ({ show, setShow, getMedico, medicoId}) => {
    const navigation = useNavigation();

    const [comentario, setComentario] = useState('');


    const handleCloseButton = () => {
        setComentario('');
        setShow(false);
    }

    const handleFinishClick = async () => {
        const result = await api.setComentario(medicoId, comentario);
        if(result.error === '') {
            getMedico();
            setComentario('');
            setShow(false);
        } else {
            alert(result.error);
        }
    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                    <Icon name="chevron-down" size={30} color="#000000" />
                    </CloseButton>
                    <ModalItem>
                        <Field
                            placeholder="Digite seu Comentário"
                            value={comentario}
                            onChangeText={t=>setComentario(t)}
                        />
                    </ModalItem>
                    <FinishButton onPress={handleFinishClick}>
                        <FinishButtonText>
                            Comentar
                        </FinishButtonText>
                    </FinishButton>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}