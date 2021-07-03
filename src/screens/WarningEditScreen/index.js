import React, { useEffect, useState } from 'react';
import { Button, View } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera } from 'react-native-image-picker';
import C from './styles';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();

    const [warnText, setWarnText] = useState('');
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState('Selecione uma opção');
    const [outro, setOutro] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [crm, setCrm] = useState('');
    const [especialidade, setEspecialidade] = useState('');

    const [data, setData] = useState(new Date());
    const [hora, setHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

   

    const formatHora = (hora) => {
        if( hora.length==2 )
		{
            setHora(`${hora}:`);
			
		}else if(hora.length >=6){
            
        }else{
            setHora(hora);
        }
		
    }


    const handleConfirm = (date) => {
        let dateEl = new Date(date);
        let year = dateEl.getFullYear();
        let month = dateEl.getMonth() + 1;
        let day = dateEl.getDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        
        setData(`${year}-${month}-${day}`);
        hideDatePicker();
    };

    const showTextDate = (date) => {
        if(date != ''){
            let dateEl = new Date(date);
            let year = dateEl.getUTCFullYear();
            let month = dateEl.getUTCMonth() + 1;
            let day = dateEl.getUTCDate();

            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;
            return `${day}/${month}/${year}`;
        }
    }

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        let dateEl = new Date(time);
        let hours = dateEl.getHours();
        let minutes = dateEl.getMinutes();
        let seconds = dateEl.getSeconds();

        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;

        setTime(`${hours}:${minutes}`);
        hideTimePicker();
    };

    const showTextTime = (time) => {
        // if(time != ''){
        //     let dateEl = new Date(date);
        //     let year = dateEl.getFullYear();
        //     let month = dateEl.getMonth() + 1;
        //     let day = dateEl.getDate();

        //     month = month < 10 ? '0'+month : month;
        //     day = day < 10 ? '0'+day : day;
        //     return `${day}/${month}/${year}`;
        // }
    }

   

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: `Editar Médico ${route.params.data.NOME}`
            });
            
        });
        if(
            route.params.data.ID_PERIODO != 'Segunda-feira Manhã' &&
            route.params.data.ID_PERIODO != 'Segunda-feira Tarde' &&
            route.params.data.ID_PERIODO != 'Terça-feira Manhã' &&
            route.params.data.ID_PERIODO != 'Terça-feira Tarde' &&
            route.params.data.ID_PERIODO != 'Quarta-feira Manhã' &&
            route.params.data.ID_PERIODO != 'Quarta-feira Tarde' &&
            route.params.data.ID_PERIODO != 'Quinta-feira Manhã' &&
            route.params.data.ID_PERIODO != 'Quinta-feira Tarde' &&
            route.params.data.ID_PERIODO != 'Sexta-feira Manhã' &&
            route.params.data.ID_PERIODO != 'Sexta-feira Tarde'
            )
        {
            setSelect(`outro`);
            setOutro(`${route.params.data.ID_PERIODO}`);
        }else{
            setSelect(`${route.params.data.ID_PERIODO}`);
            setOutro('');
        }
       
        setNome(`${route.params.data.NOME}`);
        setEndereco(`${route.params.data.ENDERECO}`);
        setCrm(`${route.params.data.CRM}`);
        setTelefone(`${route.params.data.TELEFONE}`);
        setEspecialidade(`${route.params.data.ESPECIALIDADE}`);
        setData(`${route.params.data.DIA}`);
        setHora(`${route.params.data.HORA}`);

        return unsubscribe;
    }, [navigation, route]);

   
    const handleEditMedico = async () => {
        if(nome !== '' && telefone !== '' && endereco !== '' && crm !== '' && especialidade != '' && data !== '' && hora !== '' && select !== 'Selecione uma opção') {
            if(select == 'outro'){
                var result = await api.editMedico(nome, telefone, endereco, crm, especialidade, data, hora, outro, route.params.data.id);
            }else{
                var result = await api.editMedico(nome, telefone, endereco, crm, especialidade, data, hora, select, route.params.data.id);
            }
            
            if(result.error === '') {
                alert('Medico editado com sucesso!');
                navigation.navigate('WarningScreen');
            } else {
                alert(result.error);
            }
        } else {
            alert("Preencha todos os campos");
        }
    }

    return (
        <C.Container>
            <C.Scroller>
                <C.Title>Nome</C.Title>
                <C.Field
                    placeholder=""
                    value={nome}
                    onChangeText={t=>setNome(t)}
                />
                <C.Title>Endereço</C.Title>
                <C.Field
                    placeholder=""
                    value={endereco}
                    onChangeText={t=>setEndereco(t)}
                />
                <C.Title>Telefone</C.Title>
                <C.Field
                    placeholder=""
                    value={telefone}
                    onChangeText={t=>setTelefone(t)}
                />
                <C.Title>CRM</C.Title>
                <C.Field
                    placeholder=""
                    value={crm}
                    onChangeText={t=>setCrm(t)}
                />
                <C.Title>Especialidade</C.Title>
                <C.Field
                    placeholder=""
                    value={especialidade}
                    onChangeText={t=>setEspecialidade(t)}
                />
                <C.Title>Data do agendamento</C.Title>
                <DatePicker
                    mode="date"
                    style={{ hidth: 500, margin:20 }}
                    date={data}
                    onDateChange={t=>setData(t)} 
                />

                <C.Title>Hora do agendamento</C.Title>
                <C.Field
                    placeholder="Digite a hora do agendamento"
                    value={hora}
                    keyboardType="numeric"
                    onChangeText={t=>formatHora(t)}                
                />

               

                <C.Title>Período de Atendimento</C.Title>
                <Picker
                    selectedValue={select}
                    style={{ height: 50, width: 250 }}
                    onValueChange={(itemValue, itemIndex) => setSelect(itemValue)}
                >
                    <Picker.Item label="Selecione um dia" value="0" />
                    <Picker.Item label="Segunda-feira Manhã" value="Segunda-feira Manhã" />
                    <Picker.Item label="Segunda-feira Tarde" value="Segunda-feira Tarde" />
                    <Picker.Item label="Terça-feira Manhã" value="Terça-feira Manhã" />
                    <Picker.Item label="Terça-feira Tarde" value="Terça-feira Tarde" />
                    <Picker.Item label="Quarta-feira Manhã" value="Quarta-feira Manhã" />
                    <Picker.Item label="Quarta-feira Tarde" value="Quarta-feira Tarde" />
                    <Picker.Item label="Quinta-feira Manhã" value="Quinta-feira Manhã" />
                    <Picker.Item label="Quinta-feira Tarde" value="Quinta-feira Tarde" />
                    <Picker.Item label="Sexta-feira Manhã" value="Sexta-feira Manhã" />
                    <Picker.Item label="Sexta-feira Tarde" value="Sexta-feira Tarde" />
                    <Picker.Item label="Outro" value="outro" />
                </Picker>

                {select == 'outro' && 
                <C.Title>Digite Manualmente o Período de Atendimento</C.Title>
                }
                {select == 'outro' && 
                   <C.Field
                   placeholder=""
                   value={outro}
                   onChangeText={t=>setOutro(t)}
                    />
                    
                }
                

                <C.ButtonArea onPress={handleEditMedico}>
                    <C.ButtonText>Editar</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller>
        </C.Container>
    );
}