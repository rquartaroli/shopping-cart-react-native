import { RectButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 150px;
  justify-content: center;
  align-items: center;
  margin: ${RFPercentage(1)}px ${RFPercentage(0)}px;

  background-color: ${({theme}) => theme.colors.primary};
  border: 1px solid ${({theme}) => theme.colors.text};
  border-radius: 4px;
`;

export const ImageItem = styled.Image`
  width: 100%;
  height: ${RFPercentage(20)}px;
`;

export const WrapperValue = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RFPercentage(0.5)}px;

  /* border: 1px solid blue; */
`;

export const ScrollTitleCard = styled.ScrollView`
  width: 100%;
  height: ${RFPercentage(7)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.text};
`;

export const TitleCard = styled.Text`
  padding: ${RFPercentage(0.5)}px;
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
`;

export const TextCard = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
`;

export const AddItem = styled(RectButton)`
  /* width: 20%; */
  justify-content: center;
  align-items: center;
  padding: 4px;

  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 4px;
`;
