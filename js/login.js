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
    
        const dados = {
            nomeCompleto: document.getElementById('nomeCompleto').value,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value,
            dataNascimento: document.getElementById('dataNascimento').value,
            endereco: document.getElementById('endereco').value,
            time: document.getElementById('time').value,
            senha: document.getElementById('senha').value
        };
    
        try {
            const response = await fetch('http://localhost:3000/api/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
    
            const resultado = await response.json();
            if (response.ok) {
                alert(resultado.message); // Mostra mensagem de sucesso
                document.getElementById('cadastroForm').reset(); // Limpa o formulário
                window.location.href = '/perfil.html'; // Redireciona para a página de perfil
            } else {
                alert('Erro: ' + resultado.message);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao cadastrar');
        }
    });
});
