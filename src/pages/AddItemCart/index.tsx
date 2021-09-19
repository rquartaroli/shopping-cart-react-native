import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../../global/styles/theme';
import { 
  Container,
  WrapperIconCancel,
  IconCancel,
  Content,
  ImgItem,
  ScrollTitle,
  IconMinus,
  InputQtdeItem,
  InputPriceItem,
  IconPlus,
  TitleItem,
  WrapperQuantity,
  Hr,
} from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useItensCart } from '../../hooks/itensCart';
import { Button } from '../../components/Button';
import { formatNumber } from '../../util/format';

interface ItensForCart {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface Props extends RectButtonProps {
  closeModal: () => void;
  idItemAdd: number;
}

export function AddItemCart({ closeModal, idItemAdd, ...rest }: Props) {
  const [qtdeItem, setQtdeItem] = useState(1);
  const [itensForCart, setItensForCart] = useState<ItensForCart>({} as ItensForCart);

  const { 
    productsItensData, 
    validateItensAmount,
    addItensCart,
  } = useItensCart();

  function handleRemoveQtde() {
    let qtde = qtdeItem;
    if(qtde > 1) {
      setQtdeItem(qtde - 1);
    }
  }

  function handleAddQtde() {
    let qtde = qtdeItem;
    let itemValid = validateItensAmount((qtde + 1), idItemAdd);

    if(itemValid) {
      setQtdeItem(qtde + 1);
      return; 
    }

    Alert.alert('Limite excedido!', 'Você atingiu a quantidade máxima desse item no estoque');
    return;    
  }

  function handleAddItemCart() {
    let qtde = qtdeItem;
    let itemValid = addItensCart(qtde);

    if(itemValid) {
      Alert.alert('Item adicionado', 'Item adicionado ao carrinho com sucesso!');
      closeModal();
      return; 
    }

    Alert.alert('Quantidade solicitada fora de estoque');
    return;  
  }

  useEffect(() => {
    const response = productsItensData.find(item => item.id === idItemAdd);
    
    const itemInScreen = {
      id: response?.id ? response?.id : 1,
      title: response?.title ? response?.title : 'Produto Indisponível',
      price: response?.price ? response?.price : 0,
      image: response?.image ? response?.image : '',

    }
    setItensForCart(itemInScreen);
    
  }, [itensForCart?.id]);

  return (
    <Container>
      <WrapperIconCancel>
        <IconCancel onPress={closeModal}>
          <Feather 
            name="x-circle"
            size={30}
            color={'red'}
          />
        </IconCancel>
      </WrapperIconCancel>

      <Content>
        <ImgItem source={{ uri: itensForCart.image }} />
        <ScrollTitle>
          <TitleItem>{itensForCart.title}</TitleItem>
        </ScrollTitle>
        <Hr />

        <WrapperQuantity>
          <IconMinus onPress={handleRemoveQtde}>
            <Feather 
              name="minus-circle"
              size={30}
              color={theme.colors.secondary}
            />
          </IconMinus>

            <InputQtdeItem
              keyboardType="numeric"
              maxLength={3}
              editable={false}
              selectTextOnFocus={false}
              value={`${qtdeItem}`}
            >
            </InputQtdeItem>

          <IconPlus onPress={handleAddQtde}>
            <Feather 
              name="plus-circle"
              size={30}
              color={theme.colors.secondary}
            />
          </IconPlus>  
        </WrapperQuantity>

        <Hr />
        <TitleItem>Total:</TitleItem>

        <WrapperQuantity>
          <TitleItem>R$</TitleItem>
          <InputPriceItem
            keyboardType="numeric"
            editable={false}
            selectTextOnFocus={false}
            value={`${formatNumber((itensForCart.price * qtdeItem))}`}
          >
          </InputPriceItem>
        </WrapperQuantity>

      </Content>

      <Button title="Adicionar ao carrinho" onPress={handleAddItemCart} />

    </Container>
  );
}