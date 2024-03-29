import { useState, useEffect } from "react";
import Image from "next/image";
import useKisko from "../hooks/useKiosko";
import { formatearDinero } from "../helpers";


const ModalProducto = () => {

    const { producto, handleChangeModal, handleSetPedido, pedido } = useKisko();
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);



    useEffect(() => {
        //Comprobamos si el Modal Actual está en el pedido
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {

            const cantidadEdicion = pedido.find(pedidoState => pedidoState.id === producto.id);
            setEdicion(true);
            setCantidad(cantidadEdicion.cantidad);
        }
    }, [producto, pedido])

    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <Image
                    width={300}
                    height={100}
                    alt={`imagen producto ${producto.nombre}`}
                    src={`/assets/img/${producto.imagen}.jpg`}
                />
            </div>

            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={() => handleChangeModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                        </svg>

                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
                <p className="mt-5 font-black text-5xl text-amber-500">
                    {formatearDinero(producto.precio)}
                </p>

                <div className="flex gap-4 mt-5">
                    <button
                        type="button"
                        onClick={() => cantidad != 1 ? setCantidad(cantidad - 1) : ""}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>


                    </button>

                    <p>{cantidad}</p>

                    <button
                        type="button"
                        onClick={() => setCantidad(cantidad + 1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </button>
                </div>

                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold rounded uppercase"
                    onClick={() => { handleSetPedido({ ...producto, cantidad }) }}
                >{edicion ? "Guardar Cambios" : "Agregar Pedido"}</button>

            </div>
        </div>
    )
}

export default ModalProducto
