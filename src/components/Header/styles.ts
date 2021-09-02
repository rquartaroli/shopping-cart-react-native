import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  height: ${RFPercentage(20)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RFPercentage(2)}px;

  background-color: ${({theme}) => theme.colors.primary};
`;

export const ButtonBack = styled(BorderlessButton)`
  
`;

export const WrapperLogo = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_700};
  font-size: ${RFValue(32)}px;
  color: ${({theme}) => theme.colors.secondary};
`;

export const WrapperCart = styled.View`
  /* width: 100px; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* border: 1px solid red; */
`;

export const IconCart = styled(BorderlessButton)``;

export const WrapperQtdeItensCart = styled.View`
  margin-top: -${RFPercentage(4.5)}px;
  margin-left: -${RFPercentage(0.7)}px;
`;

export const QtdeItensView = styled.View`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 10px;
`;

export const QtdeItensText = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text};
`;

export const IconLogout = styled(BorderlessButton)`
  margin-left: ${RFPercentage(3.5)}px;
`;


