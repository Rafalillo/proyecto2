let resultados = dataclasificacion.standings[0].table;
let filtroEquipo = document.getElementById("filtroCla");
let selectTabla = document.getElementById("tablaClasificacion");

console.log(filtroEquipo);

filtroEquipo.addEventListener("change", () => {
    console.log(filtroEquipo.value);
    console.log(selectTabla);
})

function crearFiltro(resultados) {
    if (filtroEquipo == 1) {
                resultados.sort((a, b) => {
                    if (a.position > b.position) {
                        return -1;
                    }
                })

            
    }
}

crearFiltro(resultados);
function tablaClasifi() {
    let tablaStanding = document.getElementById("tablaClasificacion")
    // tablaStanding.innerHTML = "";

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

tablaClasifi();
// console.log(i);
// function filtroClasificacion() {
//     resultados.sort(function (a,b) {
//         if (a.puntos > b.puntos) {

//         }
//     })
// }