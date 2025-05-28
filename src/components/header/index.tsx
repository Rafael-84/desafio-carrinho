import { useContext } from 'react';
import { Link } from 'react-router';
import logo from '../../assets/logo-devpet.png';
import { BsCart3 } from 'react-icons/bs';
import {CartContext} from '../../contexts/CartContext';



export function Header(){

    const { cartAmount } = useContext(CartContext);
    return(
        <header className="w-full ">
            <nav className="w-full h-14 bg-header flex items-center justify-around gap-4 md:px-32 md:mx-auto md:justify-between md:px-40">                
                    <Link to="/" className='flex items-center justify-center '>
                        <h3 className='text-white font-bold text-xl'>DevPet</h3>
                        <img src={logo} alt="Logo DevPet" className='w-10 h-auto ml-1' />
                    </Link>                
                <Link to='/cart' className='relative' ><BsCart3 size={24} color='#FFF'  />{cartAmount > 0 && ( <span className='absolute -top-3 -right-3 px-2.5 bg-bgCart  rounded-full w-6 h-6  flex items-center justify-center text-amber-900 font-medium text-center'>{cartAmount}</span> )}
                </Link>
            </nav>
        </header>
    )
}
