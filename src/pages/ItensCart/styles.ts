import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;

  background-color: ${({theme}) => theme.colors.primary_light};
`;

export const WrapperCartEmpty = styled.View`
  width: 90%;
  height: ${RFPercentage(16)}px;
  margin: ${RFPercentage(2)}px ${RFPercentage(0)}px;
  padding: ${RFPercentage(0.5)}px;
  justify-content: center;
  align-items: center;

  background-color: ${({theme}) => theme.colors.text};
  border-radius: 4px;
`;

export const TitleCartEmpty = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_700};
  font-size: ${RFValue(16)}px;
`;

export const WrapperItemCart = styled.View`
  width: 100%;
  height: ${RFPercentage(16)}px;
  margin: ${RFPercentage(2)}px ${RFPercentage(0)}px;
  padding: ${RFPercentage(0.5)}px;

  background-color: ${({theme}) => theme.colors.text};
  border-radius: 4px;
`;

export const ContentItemCart = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  border-radius: 4px;
`;

export const ContentItemLeft = styled.View`
  flex: 1;
  flex-direction: row;
  margin-right: 1px;
`;

export const ContentItemRight = styled.View``;


export const ImageItem = styled.Image`
  width: ${RFPercentage(12)}px;
  height: ${RFPercentage(12)}px;
`;

export const WrapperQtde = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ScrollTitleItem = styled.ScrollView``;

export const ListItensCart = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
  padding: ${RFPercentage(0)}px ${RFPercentage(2)}px;
`;

export const TitleItem = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(12)}px;
`;

export const TitleTotal = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(8)}px;
`;

export const WrapperIconsQtde = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const InputQtdeItem = styled.TextInput`
  width: ${RFPercentage(5.2)}px;
  height: ${RFPercentage(3.3)}px;
  margin: ${RFPercentage(0)}px ${RFPercentage(0.8)}px;
  font-size: ${RFValue(12)}px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
`;

export const InputPriceItem = styled.TextInput`
  width: ${RFPercentage(13)}px;
  height: ${RFPercentage(3.3)}px;
  font-size: ${RFValue(12)}px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
`;

export const IconMinus = styled(BorderlessButton)``;

export const IconPlus = styled(BorderlessButton)``;

export const IconRemove = styled(BorderlessButton)``;

export const Footer = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
`;

export const FooterContainerLeft = styled.View`
  width: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.text};

  border-right-width: 1px;
  border-right-color: ${({theme}) => theme.colors.primary_light};
  
  border-top-left-radius: 18px;
`;

export const FooterContainerRight = styled.View`
  width: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.text};

  border-left-width: 1px;
  border-left-color: ${({theme}) => theme.colors.primary_light};

  border-top-right-radius: 18px;
`;

export const TitleFooter = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.secondary};
`;

export const TitleFooterValue = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_700};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.primary_light};
`;