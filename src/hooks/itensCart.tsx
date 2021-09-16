import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductDTO } from '../dtos/ProductDTO';
import { StockDTO } from '../dtos/StockDTO';
import api from '../services/api';

interface ItensProviderProps {
  children: ReactNode;
}

interface ItensCart {
  id: number;
  title: string;
  price: number;
  image: string;
  amount?: number;
}

interface StockProps {
  id: number;
  amount: number;
}

interface IItensCartContextData {
  productsItensData: ProductDTO[];
  stockItensData: StockProps[];
  setStockItensData: (stockItensData: StockProps[]) => void;
  addIdItemAdd: (id: number) => void;
  idItemAdd: number;
  addItensCart: (qtde: number) => boolean;
  removeItensCart: (itemId: number) => void;
  validateItensAmount: (qtde: number, itemId: number) => boolean;
  itensInCart: ItensCart[];
  finishBuy: () => Promise<string>;
  loadingStock: boolean;
}

const ItensCartContext = createContext({} as IItensCartContextData);

function ItensCartProvider({ children }: ItensProviderProps) {
  const [productsItensData, setProductsItensData] = useState<ProductDTO[]>([]);
  const [stockItensData, setStockItensData] = useState<StockDTO[]>([]);
  const [itensInCart, setItensInCart] = useState<ItensCart[]>([]);
  const [idItemAdd, setIdItemAdd] = useState(0);
  const [loadingStock, setLoadingStock] = useState(true);

  const itensStorageKey = '@estore:itens';

  function addIdItemAdd(id: number) {
    setIdItemAdd(id);
  }

  async function addItensStorage(itensStorage: ItensCart[]) {
    await AsyncStorage.setItem(itensStorageKey, JSON.stringify(itensStorage));
  }

  async function removeItensStorage() {
    await AsyncStorage.removeItem(itensStorageKey);
  }

  function addItensCart(qtde: number) {
    const updatedCart = [...itensInCart];
    const itemExistData = productsItensData.find(item => item.id === idItemAdd);
    const stockAmount = stockItensData.find(item => item.id === idItemAdd);

    if(qtde > stockAmount!.amount) {
      return false;
    }
    
    // CASO NÃO EXISTA ITENS NO CARRINHO, VAI ADICIONAR
    if(updatedCart.length === 0) {
      const newItem = {
        id: itemExistData!.id,
        title: itemExistData!.title,
        price: itemExistData!.price,
        image: itemExistData!.image,
        amount: qtde,
      };
      updatedCart.push(newItem);
      setItensInCart(updatedCart);
      addItensStorage(updatedCart);
      return true;
    }

    // EXISTINDO ITENS NO CARRINHO, ATUALIZAR O CARRINHO
    const itemExists = updatedCart.find(item => item.id === idItemAdd);
    const currentAmount = itemExists ? itemExists.amount : 0;
    const newAmount = currentAmount! + qtde;

    // Caso exista o item e no momento de acrescentar mais quantidades no item existente ultrapassar o limite do estoque, alerta o usuário que passou do limite do estoque
    if(newAmount > stockAmount!.amount) {
      return false;
    }

    // Em caso de existência do mesmo item no carrinho, atualizar a quantidade do item solicitado
    if(itemExists) {
      itemExists.amount = newAmount; 
      return true;
    }

    const newItems = {
      ...itemExistData,
      id: itemExistData!.id,
      title: itemExistData!.title,
      price: itemExistData!.price,
      image: itemExistData!.image,
      amount: qtde,
    };

    updatedCart.push(newItems);
    setItensInCart(updatedCart);
    addItensStorage(updatedCart);

    return true;
  }

  function removeItensCart(itemId: number) {
    const updatedCart = [...itensInCart];

    const itemForRemove = updatedCart.findIndex(item => item.id === itemId);

    updatedCart.splice(itemForRemove, 1);
    setItensInCart(updatedCart);
    addItensStorage(updatedCart);
  }

  function validateItensAmount(qtde: number, itemId: number) {
    const stockAmount = stockItensData.find(item => item.id === itemId);

    if(qtde > stockAmount!.amount) {
      return false;
    }
    return true;
  }

  async function finishBuy() {
    const allItensInCart = [...itensInCart];
    let msgResult = '';
    let finishAction = true;

    const resStock = await api.get<StockDTO[]>('/stock');

    setStockItensData(resStock.data);

    allItensInCart.forEach(allItens => {
        const result = resStock.data.find(item => item.id === allItens.id)

        if(allItens.amount! > result!.amount) {
          msgResult += 'Item: '+allItens.title+'\nQtde no estoque: '+result?.amount+`\n\n`;
          finishAction = false;
        }
      }
    )

    if(finishAction) {
      //Faz update no estoque
      allItensInCart.map(item => 
        stockItensData.forEach(async (itemStock) => {
          if(itemStock.id === item.id) {
            itemStock.amount = (itemStock.amount - item.amount!);
            await api.put(`/stock/${itemStock.id}`, {
              amount: itemStock.amount,
              id: itemStock.id
            });
          }
        }
      ));
      
      setStockItensData(stockItensData);
      setItensInCart([]);
      removeItensStorage();
      msgResult = 'Tudo pronto';
    }

    return msgResult;
  }

  useEffect(() => {
    async function loadItensStorageData() {
      try {
        const itensStoraged = await AsyncStorage.getItem(itensStorageKey);

        if(itensStoraged) {
          const allItensInCart = JSON.parse(itensStoraged) as ItensCart[];
          setItensInCart(allItensInCart);
        }  
      } catch (error) {
        console.log(error);
      }
    }
    async function loadProducts() {
      try {
        const resProduct = await api.get<ProductDTO[]>('/products');
        setProductsItensData(resProduct.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function loadStock() {
      try {
        const resStock = await api.get<StockDTO[]>('/stock');

        setStockItensData(resStock.data);  
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingStock(false);
      }
    }

    loadItensStorageData();
    loadProducts();
    loadStock();
  }, []);

  return (
    <ItensCartContext.Provider value={{
      productsItensData,
      stockItensData,
      setStockItensData,
      addIdItemAdd,
      idItemAdd,
      addItensCart,
      removeItensCart,
      validateItensAmount,
      itensInCart,
      finishBuy,
      loadingStock,
    }}>
      {children}
    </ItensCartContext.Provider>
  );
}

function useItensCart() {
  const context = useContext(ItensCartContext);

  return context;
}

export {ItensCartProvider, useItensCart};
