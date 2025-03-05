import React, { useEffect, useState }  from 'react'

export default function TaskProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL de la API que deseas consultar
    const apiUrl = 'https://api.ejemplo.com/tasks';

    // Realizar el fetch
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        setData(data); // Guardar los datos en el estado
        setLoading(false); // Indicar que la carga ha terminado
      })
      .catch(error => {
        setError(error.message); // Guardar el error en el estado
        setLoading(false); // Indicar que la carga ha terminado
      });
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      { /* hacer un for para permitir mostrar div con el contenido de data */}
      {data.meta.data.map(task => (
        <div>
          {task}
        </div>
      ))}
    </div>
  )
}
