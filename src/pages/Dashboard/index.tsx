import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { CardItem } from '../../components/CardItem';
import { Header } from '../../components/Header';
import api from '../../services/api';
import { 
  Container,
  Content, 
  WrapperCardItem,
  ModalView,
  StockEmptyContainer,
  TextAlertStockEmpty,
} from './styles';
import { AddItemCart } from '../AddItemCart';
import { useItensCart } from '../../hooks/itensCart';
import { formatNumber } from '../../util/format';
import { useFocusEffect } from '@react-navigation/native';

interface PropsRes {
  id: number;
  title: string;
  price: number;
  image: string;
};

export function Dashboard() {
  const [itensInStock, setItensInStock] = useState<PropsRes[]>([]);
  const [confirmItemModalOpen, setConfirmItemModalOpen] = useState(false);
  const [saveIdItemAdd, setSaveIdItemAdd] = useState(0);

  const {itensCartData, stockItensData, addIdItemAdd} = useItensCart();

  function handleAddItemCart(id: number) {
    addIdItemAdd(id);
    setSaveIdItemAdd(id);
    setConfirmItemModalOpen(true);
  }

  function closeModal() {
    setConfirmItemModalOpen(false);
  }

  function loadItensInStock() {
    const stockData = [...stockItensData];

    const itensExistInStock: PropsRes[] = [];

    // VERIFICAR O QUE PODE SER FEITO COM ISSO 
    stockData.filter(item => {

      if(item.amount > 0) { // Seleciona apenas os itens existentes no estoque
        itensCartData.find(itemCartData => {

          if(itemCartData.id === item.id) { 
            itensExistInStock.push({ // Armazena item existente em variável de estado para ser exibido na tela
              id: itemCartData.id,
              title: itemCartData.title,
              image: itemCartData.image,
              price: itemCartData.price,
            })
          }
            
        });
      }
    });

    setItensInStock(itensExistInStock);

    // console.log('estoque disponível')
    // console.log(itensExistInStock);
  }

  useEffect(() => {
    loadItensInStock();
  },[]);

  useFocusEffect(useCallback(() => {
    loadItensInStock();
  }, []));

  return (
    <Container>
      <Header titleHeader="E-Store" />

{itensInStock.length === 0 && 
  <StockEmptyContainer>
    <TextAlertStockEmpty>
      Ops, lamentamos que esteja vendo essa mensagem, isso significa que nosso estoque esta vazio no momento, 
      mas já estamos trabalhando para repor o mais rápido possível, obrigado pela preferência
      e nos desculpe pelo transtorno!{'\n\n'}
      <TextAlertStockEmpty isColorSecondary={true}>Dica: Tente novamente mais tarde, adoramos a sua companhia ;D</TextAlertStockEmpty>
      
    </TextAlertStockEmpty>
  </StockEmptyContainer>
}
      <Content>
        <WrapperCardItem>
          {itensInStock.map(item => 
            <CardItem 
              key={item.id}
              pathImage={item.image}
              titleCard={item.title}
              valueCard={formatNumber(item.price)}
              onPress={() => handleAddItemCart(item.id)} 
            />
          )}
        </WrapperCardItem>
      </Content>

      {confirmItemModalOpen && 
        <ModalView>
          <AddItemCart closeModal={closeModal} idItemAdd={saveIdItemAdd} />
        </ModalView>
      }
    </Container>
  );
}