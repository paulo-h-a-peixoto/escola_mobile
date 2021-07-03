import styled from 'styled-components/native';

export default {
    Container: styled.ScrollView`
        flex: 1;
        background-color: #fff;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
        padding: 20px;
    `,
    Header: styled.View`
        padding: 10px;
        justify-content: center;
        margin-bottom: 3px;
        
    `,
    HeaderText: styled.Text`
        font-size: 30px;
        font-weight: bold;
        color: #1676d2;
    `,
    Picker: styled.Picker`
        margin-left:30px;
        width: 280px;
        border-width: 2px;
        border-color: #ccc;
    `,
    Box: styled.View`
        padding-left: 20px;
    `,
    BoxText: styled.Text`
        font-size: 20px;
        font-weight:bold;
        color: #f9a825;
    `,
    Body: styled.View`
        background-color: #1676d2;
        padding: 20px;
        justify-content: center;`,
    InputsCheck: styled.View`
        flex-direction: row;
        flex-wrap: wrap;
    `,
    Inputs: styled.View`
        
    `,
    Video: styled.View`
        flex:1;
        margin:10px;
        background-color: #f9a825;
        border-radius: 5px;
    `,
    VideoFake: styled.TouchableOpacity`
        padding: 10px;
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
    `,
    VideoFakeText: styled.Text`
        font-size: 25px;
        margin-left:10px;
        font-weight: bold;
        color: #fff;
    `,
    PhotoItem: styled.Image`
        height: 50px;
        width: 50px;
        border-radius: 50px;
    `,
    Icones: styled.View`
    width: 380px;
    padding: 5px;
    flex-direction: row;
    `,
    IconesText: styled.Text`
        font-size: 12px;
        color: #c2c2c2;
    `,

    LoadingIcon: styled.ActivityIndicator``,
    CheckBoxes: styled.View`
  
    height: 50px;
    margin-right: 20px;
    flex-direction: row;
    align-items: center;
    
    text-decoration-line: none;
    `,
     CheckBoxText: styled.Text`
    margin-left: 8px;
    font-size: 15px;
    color: #FFF;
    `,
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
    BotaoView: styled.TouchableOpacity`
        flex-direction: row;
        padding:20px;
        align-items: center;
        border-width: 1px;
        margin: 10px;
        border-radius: 5px;
        border-color: #1676d2;
    `,
    BotaoText: styled.Text`
        color: #1676d2;
        font-weight: bold;
        font-size: 22px;
    `,
    CheckBoxArea: styled.View`
        flex-direction: row;
        justify-content: space-around;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #3795d2;
        padding: 20px;
        margin:5px;
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

};