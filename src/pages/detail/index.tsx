import { useState, useEffect, useContext } from "react";
import { CartContext } from '../../contexts/CartContext';
import { useNavigate, useParams } from "react-router";

import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { type ProductsProps } from '../home';

import { FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export function Detail() {

    const { addItemCart } = useContext(CartContext)
    const { id } = useParams();
    const [product, setProduct] = useState<ProductsProps>();
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function GetProduct() {

            const docRef = doc(db, "products", `${id}`);
            

            await getDoc(docRef)
                .then((snapshot) => {
                    setProduct({
                        uid: snapshot?.id,
                        title: snapshot.data()?.title,
                        description: snapshot.data()?.description,
                        price: snapshot.data()?.price,
                        cover: snapshot.data()?.cover,
                    });
                    setLoading(false);

                })
                .catch((err) => {
                    console.log("Deu erro" + err);
                })
        }

        GetProduct();
    }, [id]);

    if(loading){
        return(
            <div className='flex items-center justify-center w-full h-screen'>
                <h1 className='font-medium text-xl'>Carregando...</h1>
            </div>        
        )
    }

    function addCart(product: ProductsProps){
        toast.success("Item adicionado ao carrinho")
        addItemCart(product);
        navigate("/cart");
    }

    return (
        <main className="w-full flex items-center justify-center flex-col px-2">
            <h1 className="my-5 font-medium text-amber-800 text-xl md:mt-30">Detalhes</h1>
            {product && (
                <section className="mb-10 p-2 w-full  md:w-full md:max-w-5xl">
                    <div className="flex items-center justify-center flex-col mx-auto  md:flex md:flex-row md:px-2 ">
                        <img src={product?.cover} alt={product?.title} className="w-2xs" />
                        <div className="w-full max-w-10/12">
                            <h2 className=" text-gray-800 font-bold mb-2">{product?.title}</h2>
                            <p className="my-8 text-gray-900 ">{product?.description}</p>
                            <div className="flex flex-row items-center justify-between gap-8 lg:items-start lg:justify-start lg:gap-2">
                                <span className='font-medium text-gray-800 lg:text-xl'>{product?.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}</span>
                                <button onClick={() => addCart(product) } className='bg-bgButtonCart p-1 px-1.5 rounded-sm cursor-pointer hover:bg-amber-600/70 transition-colors'><FiShoppingCart size={20} color='#121212' /></button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
