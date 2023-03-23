import Layout from "../../layout/Layout"
import useKisko from "../../hooks/useKiosko"
import ResumenProducto from "../../components/ResumenProducto";


export default function Resumen() {

    const { pedido } = useKisko();


    return (
        <Layout pagina="Resumen">
            <h1 className="text-4xl font-black">Resumen</h1>
            {pedido.length === 0 ? (
                <p className="my-5 text-center text-2xl">Aún no hay Pedidos</p>
            ) : (
                <>
                    <p className="text-2xl my-10">Revisa tu Pedido</p>
                    <div>
                        {pedido.map(producto => (
                            <ResumenProducto
                                key={producto.id}
                                producto={producto}
                            />
                        ))}
                    </div>
                </>

            )}
        </Layout>
    )

}