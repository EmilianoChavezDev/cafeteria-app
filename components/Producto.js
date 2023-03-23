import Image from "next/image";
import { formatearDinero } from "../helpers";
import useKisko from "../hooks/useKiosko";

const Producto = ({ producto }) => {
    const { handleSetProducto, handleChangeModal } = useKisko();

    const { id, nombre, precio, imagen } = producto;




    return (
        <div className="border p-3">
            <Image src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen Platillo ${nombre}`}
                width={400}
                height={500}

            />
            <p className="font-bold mt-2 uppercase">{nombre}</p>
            <p className="font-bold text-4xl mt-5 text-amber-500">{formatearDinero(precio)}</p>


            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                onClick={() => {
                    handleChangeModal();
                    handleSetProducto(producto)
                }}
            >
                Agregar
            </button>

        </div>
    )
}

export default Producto
