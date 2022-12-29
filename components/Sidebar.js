import Image from "next/image";
import { Categoria } from "./Categoria";
import { useQuiosco } from "../hooks/useQuiosco";

export const Sidebar = () => {

  const { categorias } = useQuiosco();

  return (
    <>
        <Image 
            width={300}
            height={100}
            src="/assets/img/logo.svg"
            alt="imagen logotipo"
        />

        <nav className="mt-10">
            {categorias.map(categoria => (
                <Categoria
                    key={categoria.id}
                    categoria={categoria}
                >{categoria.nombre}</Categoria>
            ))}
        </nav>
    </>
  )
}
