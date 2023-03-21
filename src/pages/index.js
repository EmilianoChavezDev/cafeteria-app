import Layout from "../../layout/Layout"
import useKisko from "../../hooks/useKiosko"

export default function Home() {

  const { categoriaActual, categorias } = useKisko();

  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black text-center">{categoriaActual?.nombre}</h1>
      <div>
        {categorias.map((cat) => (
          <p>{cat.id}</p>
        ))}
      </div>
    </Layout>
  )
}
