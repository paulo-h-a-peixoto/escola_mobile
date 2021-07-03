import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert, View, Text, ProgressBarAndroid, Modal, Pressable, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
    const [enviopdf, setEnviopdf] = useState(false);

    const [enviando, setEnviando] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const [showMateria, setShowMateria] = useState(true);
    const [showMateriaAssunto, setShowMateriaAssunto] = useState(false);

    const [loadingModal, setLoadingModal] = useState(true);

    const [materia, setMateria] = useState('');
    const [myMateria, setMyMateria] = useState({});
    const [myMateriaAssunto, setMyMateriaAssunto] = useState({});

    const [titulo, setTitulo] = useState('');

    const [uploadProgress, setUploadProgress] = useState(0);

    const [arquivo, setArquivo] = useState([]);
    const [arquivoPdf, setArquivoPdf] = useState([]);

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

    const handleProgress = event => {
        setUploadProgress(Math.round((event.loaded * 100) / event.total));
    }

    const handleRegisterButton = async () => {
        if(envio){
            if(materia != '') {
                setEnviando(true);
            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            formData.append('arquivo', {
                uri: arquivo.uri,
                type: arquivo.type,
                name: arquivo.name
            });
            
            if(arquivoPdf.uri){
                formData.append('arquivoPdf', {
                    uri: arquivoPdf.uri,
                    type: arquivoPdf.type,
                    name: arquivoPdf.name
                });
            }

            formData.append('titulo', titulo);
            formData.append('materia', materia);
            

            formData.append('id', context.user.user.id);
            formData.append('turma', context.user.user.turma);

            xhr.upload.addEventListener('progress', handleProgress);
            xhr.addEventListener('load', () => {
                setUploadProgress(100);
                setEnviando(false);
                alert('Vídeo enviado com sucesso para homologação!');
                navigation.reset({
                    index: 1,
                    routes:[{name: 'WallScreen'}]
                });

            });

            xhr.open('POST', 'https://escola.paulopeixoto.com/api/vimeo');
            xhr.send(formData);


            // let result = await api.uploadVideo(arquivo);
            // if(result.error === '') {
            
                
            // } else {
            //     Alert.alert('Atenção!', `${result.error}`, [
            //         {text: 'Fechar'}
            //     ]);
            // }
            // alert('Vídeo enviado com sucesso para o seu professor!')
            // // navigation.reset({
            // //     index: 1,
            // //     routes:[{name: 'WallScreen'}]
            // // });
            }else{
                alert('Para proceguir é necessário selecionar uma matéria!');
            }
            
        }else{
            alert('Para proceguir é necessário adicionar um vídeo!');
        }
        
    }

    const styles = StyleSheet.create({
        centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22
        },
        buttonEscolaridade: {
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: "#3795d2",
            padding:15
        },  
        buttonEscolaridadeText: {
            color: '#fff',
        },  
        modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        },
        button: {
            marginTop: 10,
            borderRadius: 20,
            padding: 10,
            elevation: 2
        },
        buttonOpen: {
          backgroundColor: "#3795d2",
          margin:20,
        },
        buttonOpenSelected: {
            backgroundColor: "#218838",
            margin:20,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonClose: {
          backgroundColor: "#2196F3",
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
        textStyleSelected: {
            color: '#fff',
        },  
        modalText: {
          marginBottom: 15,
          textAlign: "center"
        }
      });

    const handleModalVisible = async () => {
        setLoadingModal(true);
        setModalVisible(true);
        setShowMateria(true);
        setShowMateriaAssunto(false);
        
        let result = await api.getMaterias();
        if(result.error === '') {
            setMyMateria(result.list);
            setLoadingModal(false);
            
        }
    }

    const handleSetMateria = async (id) => {
        setLoadingModal(true);
        
        let result = await api.getMateriaAssunto(id);
        if(result.error === '') {
            console.log(result.list);

            setMyMateria(result.list);
            setLoadingModal(false);
            setShowMateria(false);
            setShowMateriaAssunto(true);
            
        }
    }

   

    const handleSetMateriaAssunto = async (id) => {
        setMateria(id);
        setModalVisible(!modalVisible);
    }


    const openDocumentFile = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            console.log(res);
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

    const openDocumentFilePdf = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            setArquivoPdf(res);
            setEnviopdf(true);

            alert('PDF arquivado com sucesso!');
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }

    const deletePdf = () => {
        setEnviopdf(false);
    }
    const deleteVideo = () => {
        setEnvio(false);
    }

    return (
        <C.Container>
             <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
           
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {loadingModal && 
                    <C.LoadingIcon color="#3795d2" size="large" />
                    }
                    {showMateria && !showMateriaAssunto &&  !loadingModal && 
                    <>
                    
                    <Text style={styles.modalText}>Selecione a Matéria</Text>
                        {myMateria.map((item, index)=>(
                            <View key={index}>
                                <TouchableOpacity style={styles.buttonEscolaridade} onPress={() => handleSetMateria(item.id)}>
                                    <Text style={styles.buttonEscolaridadeText}>{item.nome}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        
                       
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Fechar</Text>
                    </Pressable>
                    </>
                    }
                    {!showMateria && showMateriaAssunto && !loadingModal && 
                    <>
                    
                    <Text style={styles.modalText}>Selecione o Assunto</Text>
                    <ScrollView>
                        {myMateria.map((item, index)=>(
                            <View key={index}>
                                <TouchableOpacity style={styles.buttonEscolaridade} onPress={() => handleSetMateriaAssunto(item.id)}>
                                    <Text style={styles.buttonEscolaridadeText}>{item.nome}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        
                        </ScrollView>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Fechar</Text>
                    </Pressable>
                    </>
                    }
                </View>
                </View>
                
            </Modal>
            
            {!enviando &&
            <>
            {/* <C.Header>
                <C.HeaderText>Seja Bem Vindo(a) {context.user.user.nome}</C.HeaderText>
            </C.Header> */}
            <C.Box>
                <C.BoxText>
                    Último vídeo da sua turma
                </C.BoxText>
            </C.Box>
                <C.Video>
                    <C.VideoFake onPress={handleVideoButton}>
                    <C.PhotoItem source={require('../../assets/aluno.jpg')} resizeMode="cover" />
                        <View style={{flexDirection: 'column'}}>
                        <C.VideoFakeText>Adryan lewandowski</C.VideoFakeText>
                        <C.VideoFakeText style={{fontSize: 15}}>Aprovado dia 17/06/2021</C.VideoFakeText>
                        </View>
                    </C.VideoFake>
                    {/* <C.Icones>
                        <Icon name="download" size={20} style={{marginRight: 10}} color="#f00" />
                        <Icon name="heart" size={20}  style={{marginRight: 10}} color="#28A745" />
                        <C.IconesText>11 Mil Likes</C.IconesText>

                    </C.Icones> */}
                </C.Video>
               
                
                {materia === '' && 
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={handleModalVisible}
                >
                    <Text style={styles.textStyle}>Selecionar Matéria</Text>
                </Pressable>
                }
                {materia != '' && 
                <Pressable
                    style={[styles.button, styles.buttonOpenSelected]}
                    onPress={handleModalVisible}
                >
                    <Text style={styles.textStyle, styles.textStyleSelected}>Matéria e Assunto selecionados</Text>
                </Pressable>
                }
                <C.Field
                    placeholder="Digite o título do seu vídeo"
                    placeholderTextColor="black"
                    value={titulo}
                    onChangeText={t=>setTitulo(t)}
                />
                {!envio && 
                <C.BotaoView onPress={openDocumentFile}>
                    <Icon name="play" size={40} style={{marginRight: 10}} color="#1676d2" />
                    <C.BotaoText>Fazer Upload Vídeo</C.BotaoText>
                </C.BotaoView>
                }
                {envio && 
                <C.BotaoView onPress={deleteVideo}>
                    <Icon name="times" size={40} style={{marginRight: 10}} color="#1676d2" />
                <C.BotaoText>Remover video Enviado</C.BotaoText>
                </C.BotaoView>
                }
                {!enviopdf && 
                <C.BotaoView onPress={openDocumentFilePdf}>
                    <Icon name="upload" size={40} style={{marginRight: 10}} color="#1676d2" />
                    <C.BotaoText>Fazer Upload PDF</C.BotaoText>
                </C.BotaoView>
                }
                {enviopdf && 
                <C.BotaoView onPress={deletePdf}>
                    <Icon name="times" size={40} style={{marginRight: 10}} color="#1676d2" />
                    <C.BotaoText>Remover pdf enviado</C.BotaoText>
                </C.BotaoView>
                }
                {/* <C.BotaoView>
                    <Icon name="thumbs-up" size={40} style={{marginRight: 10}} color="#1676d2" />
                    <C.BotaoText>Todos os Vídeos</C.BotaoText>
                </C.BotaoView>
                <C.BotaoView>
                    <Icon name="pencil" size={40} style={{marginRight: 10}} color="#1676d2" />
                    <C.BotaoText>Escreva em seu diário</C.BotaoText>
                </C.BotaoView>
                
                <C.BotaoView>
                    <Icon name="book" size={40} style={{marginRight: 10}} color="#1676d2" />
                    <C.BotaoText>Biblioteca</C.BotaoText>
                </C.BotaoView>

                <C.BotaoView>
                    <Icon name="clipboard" size={40} style={{marginRight: 10}} color="#1676d2" />
                    <C.BotaoText>Notas e Frequências</C.BotaoText>
                </C.BotaoView> */}

            <C.ButtonArea style={{marginBottom: 50}} onPress={handleRegisterButton}>
                <C.ButtonText>Enviar</C.ButtonText>
            </C.ButtonArea>
            </>
            }

            {enviando && 
            <C.LoadingUpload>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Carregando {uploadProgress}%</Text>
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    minWidth={300}
                    indeterminate={false}
                    progress={(uploadProgress / 100)}
                >

                </ProgressBarAndroid>
            </C.LoadingUpload>
            }
        </C.Container>
    );
}