import { Result } from 'postcss';
import React, {useState,useEffect,useContext} from 'react'; 
import {Link} from 'react-router-dom'
import {FirebaseContext} from '../../firebase'

import Platillo from '../ui/Platillo';

const Menu = () => {

    const [platillos, guardarPlatillos] = useState([])
 
    const {firebase} = useContext(FirebaseContext)

    //consultar bd al cargar
    useEffect(()=>{
        const obtenerPlatillos= async ()=>{
            const resutlado = await firebase.db.collection('productos').onSnapshot(manejarSnapshot)
        }
        obtenerPlatillos()
    },[])

    //snapshot nos permite usar la bd en tiempo real de firebase
    function manejarSnapshot(snapshot){
        const platillos = snapshot.docs.map(doc => {

            return{
                id: doc.id,
                ...doc.data()
            }
        });
        //almacenar platillos en el state
        guardarPlatillos(platillos)
    }

    return ( 
        <>
            <h1 className='text-3xl font-light mb-5 mt-5 ml-4'>Esto es Menu!</h1>
            <Link to="/nuevo-platillo" className="ml-3 bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">Agregar Nuevo Platillo</Link>

            {platillos.map( platillo => (
                <Platillo
                key={platillo.id}
                platillo={platillo}
                />
            ) )}
        </>
     );
}
 
export default Menu;