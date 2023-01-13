import AdminLayout from "../layout/AdminLayout";

export default function Admin() {
    
    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className="text-4xl font-black">Panel de Administración</h1>
            <p className="text-2xl my-10">Administra las ordenes</p>
        </AdminLayout>
    )
}