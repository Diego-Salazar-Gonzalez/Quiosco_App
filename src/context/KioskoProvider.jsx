import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
const KioskoContext = createContext();

const KioskoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };
  useEffect(() => {
    obtenerCategorias();
  }, []);
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    //total inicia en 0 este array metod itera sobre pedido como producto y accede en cada producto al precio y la cantidad y la suma al total
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    //quita el id e imagen y toma el resto del objeto como "producto"
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      //filtro para saber si es el mismo producto
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      ); //remplaza el pedido si es el mismo actualizando las cantidades
      setPedido(pedidoActualizado);
      toast.success("Guardado Correctamente");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al Pedido");
    }
    setModal(false);
  };

  const handleChangePaso = (paso) => {
    setPaso(paso);
  };

  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);

    setProducto(productoActualizar[0]);
    setModal(!modal);
  };

  const handleEliminarProducto = (id) => {
    const pedidoActualizar = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizar);
    toast.success("Producto Eliminado");
  };

  const handleColocarOrden = async (e) => {
    e.preventDefault();
    try {
      console.log("pasandingg.");
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      //resset
      setCategoriaActual(categorias[0])
      setPedido([])
      setNombre('')
      setTotal(0)
      
      toast.success('Pedido Realizado Correctamente')

      setTimeout(() => {
        router.push("/")
      }, 3000);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <KioskoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        paso,
        handleChangePaso,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        handleColocarOrden,
        total,
      }}
    >
      {children}
    </KioskoContext.Provider>
  );
};

export { KioskoProvider };

export default KioskoContext;
