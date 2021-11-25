import { React, Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import ListadoRestaurantes from "./ListadoRestaurantes";

const Styles = styled.div`
  .form {
    padding-top: 35px;
  }
  .text-center {
    position: relative;
  }

  .form-floating {
    margin-bottom: 15px;
  }

  button {
    color: white;
    background-color: #e87121;
    border: none;
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(232, 113, 33, 0.25);
      background-color: #e87121;
    }
    &:hover {
      background-color: #da6416;
    }
    &:active {
      background-color: #e87121;
    }
  }

  input {
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(232, 113, 33, 0.25);
    }
  }

  .form-check-input {
    &:hover {
      border-color: #2080ff;
      box-shadow: 0 0 0 0.25rem rgba(232, 113, 33, 0.25);
    }
  }
`;

export default function BuscarRestaurantesAbiertos() {
  const [values, setValues] = useState({
    categoria: "",
    nombre: "",
    calificacion: false,
  });

  let categoria = [
    { nombre: "(Cualquiera)", value: "" },
    { nombre: "Pizzas", value: "PIZZAS" },
    { nombre: "Hamburguesas", value: "HAMBURGUESAS" },
    { nombre: "Bebidas", value: "BEBIDAS" },
    { nombre: "Combos", value: "COMBOS" },
    { nombre: "Minutas", value: "MINUTAS" },
    { nombre: "Postres", value: "POSTRES" },
    { nombre: "Pastas", value: "PASTAS" },
    { nombre: "Comida Arabe", value: "COMIDAARABE" },
    { nombre: "Sushi", value: "SUSHI" },
    { nombre: "Otros", value: "OTROS" },
  ];

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("restaurantes-categoria", values.categoria);
    sessionStorage.setItem("restaurantes-nombre", values.nombre);
    sessionStorage.setItem("restaurantes-calificacion", values.calificacion);
    window.location.reload();
  };

  return (
    <Styles>
      <Fragment>
        <div className="container-lg">
          <main className="form">
            <form id="inputs" onSubmit={handleSubmit}>
              <div className="row align-items-center">
                <div className="col-lg">
                  <div className="form-floating">
                    <input
                      name="nombre"
                      className="form-control"
                      onChange={handleChange}
                      id="nombre"
                      value={values.nombre}
                    ></input>
                    <label htmlFor="nombre">Nombre</label>
                  </div>
                </div>
                <div className="col-lg">
                  <div className="form-floating">
                    <select
                      name="categoria"
                      className="form-select"
                      onChange={handleChange}
                      id="categoria"
                    >
                      {categoria.map((item) => (
                        <option key={item.nombre} value={item.value}>
                          {item.nombre}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="categoria">Categoría</label>
                  </div>
                </div>
                <div className="col-lg">
                  <div className="form-floating">
                    <div className="checkbox">
                      <label>
                        <input
                          name="calificacion"
                          className="form-check-input"
                          type="checkbox"
                          checked={values.calificacion}
                          onChange={handleChange}
                          id="calificacion"
                        />{" "}
                        Ordenar por Calificación
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-100 btn btn-md btn-primary" type="submit">
                Buscar
              </button>
            </form>
            <div className="form-floating">
              {/*Espacio para alguna otra cosa?¿?*/}
            </div>

            <div className="form-floating">
              <div className="row align-items-center">
                <div className="col-md">{<ListadoRestaurantes />}</div>
              </div>
            </div>
          </main>
        </div>
      </Fragment>
    </Styles>
  );
}
