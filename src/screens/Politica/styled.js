import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #fff;
    flex: 1;
    
`;

export const Header = styled.View`
    margin-top:15px;
    align-items: center;
`;
export const Body = styled.View`
    flex:1;
    padding:25px;
    margin-top:50px;
`;

export const Text = styled.Text`
    font-size: 13px;
    font-family: 'Open Sans';
`;

export const TextBold = styled.Text`
    font-size: 13px;
    font-weight: bold;
    font-family: 'Open Sans';
`;
export const TextBr = styled.Text`
    margin-top:-8px;
`;

export const TextRed = styled.Text`
    font-size: 14px;
    font-family: 'Open Sans';
    font-weight: bold;
    color: #ff0000;

`;

export const BackButton = styled.TouchableOpacity`
    padding: 30px;
    position: absolute;
    left:0;
    top:0;
    z-index:9;
`;
export const Scroller = styled.ScrollView`
   

`;

