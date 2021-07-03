import React, { useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const Box = styled.TouchableOpacity`
    background-color: #FFF;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 10px;
`;
const Date = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #9C9DB9;
    margin-bottom: 10px;
`;
const Title = styled.Text`
    font-size: 15px;
    color: #000;
`;
const StatusArea = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
`;
const StatusText = styled.Text`
    font-size: 14px;
    color: #9C9DB9;
    margin-left: 10px;
`;

const PhotosArea = styled.View`
    flex-direction: row;
`;
const PhotoItem = styled.TouchableOpacity`
    margin-right: 10px;
`;
const PhotoImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 10px;
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: #000;
`;
const ModalImage = styled.Image`
    flex: 1;
`;
const ModalCloseButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 15px;
    right: 10px;
`;

const CloseButton = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-end;
`;


export default ({data}) => {

    const navigation = useNavigation();
    const route = useRoute();

    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    const openModal = (img) => {
        setModalImage(img);
        setShowModal(true);
    }

    const handleView = async () => {
        
            const result = await api.getMedicoId(data.id);
            if(result.error === '') {
                navigation.navigate('ReservationMedico', {data: result});
            } else {
                alert(result.error);
            }
        
    }

    const handleRemoveMedico = async () => {
        const result = await api.removeMedicoId(data.id);
            if(result.error === '') {
                alert('Médico removido com sucesso!');
                navigation.reset({
                    routes:[{name: 'WarningScreen'}]
                });
               
            } else {
                alert(result.error);
            }
    }

    const handlEditMedico = () => {
        navigation.navigate('WarningEditScreen', {data});
    }

    return (
        <Box onPress={handleView}>
            <CloseButton onPress={handlEditMedico}>
            <Icon name="edit" size={30} color="#28A745" />
            </CloseButton>
            <Date>Nome: {data.NOME}</Date>
            <Date>Telefone: {data.TELEFONE}</Date>
            <Date>CRM: {data.CRM}</Date>
            <Date>Endereço: {data.ENDERECO}</Date>
            <Date>Especialidade: {data.ESPECIALIDADE}</Date>
            <Date>Período de Atendimento: {data.ID_PERIODO}</Date>
            <CloseButton onPress={handleRemoveMedico}>
            <Icon name="times" size={30} color="#DC3545" />
            </CloseButton>
        </Box>
    );
}