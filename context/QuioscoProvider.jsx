import { useState , useEffect , createContext } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext();

export const QuioscoProvider = ({children}) => {

    const [categorias,setCategorias] = useState([]);//Las categorias que llenan el sidebar
    const [categoriaActual,setCategoriaActual] = useState({});//las categoria seleccionada
    const [producto,setProducto] = useState({});//El producto seleccionado
    const [modal,setModal] = useState(false);//
    const [pedido,setPedido] = useState([]);//Porque podemos agregar multiples elementos
    const [nombre,setNombre] = useState('');
    const [total,setTotal] = useState(0);

    const router = useRouter();

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

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
        setTotal(nuevoTotal);
    },[pedido]);

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter( cat => cat.id === id );
        setCategoriaActual(categoria[0]);
        router.push('/');
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

    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);
    }

    const colocarOrden = async(e) => {
        e.preventDefault();

        console.log(pedido);
        console.log(nombre);
        console.log(total);
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
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )

}

export default QuioscoContext;