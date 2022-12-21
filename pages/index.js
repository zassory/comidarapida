import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import Layout from "../layout/Layout";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 

  return (
    <Layout>
      <h1>Inicio</h1>
    </Layout>
  )
}
