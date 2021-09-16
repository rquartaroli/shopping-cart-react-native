import styled from 'styled-components/native';
import { rgba } from 'polished';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface TextAlertStockEmptyProps {
  isColorSecondary?: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;

  background-color: ${({theme}) => theme.colors.primary_light};
`;

export const Content = styled.ScrollView`
  width: 100%;
  margin: ${RFPercentage(4)}px ${RFPercentage(0)}px;
  padding: ${RFPercentage(0)}px ${RFPercentage(2)}px;
`;

export const WrapperCardItem = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ModalView = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  background-color: ${rgba(14, 14, 14, 0.8)};
`;

export const StockEmptyContainer = styled.View`
  width: 80%;
  height: 250px;
  margin: ${RFPercentage(4)}px ${RFPercentage(0)}px;
  padding: ${RFPercentage(0)}px ${RFPercentage(2)}px;
  justify-content: center;
  align-items: center;

  background-color: ${({theme}) => theme.colors.text};
`;

export const TextAlertStockEmpty = styled.Text<TextAlertStockEmptyProps>`
  font-family: ${({theme}) => theme.fonts.primary_700};
  text-align: justify;
  color: ${({isColorSecondary = false, theme}) => isColorSecondary ? theme.colors.secondary : theme.colors.primary_light};
`;

