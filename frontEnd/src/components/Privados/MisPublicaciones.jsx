//frontEnd/src/components/Privados/MisPublicaciones.jsx

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";

export default function MisPublicaciones({ onAccion }) {
  const {
    misPublicaciones,
    cargarMisPublicaciones,
    editarPublicacion,
    borrarPublicacion
  } = useContext(UserContext);

  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    cargarMisPublicaciones();
  }, []);

  const startEdit = (post) => {
    setEditando(post.id);
    setForm(post);
  };

  const actualizar = async () => {
    await editarPublicacion(editando, form);
    onAccion("Publicación actualizada ✅");
    setEditando(null);
  };

  const eliminar = async (id) => {
    await borrarPublicacion(id);
    onAccion("Publicación eliminada ❌");
  };

  return (
    <section>
      <h2>Mis publicaciones</h2>

      {misPublicaciones.map((post) => (
        <article key={post.id} className="post-card">

          {editando === post.id ? (

            /* ✏️ MODO EDICIÓN */
            <div className="form-edit">

              <div className="form-group">
                <label>Título</label>
                <input
                  className="form-input"
                  value={form.titulo}
                  onChange={(e) =>
                    setForm({ ...form, titulo: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  className="form-textarea"
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Imagen URL</label>
                <input
                  className="form-input"
                  value={form.imagenurl}
                  onChange={(e) =>
                    setForm({ ...form, imagenurl: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Precio</label>
                <input
                  className="form-input"
                  type="number"
                  value={form.precio}
                  onChange={(e) =>
                    setForm({ ...form, precio: Number(e.target.value) })
                  }
                />
              </div>

              <button className="btn btn-save" onClick={actualizar}>
                Guardar cambios ✅
              </button>

            </div>

          ) : (

            /* 👁️ MODO NORMAL */
            <>
              <img src={post.imagenurl} alt={post.titulo} />
              <h4>{post.titulo}</h4>
              <p>${post.precio.toLocaleString("es-CL")}</p>

              <div className="post-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => startEdit(post)}
                >
                  ✏️ Editar
                </button>

                <button
                  className="btn btn-delete"
                  onClick={() => eliminar(post.id)}
                >
                  🗑 Eliminar
                </button>
              </div>
            </>

          )}

        </article>
      ))}
    </section>
  );
}
