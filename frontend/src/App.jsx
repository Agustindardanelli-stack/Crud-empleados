import { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [id, setId] = useState(null); // To manage the ID of the selected employee
  const [nombre, setnombre] = useState("")
  const [edad, setedad] = useState(0)
  const [pais, setpais] = useState("")
  const [cargo, setcargo] = useState("")
  const [exp, setexp] = useState("")
  const [editar, setEditar] = useState(false)
  
  const [empleadosList, setEmpleados] = useState([])
   //Set the form fields with the selected employee data for editing
  const editarEmpleado = (val) => {
    setEditar(true)
    setId(val.ID)  
    setnombre(val.nombre)
    setedad(val.edad)
    setcargo(val.cargo)
    setpais(val.pais)
    setexp(val.experiencia)
  }
  // Add a new employee
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      exp: exp,
    }).then(() => {
      getEmpleados()
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Empleado registrado con éxito',
      });
      limpiarFormulario(); 
    }).catch((error) => {
      console.error("Error al registrar el empleado:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el empleado',
      });
    });
  }
  // Update an existing employee
  const update = () => {
    if (id !== null) { // Check if ID is available
      Axios.put("http://localhost:3001/update", {
        id: id, 
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        exp: exp,
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Empleado actualizado ',
        });
        getEmpleados() // Refresh the list after updating
        limpiarFormulario(); // Clear the form
        setEditar(false); // Exit edit mode
      }).catch((error) => {
        console.error("Error al actualizar el empleado:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el empleado',
        });
      });
    }
  }
  // Delete an employee with confirmation
  const deleteEmpleado = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podras recuperar este empleado después de eliminarlo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Empleado eliminado con éxito',
            });
            getEmpleados(); // Update the list after deletion
          })
          .catch((error) => {
            console.error("Error al eliminar el empleado:", error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el empleado',
            });
          });
      }
    });
  }
   // Clear the form fields
  const limpiarFormulario = () => {
    setId(null)
    setnombre("")
    setedad(0)
    setpais("")
    setcargo("")
    setexp(0)
  }
  // Fetch the list of employees from the server
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data)
    })
  }

  useEffect(() => {
    getEmpleados()
  }, [])

  return (
    <>
      <div className='container'>
        <div className="card">
          <div className="card-header">Empleados</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre:</span>
              <input type="text"
                onChange={(event) => setnombre(event.target.value)}
                className="form-control"
                value={nombre}
                placeholder="Ingrese un nombre"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Edad:</span>
              <input type="number"
                onChange={(event) => setedad(event.target.value)}
                className="form-control"
                value={edad}
                placeholder="Ingrese la edad"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Cargo:</span>
              <input type="text"
                onChange={(event) => setcargo(event.target.value)}
                className="form-control"
                value={cargo}
                placeholder="Ingrese el cargo"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">País:</span>
              <input type="text"
                onChange={(event) => setpais(event.target.value)}
                className="form-control"
                value={pais}
                placeholder="Ingrese el país"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Experiencia:</span>
              <input type="number"
                onChange={(event) => setexp(event.target.value)}
                className="form-control"
                value={exp}
                placeholder="Ingrese la experiencia"
              />
            </div>
            <footer className="blockquote-footer">
              {
                editar === true ?
                  <div>
                    <button className='btn btn-warning text-center' onClick={update}>Actualizar</button>
                    <button className='btn btn-info text-center' onClick={limpiarFormulario}>Cancelar</button>
                  </div>
                  :
                  <button className='btn btn-success text-center' onClick={add}>Registrar</button>
              }
            </footer>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">País</th>
              <th scope="col">Cargo</th>
              <th scope="col">Experiencia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              empleadosList.map((val, key) => {
                return (
                  <tr key={val.ID}>
                    <th>{val.ID}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.pais}</td>
                    <td>{val.cargo}</td>
                    <td>{val.experiencia}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                          onClick={() => editarEmpleado(val)}
                          type="button" className="btn btn-info">Editar</button>
                        <button
                          onClick={() => deleteEmpleado(val.ID)}
                          type="button" className="btn btn-danger">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
