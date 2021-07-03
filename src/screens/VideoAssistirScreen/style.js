import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #fff;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
        padding: 20px;
    `,
    LoadingIcon: styled.ActivityIndicator``,
    TitleArea: styled.View`
        flex-direction: row;
        padding: 10px;
    `,
    Title: styled.Text`
        font-size: 17px;
        color: #000;
        flex: 1;
    `,
    TitleAddButton: styled.TouchableOpacity`
        width: 30px;
        height: 30px;
    `,
    ListArea: styled.View`
        margin-bottom: 20px;
    `,
    ModalArea: styled.Modal``,
    ModalBg: styled.View`
        flex: 1;
        background-color: rgba(0, 0, 0, 0.5);
    `,
    ModalBody: styled.ScrollView`
        background-color: #FFF;
        margin: 20px;
    `,
    Box: styled.View``,
    BoxText: styled.Text``,
    CheckBoxArea: styled.View`
        flex-direction: row;
    `,
    Input: styled.TextInput``,
    Field: styled.TextInput`
        background-color: #f2f2f2;
        border-radius: 50px;
        color: #000;
        font-size: 15px;
        padding-top:2px;
        padding:10px;
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
    ButtonArea: styled.TouchableOpacity`
        background-color: #218838;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-top: 15px;
    `,
    ButtonText: styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
    `,
    FooterArea: styled.View`
        justify-content: center;
        align-items: center;
    `,
    LikeButton: styled.TouchableOpacity``,
    LikeText: styled.Text`
        color: #fff;
    `,
};