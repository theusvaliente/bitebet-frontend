
// Simulação de chamada de API
const apiURL = "http://localhost:3333/partidas";

async function fetchMatches() {
    try {
        // Chamada para a API
        const response = await fetch(apiURL, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'accept': 'application/json'
            }
        });

        const partidas = await response.json();
        console.log(partidas)

        // Atualizar a lista de partidas
        const matchesList = document.getElementById("matches-list");
        const matchSelect = document.getElementById("match-select");

        partidas.forEach((partida) => {
            const dataPartida = partida.dataPartida;
            const timeCasa = partida.timeCasa;
            const timeFora = partida.timeFora;
            const imagemTimeCasa = partida.imagemTimeCasa;
            const imagemTimeFora = partida.imagemTimeFora;

            // Adicionar partidas à lista
            const li = document.createElement("li");

            const tagImgTimeCasa = document.createElement("img");
            const tagImgTimeFora = document.createElement("img");

            tagImgTimeCasa.src = imagemTimeCasa;
            tagImgTimeFora.src = imagemTimeFora;

            li.innerHTML = `<img src='${imagemTimeCasa}'></img>`
            li.innerHTML = `<img src='${imagemTimeFora}'></img>`

            li.textContent = `${timeCasa} vs ${timeFora} - ${dataPartida}`;
            matchesList.appendChild(li);

            // Adicionar partidas ao select
            // const option = document.createElement("option");
            // option.value = partida.sport_event.id;
            // option.textContent = `${timeCasa} vs ${timeFora}`;
            // matchSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao buscar partidas:", error);
    }
}

// Lidar com o envio do formulário
document.getElementById("bet-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const matchId = document.getElementById("match-select").value;
    const prize = document.getElementById("prize-select").value;

    alert(`Aposta registrada! Partida ID: ${matchId}, Prêmio: ${prize}`);
});

// Carregar partidas ao carregar a página
window.addEventListener("load", fetchMatches);
