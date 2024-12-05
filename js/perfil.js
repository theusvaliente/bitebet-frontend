document.addEventListener("DOMContentLoaded", async () => {
    const timeFavorito = "Nome do Time do Coração"; // Substitua pelo time do banco de dados

    document.getElementById("timeFavorito").textContent = timeFavorito;
    document.getElementById("nomeTime").textContent = timeFavorito;

    // Função para buscar notícias do time favorito
    async function fetchNoticias() {
        try {
            const response = await fetch(`/api/noticias/${timeFavorito}`);
            const noticias = await response.json();
            const listaNoticias = document.getElementById("listaNoticias");
            listaNoticias.innerHTML = "";

            noticias.forEach(noticia => {
                const li = document.createElement("li");
                li.textContent = noticia.titulo;
                listaNoticias.appendChild(li);
            });
        } catch (error) {
            console.error("Erro ao buscar notícias:", error);
        }
    }

    // Função para buscar jogos da Série A e B
    async function fetchJogos() {
        try {
            const response = await fetch(`/api/jogos`);
            const jogos = await response.json();
            const listaJogos = document.getElementById("listaJogos");
            listaJogos.innerHTML = "";

            jogos.forEach(jogo => {
                const li = document.createElement("li");
                li.textContent = `${jogo.timeCasa} vs ${jogo.timeVisitante} - ${jogo.data}`;
                listaJogos.appendChild(li);
            });
        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
        }
    }

    // Chamar funções ao carregar a página
    fetchNoticias();
    fetchJogos();
});
