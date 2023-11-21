import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function EditarTrabajo({id}){
    const [detalleTrabajo, setDetalle] = useState("");
    const [fechaTrabajo, setFechaTrabajo] = useState("");
    const [proxMantencion, setProxMantencion] = useState("");
    const [requiereNotificacion, setNotificacion] = useState(false);
    const [manoObra, setManoObra] = useState("");
    const [idVehiculo, setIdVehiculo] = useState("");
    const [patenteVehiculo, setPatenteVehiculo] = useState("");
    const [idPerfil, setIdPerfil] = useState("");
    const [idEstadoTrabajo, setIdEstadoTrabajo] = useState("");
    const [vehiculosList, setVehiculos] = useState([]);
    const [estadosList,setEstados] = useState([]);
    const [observacionesTrabajo, setObservaciones] = useState("");
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(true);


    useEffect(() => {
        listarVehiculos();
        listarEstados();
        getDatosTrabajo();
        return () =>{
        }
    }, []);
/* Obtengo los datos de un trabajo */
const getDatosTrabajo = async () => {
    await Axios.get("http://localhost:8010/api/trabajos/" + id,{headers:{'Content-Type':'application/json','Authorization': token}})
    .then((response) => {
        setDetalle(response.data.detalleTrabajo)
        setFechaTrabajo(response.data.fechaTrabajoFormato)
        setProxMantencion(response.data.fechaProxMantencionFormato)
        setNotificacion(response.data.requiereNotificacion)
        setManoObra(response.data.costoManoObra)
        setIdVehiculo(response.data.idVehiculo)
        setPatenteVehiculo(response.data.patenteVehiculo)
        setObservaciones(response.data.observacionTrabajo)
        setIdEstadoTrabajo(response.data.idEstadoTrabajo)
    })
    .catch((error) => {
        console.error("Atención: Hubo un problema al recuperar los datos del cliente.")
    });
};
/*  Obtengo un listado de los Vehiculos con sus respectivas patentes */
const listarVehiculos = async() =>{
    await Axios.get("http://localhost:8010/api/vehiculos/general/",{headers: {'Authorization': token,},})
    .then((response) => {setVehiculos(response.data);})
    .catch((error) => {console.error("Hubo un error al obtener la lista de de vehiculos:", error.response);});
};
/*  Obtengo un listado de los estados por los que puede pasar un trabajo */
const listarEstados = async() =>{
    await Axios.get("http://localhost:8010/api/estadoTrabajos",{headers: {'Authorization': token,},})
    .then((response) => {setEstados(response.data);})
    .catch((error) => {console.error("Hubo un error al obtener la lista de de Estados:", error.response);});
};
/* Busco el id. del vehiculo en base a la patente */
const buscarVehiculo = (nroPatente) =>{
    Axios.get("http://localhost:8010/api/vehiculos/general/" + nroPatente,{headers: {'Authorization': token,},})
    .then((response) => {
        setIdVehiculo(response.data.idVehiculo)
        console.log(response.data.idVehiculo)
    })
    .catch((error) => {console.error("Hubo un error al obtener los datos del vehiculo:", error.response);});
};
/* Obtengo los datos del Trabajo */
/* REgistro el trabajo */
    const editarTrabajo = async() => {
        const datosTrabajo = {
            descripcionTrabajo: detalleTrabajo,
            fechaTrabajo: fechaTrabajo,
            proximaMantencion: proxMantencion,
            requiereNotificacion: requiereNotificacion,
            costoManoObra: manoObra,
            idVehiculo: idVehiculo,
            idEstadoTrabajo: idEstadoTrabajo,
            idPerfil: 27,
            observacionTrabajo: observacionesTrabajo,
        }
        await Axios.put("http://localhost:8010/api/trabajos/" + id,datosTrabajo,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then(() => {
            setShow(false);
            Swal.fire({title: "<strong>Atención</strong>",
                html:"<i>El Trabajo fue actualizado con éxito!!</i>",
                icon: "success",
                timer: 3000,
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "<strong>Error</strong>",
                html: "<i>Atención: Hubo un problema al actualizar el Trabajo</i>",
                icon: "error",
                timer: 3000,
            });
            console.error("Hubo un error al registrar:", error.response);
        });
    };
    return(
    <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-wrench'></span>&nbsp;Editar Trabajo</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-book"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="detalle" name="detalle" type="text" placeholder="Descripción Trabajo" className="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setDetalle(event.target.value);}} required value={detalleTrabajo}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-calendar"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="fechaTrabajo" name="fechaTrabajo" type="date" placeholder="Fecha Trabajo" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setFechaTrabajo(event.target.value);}} required value={fechaTrabajo}/>
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <span className="textosNormal"><small>Fecha Trabajo</small></span>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-calendar"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="proxMantencion" name="proxMantencion" type="date" placeholder="Fecha Trabajo" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setProxMantencion(event.target.value);}} required value={proxMantencion}/>
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <span className="textosNormal"><small>Prox. Mantención</small></span>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-envelope"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input type="checkbox" name="requiereNotificacion" id="requiereNotificacion" value={true} className="textosNormal" 
                            onChange={(event) => {setNotificacion(event.target.value);}}
                            checked={requiereNotificacion ? 'checked' : ''} />
                            <span className="textosNormal"><small>Req. Notificación</small></span>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-car"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="patente" name="patente" type="text" placeholder="Patente" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {buscarVehiculo(event.target.value);}} maxLength={6} list="patentes" value={patenteVehiculo}/>
                            <datalist id="patentes">
                                {vehiculosList.map((val) => {
                                    return (
                                        <option value={val.nroPatente} key={val.nroPatente}>{val.nroPatente}</option>
                                    );
                                })}
                            </datalist>
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <span className="textosNormal"><small>Ej.: GKSB78</small></span>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-money"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="manoObra" name="manoObra" type="number" placeholder="Costo Mano Obra" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setManoObra(event.target.value);}} maxLength={6} value={manoObra}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-pencil-square"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <textarea placeholder="Observaciones" className="textosCajasArea textosNormal text-uppercase" maxLength={250}
                            onChange={(event) => {setObservaciones(event.target.value);}} value={observacionesTrabajo}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-wrench"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <select className="textosSelect textosNormal" onChange={(event) => {setIdEstadoTrabajo(event.target.value);}}
                                    aria-label="Dropdown" aria-describedby="select-addon1">
                                    <option value="">--SELECCIONE--</option>
                                    {estadosList.map((val) => {
                                        return (
                                            <option value={val.idEstadoTrabajo} key={val.idEstadoTrabajo} 
                                            selected={val.idEstadoTrabajo === idEstadoTrabajo ? 'selected' : ''}>{val.estadoTrabajo}</option>
                                        );
                                    })}
                                </select>    
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center">
                            <button type="submit" className="btn-agregar" onClick={editarTrabajo}><span className="fa fa-refresh"></span>&nbsp;Actualizar</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditarTrabajo