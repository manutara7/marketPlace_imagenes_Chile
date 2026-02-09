//src/components/Privados/Carrito.jsx

import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Carrito() {
  const { carrito, totalPrecio, removeCarrito } = useContext(UserContext);

  const handlePagar = () => {
    alert("💳 Redirigiendo a pago...\n(Módulo de pago próximamente)");
  };

  return (
    <section>
      <h2>🛒 Mi carrito</h2>

      {carrito.length === 0 && <p>Tu carrito está vacío.</p>}

      {carrito.length > 0 && (
        <>
          <div className="posts-grid">
            {carrito.map((c) => (
              <article key={c.id} className="post-card position-relative">

                {/* BOTÓN ELIMINAR */}
                <button
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                  onClick={() => removeCarrito(c.id)}
                >
                  ❌
                </button>

                <img src={c.imagenurl} alt={c.titulo} className="imgCarrito" />
                <h4>{c.titulo}</h4>
                <p>
                  ${c.precio ? c.precio.toLocaleString("es-CL") : "0"}
                </p>
              </article>
            ))}
          </div>

          {/* RESUMEN */}
          <div className="mt-4 p-3 border rounded shadow-sm bg-light text-end">
            <h4>
              Total:{" "}
              <span className="text-success">
                ${totalPrecio.toLocaleString("es-CL")}
              </span>
            </h4>

            <button
              className="btn btn-success mt-2 px-4"
              onClick={handlePagar}
            >
              💳 Pagar ahora
            </button>
          </div>
        </>
      )}
    </section>
  );
}



