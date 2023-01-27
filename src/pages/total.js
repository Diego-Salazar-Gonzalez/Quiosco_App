
import Layout from "@/layout/Layout";
import { useEffect,useCallback } from "react";
import useKiosko from "@/hooks/useKiosko";
import { formatearDinero } from "@/helpers";
export default function Total() {


  const {pedido,nombre,setNombre,handleColocarOrden,total } = useKiosko()

  const comprobarPedido = useCallback (() =>{
    return pedido.length === 0 || nombre === '' || nombre.length < 3
  },[pedido,nombre])

  useEffect(() =>{
    comprobarPedido()
  },[pedido,comprobarPedido])


  
  return (
    <Layout pagina="Total Y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total Y Confirmar Pedido</h1>
      <p className="text-2xl my-10">Confirma tu pedido a continuacion</p>
      <form
        onSubmit={handleColocarOrden}
      >
        <div>
            <label
              htmlFor="nombre"
              className="block uppercase text-slate-800 font-bold text-xl">
              Nombre
            </label>

            <input
              id="nombre"
              type="text"
              className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar: {''}<span className="font-bold">{formatearDinero(total)}</span>
          </p>
        </div>
        <div className="mt-5">
            <input
            type="submit"
            className={`${comprobarPedido() ? 'bg-indigo-100 hover:cursor-not-allowed' : 'bg-indigo-600 hover:cursor-pointer hover:bg-indigo-800 transition-colors duration-300'}  w-full lg:w-auto px-5 py-2 rounded uppercase text-white font-bold text-center  `}
              value="Confirmar Pedido"
            disabled={comprobarPedido()}
            />
        </div>
      </form>
    </Layout>
  );
}
