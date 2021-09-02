import styled from 'styled-components/native';
import { rgba } from 'polished';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  background-color: ${rgba(14, 14, 14, 0.8)};
`;

export const Content = styled.View`
  width: 80%;
  height: 20%;
  justify-content: space-between;
  align-items: center;

  background-color: ${({theme}) => theme.colors.text};
  border-radius: 4px;
`;

export const WrapperDialog = styled.View`

`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_700};
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.secondary};
  text-align: center;
`;

export const Description = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.primary_light};
  text-align: center;
`;

export const WrapperButtons = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const TitleButtons = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_700};
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.secondary};
  text-align: center;
`;

export const NegativeButton = styled(RectButton)`
  width: 50%;
  align-items: center;
  justify-content: center;
  padding: 8px;
  
  background-color: ${rgba(theme.colors.secondary, 0.4)};
  border-radius: 4px;
`;

export const PositiveButton = styled(RectButton)`
  width: 50%;
  align-items: center;
  justify-content: center;
  padding: 8px;
  
  background-color: ${rgba(theme.colors.secondary, 0.2)};
  border-radius: 4px;
`;

