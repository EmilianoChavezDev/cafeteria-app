import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const KioskoContext = createContext();

const KioskoProvider = ({ children }) => {

  const router = useRouter();


  const [categorias, setCategorias] = useState([]);
  // Para conocer que categoria es el actual
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  // Aquí se cargan los productos
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);


  // Obtenemos las categorias desde la API
  const obtenerCategorias = async () => {
    const { data: categorias } = await axios("/api/categorias");
    setCategorias(categorias);
  };



  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
    setTotal(nuevoTotal);
  }, [pedido])


  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((c) => c.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/")
  };


  // Cambiar de produto de acuerdo a la categoria
  const handleSetProducto = (producto) => {
    setProducto(producto);
  }


  const handleChangeModal = () => {
    setModal(!modal);
  }

  // Cargo los pedidos dentro del arreglo
  const handleSetPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some(productoState => productoState.id === producto.id)) {
      //Si el pedido existe agrega la cantidad editada
      const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id
        ? producto
        : productoState);
      setPedido(pedidoActualizado);
      toast.success('Pedido Actualizado');
    } else {
      // Agrega el pedido
      setPedido([...pedido, producto]);
      toast.success("Pedido Agregado")
    }
    setModal(false);

  }

  const handleEditarCantidad = (id) => {
    const actualizarProducto = pedido.filter(producto => producto.id === id);
    setProducto(actualizarProducto[0]);

    setModal(!modal);
  }

  const handleEliminarProducto = (id) => {
    const actualizarPedido = pedido.filter(producto => producto.id != id)
    setPedido(actualizarPedido);
    toast.success('Eliminado con Exito');
  }


  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/ordenes", { pedido, nombre, total, fecha: Date.now().toString() });

      // Reinicio la aplicación
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);

      toast.success("Su Orden ha sido Agregada Correctamente");

      setTimeout(() => {
        router.push("/")
      }, 3000);

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <KioskoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleSetPedido,
        pedido,
        handleEditarCantidad,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total
      }}
    >
      {children}
    </KioskoContext.Provider>
  );
};

export { KioskoProvider };

export default KioskoContext;
