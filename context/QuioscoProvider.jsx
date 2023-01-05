import { useState , useEffect , createContext } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const QuioscoContext = createContext();

export const QuioscoProvider = ({children}) => {

    const [categorias,setCategorias] = useState([]);//Las categorias que llenan el sidebar
    const [categoriaActual,setCategoriaActual] = useState({});//las categoria seleccionada
    const [producto,setProducto] = useState({});//El producto seleccionado
    const [modal,setModal] = useState(false);//
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
    
    const handleAgregarPedido = ({categoriaId , ...producto}) => {
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

    // const handleChangePaso = ( paso ) => {
    //     setPaso(paso);
    // }

    const handleEditarCantidades = (id) => {
        //1.primero vamos a encontrar el pedido a actualizar
        //El pedido es un conjunto de productos
        const productoActualizar = pedido.filter(producto => producto.id === id);
        console.log('----------',productoActualizar);
        //el producto seleccionado
        setProducto(productoActualizar[0]);
        setModal(!modal);
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
                pedido,
                //paso,
                //handleChangePaso,
                handleEditarCantidades,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )

}

export default QuioscoContext;