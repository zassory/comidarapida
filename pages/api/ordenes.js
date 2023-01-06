//Esto corre por lado del servidor

export default async function handler(req,res) {

    if(req.method === "POST"){
        res.json({metodo: "POST!!!"});
    }else {
        res.json({hola:"GET!!!"});
    }    
}