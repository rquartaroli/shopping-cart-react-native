import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { 
  Container,
  ButtonBack,
  WrapperLogo,
  WrapperCart,
  IconCart,
  WrapperQtdeItensCart,
  QtdeItensView,
  QtdeItensText,
  IconLogout,
} from './styles';
import theme from '../../global/styles/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/app.routes';
import { useItensCart } from '../../hooks/itensCart';

interface ItensCart {
  id: number;
  title: string;
  price: number;
  image: string;
  amount?: number;
}

type itemScreenProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
  titleHeader: string;
  backButton?: boolean;
}

export function Header({ titleHeader, backButton = false }: Props) {

  const navigation = useNavigation<itemScreenProp>();

  const {itensInCart} = useItensCart();

  function handleBack() {
    navigation.goBack();
  }

  function navigateCart() {
    navigation.navigate('ItensCart');
  }

  return (
    <Container>

      {backButton && 
        <ButtonBack onPress={handleBack}>
          <Feather 
            name="arrow-left"
            size={32}
            color={theme.colors.text}
          /> 
        </ButtonBack>
      }
    
      <WrapperLogo>{titleHeader}</WrapperLogo>

      <WrapperCart>

        <IconCart onPress={navigateCart}>
          <Feather 
            name="shopping-cart"
            size={32}
            color={theme.colors.text}
          />
        </IconCart>

        {itensInCart.length !== 0 && 
          <WrapperQtdeItensCart>
            <QtdeItensView>
              <QtdeItensText>{itensInCart.reduce((accumulador: number, currentQtde: ItensCart) => {
                return accumulador + Number(currentQtde.amount);
              }, 0)}</QtdeItensText>
            </QtdeItensView>
          </WrapperQtdeItensCart>
        }

        <IconLogout onPress={() => {}}>
          <Feather 
            name="log-out"
            size={32}
            color={theme.colors.text}
          />
        </IconLogout>
        
      </WrapperCart>
    </Container>
  );
}