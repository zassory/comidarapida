import { Layout } from "../layout/Layout";
import { useQuiosco } from "../hooks/useQuiosco";

export default function Total() {    
    return (
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>
        </Layout>
    )
}
