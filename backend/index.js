const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

//database connection
const db = mysql.createConnection({
  host:"localhost",
  user: "root",
  password: "123456",
  database:"prueba_tecnica"
})
//create a new employee
app.post("/create",(req,res)=>{
  const nombre = req.body.nombre
  const edad = req.body.edad
  const pais = req.body.pais
  const exp = req.body.exp
  const cargo = req.body.cargo
  

  db.query('INSERT INTO empleado (nombre,edad,pais,cargo,experiencia) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,exp],
    (err,result) =>{
      if(err){
        console.log(err)
      }else{
        res.send('empleado registrado')
      }
    }
  )
})
//show all employees
app.get("/empleados",(req,res)=>{
   

  db.query('SELECT * FROM empleado ',
    (err,result) =>{
      if(err){
        console.log(err)
      }else{
        res.send(result)
      }
    }
  )
})
// Edit an employee
app.put("/update", (req, res) => {
  const { id, nombre, edad, pais, exp, cargo } = req.body;

  // Asegurarse de que los valores no sean undefined o null
  if (!id || !nombre || !edad || !pais || !exp || !cargo) {
    return res.status(400).send("Faltan datos en la solicitud");
  }

  db.query(
    'UPDATE empleado SET nombre=?, edad=?, pais=?, cargo=?, experiencia=? WHERE id=?',
    [nombre, edad, pais, cargo, exp, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar el empleado");
      }
      res.status(200).send("Empleado actualizado con éxito");
    }
  );
});
//delete an employee
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send("ID del empleado no proporcionado");
  }

  db.query('DELETE FROM empleado WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al eliminar el empleado");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Empleado no encontrado");
    }

    res.status(200).send("Empleado eliminado con éxito");
  });
});

app.listen(3001,()=>{
  console.log("corriendo en el puerto 3001")
})