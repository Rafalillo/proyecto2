let estadisticas = datapartidos.matches;
let estadisticasPartido = [];


function estadisticasFavor(estadisticas) {
    for (let i = 0; i < estadisticas.length; i++) {
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
                matches: 1
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
                matches: 1
            })

        } else {
            eqVisEncontrado.matches++
            eqVisEncontrado.goals += golesEqVisitante;
            eqVisEncontrado.goalsAgainst += golesEqLocal;
        }
    }console.log(estadisticasPartido);
}

estadisticasFavor(estadisticas)

function goals_matches() {
    for (let i = 0; i < estadisticasPartido.length; i++) {
        let promedio = estadisticasPartido[i].goals / estadisticasPartido[i].matches;
        estadisticasPartido[i].avg = promedio


    }
}
goals_matches(estadisticasPartido);

function promedioGoles() {
    let tablaPromedioFavor = document.getElementById("tablaGolesFavor");
    estadisticasPartido.sort((a,b) => (a.avg < b.avg) ? 1: -1);

    for (let i = 0; i <= 4; i++) {
        const trProm = document.createElement("tr");

        let nombre = document.createElement("p");
        nombre.innerHTML = estadisticasPartido[i].name;

        let goles = document.createElement("p");
        goles.innerHTML = estadisticasPartido[i].goals;

        let partidos = document.createElement("p");
        partidos.innerHTML = estadisticasPartido[i].matches;

        let prom = document.createElement("p");
        estadisticasPartido[i].avg = estadisticasPartido[i].avg.toFixed(2);
        prom.innerHTML = estadisticasPartido[i].avg;

        let datosProm = [nombre, goles, partidos, prom];

        for (let j = 0; j < datosProm.length; j++) {
            const tdProm = document.createElement("td");
            tdProm.append(datosProm[j]);
            trProm.appendChild(tdProm)
        }
        tablaPromedioFavor.appendChild(trProm)

    }
}

function menosGoles() {
    let tablaMenosGolesFuera = document.getElementById("tablaMenosGoles")
    estadisticasPartido.sort((a,b) => (a.goalsAgainst > b.goalsAgainst) ? 1: -1);

    for (let i = 0; i <= 4; i++) {
        const trMenos = document.createElement("tr");

        let nombre = document.createElement("p");
        nombre.innerHTML = estadisticasPartido[i].name;

        let goles = document.createElement("p");
        goles.innerHTML = estadisticasPartido[i].goalsAgainst;

        let partidos = document.createElement("p");
        partidos.innerHTML = estadisticasPartido[i].matches;

        

        let datosMenos = [nombre, goles, partidos];

        for (let j = 0; j < datosMenos.length; j++) {
            const tdMenos = document.createElement("td");
            tdMenos.append(datosMenos[j]);
            trMenos.appendChild(tdMenos)
        }
        tablaMenosGolesFuera.appendChild(trMenos)

    }
}

promedioGoles(estadisticasPartido);
menosGoles(estadisticasPartido);