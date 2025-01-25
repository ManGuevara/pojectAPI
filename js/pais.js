async function getData(country) {
    console.log("buscando datos para el pais:", country);
    const url = `https://restcountries.com/v3.1/name/${country}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      /*console.log(json);*/
      //limpiar el contenido previo antes de agregar el nuevo
      const resultDiv =document.getElementById("result");
      resultDiv.innerHTML = '';
      //obtener la url de la bandera
      const flagUrl = json[0].flags.png

      //obtener la url del mapa
      const googleMapsUrl = json[0].maps.googleMaps
      //muestra el resultado en el DOM
      
      resultDiv.innerHTML = `
      <h2>Información de ${country}</h2>
      <p>Nombre oficial: ${json[0].name.official}</p>
      <p>Capital: ${json[0].capital}</p>
      <p>Población: ${json[0].population}</p>
      <img src="${flagUrl}" alt= "Bandera de ${country}">
      <h3>Ver el mapa</h3>
      <p><a href="${googleMapsUrl}" target=_blank>Mapa de google Maps</a>"</p>
      <h3>Incrustar mapa de Google:</h3>
       <iframe src="https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=${encodeURIComponent(country)}" 
                            width="600" height="450" frameborder="0" style="border:0;" allowfullscreen></iframe>
      <p>Lenguas: ${Object.values(json[0].languages).join(', ')}</p>
      `;
      /*console.log(json);*/
    } catch (error) {
      console.error(error.message);
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `<p>Hubo un error al obtener los datos</p>`
    }
}
    document.getElementById("countryForm").addEventListener("submit", function(event){
        event.preventDefault();
        const countryName = document.getElementById("countryName").value;
        getData(countryName);  
    });




  