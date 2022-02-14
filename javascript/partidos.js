let encuentros 
let input = document.getElementById("selec-partido");
let cambiaModal = document.getElementById("cerrar-modal");
let check_button = document.getElementById("check-equipo");
let inputEntrada = document.getElementById("input-partidos").value
let texto = "LIGA";
let titular = document.getElementById("texto-partidos");
const url = "https://api.football-data.org/v2/competitions/2014/matches"
const urlPremier = "https://api.football-data.org/v2/competitions/2021/matches";
const urlLigue = "https://api.football-data.org/v2/competitions/2015/matches";
let resultado;


function fetchPartidos(url) {
    
    fetch(url, {
        method:"GET",
        headers: {
            "X-Auth-Token" : "ae293df4eff84857b6dc78121abb4db0"
        }
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
    }).then(datapartidos =>{
        let encuentros = datapartidos.matches
        

        input.addEventListener("click", () => {
            let inputEntrada = document.getElementById("input-partidos").value
            
            if (inputEntrada === "") {
                document.getElementById("selec-partido").setAttribute("data-bs-toggle", "modal")
                document.getElementById("selec-partido").setAttribute("data-bs-target", "#exampleModal")
            }
            crearFiltro(encuentros);
        })
        
        cambiaModal.addEventListener("click", () => {
            document.getElementById("selec-partido").setAttribute("data-bs-toggle", "collapse")
            document.getElementById("selec-partido").setAttribute("data-bs-target", "#collapseExample")
        })
        
        check_button.addEventListener("click", () => {
            crearFiltro2(encuentros);
        })

        function crearFiltro2() {
            let checkEntrada = document.querySelector("input[type=radio]:checked")
            let inputEntrada = document.getElementById("input-partidos").value
            
            let resultadoPartido = encuentros.filter(resul => {
                if (checkEntrada.value === "ganado") {
                    if (((resul.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "HOME_TEAM")) ||
                        ((resul.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "AWAY_TEAM"))) {
                        return true
                    }
                } else if (checkEntrada.value === "empatado") {
                    if (((resul.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "DRAW")) ||
                        ((resul.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "DRAW"))) {
                        return true
                    }
                } else if (checkEntrada.value === "perdido") {
                    if (((resul.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "AWAY_TEAM")) ||
                        ((resul.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "HOME_TEAM"))) {
                        return true
                    }
                }
        
            })
            tablaVs(resultadoPartido);
        }

        quitarSpin();
        tablaVs(encuentros);
        titular.innerHTML = "PARTIDOS DE LA " + texto + " 2021-2022";
    })
}

fetchPartidos(url);

document.getElementById("LaLiga-partidos").addEventListener("click", ()=> {
    
    fetchPartidos(url);
    texto = "LIGA"
    
})

document.getElementById("premier-partidos").addEventListener("click", ()=> {
    
    fetchPartidos(urlPremier);
    texto = "PREMIER LEAGUE"
    
})

document.getElementById("ligue-partidos").addEventListener("click", ()=> {
    // let urlPremier = "https://api.football-data.org/v2/competitions/2021/matches";
    fetchPartidos(urlLigue);
    texto = "LIGUE 1"
    
})

function quitarSpin() {
    document.getElementById("spin").classList.add("d-none")    
}





function crearFiltro(parti) {
    let inputEntrada = document.getElementById("input-partidos").value
    
        if (inputEntrada === "") {
            document.getElementById("selec-partido").setAttribute("data-bs-toggle", "modal")
            document.getElementById("selec-partido").setAttribute("data-bs-target", "#exampleModal")
        }
    

    let nombreEqInput = parti.filter(p => {
        if ((p.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) ||
            (p.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase()))) {
            return true
        } else {
            return false
        }
    })
    tablaVs(nombreEqInput)
}


function tablaVs(encuentros) {
    let tablaPartidos = document.getElementById("tablaPartidos");
    tablaPartidos.innerHTML = "";

    for (let i = 0; i < encuentros.length; i++) {
        const trpartidos = document.createElement("tr");

        let eqLocal = document.createElement("p");
        eqLocal.innerHTML = encuentros[i].homeTeam.name;
        
        let resulVisita = document.createElement("p");
        resulVisita.innerHTML = encuentros[i].score.fullTime.homeTeam + "-" + encuentros[i].score.fullTime.awayTeam;

        let eqVisitante = document.createElement("p");
        eqVisitante.innerHTML = encuentros[i].awayTeam.name;

        let fecha = new Date(encuentros[i].utcDate);

        let jornada = document.createElement("p");
        jornada.innerHTML = encuentros[i].matchday;

        let datosCogidos = [eqLocal, resulVisita, eqVisitante, fecha.toLocaleString(), jornada];

        for (let j = 0; j < datosCogidos.length; j++) {
            const tdpartidos = document.createElement("td");
            tdpartidos.append(datosCogidos[j]);
            trpartidos.appendChild(tdpartidos)
        }
        tablaPartidos.appendChild(trpartidos)
    }
}

// tablaVs(encuentros);


// function crearFiltro2() {
//     let checkEntrada = document.querySelector("input[type=radio]:checked")
//     let inputEntrada = document.getElementById("input-partidos").value
    
//     let resultadoPartido = encuentros.filter(resul => {
//         if (checkEntrada.value === "ganado") {
//             if (((resul.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "HOME_TEAM")) ||
//                 ((resul.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "AWAY_TEAM"))) {
//                 return true
//             }
//         } else if (checkEntrada.value === "empatado") {
//             if (((resul.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "DRAW")) ||
//                 ((resul.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "DRAW"))) {
//                 return true
//             }
//         } else if (checkEntrada.value === "perdido") {
//             if (((resul.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "AWAY_TEAM")) ||
//                 ((resul.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) && (resul.score.winner == "HOME_TEAM"))) {
//                 return true
//             }
//         }

//     })
//     tablaVs(resultadoPartido);
// }
