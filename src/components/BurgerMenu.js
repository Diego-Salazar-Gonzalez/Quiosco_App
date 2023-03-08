import { bubble as Menu } from "react-burger-menu";
import useKiosko from "@/hooks/useKiosko";
import Categoria from "./Categoria";
import Image from "next/image";
const BurgerMenu = () => {
  const {handleToggleModal,toggleModal,categorias} = useKiosko()
  const urlNavegacion = [
    ["/", "Incio"],
    ["/tienda", "Tienda"],
    ["/contacto", "Contacto"],
    ["/login", "Login"],
    ["/registro", "Registrar"],
  ];

  var styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "15px",
      top: "15px",
      right: "0px",
    },
    bmBurgerBars: {
      background: "#000",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#fff",
      padding: "0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#fff",
    },
    bmItemList: {
      color: "#000",
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };
  return (
    <div className={`block`}>
     
      <Menu styles={styles} isOpen={toggleModal} onOpen={handleToggleModal} onClose={handleToggleModal}>
        <div>
          <div className={` flex flex-col`}>
           
          <Image
          width={150}
          height={50}
          src="./assets/img/logo.svg"
          alt="imagen logotipo"
          priority
          className="mx-auto my-auto"
        />
     

      <nav className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
        
      </nav>
          </div>
        </div>
      </Menu>
    </div>
  )
}

export default BurgerMenu