import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text } from 'react-native';
import C from './style';
import { useStateValue } from '../../contexts/StateContext';
import DocumentPicker from 'react-native-document-picker';
import api from '../../services/api';
import {Picker} from '@react-native-community/picker';
import { CheckBox, Button, Overlay } from 'react-native-elements';

import UnitPeopleSection from '../../components/UnitPeopleSection';
import UnitVehicleSection from '../../components/UnitVehicleSection';
import UnitPetSection from '../../components/UnitPetSection';

import UnitModalAddPerson from '../../components/UnitModalAddPerson';
import UnitModalAddVehicle from '../../components/UnitModalAddVehicle';
import UnitModalAddPet from '../../components/UnitModalAddPet';



export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [terapeutizando, setTerapeutizando] = useState(false);
    const [gestor, setGestor] = useState(false);
    const [psicologo, setPsicologo] = useState(false);

    const [loading, setLoading] = useState(true);
    const [peopleList, setPeopleList] = useState([]);
    const [vehicleList, setVehicleList] = useState([]);
    const [petList, setPetList] = useState([]);
    const [minhaAbordagem, setMinhaAbordagem] = useState('');
    const [minhaAbordagem2, setMinhaAbordagem2] = useState('');
    const [envio, setEnvio] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const [arquivo, setArquivo] = useState([]);

    const handleVideoButton = () => {
        navigation.navigate('VideoScreen');
    }

    const selectTipoUsuario = (item) => {
        if(item == '1'){
            setTerapeutizando(true);
            setGestor(false);
            setPsicologo(false);
        }else if(item == '2'){
            setTerapeutizando(false);
            setGestor(true);
            setPsicologo(false);
        }else{
            setTerapeutizando(false);
            setGestor(false);
            setPsicologo(true);
        }
    }

    const handleRegisterButton = () => {
        if(envio){
            alert('Vídeo enviado com sucesso para homologação!')
            navigation.reset({
                index: 1,
                routes:[{name: 'WallScreen'}]
            });
        }else{
            alert('Para proceguir é necessário adicionar um vídeo!');
        }
        
    }


    const openDocumentFile = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            setArquivo(res);
            setEnvio(true);

            alert('Arquivo salvo com sucesso!');
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }

    return (
        <C.Container>
            {/* <C.Header>
                <C.HeaderText>Seja Bem Vindo(a) {context.user.user.nome}</C.HeaderText>
            </C.Header> */}
            
                <C.Video>
                    <C.VideoFake onPress={handleVideoButton}>
                    <C.PhotoItem source={require('../../assets/aluno.jpg')} resizeMode="cover" />
                        <View style={{flexDirection: 'column'}}>
                        <C.VideoFakeText style={{maxWidth:250}}>{context.user.user.nome}</C.VideoFakeText>
                        </View>
                    </C.VideoFake>
                    {/* <C.Icones>
                        <Icon name="download" size={20} style={{marginRight: 10}} color="#f00" />
                        <Icon name="heart" size={20}  style={{marginRight: 10}} color="#28A745" />
                        <C.IconesText>11 Mil Likes</C.IconesText>

                    </C.Icones> */}
                </C.Video>
                <View style={{
                    padding:30,
                    margin:10,
                    backgroundColor: '#1676d2',
                    borderRadius: 60,
                }}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15, marginBottom: 5}}>Matricula: {context.user.user.matricula}</Text>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15, marginBottom: 5}}>Turma: {context.user.user.turma}</Text>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15, marginBottom: 5}}>E-mail: {context.user.user.email}</Text>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15, marginBottom: 5}}>CPF: {context.user.user.cpf}</Text>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15, marginBottom: 5}}>Telefone: {context.user.user.telefone}</Text>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15, marginBottom: 5}}>Data de Nascimento: {context.user.user.nascimento}</Text>
                </View>
               
                
           
           
                
        </C.Container>
    );
}