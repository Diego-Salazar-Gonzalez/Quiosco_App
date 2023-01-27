import Image from "next/image"
import useKiosko from "@/hooks/useKiosko"

const Categoria = ({categoria}) => {
    const {categoriaActual,handleClick,handleClickCategoria} = useKiosko()

    const { nombre,icono,id} = categoria
  return (
    <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400 transition-all duration-300`}>
        <Image 
            width={70}
            height={70}
            src={`/assets/img/icono_${icono}.svg`}
            alt="Imagen Icono"
            
        />

        <button
            type='button'
            className="text-2xl font-bold hover:cursor-pointer"
            onClick={() => handleClickCategoria(id)}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria