export default function CrearPublicacion() {
  return (
    <section className="card">
      
      <header className="card-header">
        <h2>Crear la publicación</h2>
      </header>

      <div className="card-body">
        <input placeholder="Título" />
        <textarea placeholder="Descripción..." />
        <input type="file" />
        <input type="number" placeholder="Precio $" />
        <button className="btn">Publicar</button>
      </div>

    </section>
  );
}
