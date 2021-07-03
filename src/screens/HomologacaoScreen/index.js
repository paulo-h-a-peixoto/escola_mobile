import React, { useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import C from './style';

import {View, Text} from 'react-native';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import WallItem from '../../components/WallItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const[showEscolaridade, setShowEscolaridade] = useState(true);
    const[escolaridade, setEscolaridade] = useState([]);
    const[turma, setTurma] = useState([]);
    const[serie, setSerie] = useState([]);
    
    const[showSerie, setShowSerie] = useState(false);
    const[showTurma, setShowTurma] = useState(false);
    const[showVideo, setShowVideo] = useState(false);

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(()=>{
        getVideos();
    }, []);

    const getVideos = async () => {
        setList([]);
        setLoading(true);
        setShowSerie(false);
        setShowEscolaridade(true);
        setShowTurma(false);
        setShowVideo(false);
        const result = await api.getVideos();
        setLoading(false);
        if(result.error === '') {
            setEscolaridade(result.escolaridades);
            setSerie(result.series);
            setTurma(result.turmas);
            setList(result.list);
        } else {
            alert(result.error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getVideos();
            
        }, [])
    );

    const handleEscolaridadeSelect = (id) => {
        setLoading(true);
        let series = [];
        console.log('id');
        console.log(id);
        console.log('ant');
        console.log(serie);
        for(let i = 0; i < serie.length; i++){
            if(id == serie[i]['escolaridade_pai']){
                series.push(serie[i]);
            }
        }
        console.log('novo');
        console.log(series);
        setSerie(series);
        setShowSerie(true);
        setShowEscolaridade(false);
        setShowTurma(false);
        setShowVideo(false);
        setLoading(false);
    }

    const handleSerieSelect = (id) => {
        setLoading(true);
        let turmas = [];
        console.log('id');
        console.log(id);
        console.log('ant');
        console.log(turma);
        for(let i = 0; i < turma.length; i++){
            if(id == turma[i]['escolaridade_pai']){
                turmas.push(turma[i]);
            }
        }
        setTurma(turmas);
        console.log('novo');
        console.log(turmas);
        setShowSerie(false);
        setShowEscolaridade(false);
        setShowTurma(true);
        setShowVideo(false);
        setLoading(false);
    }

    const handleTurmaSelect = (id) => {
        setLoading(true);
        let videos = [];
        console.log('id');
        console.log(id);
        console.log('ant');
        console.log(list);
        for(let i = 0; i < list.length; i++){
            if(id == list[i]['video']['idEscolaridade']){
                videos.push(list[i]);
            }
        }
        console.log('novo');
        console.log(videos);
        setList(videos);
        setShowSerie(false);
        setShowEscolaridade(false);
        setShowTurma(false);
        setShowVideo(true);
        setLoading(false);
    }

 

    const handleAlunoButton = (id) => {
        navigation.navigate('VideoHomologacaoScreen', {id: id});
    }

    



    

    return (
        <C.Container>

            {loading && 
            <C.LoadingIcon color="#3795d2" size="large" />
            }
            {list.length == 0 && !loading &&
            <View>
                <Text>Nenhum vídeo para homologação</Text>
            </View>
            }
            {!loading && showEscolaridade && !showSerie && !showTurma && !showVideo &&
            
            <>
             <View>
                <Text style={{fontWeight: 'bold', fontSize: 26, marginBottom: 10, color: '#3795d2'}}>Selecione a Escolaridade</Text>
            </View>
             {escolaridade.map((item, index)=>(
                    <View key={index}>
                        <C.Menu1 onPress={() => handleEscolaridadeSelect(item.id)}>
                            <C.Text>{item.nome}</C.Text>
                        </C.Menu1>
                    </View>
                ))}
            </>
            }
            {!loading && !showEscolaridade && showSerie && !showTurma && !showVideo &&
            
            <>
             <View>
                <Text style={{fontWeight: 'bold', fontSize: 26, marginBottom: 10, color: '#3795d2'}}>Selecione a Série</Text>
            </View>
             {serie.map((item, index)=>(
                    <View key={index}>
                        <C.Menu1 onPress={() => handleSerieSelect(item.id)}>
                            <C.Text>{item.nome}</C.Text>
                        </C.Menu1>
                    </View>
                ))}
            </>
            }
            {!loading && !showEscolaridade && !showSerie && showTurma && !showVideo &&
            
            <>
             <View>
                <Text style={{fontWeight: 'bold', fontSize: 26, marginBottom: 10, color: '#3795d2'}}>Selecione a Turma</Text>
            </View>
             {turma.map((item, index)=>(
                    <View key={index}>
                        <C.Menu1 onPress={() => handleTurmaSelect(item.id)}>
                            <C.Text>{item.nome}</C.Text>
                        </C.Menu1>
                    </View>
                ))}
            </>
            }
            {!loading && !showEscolaridade && !showSerie && !showTurma && showVideo &&
            
            <>
             <View>
                <Text style={{fontWeight: 'bold', fontSize: 26, marginBottom: 10, color: '#3795d2'}}>Selecione o Vídeo</Text>
            </View>
             {list.map((item, index)=>(
                    <View key={index}>
                        <C.Menu1 onPress={() => handleAlunoButton(item.video.id)}>
                        <C.Text>Aluno: {item.aluno.nome}</C.Text>
                        <C.Text>Titulo: {item.video.titulo}</C.Text>
                        <C.Text style={{fontSize:15}}>Matéria/Assunto: {item.materia.nome} - {item.assunto.nome}</C.Text>
                        </C.Menu1>
                    </View>
                ))}
            </>
            }
        </C.Container>
    );
}