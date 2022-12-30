import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import { Layout } from "../layout/Layout";
import { useQuiosco } from '../hooks/useQuiosco';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
   
  const { categoriaActual } = useQuiosco();  

  return (
    <Layout pagina={`Menú ${categoriaActual}`}>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido
      </p>
    </Layout>
  );
}
