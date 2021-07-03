import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import WallItem from '../../components/WallItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [wallList, setWallList] = useState([]);

    const handlePostarButton = () => {
        navigation.navigate('UnitScreen');
    }

    const handleAlunoButton = () => {
        navigation.navigate('AlunoScreen');
    }

    const handleVideoButton = () => {
        navigation.navigate('VideoScreen');
    }

    const handleHomologarButton = () => {
        navigation.navigate('HomologacaoScreen');
    }

    const handleAssistirButton = () => {
        navigation.navigate('AssistirScreen');
    }

    

    return (
        <C.Container>
          
            <C.Menu1 onPress={handleAlunoButton}>
                <C.Text>Aluno</C.Text>
                <C.Image source={require('../../assets/img1.png')}/>
            </C.Menu1>

            <C.Menu2>
                <C.Text>Professor</C.Text>
                <C.Image source={require('../../assets/img3.png')}/>
            </C.Menu2>

            <C.Menu3 onPress={handlePostarButton}>
                <C.Text>Postar</C.Text>
                <C.Image source={require('../../assets/img2.png')}/>
            </C.Menu3>

            <C.Menu1 onPress={handleAssistirButton}>
                <C.Text>Assistir</C.Text>
                <C.Image source={require('../../assets/img4.png')}/>
            </C.Menu1>

            <C.Menu2 onPress={handleHomologarButton}>
                <C.Text>Homologar</C.Text>
                <C.Image source={require('../../assets/img3.png')}/>
            </C.Menu2>

            <C.Menu1 >
                <C.Text>Informações</C.Text>
                <C.Image source={require('../../assets/img4.png')}/>
            </C.Menu1>

            

        </C.Container>
    );
}