//src/components/Privados/MisPublicaciones.jsx

import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function MisPublicaciones({ onAccion }) {
  const { addFavorito, addCarrito } = useContext(UserContext);

  const post = {
    id: 1,
    title: "Laptop Gamer",
    price: 800000,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  };

  return (
    <section>
      <h2>Mis publicaciones</h2>

      <article className="post-card">
        <img src={post.img} />
        <h4>{post.title}</h4>
        <p>${post.price.toLocaleString("es-CL")}</p>

        <div className="post-actions">
          <button
            onClick={() => {
              addFavorito(post);
              onAccion("Agregado a favoritos ❤️");
            }}
          >
            ❤️ Favorito
          </button>

          <button
            onClick={() => {
              addCarrito(post);
              onAccion("Agregado al carrito 🛒");
            }}
          >
            🛒 Carrito
          </button>
        </div>
      </article>
    </section>
  );
}


// export default function MisPublicaciones() {
//   return (
//     <section>
//       <h2>Mis publicaciones</h2>

//       <div className="posts-grid">
//         <article className="post-card">
//           <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" />
//           <h4>Laptop Gamer</h4>
//           <p>$800.000</p>
//         </article>
//       </div>
//     </section>
//   );
// }
