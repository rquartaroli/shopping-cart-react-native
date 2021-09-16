import styled from 'styled-components/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: 80%;
  align-items: center;

  background-color: #F5F5F5;
`;

export const WrapperIconCancel = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
`;

export const IconCancel = styled(BorderlessButton)`
  margin: 1px 2px 0 0;
  
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
`;

export const ImgItem = styled.Image`
  width: ${RFPercentage(40)}px;
  height: ${RFPercentage(40)}px;
  margin: ${RFPercentage(1.5)}px ${RFPercentage(0)}px;
`;

export const ScrollTitle = styled.View`
  width: 70%;
  padding: ${RFPercentage(0)}px ${RFPercentage(1)}px ${RFPercentage(0.5)}px;
`;

export const TitleItem = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
`;

export const IconMinus = styled(BorderlessButton)`
  margin-right: 15px;
`;

export const InputQtdeItem = styled.TextInput`
  width: 40px;
  height: 30px;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.text};
`;

export const InputPriceItem = styled.TextInput`
  width: 80px;
  height: 30px;
  font-size: 16px;
  margin-left: ${RFValue(8)}px;
  text-align: center;
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.text};
`;

export const IconPlus = styled(BorderlessButton)`
  margin-left: 15px;
`;

export const WrapperQuantity = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${RFPercentage(1.5)}px ${RFPercentage(0)}px;
`;

export const CloseModal = styled(RectButton)`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 8px;
  
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 4px;
`;

export const TitleModal = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_700};
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.text};
`;

export const Hr = styled.View`
  width: ${RFPercentage(40)}px;
  border-bottom-width: 1px;
`;
