import React, { useEffect, useState } from 'react';
import { Alert, Text, View, Modal, Pressable, StyleSheet, TouchableOpacity, Linking } from 'react-native';
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
    const [like, setLike] = useState(false);
    const [disLike, setDisLike] = useState(false);
    const [numLike, setNumLike] = useState(0);
    const [numDisLike, setNumDisLike] = useState(0);
    

    

    

    const getVideoId = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getVideoId(route.params.id);
        if(result.error === '') {
            setList(result.list);
            setNumLike(result.list.video.likes);
            setNumDisLike(result.list.video.dislikes);
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
      boxLike: {
        margin:20,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: "#3795d2",
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
      },
      
    });

    const handleModalVisible = async () => {
      setModalVisible(true);
      
  }

  const handleLikeClick = async () => {
    if(like){
      setLike(false);
      const result = await api.unlike(route.params.id, 0);
        if(result.error === '') {
            setNumLike(result.list.likes);
            setNumDisLike(result.list.dislikes);
        }
    }else{
      setLike(true);
      setDisLike(false);
      const result = await api.like(route.params.id, 0);
        if(result.error === '') {
            setNumLike(result.list.likes);
            setNumDisLike(result.list.dislikes);
        }
    }
  }

  const handleClick = async () => {
    let linkurl = 'https://escola.paulopeixoto.com/documentos/'+list.video.urlArquivo;
    const supported = await Linking.canOpenURL( linkurl );
    if(supported) {
        await Linking.openURL(linkurl);
    }
}
  const handleDisLikeClick = async () => {
    if(disLike){
      setDisLike(false);
      const result = await api.unlike(route.params.id, 1);
        if(result.error === '') {
            setNumLike(result.list.likes);
            setNumDisLike(result.list.dislikes);
        }
    }else{
      setDisLike(true);
      setLike(false);
      const result = await api.like(route.params.id, 1);
        if(result.error === '') {
            setNumLike(result.list.likes);
            setNumDisLike(result.list.dislikes);
        }
    }
    
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
        alert('Video homologado com sucesso!')
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
                title='Cuiti'
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
            <View
                style={[styles.boxLike]}
            >
                {!loading && 
                <C.FooterArea>
                  <C.LikeButton onPress={handleLikeClick}>
                    {like && 
                    <Icon name="thumbs-up" size={30} color="#0f0" />
                    }
                    {!like && 
                    <Icon name="thumbs-up" size={30} color="#ccc" />
                    }
                  </C.LikeButton>
                  <C.LikeText>{numLike} curtiram</C.LikeText>
                </C.FooterArea>
                }
                {!loading && list.video.urlArquivo !== null && 
                <C.FooterArea>
                  <C.LikeButton onPress={handleClick}>
                    <Icon name="download" size={30} color="#ccc" />
                  </C.LikeButton>
                  <C.LikeText>Arquivo</C.LikeText>
                </C.FooterArea>
                }
                {!loading && 
                <C.FooterArea>
                  <C.LikeButton onPress={handleDisLikeClick}>
                    {disLike && 
                    <Icon name="thumbs-down" size={30} color="#f00" />
                    }
                    {!disLike && 
                    <Icon name="thumbs-down" size={30} color="#ccc" />
                    }
                  </C.LikeButton>
                  <C.LikeText>{numDisLike} não curtiram</C.LikeText>
                </C.FooterArea>
                }
            </View>
        </C.Container>
    );
}