import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react';

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

type ItensCartData = Omit<ItensCart, "amount">

interface StockProps {
  id: number;
  amount: number;
}

interface IItensCartContextData {
  itensCartData: ItensCartData[];
  stockItensData: StockProps[];
  addIdItemAdd: (id: number) => void;
  idItemAdd: number;
  addItensCart: (qtde: number) => boolean;
  removeItensCart: (itemId: number) => void;
  validateItensAmount: (qtde: number, itemId: number) => boolean;
  itensInCart: ItensCart[];
  finishBuy: () => void;
}

const ItensCartContext = createContext({} as IItensCartContextData);

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

let itens = [
  {
    "id": 1,
    "title": "Tênis de Caminhada Leve Confortável",
    "price": 179.9,
    "image": "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg"
  },
  {
    "id": 2,
    "title": "Tênis VR Caminhada Confortável Detalhes Couro Masculino",
    "price": 139.9,
    "image": "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg"
  },
  {
    "id": 3,
    "title": "Tênis Adidas Duramo Lite 2.0",
    "price": 219.9,
    "image": "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg"
  },
  {
    "id": 5,
    "title": "Tênis VR Caminhada Confortável Detalhes Couro Masculino",
    "price": 139.9,
    "image": "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg"
  },
  {
    "id": 6,
    "title": "Tênis Adidas Duramo Lite 2.0",
    "price": 219.9,
    "image": "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg"
  },
  {
    "id": 4,
    "title": "Tênis de Caminhada Leve Confortável",
    "price": 179.9,
    "image": "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg"
  }
];

function ItensCartProvider({ children }: ItensProviderProps) {
  const [itensCartData, setItensCartData] = useState<ItensCartData[]>(itens);
  const [stockItensData, setStockItensData] = useState<StockProps[]>(stock);
  const [itensInCart, setItensInCart] = useState<ItensCart[]>([]);
  const [idItemAdd, setIdItemAdd] = useState(0);

  function addIdItemAdd(id: number) {
    setIdItemAdd(id);
  }

  function addItensCart(qtde: number) {
    const updatedCart = [...itensInCart];
    const itemExistData = itensCartData.find(item => item.id === idItemAdd);
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

    return true;
  }

  function removeItensCart(itemId: number) {
    const updatedCart = [...itensInCart];

    const itemForRemove = updatedCart.findIndex(item => item.id === itemId);

    updatedCart.splice(itemForRemove, 1);
    setItensInCart(updatedCart);
  }

  // NÃO ESTA SENDO USADO, CONSIDERAR A REMOÇÃO DA FUNÇÃO
  // function updateItensAmount(qtde: number, itemId: number) {
  //   const updatedCart = [...itensInCart];
  //   const stockAmount = stockItensData.find(item => item.id === itemId);

  //   if(qtde > stockAmount!.amount) {
  //     return false;
  //   }

  //   // EXISTINDO ITENS NO CARRINHO, ATUALIZAR O CARRINHO
  //   const itemExists = updatedCart.find(item => item.id === itemId);
  //   const newAmount = qtde;

  //   // Atualiza a quantidade do item solicitado
  //   if(itemExists) {
  //     itemExists.amount = newAmount;
  //     setItensInCart(updatedCart);
  //     return true;
  //   }

  //   return true;
  // }

  // function validateItensAmount(qtde: number) {
  //   const stockAmount = stockItensData.find(item => item.id === idItemAdd);

  //   if(qtde > stockAmount!.amount) {
  //     return false;
  //   }
  //   return true;
  // }

  function validateItensAmount(qtde: number, itemId: number) {
    const stockAmount = stockItensData.find(item => item.id === itemId);

    if(qtde > stockAmount!.amount) {
      return false;
    }
    return true;
  }

  function finishBuy() {
    const allItensInCart = [...itensInCart];
    
    //Faz update no estoque
    allItensInCart.map(item => 
      stockItensData.forEach(itemStock => {
        if(itemStock.id === item.id) {
          itemStock.amount = (itemStock.amount - item.amount!);
        }
      }
    ));
    
    setStockItensData(stockItensData);
    setItensInCart([]);
    // console.log(stockItensData);
  }

  return (
    <ItensCartContext.Provider value={{
      itensCartData,
      stockItensData,
      addIdItemAdd,
      idItemAdd,
      addItensCart,
      removeItensCart,
      validateItensAmount,
      itensInCart,
      finishBuy,
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
