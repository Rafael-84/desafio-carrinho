import {  useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import emptyLogo from '../../assets/cart-empty.png';
import { Link, useNavigate } from 'react-router';

import { FiTrash } from 'react-icons/fi';
import toast from 'react-hot-toast';

export function Cart() {


    const { cart, total, cartAmount, addItemCart, removeItemCart, removeItem, finishItem } = useContext(CartContext);
    const navigate = useNavigate();

   function finishCart(){
        toast.success("compra realizada com sucesso!")
        finishItem();
        navigate("/");
   }

    return (
        <main className='w-full px-3 flex items-start justify-center flex-col '>
            {cart.length > 0 && <h1 className=' pl-7 mt-14 font-bold text-slate-700'>Carrinho</h1>}
            <section className='w-full px-3 flex flex-col lg:items-start lg:justify-center lg:flex-row '>
                <div className='w-full px-3 flex items-center justify-between flex-col gap-5 mt-10 flex-2/3'>
                    {cart.map((item) => (
                        <div key={item.uid} className='max-w-7xls w-full flex flex-col items-center justify-between  py-2 border-gray-300 border rounded-sm md:flex-row'>
                            <div className='flex items-start justify-center  w-full max-w-xs  flex-1  md:items-center md:justify-center md:flex-row'>
                                <img src={item.cover} alt={item.title} className='w-20 h-auto ' />
                            <h3 className='font-medium text-xs w-full md:text-start  '>{item.title}</h3>
                            </div>
                            <div className='relative -top-2  mb-5 md:mb-0 md:mt-3 md:flex md:items-center md:justify-center gap-3 flex-1  md:w-full '>
                                <button onClick={ () => removeItemCart(item) } className=' mr-1 md:mr-0 bg-amber-700 px-2 rounded-full text-white font-bold cursor-pointer hover:bg-amber-600 transition-colors'> - </button> <span className='font-medium'>{item.amount}</span> <button onClick={() => addItemCart(item)} className='ml-1 md:ml-0 bg-amber-700 px-1.5 rounded-full text-white font-bold cursor-pointer hover:bg-amber-600 transition-colors'> + </button>
                            </div>
                            <div className='flex text-sm gap-12 md:gap-8 md:ml-10 '>
                                <span className='text-gray-700 italic font-medium'>Subtotal: {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                                <button onClick={() => removeItem(item)} className='px-3 pb-2 cursor-pointer'><FiTrash size={24} color='#950101' /></button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {cart.length > 0 && (
                    <section className='flex-1/6 flex flex-col items-center justify-center gap-3 mb-10 '>
                        <div className=' flex items-center justify-center flex-col mt-10 w-full px-3 border border-gray-300 rounded-sm  md:items-center md:justify-center  lg:items-start lg:justify-center'>
                            <h3 className='mb-20 mt-2 text-slate-800 font-bold text-xl'>Resumo do pedido</h3>
                            <p className='mb-2 text-slate-700/90 font-medium'>Total de itens: <span className='pl-2 text-gray-700 font-bold'>{cartAmount} itens</span></p>
                            <p className='mb-2 text-slate-700/90 font-medium '>Total do pedido: <span className='pl-2 text-gray-700 font-bold'>{total}</span></p>
                        </div>
                        <button onClick={() => finishCart()}  className='bg-amber-700 w-full py-1.5 text-white font-medium text-lg rounded-md cursor-pointer hover:bg-amber-600 transition-colors'>Concluir Compra</button>
                        <Link to="/" className='text-center border-amber-700 border w-full py-1.5 text-amber-800 font-medium text-lg rounded-md cursor-pointer hover:bg-amber-600/20 transition-colors'>Adicinar mais produtos</Link>
                    </section>
                )}
            </section>

            {cart.length === 0 && (
                <div className='flex flex-col items-center justify-center w-full h-screen[-56px]'>
                    <div className='flex flex-col items-center justify-center mt-30'>
                        <img src={emptyLogo} alt="Carrinho está vazio" />
                        <span className='relative -top-14 text-xl'>Seu carrinho está vazio!</span>
                        <Link to="/" className='relative -top-10 bg-amber-800 px-2 py-1 rounded-md text-white font-medium hover:bg-amber-700 transition-colors'>Voltar ao início</Link>
                    </div>
                </div>
            )}
        </main>
    )
}
