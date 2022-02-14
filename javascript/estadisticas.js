let titular = document.getElementById("texto-estadisticas");
let texto = "LIGA";
let estadisticasPartido = [];
const url = "https://api.football-data.org/v2/competitions/2014/matches"
const urlPremier = "https://api.football-data.org/v2/competitions/2021/matches";
const urlLigue = "https://api.football-data.org/v2/competitions/2015/matches";
let escudoLocal1;
let escudoVis1;
let escudoLocal;
let escudoVis;
const urlequipos = "https://api.football-data.org/v2/competitions/2014/standings"
const urlPremierequipos = "https://api.football-data.org/v2/competitions/2021/standings";
const urlLigueequipos = "https://api.football-data.org/v2/competitions/2015/standings";


function fetchequipos(urlequipos) {
    
    fetch(urlequipos, {
        method:"GET",
        headers: {
            "X-Auth-Token" : "ae293df4eff84857b6dc78121abb4db0"
        }
    }).then(response => {
        if (response.ok){
            return response.json()
        }
    }).then(dataequipos => {
        resultados = dataequipos.standings[0].table
        
    })
}

fetchequipos(urlequipos);

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
        estadisticas = data.matches
        
        quitarSpin();
        
        titular.innerHTML = "ESTADISTICAS MEJORES EQUIPOS DE LA " + texto;
        estadisticasFavor(estadisticas)
        goals_matches();
        promedioGoles();
        menosGoles();
    })
}



function quitarSpin() {
    document.getElementById("spin").classList.add("d-none")    
}
fetchEstadisticas(url);

document.getElementById("LaLiga").addEventListener("click", ()=> {
    fetchequipos(urlequipos)
    fetchEstadisticas(url);
    texto = "LIGA"
    estadisticasPartido = [];
})

document.getElementById("premier").addEventListener("click", ()=> {
    fetchequipos(urlPremierequipos)
    fetchEstadisticas(urlPremier);
     
    texto = "PREMIER LEAGUE"
    estadisticasPartido = [];
})

document.getElementById("ligue").addEventListener("click", ()=> {
    fetchequipos(urlLigueequipos)
    fetchEstadisticas(urlLigue);
    texto = "LIGUE 1"
    estadisticasPartido = [];
})
    
function estadisticasFavor(estadisticas) {
    
    for (let i = 0; i < estadisticas.length; i++) {
        for (let x = 0; x < resultados.length; x++) {
            if (estadisticas[i].homeTeam.id == resultados[x].team.id) {
                escudoLocal1 = resultados[x].team.crestUrl
            } else if (estadisticas[i].awayTeam.id == resultados[x].team.id) {
                escudoVis1 = resultados[x].team.crestUrl
            }
            
        }
        let estadoPartido = estadisticas[i].status;
        if (estadoPartido !== "FINISHED") {
            continue
        }

        let idEqLocal = estadisticas[i].homeTeam.id;
        let idEqVisitante = estadisticas[i].awayTeam.id;

        let nombreEqLocal = estadisticas[i].homeTeam.name;
        let nombreEqVisitante = estadisticas[i].awayTeam.name;

        let golesEqLocal = estadisticas[i].score.fullTime.homeTeam;
        let golesEqVisitante = estadisticas[i].score.fullTime.awayTeam;

        
        ;

        let eqLocalEncontrado;
        estadisticasPartido.forEach(x => {
            if (x.id === idEqLocal) {
                eqLocalEncontrado = x
            }
        })

        if (eqLocalEncontrado == undefined) {
            estadisticasPartido.push({
                id: idEqLocal,
                name: nombreEqLocal,
                goals: golesEqLocal,
                goalsAgainst: golesEqVisitante,
                matches: 1,
                escudo: escudoLocal1
            })

        } else {
            eqLocalEncontrado.matches++
            eqLocalEncontrado.goals += golesEqLocal;
            eqLocalEncontrado.goalsAgainst += golesEqVisitante;
        }

        let eqVisEncontrado;
        estadisticasPartido.forEach(x => {
            if (x.id === idEqVisitante) {
                eqVisEncontrado = x
            }
        })

        if (eqVisEncontrado == undefined) {
            estadisticasPartido.push({
                id: idEqVisitante,
                name: nombreEqVisitante,
                goals: golesEqVisitante,
                goalsAgainst: golesEqLocal,
                matches: 1,
                escudo: escudoVis1
            })

        } else {
            eqVisEncontrado.matches++
            eqVisEncontrado.goals += golesEqVisitante;
            eqVisEncontrado.goalsAgainst += golesEqLocal;
        }
    }
}



function goals_matches() {
    for (let i = 0; i < estadisticasPartido.length; i++) {
        let promedio = estadisticasPartido[i].goals / estadisticasPartido[i].matches;
        estadisticasPartido[i].avg = promedio


    }
}


function promedioGoles() {
    let tablaPromedioFavor = document.getElementById("tablaGolesFavor");
    tablaPromedioFavor.innerHTML = "";
    
    estadisticasPartido.sort((a,b) => (a.avg < b.avg) ? 1: -1);

    for (let i = 0; i <= 4; i++) {
        const trProm = document.createElement("tr");

        let escudotabla = document.createElement("img");
        escudotabla.setAttribute("src", estadisticasPartido[i].escudo)

        let nombre = document.createElement("p");
        nombre.innerHTML = estadisticasPartido[i].name;

        let goles = document.createElement("p");
        goles.innerHTML = estadisticasPartido[i].goals;

        let partidos = document.createElement("p");
        partidos.innerHTML = estadisticasPartido[i].matches;

        let prom = document.createElement("p");
        estadisticasPartido[i].avg = estadisticasPartido[i].avg.toFixed(2);
        prom.innerHTML = estadisticasPartido[i].avg;

        let datosProm = [escudotabla, nombre, goles, partidos, prom];

        for (let j = 0; j < datosProm.length; j++) {
            const tdProm = document.createElement("td");
            tdProm.append(datosProm[j]);
            trProm.appendChild(tdProm)
        }
        tablaPromedioFavor.appendChild(trProm)

    }
}

function menosGoles() {
    let tablaMenosGolesFuera = document.getElementById("tablaMenosGoles");
    tablaMenosGolesFuera.innerHTML = "";
    estadisticasPartido.sort((a,b) => (a.goalsAgainst > b.goalsAgainst) ? 1: -1);

    for (let i = 0; i <= 4; i++) {
        const trMenos = document.createElement("tr");

        let escudotabla = document.createElement("img");
        escudotabla.setAttribute("src", estadisticasPartido[i].escudo)

        let nombre = document.createElement("p");
        nombre.innerHTML = estadisticasPartido[i].name;

        let goles = document.createElement("p");
        goles.innerHTML = estadisticasPartido[i].goalsAgainst;

        let partidos = document.createElement("p");
        partidos.innerHTML = estadisticasPartido[i].matches;

        let datosMenos = [escudotabla, nombre, goles, partidos];

        for (let j = 0; j < datosMenos.length; j++) {
            const tdMenos = document.createElement("td");
            tdMenos.append(datosMenos[j]);
            trMenos.appendChild(tdMenos)
        }
        tablaMenosGolesFuera.appendChild(trMenos)

    }
}
                            
