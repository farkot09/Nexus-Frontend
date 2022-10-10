import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { obtenerLogsPorTipo } from "../utils/Logs";

import React from 'react'

function Header(props) {
    const [logs, setLogs] = useState([]);
    const [nuevasNotificaciones, setNuevasNotificaciones] = useState(0);
    const [viejasNotificaciones, setViejasNotificaciones] = useState(0);
   
    useEffect(()=>{
        setViejasNotificaciones(localStorage.getItem("viejas_notificaciones"))
        obtenerLogsPorTipo("Asignacion").then(data =>{
            localStorage.setItem("nuevas_notificaciones",data.length)
            setNuevasNotificaciones(data.length)
            setLogs(data)
        })        
    },[])
/*
    setInterval(() => {
        setViejasNotificaciones(localStorage.getItem("viejas_notificaciones"))
        obtenerLogs().then(data =>{
            localStorage.setItem("nuevas_notificaciones",data.length)
            setNuevasNotificaciones(data.length)
            setLogs(data)
        }) 
    }, 120000);
*/
   
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top border-bottom">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {/* <li className="nav-item"><a data-bs-toggle="modal" data-bs-target="#add-lead-modal"  className="nav-link highlighted-text" href="#!">Add lead</a></li> */}
              <li className="nav-item dropdown notifications">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="s"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Button variant="outline-primary">
                   <span>Viktor Grajales</span> <i className="fa fa-user"></i>
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => {
                      localStorage.setItem(
                        "viejas_notificaciones",
                        nuevasNotificaciones
                      );
                      setViejasNotificaciones(nuevasNotificaciones);
                    }}
                  >
                    <i className="fa fa-bell"></i>
                    {nuevasNotificaciones > viejasNotificaciones ? (
                      <Badge bg="danger">
                        {nuevasNotificaciones - viejasNotificaciones}
                      </Badge>
                    ) : (
                      <Badge bg="danger">{}</Badge>
                    )}
                  </Button>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  {logs.slice(0, 10).map((item) => (
                    <a className="dropdown-item" href="#!">
                      {item.tipo} {item.fecha}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
    }




export default Header;
