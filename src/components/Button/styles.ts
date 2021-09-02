import { RectButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  width: 100%;
  padding: ${RFPercentage(1.5)}px;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.secondary };
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;