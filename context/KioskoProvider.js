import { useState, useEffect, createContext } from "react";
import axios from "axios";

const KioskoContext = createContext();

const KioskoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  
  
  // Para conocer que categoria es el actual
  const [categoriaActual, setCategoriaActual] = useState({});


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


  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((c) => c.id === id);
    setCategoriaActual(categoria[0]);
  };

  return (
    <KioskoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
      }}
    >
      {children}
    </KioskoContext.Provider>
  );
};

export { KioskoProvider };

export default KioskoContext;
