import Image from "next/image";
import useKiosko from "@/hooks/useKiosko";

const Categoria = ({ categoria }) => {
  const { categoriaActual, handleClick, handleClickCategoria,handleToggleModal } = useKiosko();

  const { nombre, icono, id } = categoria;
  return (
    <div
      className={`${
        categoriaActual?.id === id ? "bg-amber-400" : ""
      } cursor-pointer flex items-center gap-4 w-full border p-5 hover:bg-amber-400 transition-all duration-300`}
      onClick={() => {
        handleClickCategoria(id) 
        handleToggleModal()}}
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt="Imagen Icono"
      />

      <p className="text-2xl font-bold hover:cursor-pointer">{nombre}</p>
    </div>
  );
};

export default Categoria;
