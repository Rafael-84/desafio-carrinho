import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { getDocs, collection,   } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../../contexts/CartContext';
import { toast } from 'react-hot-toast';

export interface ProductsProps{
    uid: string;
    title: string;
    description: string;
    price: number;
    cover: string;
}

export function Home(){

    const [products, setProducts] = useState<ProductsProps[]>([]);

    const { addItemCart } = useContext(CartContext);
    const[loading, setLoading] = useState(true);
    

    
    useEffect(() => {
        async function getProducts(){
            
            getDocs(collection(db,'products'))
            .then((snapshot) => {
                const lista = [] as ProductsProps[];
                
                snapshot.forEach((doc) => {
                    lista.push({
                        uid: doc.id,
                        title: doc.data().title,
                        description: doc.data().description,
                        price: doc.data().price,
                        cover: doc.data().cover,
                    })
                })

                setProducts(lista);
                setLoading(false)
            })
            .catch((err) => {
                console.log("erro" + err);
            })

        }

        getProducts();
    }, []);

    if(loading){
        return(
            <div className='flex items-center justify-center w-full h-screen'>
                <h1 className='font-medium text-xl'>Carregando...</h1>
            </div>        
        )
    }

    function handleAddItemCart(product: ProductsProps){
        toast.success("Item adicionado ao carrinho")
        addItemCart(product);        
    }

    return(
        <main className='w-full flex items-center  flex-col'>
            <h1 className='my-10 font-medium text-amber-800 text-xl'>Conheça Nossos Produtos</h1>
            <section className='w-full gap-4 grid px-2 mx-auto    md:grid-cols-3 md:mx-0 md:max-w-2xl md:gap-5 lg:grid-cols-4 lg:max-w-7xl'>
                { products.length > 0 && products.map((product) => (
                    <div key={product.uid} className='flex items-center justify-center flex-col mb-2.5  w-10/12 mx-auto  shadow-amber-700 shadow rounded-md p-2  md:w-full md:gap-2 '>
                        <Link to={`/detail/${product.uid}`}><img src={product.cover} alt={product.title} className='w-11/12 h-auto rounded-md transition hover:scale-105 hover:ease-in ' /></Link>
                        <div className='w-full flex items-center justify-center flex-col  '>
                            <h2 className='font-bold my-2 text-center text-gray-800 md:text-sm '>{product.title}</h2>
                            <div className='flex items-center justify-between w-full px-2 my-3'>
                                <span className='font-medium text-gray-800 '>{product.price.toLocaleString("pt-BR",{ style: "currency", currency: "BRL" })}</span>
                                <button onClick={ () => handleAddItemCart(product) } className='bg-bgButtonCart p-1 px-1.5 rounded-sm cursor-pointer hover:bg-amber-600/70 transition-colors'><FiShoppingCart size={20} color='#121212'/></button>
                            </div>
                        </div>
                    </div>
                )) }
            </section>
        </main>
    )
}
