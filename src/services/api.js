import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseUrl = 'https://api.b7web.com.br/devcond/api';
const baseUrl = 'https://escola.paulopeixoto.com/api';

const request = async (method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch(method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
        break;
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);
        break;
    }

    let headers = {'Content-Type': 'application/json'};
    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let req = await fetch(fullUrl, { method, headers, body });
    let json = await req.json();
    return json;
}

export default {
    getToken: async () => {
        return await AsyncStorage.getItem('token');
    },
    validateToken: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/validate', {}, token);
        return json;
    },
    login: async (cpf, password) => {
        let json = await request('post', '/auth/login', {cpf, password});
        return json;
    },
    logout: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/logout', {}, token);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('property');
        return json;
    },
    register: async (nome, email, cpf, password, password_confirm, telefone, tipoUsuario, nascimento, matricula, turma) => {
            let json = await request('post', '/auth/registers', {
            nome, email, cpf, password, password_confirm, telefone, tipoUsuario, nascimento, matricula, turma
        });
        return json;
    },
    register2: async (name, email, cpf, password, passwordConfirm, telefone, cep, endereco, meuPerfil, crp, photo, meuPsicologo, minhaAbordagem, nascimento) => {
        
        let formData = new FormData();
        formData.append('nome', name);
        formData.append('email', email);
        formData.append('cpf', cpf);
        formData.append('password', password);
        formData.append('password_confirm', passwordConfirm);
        formData.append('cep', cep);
        formData.append('nascimento', nascimento);
        formData.append('endereco', endereco);
        formData.append('telefone', telefone);
        formData.append('tipoUsuario', meuPerfil);
        formData.append('crp', crp);
        formData.append('psicologo', meuPsicologo);
        formData.append('abordagem', minhaAbordagem);
        if(photo.uri){
            formData.append('foto', {
                uri: photo.uri,
                type: photo.type,
                name: photo.fileName
            });
        }
        
        let req = await fetch(`${baseUrl}/auth/registers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        let json = await req.json();
        return json; 
    },
    uploadVideo: async (arquivo) => {
        
        console.log(arquivo);

        let formData = new FormData();
        
        if(arquivo.uri){
            formData.append('arquivo', {
                uri: arquivo.uri,
                type: arquivo.type,
                name: arquivo.name
            });
        }
        
        let req = await fetch(`${baseUrl}/vimeo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        let json = await req.json();
        return json; 
    },
    esqueci: async (email) => {
        const req = await fetch(`${BASE_API}/esqueci`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        const json = await req.json();        
        return json;
    },
    finalizarClient: async (id, duracao, vencimento, qt_sessao, valor, complemento) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/myclient', {id, duracao, vencimento, qt_sessao, valor, complemento}, token);
        return json;
    },
    like: async (id, like) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/like', {id, like}, token);
        return json;
    },
    unlike: async (id, like) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/unlike', {id, like}, token);
        return json;
    },
    getPsicologos: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/psicologos', {}, token);
        return json;
    },
    getEscolaridade: async () => {
        let json = await request('get', '/escolaridade/ensino', {});
        return json;
    },
    getEscolaridadeTurma: async (id) => {
        let json = await request('get', `/escolaridade/turmas/${id}`, {});
        return json;
    },
    getMaterias: async () => {
        let json = await request('get', '/materia/materias', {});
        return json;
    },
    getMateriaAssunto: async (id) => {
        let json = await request('get', `/materia/assunto/${id}`, {});
        return json;
    },
    getClientes: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/myclients', {}, token);
        return json;
    },
    getVideos: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/videos/homologacao', {}, token);
        return json;
    },
    getVideoId: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/videos/assistir/${id}`, {}, token);
        return json;
    },
    getVideosAssistir: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/videos/assistir', {}, token);
        return json;
    },
    getVideoAssistirId: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/videos/homologacao/${id}`, {}, token);
        return json;
    },
    getClientesFinanceiro: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/myclientsfinanceiro', {}, token);
        return json;
    },
    getInfoGeral: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/clientinfo/${id}`, {}, token);
        return json;
    },
    getWall: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/walls', {}, token);
        return json;
    },
    likeWallPost: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/wall/${id}/like`, {}, token);
        return json;
    },
    setPagamentoCliente: async (id, pagamento, dt_pagamento) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/clientpagamento/${id}`, {pagamento, dt_pagamento}, token);
        return json;
    },
    getDocs: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/docs', {}, token);
        return json;
    },
    getBillets: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('get', '/billets', {
            property: property.id
        }, token);
        return json;
    },
    getWarnings: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('get', '/warnings', {
            property: property.id
        }, token);
        return json;
    },
    addWarningFile: async (file) => {
        let token = await AsyncStorage.getItem('token');
        let formData = new FormData();
        formData.append('photo', {
            uri: file.uri,
            type: file.type,
            name: file.fileName
        });
        let req = await fetch(`${baseUrl}/warning/file`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        let json = await req.json();
        return json;
    },
    addWarning: async (title, list) => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('post', '/warning', {
            title,
            list,
            property: property.id
        }, token);
        return json;
    },
    getReservations: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/psicologosagenda', {}, token);
        return json;
    },
    getDisabledDates: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/reservation/${id}/disableddates`, {}, token);
        return json;
    },
    getReservationTimes: async (id, date) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/reservation/${id}/times`, {date}, token);
        return json;
    },
    setReservation: async (id, date, time) => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('post', `/reservation/${id}`, {
            property: property.id,
            date,
            time
        }, token);
        return json;
    },
    saveHumor: async (humor, descricao) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/clienthumor`, {
            humor,
            descricao
        }, token);
        return json;
    },
    homologarVideo: async (id, resAp, comentario) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/videos/homologacao/${id}`, {
            resAp,
            comentario
        }, token);
        return json;
    },
    getMyReservations: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('get', '/myreservations', {
            property: property.id
        }, token);
        return json;
    },
    getMyHumor: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/myhumor', {
        }, token);
        return json;
    },
    getHumorClient: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/clienthumor/${id}`, {
        }, token);
        return json;
    },
    getClientesHumor: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/getclientes`, {
        }, token);
        return json;
    },
    removeReservation: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/deletemyreservation/${id}`, {}, token);
        return json;
    },
    removeHumor: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/deletemyhumor/${id}`, {}, token);
        return json;
    },
    getFoundAndLost: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/foundandlost`, {}, token);
        return json;
    },
    setRecovered: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('put', `/foundandlost/${id}`, {
            status: 'recovered'
        }, token);
        return json;
    },
    addLostItem: async (photo, description, where) => {
        let token = await AsyncStorage.getItem('token');
        let formData = new FormData();
        formData.append('description', description);
        formData.append('where', where);
        formData.append('photo', {
            uri: photo.uri,
            type: photo.type,
            name: photo.fileName
        });
        let req = await fetch(`${baseUrl}/foundandlost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        let json = await req.json();
        return json;
    },
    getUnitInfo: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('get', `/unit/${property.id}`, {}, token);
        return json;
    },
    removeUnitItem: async (type, id) => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);

        let json = await request('post', `/unit/${property.id}/remove${type}`, {
            id
        }, token);
        return json;
    },
    addUnitItem: async (type, body) => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);

        let json = await request('post', `/unit/${property.id}/add${type}`, body, token);
        return json;
    }
};