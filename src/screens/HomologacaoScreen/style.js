import styled from 'styled-components/native';

export default {
    Container: styled.ScrollView`
        flex: 1;
        background-color: #fff;
        padding-left: 15px;
        padding-right: 15px;
    `,
    LoadingIcon: styled.ActivityIndicator``,
    NoListArea: styled.View`
        justify-content: center;
        align-items: center;
        padding: 30px;
    `,
    NoListText: styled.Text`
        font-size: 15px;
        color: #000;
    `,
    List: styled.FlatList`
        flex: 1;
    `,
    Menu1: styled.TouchableOpacity`
        background-color: #f9a825;
        align-items: flex-start;
        padding:15px;
        border-radius: 5px;
        margin-bottom:15px;
    
    `,
    Menu2: styled.TouchableOpacity`
        background-color: #1676d2;
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-end;
        max-height: 100px;
        border-radius: 5px;
        margin-bottom:15px;
    
    `,
    Menu3: styled.TouchableOpacity`
        background-color: #2a226f;
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-end;
        
        max-height: 100px;
        border-radius: 5px;
        margin-bottom:15px;
    
    `,
    Text: styled.Text`
        color: #fff;
        font-size: 22px;
        font-weight: bold;
        margin-left: 20px;
    `,
    Image: styled.Image`
        height: 100px;
        width: 100px;
    `,
};