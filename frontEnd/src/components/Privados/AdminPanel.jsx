// //frontEnd/src/components/Privados/AdminPanel.jsx

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function AdminPanel() {
  const { user, cargarPublicaciones } = useContext(UserContext);

  const [usuarios, setUsuarios] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [logs, setLogs] = useState([]);
  const [editando, setEditando] = useState(null);

  const token = localStorage.getItem("token");

  if (user?.role !== "admin") {
    return <h3 className="text-center mt-5">⛔ Acceso restringido</h3>;
  }

  /* ------------------ LOGS ------------------ */

  const agregarLog = (texto) => {
    setLogs((prev) => [
      { id: Date.now(), texto, fecha: new Date().toLocaleString() },
      ...prev
    ]);
  };

  /* ------------------ CARGAS ------------------ */

  const cargarUsuarios = async () => {
    const res = await fetch("http://localhost:3000/usuarios", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setUsuarios(Array.isArray(data) ? data : []);
  };

  const cargarTodasPublicaciones = async () => {
    const res = await fetch("http://localhost:3000/publicaciones");
    const data = await res.json();
    setPublicaciones(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    cargarUsuarios();
    cargarTodasPublicaciones();
  }, []);

  /* ------------------ USUARIOS ------------------ */

  const eliminarUsuario = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;

    await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    agregarLog(`🗑 Usuario eliminado ID ${id}`);
    cargarUsuarios();
  };

  const banearUsuario = async (u) => {
    await fetch(`http://localhost:3000/usuarios/${u.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...u, banned: !u.banned })
    });

    agregarLog(`🚫 Usuario ${u.email} ${u.banned ? "desbaneado" : "baneado"}`);
    cargarUsuarios();
  };

  const guardarEdicion = async () => {
    await fetch(`http://localhost:3000/usuarios/${editando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editando)
    });

    agregarLog(`✏️ Usuario editado ID ${editando.id}`);
    setEditando(null);
    cargarUsuarios();
  };

  /* ------------------ PUBLICACIONES ------------------ */

  const eliminarPublicacion = async (id) => {
    if (!confirm("¿Eliminar publicación?")) return;

    await fetch(`http://localhost:3000/publicaciones/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    agregarLog(`🗑 Publicación eliminada ID ${id}`);
    cargarTodasPublicaciones();
    cargarPublicaciones();
  };
  const ocultarPublicacion = async (p) => {
  const actualizado = { ...p, hidden: !p.hidden };

  // 👇 cambia estado inmediato en React
  setPublicaciones(prev =>
    prev.map(x => x.id === p.id ? actualizado : x)
  );

  agregarLog(`👁 Publicación ${p.id} ${p.hidden ? "visible" : "oculta"}`);

  // 👇 luego sincroniza backend
  await fetch(`http://localhost:3000/publicaciones/${p.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(actualizado)
  });
};

  /* ------------------ STATS ------------------ */

  const stats = {
    totalUsuarios: usuarios.length,
    baneados: usuarios.filter((u) => u.banned).length,
    totalPublicaciones: publicaciones.length,
    ocultas: publicaciones.filter((p) => p.hidden).length
  };

  /* ------------------ UI ------------------ */

  return (
    <section className="container mt-4">

      <h2 className="text-center mb-4">🛠 Admin Dashboard</h2>

      {/* STATS */}
      <div className="row text-center mb-4">
        <div className="col badge bg-dark p-3">👥 {stats.totalUsuarios} usuarios</div>
        <div className="col badge bg-danger p-3">🚫 {stats.baneados} baneados</div>
        <div className="col badge bg-primary p-3">🖼 {stats.totalPublicaciones} posts</div>
        <div className="col badge bg-secondary p-3">👁 {stats.ocultas} ocultos</div>
      </div>

      {/* USUARIOS */}
      <h3>Usuarios</h3>

      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th style={{ width: 200 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>

              <td>
                {editando?.id === u.id ? (
                  <input
                    className="form-control"
                    value={editando.nombre}
                    onChange={(e) =>
                      setEditando({ ...editando, nombre: e.target.value })
                    }
                  />
                ) : u.nombre}
              </td>

              <td>{u.email}</td>
              <td><span className="badge bg-info">{u.role}</span></td>
              <td>
                {u.banned
                  ? <span className="badge bg-danger">Baneado</span>
                  : <span className="badge bg-success">Activo</span>}
              </td>

              <td className="d-flex gap-2">
                <button className="btn btn-sm btn-danger"
                  onClick={() => eliminarUsuario(u.id)}>🗑</button>

                <button className="btn btn-sm btn-warning"
                  onClick={() => banearUsuario(u)}>
                  {u.banned ? "Desbanear" : "Banear"}
                </button>

                {editando?.id === u.id ? (
                  <button className="btn btn-sm btn-success"
                    onClick={guardarEdicion}>💾</button>
                ) : (
                  <button className="btn btn-sm btn-secondary"
                    onClick={() => setEditando(u)}>✏️</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PUBLICACIONES */}
      <h3 className="mt-5">Publicaciones</h3>

      <div className="row g-3">
        {publicaciones.map((p) => (
          <div key={p.id} className="col-md-3">
            <div className="card h-100 shadow-sm">

              <img
                src={p.imagenurl}
                className="card-img-top"
                style={{ height: 140, objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">

                <h6>{p.titulo}</h6>
                <p className="fw-bold">${p.precio}</p>

                <span className={`badge mb-2 ${p.hidden ? "bg-secondary" : "bg-success"}`}>
                  {p.hidden ? "Oculta" : "Visible"}
                </span>

                <div className="d-flex flex-column gap-2 mt-auto">

                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => ocultarPublicacion(p)}>
                    👁 Ocultar / Mostrar
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminarPublicacion(p.id)}>
                    🗑 Eliminar
                  </button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOGS */}
      <h3 className="mt-5">Logs del sistema</h3>

      <div
        className="rounded p-3"
        style={{
          maxHeight: 220,
          overflow: "auto",
          background: "#111",
          color: "#0f0",
          fontFamily: "monospace"
        }}
      >
        {logs.map((l) => (
          <div key={l.id}>
            [{l.fecha}] {l.texto}
          </div>
        ))}
      </div>

    </section>
  );
}


