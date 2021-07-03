import styled from 'styled-components/native';

export default {
    Container: styled.ScrollView`
        flex: 1;
        padding: 20px;
        background-color: #fff;
    `,
    PhotoArea: styled.View`
        width:100%;
        justify-content:center;
        align-items:center;
        margin-bottom: 15px;
    `,
    Field: styled.TextInput`
        background-color: #f2f2f2;
        border-radius: 50px;
        color: #000;
        font-size: 15px;
        padding-top:2px;
        padding-left: 20px;
        padding-bottom: 2px;
        margin-top: 15px;
    `,
    FieldCampo: styled.View`
        background-color: #f2f2f2;
        border-radius: 50px;
        color: #000;
        font-size: 15px;
        padding-left: 19px;
        
        margin-top: 15px;
    `,
    PhotoItem: styled.Image`
        border-radius: 100px;
        width: 120px;
        height: 120px;
        margin-bottom: 10px;
    `,
    LoadingIcon: styled.ActivityIndicator``,
    ButtonArea: styled.TouchableOpacity`
        background-color: #3795d2;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-top: 15px;
        margin-bottom: 15px;
    `,
    ButtonText: styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
    `,
    ButtonAreaFoto: styled.TouchableOpacity`
        background-color: #3795d2;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        width: 120px;
        height: 120px;
        margin-bottom: 15px;
    `,
    
    ButtonTextFoto: styled.Text`
        color: #FFF;
        font-size: 14px;
        font-weight: bold;
    `,
    ButtonAreaFotoImage: styled.TouchableOpacity``,
    CheckBoxArea: styled.View`
        flex-direction: row;
        justify-content: space-around;
    `,
    Picker: styled.Picker`
        margin-left:30px;
        width: 280px;
        border-width: 2px;
        border-color: #ccc;
    `,
    NascimentoBox: styled.View`
        margin-top: 5px;
        margin-bottom: 5px;
    `,
    NascimentoBoxTitle: styled.Text`
        color: #ccc;
        font-weight: bold;
    `,
    BotaoCamera: styled.TouchableOpacity`
        flex:1;
        
    `,
    BotaoCameraText: styled.Text`
        color: #fff;
        font-size: 15px;
    `,
    CheckBoxesTermos: styled.View`
  
    width:100%;
    height: 100px;
    flex-direction: row;
    align-items: center;
    text-decoration-line: none;

    `,
    CheckBoxText: styled.Text`
    margin-left: 8px;
    font-size: 15px;
    color: #2196F3;
    `,
    CheckBoxTermosText: styled.Text`
    margin-left: 8px;
    font-size: 15px;
    color: #000;
    `,
    CheckBoxTermosLink: styled.Text`
    margin-left: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    `,
};