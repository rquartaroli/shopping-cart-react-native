import React, { useState } from 'react';
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
import { StockDTO } from '../../dtos/StockDTO';
import api from '../../services/api';
import { Alert } from 'react-native';

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
  let stock = [
    {
      "id": 1,
      "amount": 3
    },
    {
      "id": 2,
      "amount": 5
    },
    {
      "id": 3,
      "amount": 2
    },
    {
      "id": 4,
      "amount": 1
    },
    {
      "id": 5,
      "amount": 5
    },
    {
      "id": 6,
      "amount": 10
    }
  ];

  const [reloadItensStockData, setReloadItensStockData] = useState<StockDTO[]>(stock);

  const navigation = useNavigation<itemScreenProp>();

  const {itensInCart, setStockItensData} = useItensCart();

  function handleBack() {
    navigation.goBack();
  }

  function navigateCart() {
    navigation.navigate('ItensCart');
  }

  function handleReloadItensStockData() {
    
    reloadItensStockData.forEach(async (itemStock) => {
        await api.put(`/stock/${itemStock.id}`, {
          amount: itemStock.amount,
          id: itemStock.id
        });
      }
    );

    setStockItensData(reloadItensStockData);
    setReloadItensStockData(stock);
    Alert.alert('Recarregamento de dados concluído', 'recarregamento da base de dados realizado com sucesso');
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

        <IconLogout onPress={handleReloadItensStockData}>
          <Feather 
            name="rotate-cw"
            size={32}
            color={theme.colors.text}
          />
        </IconLogout>
        
      </WrapperCart>
    </Container>
  );
}