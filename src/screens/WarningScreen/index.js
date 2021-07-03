import React, { useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import WarningItem from '../../components/WarningItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Médicos',
            headerRight: () => (
                <C.AddButton onPress={()=>navigation.navigate('WarningAddScreen')}>
                    <Icon name="plus" size={24} color="#000" />
                </C.AddButton>
            )
        });
        getMedicos();
    }, []);

    const getMedicos = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getMedicos();
        setLoading(false);
        if(result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getMedicos();
            
        }, [])
    );

    return (
        <C.Container>
            {!loading && list.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há médicos cadastrados.</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={list}
                onRefresh={getMedicos}
                refreshing={loading}
                renderItem={({item})=><WarningItem data={item} />}
                keyExtractor={(item)=>item.id.toString()}
            />
        </C.Container>
    );
}