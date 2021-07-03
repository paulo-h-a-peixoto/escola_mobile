import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import { CheckBox, Button, Overlay } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import { useSafeArea } from 'react-native-safe-area-context';
import { Alert, Text, View, Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [aluno, setAluno] = useState(false);
    const [gestor, setGestor] = useState(false);
    const [professor, setProfessor] = useState(false);
    const [meuPsicologo, setMeuPsicologo] = useState(0);
    const [crp, setCrp] = useState('');

    const [matricula, setMatricula] = useState('');
    const [turma, setTurma] = useState('');

    const [temPsicologo, setTemPsicologo] = useState(false);

    const [photo, setPhoto] = useState({});
    const [termos, setTermos] = useState(false);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const [showEscolaridade, setShowEscolaridade] = useState(true);
    const [showEscolaridadeTurma, setShowEscolaridadeTurma] = useState(false);
    const [showEscolaridadeTurmaEsp, setShowEscolaridadeTurmaEsp] = useState(false);
    const [loadingModal, setLoadingModal] = useState(true);

    const [minhaAbordagem, setMinhaAbordagem] = useState('');

    const [myEscolaridade, setMyEscolaridade] = useState({});
    const [myEscolaridadeTurma, setMyEscolaridadeTurma] = useState({});
    const [myEscolaridadeTurmaEsp, setMyEscolaridadeTurmaEsp] = useState({});
    

    const [list, setList] = useState([]);

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    

    const abordagem = [
        {id: 1, 'nome': 'TCC'},
        {id: 2, 'nome': 'Comportamental'}
    ]

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Fazer cadastro'
        });
    }, []);

    useEffect(()=>{
        if(!temPsicologo){
            setMeuPsicologo(0);
        }
    }, [temPsicologo]);

    useEffect(()=>{
        setTemPsicologo();
    }, [gestor, professor]);

    const handleAddPhoto = () => {
        toggleOverlay();

        launchCamera({
            mediaType: 'photo',
            maxWidth: 1280
        }, (response) => {
            if(!response.didCancel) {
                setPhoto(response);
            }
        });
    }

    const handleSelectPhoto = () => {
        toggleOverlay();

        launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 1280
        }, (response) => {
            if(!response.didCancel) {
                setPhoto(response);
            }
        });
    }

        


    const selectTipoUsuario = (item) => {
        if(item == '1'){
            setAluno(true);
            setGestor(false);
            setProfessor(false);
        }else if(item == '2'){
            setAluno(false);
            setGestor(true);
            setProfessor(false);
        }else{
            setAluno(false);
            setGestor(false);
            setProfessor(true);
        }
    }

    const handlePoliticaButton = () => {
        navigation.navigate('Politica');
    }

    const handleRegisterButton = async () => {

        if(!termos){
            Alert.alert('Atenção!', 'É necessário aceitar os termos!', [
                {text: 'Fechar'}
            ]);
            return false;
        }

        if(!aluno && !gestor && !professor){
            Alert.alert('Atenção!', 'É necessário selecionar ou Aluno ou Gestor ou Professor', [
                {text: 'Fechar'}
            ]);
            return false;
        }
        if(!name || !email || !cpf || !password || !passwordConfirm || !telefone) {
            Alert.alert('Atenção!', 'Preencha todos os campos', [
                {text: 'Fechar'}
            ]);
            return false;
        }
       

       
        var meuPerfil = '';
        if(aluno){
            meuPerfil = '1';
        }else if(gestor){
            meuPerfil = '2';
        }else{
            meuPerfil = '3';
        }
        
        let result = await api.register(name, email, cpf, password, passwordConfirm, telefone, meuPerfil, nascimento, matricula, turma);
        if(result.error === '') {
            
            dispatch({type: 'setToken', payload: {token: result.token}});
            dispatch({type: 'setUser', payload: {user: result.user}});
            navigation.reset({
                index: 1,
                routes:[{name: 'MainDrawer'}]
            });
        } else {
            Alert.alert('Atenção!', `${result.error}`, [
                {text: 'Fechar'}
            ]);
        }
        
    }

    const handleModalVisible = async () => {
        setLoadingModal(true);
        setModalVisible(true);
        setShowEscolaridade(true);
        setShowEscolaridadeTurma(false);
        setShowEscolaridadeTurmaEsp(false);
        
        let result = await api.getEscolaridade();
        if(result.error === '') {
            setMyEscolaridade(result.list);
            setLoadingModal(false);
            
        }
    }

    const handleSetEscolaridade = async (id) => {
        setLoadingModal(true);
        
        let result = await api.getEscolaridadeTurma(id);
        if(result.error === '') {
            console.log(result.list);

            setMyEscolaridade(result.list);
            setLoadingModal(false);
            setShowEscolaridade(false);
            setShowEscolaridadeTurma(true);
            setShowEscolaridadeTurmaEsp(false);
            
        }
    }

    const handleSetEscolaridadeTurma = async (id) => {
        setLoadingModal(true);
        
        let result = await api.getEscolaridadeTurma(id);
        if(result.error === '') {
            console.log(result.list);
            setMyEscolaridade(result.list);
            setLoadingModal(false);
            setShowEscolaridade(false);
            setShowEscolaridadeTurma(false);
            setShowEscolaridadeTurmaEsp(true);
            
        }
    }

    const handleSetEscolaridadeTurmaEsp = async (id) => {
        setTurma(id);
        setModalVisible(!modalVisible);
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
                    {showEscolaridade && !showEscolaridadeTurma && !showEscolaridadeTurmaEsp &&  !loadingModal && 
                    <>
                    
                    <Text style={styles.modalText}>Selecione sua escolaridade</Text>
                        {myEscolaridade.map((item, index)=>(
                            <View key={index}>
                                <TouchableOpacity style={styles.buttonEscolaridade} onPress={() => handleSetEscolaridade(item.id)}>
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
                    {!showEscolaridade && showEscolaridadeTurma && !showEscolaridadeTurmaEsp && !loadingModal && 
                    <>
                    
                    <Text style={styles.modalText}>Selecione sua Série</Text>
                        {myEscolaridade.map((item, index)=>(
                            <View key={index}>
                                <TouchableOpacity style={styles.buttonEscolaridade} onPress={() => handleSetEscolaridadeTurma(item.id)}>
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
                    {!showEscolaridade && !showEscolaridadeTurma && showEscolaridadeTurmaEsp && !loadingModal && 
                    <>
                    
                    <Text style={styles.modalText}>Selecione a Turma</Text>
                        {myEscolaridade.map((item, index)=>(
                            <View key={index}>
                                <TouchableOpacity style={styles.buttonEscolaridade} onPress={() => handleSetEscolaridadeTurmaEsp(item.id)}>
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
                </View>
                </View>
            </Modal>
            
            <Overlay 
                isVisible={visible} 
                onBackdropPress={toggleOverlay} 
                overlayStyle={{width:300}}
            >
                <>
                <C.ButtonArea onPress={handleAddPhoto}>
                    <C.BotaoCameraText>Usar a camera</C.BotaoCameraText>
                </C.ButtonArea>
                <C.ButtonArea onPress={handleSelectPhoto}>
                    <C.BotaoCameraText>Usar a galeria</C.BotaoCameraText>
                </C.ButtonArea>
                </>
            </Overlay>
            {/* <C.PhotoArea>
                {!photo.uri &&
                    <C.ButtonAreaFoto onPress={toggleOverlay}>
                        <C.ButtonTextFoto>Tirar uma foto</C.ButtonTextFoto>
                    </C.ButtonAreaFoto>
                }
                {photo.uri &&
                    <>
                        <C.ButtonAreaFotoImage onPress={toggleOverlay}>
                        <C.PhotoItem source={{uri: photo.uri}} resizeMode="cover" />
                        </C.ButtonAreaFotoImage>
                        <C.ButtonTextFoto style={{color: '#3795d2'}}>Aperte na imagem para tirar outra foto</C.ButtonTextFoto>
                    </>
                }
            </C.PhotoArea> */}
            <C.CheckBoxArea>
                <CheckBox
                title='Aluno'
                checked={aluno}
                onPress={()=>selectTipoUsuario('1')}
                containerStyle={{borderWidth: 0, width: 100}}
                />
                <CheckBox
                title='Gestor'
                checked={gestor}
                onPress={()=>selectTipoUsuario('2')}
                containerStyle={{ borderWidth: 0, width: 90}}
                />

                <CheckBox
                title='Professor'
                checked={professor}
                onPress={()=>selectTipoUsuario('3')}
                containerStyle={{borderWidth: 0, width: 118}}
                />
            </C.CheckBoxArea>
            <C.Field
                placeholder="Digite seu Nome Completo"
                placeholderTextColor="black"
                value={name}
                onChangeText={t=>setName(t)}
            />
            <C.Field
                placeholder="Digite seu CPF"
                placeholderTextColor="black"
                keyboardType="numeric"
                value={cpf}
                onChangeText={t=>setCpf(t)}
            />
            <C.Field
                placeholder="Digite seu E-mail"
                placeholderTextColor="black"
                value={email}
                onChangeText={t=>setEmail(t)}
            />
            <C.Field
                placeholder="Telefone"
                placeholderTextColor="black"
                value={telefone}
                onChangeText={t=>setTelefone(t)}
            />
            {aluno && 
            <>
            <C.Field
                placeholder="Digite sua Matrícula"
                placeholderTextColor="black"
                value={matricula}
                onChangeText={t=>setMatricula(t)}
            />
            {turma === '' && 
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={handleModalVisible}
            >
                <Text style={styles.textStyle}>Selecionar Turma</Text>
            </Pressable>
            }
            {turma != '' && 
            <Pressable
                style={[styles.button, styles.buttonOpenSelected]}
                onPress={handleModalVisible}
            >
                <Text style={styles.textStyle, styles.textStyleSelected}>Turma selecionada</Text>
            </Pressable>
            }
            </>
            }
            {/* <C.Field
                placeholder="Endereço"
                placeholderTextColor="black"
                value={endereco}
                onChangeText={t=>setEndereco(t)}
            /> */}
            {/* {psicologo && 
               <C.Field
               placeholder="CRP"
               placeholderTextColor="black"
               value={crp}
               onChangeText={t=>setCrp(t)}
           /> 
            }

            {psicologo && 
                <C.Picker 
                onValueChange={(itemValue, itemIndex) => setMinhaAbordagem(itemValue)}
                >
                    <C.Picker.Item label="Selecione uma Abordagem" value="Selecione uma Abordagem" />
                
                    {abordagem.map((item, index) => (  
                        <C.Picker.Item key={index} label={item.nome} value={item.id} />
                    ))}  
                
                    
                    
                </C.Picker>
            } */}
            
               
                
                            
            <C.FieldCampo>
            <TextInputMask
                            type={'datetime'}
                            options={{
                              format: 'DD/MM/YYYY'
                            }}
                            color='#000'
                            placeholder='Nascimento'
                            placeholderTextColor="black"

                            value={nascimento}
                            onChangeText={(t)=>setNascimento(t)}
                            />
            </C.FieldCampo>
            <C.Field
                placeholder="Digite sua Senha"
                secureTextEntry={true}
                placeholderTextColor="black"
                value={password}
                onChangeText={t=>setPassword(t)}
            />
            <C.Field
                placeholder="Digite sua Senha novamente"
                secureTextEntry={true}
                placeholderTextColor="black"
                value={passwordConfirm}
                onChangeText={t=>setPasswordConfirm(t)}
            />

            {aluno && list.length > 0 &&
                <CheckBox
                    title='Já tem um Psicólogo?'
                    checked={temPsicologo}
                    onPress={()=>setTemPsicologo(!temPsicologo)}
                    containerStyle={{backgroundColor: 'transparent', borderWidth: 0, width: 220}}
                />
            }
            
           
            {temPsicologo && 
                <C.Picker 
                onValueChange={(itemValue, itemIndex) => setMeuPsicologo(itemValue)}
                >
                    <C.Picker.Item label="Selecione um Psicólogo" value="0" />
                
                    {list.map((item, index) => (  
                        <C.Picker.Item key={index} label={item.nome} value={item.id} />
                    ))}  
                
                    
                    
                </C.Picker>
            }
            <C.CheckBoxesTermos>
                        <CheckBox
                        title=''
                        checked={termos}
                        onPress={()=>setTermos(!termos)}
                        containerStyle={{borderWidth: 0}}
                        />
                        <View>
                            <Text>Li e aceito os <Text onPress={handlePoliticaButton} style={{fontWeight:'bold', color:'#2196F3'}}>Termos e Condições de Uso</Text> e a <Text onPress={handlePoliticaButton} style={{fontWeight:'bold', color:'#2196F3'}} >Política de Privacidade.</Text></Text>
                        </View>
                    </C.CheckBoxesTermos>

            <C.ButtonArea style={{marginBottom: 50}} onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR-SE</C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    );

    
    
}