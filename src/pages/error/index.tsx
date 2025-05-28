import { Link } from "react-router";


export function NotFound(){
    return(
        <main className="w-full h-screen flex items-center justify-center">
            <div className="flex items-center justify-between flex-col ">
                <h2 className=" font-medium text-5xl xl:text-6xl 2xl:text-7xl">404</h2>
                <h3 className="font-medium mb-14 text-3xl xl:text-5xl 2xl:text-6xl">Essa página não existe!</h3>

                <Link to="/" className='relative -top-10 bg-amber-800 px-2 py-1 rounded-md text-white font-medium hover:bg-amber-700 transition-colors xl:text-4xl xl:px-5 xl:py-2 xl:mt-8 2xl:text-7xl 2xl:px-8 2xl:py-4 2xl:mt-8'>Voltar ao início</Link>

            </div>
        </main>
    )
}
