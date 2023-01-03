import { useState , useEffect , createContext } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

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
    }, []);//Al menos se hace una vez

    useEffect(()=> {
        setCategoriaActual(categorias[0]);
    },[categorias]);

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter( cat => cat.id === id );
        setCategoriaActual(categoria[0]);
    }

    const handleSetProducto = producto => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }
    
    const handleAgregarPedido = ({categoriaId, imagen, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)){
            const pedidoActualizado = pedido.map(productoState =>
            productoState.id === producto.id ? producto : productoState);
            setPedido(pedidoActualizado);

            toast.success('Guardado Correctamente');
        }else{
            setPedido([...pedido,producto]);
            toast.success('Agregado al Pedido');
        }
        setModal(false);
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
                pedido
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )

}

export default QuioscoContext;