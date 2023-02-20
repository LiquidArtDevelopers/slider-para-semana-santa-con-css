
//*********************************************************************************
//VARIABLES Y CONSTANTES QUE USAREMOS EN ESTE DOCUMENTO

const localidades = document.getElementById("localidades")
const gasolineras = document.getElementById("gasolineras")
const combustibles = document.getElementById("combustibles")


let jsonCombustible = "";
jsonCombustible = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/`;

//*********************************************************************************






//***********************************************************************************
//1) AL CARGAR LA PÁGINA LEEMOS EL JSON PARA COGER TODAS LAS LOCALIDADES Y PONERLAS EN UN SELECT
fetch(jsonCombustible)
.then(response =>{
    if(response.ok)
        return response.text()
    else
        throw new Error(response.status);
})
.then(data =>{
    const arrayLocalidades = [];
    //PARSEAMOS EL JSON EN UN OBJETO
    const oJs=JSON.parse(data); //parseamos el JSON a un Objeto. Será un objeto con 4 propiedades, una de ellas será un array con muchos items
    const ListaEESSPrecio = oJs.ListaEESSPrecio //Hacemso un array conla propiedad que es un array del objeto (gasolioneras)
    for(const i in ListaEESSPrecio){ //recorremos las gasolineras, donde i será la clave numérica de cada iteración
        if(arrayLocalidades.indexOf(ListaEESSPrecio[i].Localidad)==-1){//comprobamos que no exista la localidad en el valor de la iteración     
            arrayLocalidades.push(ListaEESSPrecio[i].Localidad) //metemos en un array sólo si no existe la localidad

        }
    }
    arrayLocalidades.sort()//ordenamos
    for(const localidad of arrayLocalidades){ //recorremos los items del array ya ordenado
        var option = document.createElement("option") //creamos un elemento html tipo option
        option.value=localidad //le damos valor al option
        option.text=localidad //le ponemos el texto al option
        localidades.add(option) //al input tipo select le añadimos un option más
    }
    
})
.catch(err =>{
    console.error("ERROR", err.message)        
});
//FIN DE COGER TODAS LAS LOCALIDADES Y PONERLAS EN UN SELECT
//*********************************************************************************






//*********************************************************************************
//2) EVENTO DE ESCUCHA PARA CUANDO HAYA UN CAMBIO EN LOCALIDADES (SÓLO CUANDO SE CAMBIE EL SELECT DE LOCALIDADES!)
localidades.addEventListener("change",function(){
    //LIMPIAMOS LAS OPCIONES DE GASOLINERAS Y COMBUSTIBLES
    removeOptions(gasolineras)
    removeOptions(combustibles)

    //CONSULTAMOS JSON TENIENDO EN CUENTA LA LOCALIDAD SELECCIONADA Y MOSTRAMOS LAS GASOLINERAS DE DICHA LOCALIDAD COMO OBCIONES
    fetch(jsonCombustible)
    .then(response =>{
        if(response.ok)
            return response.text()
        else
            throw new Error(response.status);
    })
    .then(data =>{
        const arrayGasolineras = [];
        //PARSEAMOS EL JSON EN UN OBJETO
        const oJs=JSON.parse(data); //parseamos el JSON a un Objeto. Será un objeto con 4 propiedades, una de ellas será un array con muchos items
        const ListaEESSPrecio = oJs.ListaEESSPrecio //Hacemso un array conla propiedad que es un array del objeto (gasolineras)
        for(const i in ListaEESSPrecio){ //recorremos las gasolineras, donde i será la clave numérica de cada iteración
            if(ListaEESSPrecio[i].Localidad==this.value){ //COMPROBAMOS SI EL ITEM DE LA ITERACIÓN SU LOCALIDAD ES LA QUE HEMOS ELEGIDO EN EL SELECT
                if(arrayGasolineras.indexOf(ListaEESSPrecio[i].Rótulo)==-1){//comprobamos que no exista la GASOLINERA en el valor de la iteración     
                    arrayGasolineras.push(ListaEESSPrecio[i].Rótulo) //metemos en un array sólo si no existe la GASOLINERA
                }
            }
        }
        arrayGasolineras.sort()//ordenamos
        for(const gasolinera of arrayGasolineras){
            var option = document.createElement("option") //creamos un elemento html tipo option
            option.value=gasolinera //le damos valor al option
            option.text=gasolinera //le ponemos el texto al option
            gasolineras.add(option) //al input tipo select le añadimos un option más
        }   
    })
    .catch(err =>{
        console.error("ERROR", err.message)        
    });
})
//*********************************************************************************




//*********************************************************************************
//2) EVENTO DE ESCUCHA PARA CUANDO HAYA UN CAMBIO EN GASOLINERAS (SÓLO CUANDO SE CAMBIE EL SELECT DE GASOLINERAS!)
gasolineras.addEventListener("change",function(){
    //LIMPIAMOS LAS OPCIONES DE COMBUSTIBLES
    removeOptions(combustibles)

    //CONSULTAMOS JSON TENIENDO EN CUENTA LA LOCALIDAD SELECCIONADA Y MOSTRAMOS LAS GASOLINERAS DE DICHA LOCALIDAD COMO OBCIONES
    fetch(jsonCombustible)
    .then(response =>{
        if(response.ok)
            return response.text()
        else
            throw new Error(response.status);
    })
    .then(data =>{
        //PARSEAMOS EL JSON EN UN OBJETO
        const oJs=JSON.parse(data); //parseamos el JSON a un Objeto. Será un objeto con 4 propiedades, una de ellas será un array con muchos items
        const ListaEESSPrecio = oJs.ListaEESSPrecio //Hacemso un array conla propiedad que es un array del objeto (ListaEESSPrecio)        
        for(const i in ListaEESSPrecio){ //recorremos los items de ListaEESSPrecio, donde i será la clave numérica de cada iteración
            if(ListaEESSPrecio[i].Rótulo==this.value && ListaEESSPrecio[i].Localidad==localidades.value){ //COMPROBAMOS SI EL ITEM DE LA ITERACIÓN SU LOCALIDAD ES LA QUE HEMOS ELEGIDO EN EL SELECT
                console.log("entra")
                console.log(ListaEESSPrecio[i].Precio_x0020_Gasolina_x0020_98_x0020_E10)
            }
        }     
    })
    .catch(err =>{
        console.error("ERROR", err.message)        
    });
})
//*********************************************************************************










//*********************************************************************************
//*********************************************************************************
//FUNCIÓN QUE USAREMOS PARA ELIMINAR LOS <OPTIONS> DE UN SELECT

function removeOptions(selectElement) {
    var i,
    L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}
