import { useState , useEffect , createContext } from 'react';
import axios from "axios";

const QuioscoContext = createContext();

export const QuioscoProvider = ({children}) => {

    const [categorias,setCategorias] = useState([]);
    const [categoriaActual,setCategoriaActual] = useState({});
    const [producto,setProducto] = useState({});
    const [modal,setModal] = useState(false);
    const [pedido,setPedido] = useState([]);//Porque podemos agregar multiples elementos

    const obtenerCategorias = async() => {
        const { data } = await axios('/api/categorias');
        setCategorias(data);
    }
    useEffect(()=> {
        obtenerCategorias();
    }, []);

    useEffect(()=> {
        setCategoriaActual(categorias[0]);
    },[categorias]);

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id );
        setCategoriaActual(categoria[0]);
    }

    const handleSetProducto = producto => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }

    //Lo que hago es obtener una copia de producto
    //Saca categoriaId e imagen y va a aplicar desestructuring y
    //Tomar una copa de un objeto nuevo sin edad propiedades del objeto
    const handleAgregarPedido = ({categoriaId, imagen, ...producto}) => {
        setPedido([...pedido,producto]);//tomamos una copia de lo que hay en pedido
        //Y despues le agregamos el producto
        //Para que lo vaya agregando al final del arreglo
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )

}

export default QuioscoContext;