import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

import MedicoComentario from '../../components/MedicoComentario';
import ComentarioModal from '../../components/ComentarioModal';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [medicoList, setMedicoList] = useState([]);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: `Médico(a) ${route.params.data.list.NOME}`
            });
            
        });
        getMedicoId();
        return unsubscribe;
    }, [navigation, route]);
   
    const getMedicoId = async () => {
        setMedicoList([]);
        setLoading(true);
        const result = await api.getMedicoId(route.params.data.list.id);
        setLoading(false);
        if(result.error === '') {
            setMedicoList(result.list);
            console.log(result.list);
        } else {
            alert(result.error);
        }
    }

    const showTextDate = (date) => {
        let dateEl = new Date(date);
        let year = dateEl.getFullYear();
        let month = dateEl.getMonth() + 1;
        let day = dateEl.getDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        return `${day}/${month}/${year}`;
    }

    const showTimeDate = (time) => {
        if(typeof time == 'string'){
            let newTime = time.substr(0, 5);
            return newTime;
        }
        
    }

    const handleComentarioChoose = () => {
        setShowModal(true);
    }

    return (
        <C.Container>
           <C.Header>
               <C.Info>
                   <C.InfoText>
                       Nome :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.NOME}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       CRM :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.CRM}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       Endereço :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.ENDERECO}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       Telefone :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.TELEFONE}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       Data marcada :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {showTextDate(medicoList.DIA)}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       Hora marcada :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {showTimeDate(medicoList.HORA)}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                      Especialidade :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.ESPECIALIDADE}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                      Período de Atendimento :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.ID_PERIODO}
                   </C.InfoTextMin>
               </C.Info>
           </C.Header>
           
           <C.List
                data={medicoList.comentarios}
                onRefresh={getMedicoId}
                refreshing={loading}
                renderItem={({item})=><MedicoComentario data={item} />}
                keyExtractor={(item)=>item.id.toString()}
            />
            <C.ButtonArea onPress={()=>handleComentarioChoose()}>
                    <C.ButtonText>Adicionar Comentário</C.ButtonText>
            </C.ButtonArea>

            <ComentarioModal 
                show={showModal}
                setShow={setShowModal}
                getMedico={getMedicoId}

                medicoId={route.params.data.list.id}
            />

        </C.Container>
    );
}