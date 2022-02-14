// let resultados = dataclasificacion.standings[0].table;
let texto = "LIGA";
let titular = document.getElementById("texto-clasificacion");
let filtroEquipo = document.getElementById("filtroCla");
let selectTabla = document.getElementById("tablaClasificacion");
const url = "https://api.football-data.org/v2/competitions/2014/standings"
const urlPremier = "https://api.football-data.org/v2/competitions/2021/standings";
const urlLigue = "https://api.football-data.org/v2/competitions/2015/standings";
function fetchEstadisticas(url) {
    
    fetch(url, {
        method:"GET",
        headers: {
            "X-Auth-Token" : "ae293df4eff84857b6dc78121abb4db0"
        }
    }).then(response => {
        if (response.ok){
            return response.json()
        }
    }).then(data => {
        resultados = data.standings[0].table
        quitarSpin();
        titular.innerHTML = "CLASIFICACION DE LA " + texto;
        tablaClasifi(resultados)
    })
}

fetchEstadisticas(url);

document.getElementById("LaLiga-clas").addEventListener("click", ()=> {
    
    fetchEstadisticas(url);
    texto = "LIGA"
    resultados = [];
})

document.getElementById("premier-clas").addEventListener("click", ()=> {
    
    fetchEstadisticas(urlPremier);
    texto = "PREMIER LEAGUE"
    resultados = [];
})

document.getElementById("ligue-clas").addEventListener("click", ()=> {
    // let urlPremier = "https://api.football-data.org/v2/competitions/2021/matches";
    fetchEstadisticas(urlLigue);
    texto = "LIGUE 1"
    resultados = [];
})


function quitarSpin() {
    document.getElementById("spin").classList.add("d-none")    
}

function tablaClasifi() {
    let tablaStanding = document.getElementById("tablaClasificacion");
    tablaStanding.innerHTML = "";

    for (let i = 0; i < resultados.length; i++) {
        const trClasifi = document.createElement("tr");
        

        let pos = document.createElement("p");
        pos.innerHTML = resultados[i].position;
        pos.classList.add("posi")

        let escudo = document.createElement("img");
        escudo.setAttribute("src", resultados[i].team.crestUrl)

        let nombre = document.createElement("p");
        nombre.innerHTML = resultados[i].team.name;

        let pj = document.createElement("p");
        pj.innerHTML = resultados[i].playedGames;

        let v = document.createElement("p");
        v.innerHTML = resultados[i].won;

        let empate = document.createElement("p");
        empate.innerHTML = resultados[i].draw;

        let perdidos = document.createElement("p");
        perdidos.innerHTML = resultados[i].lost;

        let golesF = document.createElement("p");
        golesF.innerHTML = resultados[i].goalsFor;

        let golesC = document.createElement("p");
        golesC.innerHTML = resultados[i].goalsAgainst;

        let diferenciaGoles = document.createElement("p");
        diferenciaGoles.innerHTML = resultados[i].goalDifference;

        let puntos = document.createElement("p");
        puntos.innerHTML = resultados[i].points;

        let datosClasifi = [pos, escudo, nombre, pj, v, empate, perdidos, golesF, golesC, diferenciaGoles, puntos]

        for (let j = 0; j < datosClasifi.length; j++) {
            const tdClasifi = document.createElement("td");
            tdClasifi.append(datosClasifi[j]);
            trClasifi.appendChild(tdClasifi)
        }
        tablaStanding.appendChild(trClasifi)
    }
}


