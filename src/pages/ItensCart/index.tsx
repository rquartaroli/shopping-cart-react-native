import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { 
  Container,
  ListItensCart,
  WrapperCartEmpty,
  TitleCartEmpty,
  WrapperItemCart,
  ContentItemCart,
  ImageItem,
  WrapperQtde,
  ScrollTitleItem,
  TitleItem,
  WrapperIconsQtde,
  InputQtdeItem,
  InputPriceItem,
  TitleTotal,
  ContentItemLeft,
  ContentItemRight,
  IconMinus,
  IconPlus,
  IconRemove,
  Footer,
  FooterContainerLeft,
  FooterContainerRight,
  TitleFooter,
  TitleFooterValue,
} from './styles';
import theme from '../../global/styles/theme';
import { useItensCart } from '../../hooks/itensCart';
import { Button } from '../../components/Button';
import { Dialog } from '../../components/Dialog';
import { formatNumber } from '../../util/format';
import { Load } from '../../components/Load';

interface ItensCart {
  id: number;
  title: string;
  price: number;
  image: string;
  amount?: number;
}

export function ItensCart() {
  const [itensCart, setItensCart] = useState<ItensCart[]>([]);
  const [openDialogFinish, setOpenDialogFinish] = useState(false);
  const [openDialogRemoveItem, setOpenDialogRemoveItem] = useState(false);
  const [saveIdItemForRemove, setSaveIdItemForRemove] = useState(0);

  const [loadFinish, setLoadFinish] = useState(false);

  const {itensInCart, validateItensAmount, removeItensCart, finishBuy} = useItensCart();

  function handleRemoveQtdeItem(itemId: number) {
    const updatedCart = [...itensInCart];
    const itemExists = updatedCart.find(item => item.id === itemId);

    let qtde = itemExists?.amount!;
    if(qtde > 1) {
      const newAmount = qtde - 1;

      // Atualiza a quantidade do item solicitado
      if(itemExists) {
        itemExists.amount = newAmount;
        setItensCart(updatedCart);
        return true;
      }
    }
  }

  function handleAddQtdeItem(itemId: number) {
    const updatedCart = [...itensInCart];
    const itemExists = updatedCart.find(item => item.id === itemId);
    
    let qtde = itemExists?.amount!;

    let itemValid = validateItensAmount((qtde + 1), itemId);

    if(itemValid) {
      const newAmount = qtde + 1;

      // Atualiza a quantidade do item solicitado
      if(itemExists) {
        itemExists.amount = newAmount;
        setItensCart(updatedCart);
        return true;
      }
    }

    Alert.alert('Limite excedido!', 'Voc?? atingiu a quantidade m??xima desse item no estoque');
    return; 
  }

  function handleRemoveItemCart() {
    removeItensCart(saveIdItemForRemove);
    setOpenDialogRemoveItem(false);
  }

  async function handleFinishBuy() {
    setLoadFinish(true);
    setOpenDialogFinish(false);
    const result = await finishBuy();
    if(result == 'Tudo pronto'){
      Alert.alert('Tudo pronto', 'Agora s?? falta efetuar o pagamento e os itens ser??o entregues ?? voc??!');
    } else {
      Alert.alert('Excedeu o limite do estoque', result);
    }
    setLoadFinish(false);
  }

  function handleCloseDialog() {
    setOpenDialogFinish(false);
    setOpenDialogRemoveItem(false);
  }

  function handleOpenDialogFinish() {
    setOpenDialogFinish(true);
  }

  function handleOpenDialogRemoveItem(idItem: number) {
    setSaveIdItemForRemove(idItem);
    setOpenDialogRemoveItem(true);
  }

  useEffect(() => {
    const listItensInCart = [...itensInCart];

    setItensCart(listItensInCart);
    
  }, [itensInCart]);

  if(itensInCart.length === 0) {
    return (
    <Container>
        <Header titleHeader={'Itens carrinho'} backButton={true} />
        <WrapperCartEmpty>
          <TitleCartEmpty>Nenhum item no carrinho :(</TitleCartEmpty>
        </WrapperCartEmpty>
      </Container>
    );
  }

  return(
    <Container>
      <Header titleHeader={'Itens carrinho'} backButton={true} />
      {loadFinish 
      ?
      <Load />
      :
      <ListItensCart>
        {itensCart.map(item => (
          <WrapperItemCart key={item.id}>
            <ScrollTitleItem>
              <TitleItem>{item.title}</TitleItem>
            </ScrollTitleItem>
            <ContentItemCart>
              <ContentItemLeft>
                <ImageItem source={{ uri: item.image }} />
    
                <WrapperQtde>
                  <WrapperIconsQtde>
                    <IconMinus onPress={() => handleRemoveQtdeItem(item.id)}>
                      <Feather 
                        name="minus-circle"
                        size={22}
                        color={theme.colors.secondary}
                      />
                    </IconMinus>
    
                    <InputQtdeItem 
                      keyboardType="numeric"
                      maxLength={3}
                      editable={false}
                      selectTextOnFocus={false}
                      value={`${item.amount}`}
                    >
                    </InputQtdeItem>
    
                    <IconPlus onPress={() => handleAddQtdeItem(item.id)}>
                      <Feather 
                        name="plus-circle"
                        size={22}
                        color={theme.colors.secondary}
                      />
                    </IconPlus>
                  </WrapperIconsQtde>
                </WrapperQtde>
                
                <WrapperQtde>
                  <WrapperIconsQtde>
                  <TitleTotal>Total R$</TitleTotal>
                    <InputPriceItem
                      keyboardType="numeric"
                      editable={false}
                      selectTextOnFocus={false}
                      value={`${formatNumber((item.price * item.amount!))}`}
                    >
                    </InputPriceItem>
                  
                  </WrapperIconsQtde>
                </WrapperQtde>
    
              </ContentItemLeft>
    
              <ContentItemRight>
                <IconRemove onPress={() => handleOpenDialogRemoveItem(item.id)}>
                  <Feather 
                    name="x-circle"
                    size={22}
                    color={'red'}
                  />
                </IconRemove>
              </ContentItemRight>
            </ContentItemCart>
          </WrapperItemCart>
        ))}
      </ListItensCart>
      }

      <Footer>
        <FooterContainerLeft>
          <TitleFooter>Itens no carrinho:</TitleFooter>
          <TitleFooterValue>{itensCart.reduce((accumulador: number, currentQtde: ItensCart) => {
                return accumulador + Number(currentQtde.amount);
              }, 0)}</TitleFooterValue>
        </FooterContainerLeft>

        <FooterContainerRight>
          <TitleFooter>Total ?? pagar:</TitleFooter>
          <TitleFooterValue>R$ {formatNumber(itensCart.reduce((accumulador: number, currentPrice: ItensCart) => {
                return accumulador + Number((currentPrice.price * currentPrice.amount!));
              }, 0))}</TitleFooterValue>
        </FooterContainerRight>
      </Footer>

      <Button title="Finalizar compra" onPress={handleOpenDialogFinish} />

      {openDialogRemoveItem && 
        <Dialog 
          title="Remover item do carrinho" 
          description="Deseja mesmo remover esse item do carrinho ?"
          titleButtonNegative="N??O"
          titleButtonPositive="SIM"
          actionButtonNegative={handleCloseDialog}
          actionButtonPositive={handleRemoveItemCart}
        />
      }

      {openDialogFinish && 
        <Dialog 
          title="Finalizar compra" 
          description="Deseja finalizar seu pedido ?"
          titleButtonNegative="N??O"
          titleButtonPositive="SIM"
          actionButtonNegative={handleCloseDialog}
          actionButtonPositive={handleFinishBuy}
        />
      }
      
    </Container>
  );
}