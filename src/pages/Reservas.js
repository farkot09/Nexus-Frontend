import React, { useEffect, useState } from "react";
import { Button,Badge } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { obtenerReservas } from "../utils/Reservas";
import {obtenerAsignaciones} from "../utils/Asignaciones"

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [reservaDetalle, setReservaDetalle] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  
  useEffect(() => {
    obtenerReservas().then((data) => {
      setReservas(data);
    });
  }, []);

  return (
    <div className="d-flex text-muted">
      <table className="table mt-4">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>No. de BL/SWB</th>
            <th>Destino</th>
            <th>Vessel</th>
            <th>Fecha de Cierre</th>
            <th>Clientes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mostrarDetalles
            ? reservaDetalle.map((item) => (                    
                  <tr>
                    <td>
                      {" "}
                      <Button
                        onClick={() => {
                          setMostrarDetalles(!mostrarDetalles);
                        }}
                        variant="warning"
                      >
                        <i
                          className="fa fa-window-close"
                          aria-hidden="true"
                        ></i>
                      </Button>{" "}
                    </td>
                    <td>{item.numero_reserva}</td>
                    <td>{item.destino}</td>
                    <td>{item.vassel}</td>
                    <td>{new Date(item.fecha_cierre).toLocaleDateString()}</td>
                    <td>
                      <Button variant="success">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </Button>{" "}
                    </td>
                    <td>
                      <div className="dropdown table-action-dropdown">
                        <button
                          className="btn btn-secondary btn-sm dropdown-toggle"
                          type="button"
                          id="dropdownMenuButtonSM"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i
                            className="fa fa-ellipsis-v"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButtonSM"
                        >
                          <li>
                            <a className="dropdown-item" href="s">
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                              &nbsp;Edit
                            </a>
                          </li>
                          <div className="dropdown-divider"></div>
                          <li>
                            <a className="dropdown-item text-danger" href="s">
                              <i className="fa fa-trash" aria-hidden="true"></i>
                              &nbsp;Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
            : reservas.map((item) => (
                <tr>
                  <td>
                    {" "}
                    <Button
                      onClick={() => {
                        obtenerAsignaciones().then(data =>{
                            setAsignaciones(data.filter(a=>a.id_reserva[0] === item.id))
                            setReservaDetalle(reservas.filter(r=>r.id === item.id))                            
                            setMostrarDetalles(!mostrarDetalles);
                        }).catch(err =>{
                            alert("Error al obtener los detalles", err)
                        })
                      }}
                      variant="info"
                    >
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Button>{" "}
                  </td>
                  <td>{item.numero_reserva}</td>
                  <td>{item.destino}</td>
                  <td>{item.vassel}</td>
                  <td>{new Date(item.fecha_cierre).toLocaleDateString()}</td>
                  <td>
                    <Button variant="success">
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </Button>{" "}
                  </td>
                  <td>
                    <div className="dropdown table-action-dropdown">
                      <button
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButtonSM"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButtonSM"
                      >
                        <li>
                          <a className="dropdown-item" href="s">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            &nbsp;Edit
                          </a>
                        </li>
                        <div className="dropdown-divider"></div>
                        <li>
                          <a className="dropdown-item text-danger" href="s">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            &nbsp;Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
              

          <tr>
            <td>
              <div className="dropdown-divider"></div>
            </td>
            <td>
              <div className="dropdown-divider"></div>
            </td>
            <td>
              <div className="dropdown-divider"></div>
            </td>
            <td>
              <div className="dropdown-divider"></div>
            </td>
            <td>
              <div className="dropdown-divider"></div>
            </td>
            <td>
              <div className="dropdown-divider"></div>
            </td>
          </tr>

          {
                mostrarDetalles ?
                <tr>
                <td>#</td>
                <td>Cliente</td>
                <td>Peso</td>
                <td>Cantidad</td>
                <td>Cubicaje</td>
                <td></td>
                </tr>                
                 :                 
                 ""
              }
              
              {
                mostrarDetalles ?                     
                 asignaciones.map((item, index) =>(
                    
                    <tr>
                    <td>{index+1}</td>
                    <td>{item.id_cliente[0].razon_social}</td>
                    <td>{item.peso } Kilos</td>
                    <td>{item.cantidad} {item.tipo_empaque}</td>
                    <td>{item.cubicaje} CBM</td>
                    <td>
                    <Badge bg="info"><i className="fa fa-folder-open" aria-hidden="true"></i></Badge>{' '}
                    
                      
                         </td>
                    </tr>
                    
                  ))
                  
                  :
                  ""
              }
                             
        </tbody>
      </table>
    </div>
  );
}

export default adminLayout(Reservas);
