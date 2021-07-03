import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        padding: 20px;
        background-color: #fff;
    `,
    Logo: styled.Image`
        width: 350px;
        height: 200px;
        margin-left: auto;
        margin-right: auto;
    `,
    Field: styled.TextInput`
        border-width: 1px;
        border-color: #CCC;
        background-color: #FFF;
        border-radius: 5px;
        color: #000;
        font-size: 15px;
        padding: 10px;
        margin-bottom: 15px;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #1676d2;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        margin-bottom: 15px;
    `,
    ButtonText: styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
    `,
    Information: styled.TouchableOpacity`
    background-color: #FFFFFF;
    padding:10px;

    margin-top:10px;
    border-radius:5px;
    padding-left: 20px;
    padding-right: 40px;    
    flex-direction: row;
    align-items:center;
    border:1px solid #ccc;
    `,
    InformationText: styled.Text`
    margin-left:12px;
    font-family: 'Open Sans';
    `,
    SignMessageButton: styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top:20px;
    `,
    SignMessageButtonText: styled.Text`
    font-size: 16px;
    
    `,
    SignMessageButtonTextBold: styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-left: 5px;
    `,
};