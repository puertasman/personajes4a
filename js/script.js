import { personajesAnimados } from './personajes.js' 

function mostrarPersonajes(personajesAnimados){
    if (personajesAnimados.length > 0) {
        const personajes = document.querySelector('#tablaPersonajes')
        const personajesFragment = document.createDocumentFragment()
        let series = [... new Set([...personajesAnimados.map(personaje => personaje.serie)])]
        let desplegable = document.createElement('select')
        desplegable.id = 'series'
        desplegable.innerHTML = `
            <option value="">Todas las series</option>
        `
        series.forEach(serie => {
            let option = document.createElement('option')
            option.value = serie
            option.textContent = serie
            desplegable.append(option)
        }
        )

        let thead = document.createElement('thead')
        thead.innerHTML = `
            <tr>
                <th>Nombre</th>
                <th id="edad">Edad</th>
                <th>Lateralidad</th>
                <th>Serie <br>
                    <select id="filtroSerie">
                            <option value="">Todas las series</option>
                    </select>
                </th>
                <th>Descripción</th>
            </tr>
        `
        personajes.append(thead)

        const selectSerie = thead.querySelector('#filtroSerie');
        const seriesUnicas = new Set(personajesAnimados.map(p => p.serie));
        seriesUnicas.forEach(serie => {
            const option = document.createElement('option');
            option.value = serie;
            option.textContent = serie;
            selectSerie.appendChild(option);
        });

        const tbody = document.createElement('tbody');
        personajesAnimados.forEach(personaje => {
            let tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${personaje.nombre}</td>
                <td>${personaje.edad} años</td>
                <td>${personaje.lateralidad}</td>
                <td>${personaje.serie}</td>
                <td>${personaje.descripcion}</td>
            `
            tbody.append(tr)
        })
        personajes.append(tbody)

        selectSerie.addEventListener('change', (e) => {
            const serieSeleccionada = e.target.value;
            const filas = tbody.querySelectorAll('tr');
            filas.forEach(fila => {
                const celdaSerie = fila.cells[3].textContent;
                if (serieSeleccionada === '' || celdaSerie === serieSeleccionada) {
                    fila.style.display = '';
                } else {
                    fila.style.display = 'none';
                }
            });
        });
    } else {
        console.error('No hay personajes animados para mostrar')
    }
}

mostrarPersonajes(personajesAnimados)