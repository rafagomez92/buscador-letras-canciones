import { useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';

function App() {

  const [ busquedaLetra, guardarBusquedaLetra ] = useState({});
  const [ letra, guardarLetra ] = useState('');
  const [ info, guardarInfo ] = useState({});

  
  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0) return;
    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const URL = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const URLArtista = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [ letra, informacion ] = await Promise.all([
        axios(URL),
        axios(URLArtista)
      ])           
      
      guardarLetra(letra.data.lyrics);                  
      guardarInfo(informacion.data.artists[0]);
    }

    consultarApiLetra();

  }, [busquedaLetra, info]);

  console.log(letra);
  console.log(info);
  return (
    <>      
      <Formulario 
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6">
            <Informacion info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>        
      </div>
    </>
  );
}

export default App;
