document.addEventListener('DOMContentLoaded', function() {
        const criarConta = document.getElementById('criar-conta');
    if (criarConta) {
        criarConta.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'cadastro.html';
        });
    }

    const esqueceuSenha = document.getElementById('esqueceu-senha');
    if (esqueceuSenha) {
        esqueceuSenha.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'recuperar.html';
        });
    }

    // formata o cpf
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = cpfInput.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            cpfInput.value = value;
        });
    }

    // valida login
    const loginForm = document.querySelector('.formulario');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const user = loginForm.querySelector('.input-user');
            const pass = loginForm.querySelector('.input-senha');
            if (!user.value.trim() || !pass.value.trim()) {
                e.preventDefault();
                alert('Preencha usuário e senha!');
            }
        });
    }

    // valida cpf e redireciom,a
    const recuperarForm = document.querySelector('.formulario-recuperar');
    if (recuperarForm && cpfInput) {
        recuperarForm.addEventListener('submit', function(e) {
            if (!validarCPF(cpfInput.value)) {
                e.preventDefault();
                alert('CPF inválido!');
            } else {
                e.preventDefault();
                window.location.href = 'recuperar2.html';
            }
        });
    }

    // valida código pqp
    const codigoInput = document.getElementById('codigo');
    const recuperar2Form = document.querySelector('.formulario-recuperar2');
    if (recuperar2Form && codigoInput) {
        recuperar2Form.addEventListener('submit', function(e) {
            if (!codigoInput.value.trim()) {
                e.preventDefault();
                alert('Digite o código de verificação!');
            } else {
                e.preventDefault();
                window.location.href = 'recuperar3.html';
            }
        });
    }

    // valida nova senha
    const recuperar3Form = document.querySelector('.formulario-recuperar3');
    if (recuperar3Form) {
        const senha1 = document.getElementById('senha');
        const senha2 = document.getElementById('senha2');
        recuperar3Form.addEventListener('submit', function(e) {
            if (!senha1.value.trim() || !senha2.value.trim()) {
                e.preventDefault();
                alert('Preencha ambos os campos de senha!');
            } else if (senha1.value !== senha2.value) {
                e.preventDefault();
                alert('As senhas não coincidem!');
            }
        });
    }

    // volta para login apos cadastgro
    const cadastroForm = document.querySelector('.formulario-cadastro');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            const email = cadastroForm.querySelector('#email');
            const cpf = cadastroForm.querySelector('#cpf');
            const senha = cadastroForm.querySelector('#senha');
            if (!email.value.trim() || !cpf.value.trim() || !senha.value.trim()) {
                e.preventDefault();
                alert('Preencha todos os campos!');
            } else if (!validarCPF(cpf.value)) {
                e.preventDefault();
                alert('CPF inválido!');
            } else {
                e.preventDefault();
                alert('Cadastro realizado com sucesso!');
                window.location.href = 'index.html';
            }
        });
    }

//valida cpf
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g,'');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let soma = 0, resto;
        for (let i=1; i<=9; i++) soma += parseInt(cpf.substring(i-1,i))*(11-i);
        resto = (soma*10)%11;
        if ((resto==10)||(resto==11)) resto = 0;
        if (resto != parseInt(cpf.substring(9,10))) return false;
        soma = 0;
        for (let i=1; i<=10; i++) soma += parseInt(cpf.substring(i-1,i))*(12-i);
        resto = (soma*10)%11;
        if ((resto==10)||(resto==11)) resto = 0;
        if (resto != parseInt(cpf.substring(10,11))) return false;
        return true;
    }
}); 