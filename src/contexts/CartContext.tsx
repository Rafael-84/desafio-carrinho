import { createContext, useState, type ReactNode } from 'react';
import { type ProductsProps } from '../pages/home';
import { toast } from 'react-hot-toast';

interface CartContextProps{
    cart:  CartProps[];
    total: string;
    cartAmount: number;
    addItemCart: (newItem: ProductsProps) => void;
    removeItemCart: (item: CartProps) => void;
    removeItem: (item: CartProps) => void;    
    finishItem: () => void;    
}

interface CartProps{
    uid: string;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number
    total: number;
}

interface CartProviderProps{
    children: ReactNode;
}


export const CartContext = createContext({} as CartContextProps);

function CartProvider({children}: CartProviderProps){

    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState("");    

    function addItemCart( newItem: ProductsProps ){
       const indexItem = cart.findIndex(item => item.uid === newItem.uid)
        if(indexItem !== -1){
            // eslint-disable-next-line prefer-const
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;
            setCart(cartList);
            totalResultCart(cartList);
            return;      
        }

        const data = {
            ...newItem,
            amount: 1,
            total: newItem.price,
        }

        setCart(products => [...products, data]);
        totalResultCart([...cart, data]);
    }

    function removeItemCart(product: CartProps){

        const indexItem = cart.findIndex(item => item.uid === product.uid )
        if(cart[indexItem].amount > 1){
            // eslint-disable-next-line prefer-const
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;
            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        const removeItem = cart.filter(item => item.uid !== product.uid);
        setCart(removeItem);
        totalResultCart(removeItem);       
    }

    function removeItem(product: CartProps){
        toast.success("Item removido")
        const removeItem = cart.filter(item => item.uid !== product.uid);
        setCart(removeItem);
        totalResultCart(removeItem); 
    }

    function finishItem(){
        setCart([]);
        totalResultCart([])        
       
    }

    function totalResultCart(items: CartProps[]){
        const myCart = items;
        const result = myCart.reduce((acc, obj) => { return acc + obj.total }, 0);
        const resultFormated = result.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        setTotal(resultFormated)
    }

    

    return(
        <CartContext.Provider value={{cart, total, cartAmount: cart.length, addItemCart, removeItemCart, removeItem, finishItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
