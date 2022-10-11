import React from "react";
import adminLayout from "../hoc/adminLayout"
import {useParams} from "react-router-dom";

function Asignaciones(props) {
    const {idAsignacion} = useParams()
  return (
    <div>
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
            </tbody>
            </table>
            </div>
        
        {idAsignacion}
    </div>
  )
}

export default adminLayout(Asignaciones);