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

interface ItensCart {
  id: number;
  title: string;
  price: number;
  image: string;
  amount?: number;
}

// interface PropsQtde {
//   id: number;
//   qtde: number;
// }

export function ItensCart() {
  const [itensCart, setItensCart] = useState<ItensCart[]>([]);
  const [openDialogFinish, setOpenDialogFinish] = useState(false);
  const [openDialogRemoveItem, setOpenDialogRemoveItem] = useState(false);
  const [saveIdItemForRemove, setSaveIdItemForRemove] = useState(0);
  // const [saveQtdeTotal, setSaveQtdeTotal] = useState(0);
  // const [savePriceTotal, setSavePriceTotal] = useState(0);
  // const [arrayQtde, setArrayQtde] = useState<PropsQtde>({} as PropsQtde);

  const {itensInCart, validateItensAmount, removeItensCart, finishBuy} = useItensCart();

  function handleRemoveQtdeItem(itemId: number) {
    const updatedCart = [...itensInCart];
    const itemExists = updatedCart.find(item => item.id === itemId);

    let qtde = itemExists?.amount!;
    // let qtde = qtdeItem;
    if(qtde > 1) {
      // updateItensAmount((qtde - 1), itemId);
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

    // let qtde = qtdeItem;
    // let itemValid = updateItensAmount((qtde + 1), itemId);
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

    Alert.alert('Opa, você atingiu a quantidade máxima desse item no estoque');
    return; 
  }

  function handleRemoveItemCart() {
    removeItensCart(saveIdItemForRemove);
    setOpenDialogRemoveItem(false);
  }

  function handleFinishBuy() {
    setOpenDialogFinish(false);
    finishBuy();
    Alert.alert('Tudo pronto', 'Agora só falta efetuar o pagamento e os itens serão entregues á você!');
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
    )
  }

  return(
    <Container>
      <Header titleHeader={'Itens carrinho'} backButton={true} />

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

      <Footer>
        <FooterContainerLeft>
          <TitleFooter>Itens no carrinho:</TitleFooter>
          <TitleFooterValue>{itensCart.reduce((accumulador: number, currentQtde: ItensCart) => {
                return accumulador + Number(currentQtde.amount);
              }, 0)}</TitleFooterValue>
        </FooterContainerLeft>

        <FooterContainerRight>
          <TitleFooter>Total á pagar:</TitleFooter>
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
          titleButtonNegative="NÃO"
          titleButtonPositive="SIM"
          actionButtonNegative={handleCloseDialog}
          actionButtonPositive={handleRemoveItemCart}
        />
      }

      {openDialogFinish && 
        <Dialog 
          title="Finalizar compra" 
          description="Deseja finalizar seu pedido ?"
          titleButtonNegative="NÃO"
          titleButtonPositive="SIM"
          actionButtonNegative={handleCloseDialog}
          actionButtonPositive={handleFinishBuy}
        />
      }
      
    </Container>
  );
}