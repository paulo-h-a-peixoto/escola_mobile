import React, { useEffect, useState } from 'react';
import { Alert, Text, View, Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { CheckBox, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from './style';
import Video from 'react-native-video';
import LightVideo from '../../assets/video.mp4';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import Vimeo from 'react-native-vimeo-iframe';
import { WebView } from 'react-native-webview';

import UnitPeopleSection from '../../components/UnitPeopleSection';
import UnitVehicleSection from '../../components/UnitVehicleSection';
import UnitPetSection from '../../components/UnitPetSection';

import UnitModalAddPerson from '../../components/UnitModalAddPerson';
import UnitModalAddVehicle from '../../components/UnitModalAddVehicle';
import UnitModalAddPet from '../../components/UnitModalAddPet';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const route = useRoute();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [aprovado, setAprovado] = useState(false);
    const [recusado, setRecusado] = useState(false);
    const [comentario, setComentario] = useState('');

    useEffect(()=>{
        getVideoId();
    }, []);

    

    const getVideoId = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getVideoId(route.params.id);
        if(result.error === '') {
            console.log(result.list);
            setList(result.list);
        } else {
            alert(result.error);
        }
        setLoading(false);

    }

    useFocusEffect(
        React.useCallback(() => {
          getVideoId();
            
        }, [])
    );

    const setarAprovado = (r) => {
      if(r == 0){
        setAprovado(true);
        setRecusado(false);
      }else{
        setRecusado(true);
        setAprovado(false);
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
      },
      buttonOpenSelected: {
          backgroundColor: "#218838",
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
      setModalVisible(true);
      
  }

    const handleHomologarButton = async () => {
      if(!aprovado && !recusado){
        alert('Selecione Aprovado ou Recusado');
        return false;
      }
      let resAp = 0;
      if(aprovado){
        resAp = 1;
      }else{
        resAp = 2;
      }
      const result = await api.homologarVideo(list.video.id, resAp, comentario);
      if(result.error === '') {
        if(aprovado){
          alert('Video homologado com sucesso!')
        }else{
          alert('Video salvo com sucesso!')
        }
        navigation.reset({
          index: 1,
          routes:[{name: 'HomologacaoScreen'}]
      });
      } else {
          alert(result.error);
      }
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
                
                <C.CheckBoxArea>
                <CheckBox
                title='Aprovado'
                checked={aprovado}
                onPress={()=>setarAprovado(0)}
                containerStyle={{borderWidth: 0, width: 120}}
                />
                <CheckBox
                title='Recusado'
                checked={recusado}
                onPress={()=>setarAprovado(1)}
                containerStyle={{ borderWidth: 0, width: 110}}
                />
            </C.CheckBoxArea>
            <C.Field
                placeholder="Digite um comentário"
                placeholderTextColor="black"
                keyboardType="text"
                value={comentario}
                onChangeText={t=>setComentario(t)}
            />
            {aprovado && !recusado && 
            <C.ButtonArea style={{marginBottom: 25}} onPress={handleHomologarButton}>
                <C.ButtonText>Homologar</C.ButtonText>
            </C.ButtonArea>
            }
            {!aprovado && recusado && 
            <C.ButtonArea style={{marginBottom: 25}} onPress={handleHomologarButton}>
                <C.ButtonText>Salvar</C.ButtonText>
            </C.ButtonArea>
            }
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Fechar</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
          {loading && 
          <C.LoadingIcon color="#3795d2" size="large" />
          }
          {!loading && 
           <WebView source={{ uri: `https://player.vimeo.com/video/${list.video.urlVideo.replace(/\D/gim, '')}?badge=false&amp;autopause=0&amp;player_id=0&amp;title=false;portrait=false;pip=false;dnt=false;byline=false;playsinline=false` }} />
          }
          <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={handleModalVisible}
            >
                <Text style={styles.textStyle}>Homologar</Text>
            </Pressable>
        </C.Container>
    );
}