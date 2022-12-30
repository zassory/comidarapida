import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import { Layout } from "../layout/Layout";
import { Producto } from "../components/Producto";
import { useQuiosco } from '../hooks/useQuiosco';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
   
  const { categoriaActual } = useQuiosco();
  console.log(categoriaActual);

  return (
    <Layout pagina={`Menú ${categoriaActual}`}>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido
      </p>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>

    </Layout>
  );
}
