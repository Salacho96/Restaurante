import React, {useContext, useRef} from 'react'
import {FirebaseContext} from '../../firebase'

const Platillo = ({platillo}) => {

    const {id, nombre, imagen, existencia, categoria, precio,   descripcion} = platillo;

    //existencia ref para acceder al valor directamente

    const existenciaRef = useRef(platillo.existencia)

    //context de firebase para cambios en la bd
    const {firebase} = useContext(FirebaseContext)
    

    //modificar estado del platillo en firebase
    const actualizarDisponibilidad =()=>{
        const existencia = (existenciaRef.current.value==="true")//cambiar string a boleano!!!-> importante
        try {
            firebase.db.collection('productos').doc(id).update({existencia})
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full px-3 mb-4'>
        <div className='p-5 shadow-md bg-white'>
            <div className='lg:flex'>
                <div className='lg:w-5/12 xl:3/12'>

                    <img src={imagen} alt="Imagen Platillo"/>

                    <div className='pl-6 sm:flex sm:-mx-2'>
                        <label className='block mt-5 sm:w-2/4'>
                            <span className='block text-gray-800 mb-2'>
                                Existencia
                            </span>

                            <select className='bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                                    value={existencia}
                                    ref={existenciaRef}
                                    onChange={ ()=> actualizarDisponibilidad()}
                                    >
                                <option value="true">Disponible</option>
                                <option value="false">No Disponible</option>
                            </select>
                            
                        </label>
                    </div>

                </div>
                <div className='lg:w-7/12 xl:9/12 pl-5'>
                    <p className='font-bold text-2xl text-yellow-600 mb-4'>{nombre}</p>
                    <p className='text-grey-600 mb-4'>Categoria: {' '}
                        <span className="text-grey-700 font-bold">
                            {categoria}
                        </span>
                    </p>
                    <p className='text-grey-600 mb-4'>
                        {descripcion}
                    </p>
                    <p className='text-grey-600 mb-4'>Precio: {' '}  
                        <span className="text-grey-700 font-bold">
                            ${precio}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Platillo