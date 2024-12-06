document.addEventListener("DOMContentLoaded", function () {
    // Validação das senhas
    document.getElementById('cadastroForm').addEventListener('submit', function (event) {
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        const avisoSenha = document.getElementById('senhaAviso');

        if (senha !== confirmarSenha) {
            event.preventDefault(); // Impede o envio do formulário
            avisoSenha.style.display = 'block'; // Exibe o aviso de senhas diferentes
        } else {
            avisoSenha.style.display = 'none'; // Esconde o aviso
        }

        window.addEventListener("load", fetchTeams);
    });

    // Função para validar senhas durante a digitação
    document.getElementById('confirmarSenha').addEventListener('input', function () {
        const senha = document.getElementById('senha').value;
        const confirmarSenha = this.value;
        const avisoSenha = document.getElementById('senhaAviso');

        if (senha && confirmarSenha && senha !== confirmarSenha) {
            avisoSenha.style.display = 'block';
        } else {
            avisoSenha.style.display = 'none';
        }
    });

    // Envio do formulário com validação e redirecionamento após o cadastro
    document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        const apiURL = "http://localhost:3333/register";
    
        try {
            const dados = {
                nomeCompleto: document.getElementById('nomeCompleto').value,
                cpf: document.getElementById('senha').value,
                dataNascimento: new Date(document.getElementById('dataNascimento').value).getTime(),
                time: document.getElementById('time').value,
                cep: '13000000',
                logradouro: 'Avenida',
                numero: '1',
                complemento: '1',
                celular: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
            };

            const response = await fetch(apiURL, {
                mode: 'cors',
                method:'post',
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                alert('Cadastrado com sucesso!'); // Mostra mensagem de sucesso
                document.getElementById('cadastroForm').reset(); // Limpa o formulário
                window.location.href = '/perfil.html'; // Redireciona para a página de perfil

                sessionStorage.setItem('nome', dados.nomeCompleto);
                sessionStorage.setItem('email', dados.email);
                sessionStorage.setItem('time', dados.time);
            } else {
                alert('Erro: Usuário já existe!');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao cadastrar');
        }
    });
});

async function fetchTeams() {
    try {
        const apiURL = "http://localhost:3333/teams";

        const response = await fetch(apiURL, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'accept': 'application/json'
            }
        });

        const times = await response.json();

        const listaTimes = document.getElementById("time");

        times.forEach((time) => {
            const idTime = time.idTime;
            const nomeTime = time.nomeTime;

            const option = document.createElement("option");

            option.value = idTime;
            option.textContent = nomeTime;
            listaTimes.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao buscar times:", error);
    }
}