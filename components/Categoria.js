import Image from "next/image";
import useKisko from "../hooks/useKiosko";

const Categoria = ({ categoria }) => {

    const { handleClickCategoria, categoriaActual } = useKisko();

    const { nombre, icono, id } = categoria;


    return (
        <div className={`${categoriaActual?.id === id ? "bg-amber-400" : ""} 
            flex items-center gap-4 qw-full border p-5 hover:bg-amber-400 hover:cursor-pointer`}>
            <Image
                width={50}
                height={50}
                src={`/assets/img/icono_${icono}.svg`}
                alt="Imagen Icono"
            />

            <button
                type="button"
                className="text-2xl font-bold hover:cursor-pointer"
                onClick={() => handleClickCategoria(id)}

            >
                {nombre}
            </button>
        </div>
    )
}

export default Categoria
