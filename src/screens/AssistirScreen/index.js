import React, { useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import C from './style';

import {View, Text, TouchableOpacity} from 'react-native';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import WallItem from '../../components/WallItem';
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes/index.js';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [listOri, setListOri] = useState([]);

    const [showMateria, setShowMateria] = useState(true);
    const [showAssunto, setShowAssunto] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const [materia, setMateria] = useState([]);
    const [assunto, setAssunto] = useState([]);

    const [botaoClick, setBotaoClick] = useState(0);


    useEffect(()=>{
        getVideos();
    }, []);

    const getVideos = async () => {
        setList([]);
        setLoading(true);
        setShowMateria(true);
        setShowAssunto(false);
        setShowVideo(false);
        const result = await api.getVideosAssistir();
        setLoading(false);
        if(result.error === '') {
            setMateria(result.materias);
            setAssunto(result.assuntos);
            setList(result.list);
            setListOri(result.list);
        } else {
            alert(result.error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getVideos();
            
        }, [])
    );

    const handleMateriaSelect = (id) => {
        setLoading(true);
        let assuntos = [];
        for(let i = 0; i < assunto.length; i++){
            if(id == assunto[i]['materia_pai']){
                assuntos.push(assunto[i]);
            }
        }
        setAssunto(assuntos);
        setShowMateria(false);
        setShowAssunto(true);
        setShowVideo(false);
        setLoading(false);
        setBotaoClick(0);
    }

    const handleAssuntoSelect = (id) => {
        setLoading(true);
        let videos = [];
        for(let i = 0; i < listOri.length; i++){
            if(id == listOri[i]['video']['idMateria']){
                videos.push(listOri[i]);
            }
        }
        
        setList(videos);
        setShowMateria(false);
        setShowAssunto(false);
        setShowVideo(true);
        setLoading(false);
        setBotaoClick(0);
    }

    const handleVoltarButton = (id) => {
        if(botaoClick == 0){
            if(id == 2){
                setShowMateria(false);
                setShowAssunto(true);
                setShowVideo(false);
            }else{
                setShowMateria(true);
                setShowAssunto(false);
                setShowVideo(false);
            }
        }else{
            setShowMateria(true);
            setShowAssunto(false);
            setShowVideo(false);
        }
        
    }

    const handleTodosVideos = () => {
        setLoading(true);
        setList(listOri);
        setShowMateria(false);
        setShowAssunto(false);
        setShowVideo(true);
        setLoading(false);
        setBotaoClick(1);
    }
 

    const handleAlunoButton = (id) => {
        navigation.navigate('VideoAssistirScreen', {id: id});
        
    }

    



    

    return (
        <C.Container>

            {loading && 
            <C.LoadingIcon color="#3795d2" size="large" />
            }
            {list.length == 0 && !loading &&
            <View>
                <Text>Nenhum vídeo para assistir</Text>
            </View>
            }
            {!loading && showMateria && !showAssunto && !showVideo &&
            
            <>
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 26, marginBottom: 10, color: '#3795d2'}}>Selecione a Matéria</Text>
            </View>
            <View>
                <C.Menu1 onPress={handleTodosVideos}>
                    <C.Text>Mostrar Todos os Vídeos</C.Text>
                </C.Menu1>
            </View>
             {materia.map((item, index)=>(
                    <View key={index}>
                        <C.Menu1 onPress={() => handleMateriaSelect(item.id)}>
                            <C.Text>{item.nome}</C.Text>
                        </C.Menu1>
                    </View>
                ))}
            </>
            }
            {!loading && !showMateria && showAssunto && !showVideo &&
            
            <>
            <TouchableOpacity onPress={() => handleVoltarButton(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 26, marginBottom: 10, color: '#ccc'}}>Voltar</Text>
            </TouchableOpacity>
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 26, marginBottom: 10, color: '#3795d2'}}>Selecione o Assunto</Text>
            </View>
             {assunto.map((item, index)=>(
                    <View key={index}>
                        <C.Menu1 onPress={() => handleAssuntoSelect(item.id)}>
                            <C.Text>{item.nome}</C.Text>
                        </C.Menu1>
                    </View>
                ))}
            </>
            }
            {!loading && !showMateria && !showAssunto && showVideo &&
            
            <>
            <TouchableOpacity onPress={() => handleVoltarButton(2)}>
                <Text style={{fontWeight: 'bold', fontSize: 26, marginBottom: 10, color: '#ccc'}}>Voltar</Text>
            </TouchableOpacity>
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 26, marginBottom: 10, color: '#3795d2'}}>Selecione o Vídeo</Text>
            </View>
             {list.map((item, index)=>(
                    <View key={index}>
                        <C.Menu1 onPress={() => handleAlunoButton(item.video.id)}>
                            <C.Text>{item.video.titulo}</C.Text>
                        </C.Menu1>
                    </View>
                ))}
            </>
            }
        </C.Container>
    );
}