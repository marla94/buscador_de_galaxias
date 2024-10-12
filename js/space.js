document.getElementById('btnBuscar').addEventListener("click", () => {
    let searchValue = document.getElementById('inputBuscar').value.trim().toLowerCase()
    let GALAXY_BASE_URL = "https://images-api.nasa.gov/search?q=" + searchValue;

    fetch(GALAXY_BASE_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Se ha producido un error de red');
            }
            return response.json();
        })
        .then(data => {
            let items = data.collection.items;
            let galaxyContainer = document.getElementById("contenedor");
            galaxyContainer.innerHTML = "";

            if (items.length === 0) {
                galaxyContainer.innerHTML += '<p>No se encontraron resultados para mostrar.</p>';
                return;
            }

            items.forEach(item => {
                if (item.links && item.links.length > 0) {
                    galaxyContainer.innerHTML += `
                    <div class="col">
                        <div class="card h-100" style="max-height: 350px">
                            <img src="${item.links[0].href}" class="card-img-top" alt="${item.data[0].title}" style="max-height: 150px">
                            <div class="card-body" style="overflow-y: auto">
                                <h5 class="card-title">${item.data[0].title}</h5>
                                <p class="card-text">${item.data[0].description}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary">${item.data[0].date_created}</small>
                            </div>
                        </div>
                    </div>`
                }
            });
        })
        .catch(error => {
            console.error('Hubo un error con la petición:', error);
        });
})
