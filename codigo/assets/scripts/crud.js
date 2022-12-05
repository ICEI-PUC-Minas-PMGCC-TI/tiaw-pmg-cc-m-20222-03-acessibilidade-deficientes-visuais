// declara um conjunto inicial de contatos
var db_contatos_inicial = {
    "data": [
        {
            "id": 1,
            "nome": "Matheus Rezende",
            "email": "Sincere@april.biz",
            "telefone": "1-770-736-8031",
            "cidade": "Belo Horizonte",
            "bairro": "Buritis",
            "tipo" : "Médico",
            "cpf" : "910.464.693-29",
            "descricao": "100% cego"
        },
        {
            "id": 2,
            "nome": "Ruan Lima",
            "email": "Shanna@melissa.tv",
            "telefone": "010-692-6593",
            "cidade": "Belo Horizonte",
            "bairro": "Funcionarios",
            "tipo" : "Cuidador",
            "cpf" : "021.429.513-92",
            "descricao": "Para idosos com deficiência"
        },
        {
            "id": 3,
            "nome": "Daniela Cardoso",
            "email": "Nathan@yesenia.net",
            "telefone": "1-463-123-4447",
            "cidade": "Belo Horizonte",
            "bairro": "Barreiro",
            "tipo" : "Médica",
            "cpf" : "098.017.273-43",
            "descricao": "Cirurgião"
        },
    ]
}

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_contato'));
if (!db) {
    db = db_contatos_inicial
};

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function insertContato(contato) {
    // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)
    let novoId = 1;
    if (db.data.length != 0) 
      novoId = db.data[db.data.length - 1].id + 1;
    let novoContato = {
        "id": novoId,
        "nome": contato.nome,
        "email" : contato.email,
        "telefone": contato.telefone,
        "cidade" : contato.cidade,
        "bairro": contato.bairro,
        "tipo" : contato.tipo,
        "cpf" : contato.cpf,
        "descricao": contato.descricao
    };

    // Insere o novo objeto no array
    db.data.push(novoContato);
    displayMessage("Contato inserido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}

function updateContato(id, contato) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = db.data.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
    db.data[index].nome = contato.nome,
    db.data[index].email = contato.email,
    db.data[index].telefone = contato.telefone,
    db.data[index].cidade = contato.cidade,
    db.data[index].bairro = contato.bairro,
    db.data[index].tipo = contato.tipo,
    db.data[index].cpf = contato.cpf,
    db.data[index].descricao = contato.descricao

    displayMessage("Contato alterado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}

function deleteContato(id) {    
    // Filtra o array removendo o elemento com o id passado
    db.data = db.data.filter(function (element) { return element.id != id });

    displayMessage("Contato removido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}

function exibeContatos() {
    // Remove todas as linhas do corpo da tabela
    $("#table-contatos").html("");

    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < db.data.length; i++) {
        let contato = db.data[i];    
        $("#table-contatos").append(`<tr><td scope="row">${contato.id}</td>
                                        <td>${contato.nome}</td>
                                        <td>${contato.telefone}</td>
                                        <td>${contato.email}</td>
                                        <td>${contato.cidade}</td>
                                        <td>${contato.bairro}</td>
                                        <td>${contato.tipo}</td>
                                        <td>${contato.cpf}</td>
                                        <td>${contato.descricao}</td>
                                    </tr>`);
    }
}

function init() {
    // Adiciona funções para tratar os eventos 
    $("#btnInsert").click(function () {
        // Verfica se o formulário está preenchido corretamente
        if (!$('#form-contato')[0].checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoNome = $("#inputNome").val();
        let campoTelefone = $("#inputTelefone").val();
        let campoEmail = $('#inputEmail').val();
        let campoCidade = $("#inputCidade").val();
        let campoBairro = $('#inputBairro').val();
        let campoTipo = $('#inputTipo').val();
        let campoCPF = $('#inputCPF').val();
        let campoDescricao = $('#inputDescricao').val();
        let contato = { nome: campoNome, 
            telefone: campoTelefone, 
            email: campoEmail, 
            cidade: campoCidade, 
            bairro: campoBairro,
            tipo: campoTipo,
            cpf: campoCPF,
            descricao: campoDescricao };

        insertContato(contato);

        // Reexibe os contatos
        exibeContatos();

        // Limpa o formulario
        $("#form-contato")[0].reset();
    });

    // Intercepta o click do botão Alterar
    $("#btnUpdate").click(function () {
        // Obtem os valores dos campos do formulário
        let campoId = $("#inputId").val();
        if (campoId == "") {
            displayMessage("Selecione um contato para ser alterado.");
            return;
        }
        let campoNome = $("#inputNome").val();
        let campoTelefone = $("#inputTelefone").val();
        let campoEmail = $('#inputEmail').val();
        let campoCidade = $("#inputCidade").val();
        let campoBairro = $('#inputBairro').val();
        let campoTipo = $('#inputTipo').val();
        let campoCPF = $('#inputCPF').val();
        let campoDescricao = $('#inputDescricao').val();
        let contato = { nome: campoNome, 
            telefone: campoTelefone, 
            email: campoEmail, 
            cidade: campoCidade, 
            bairro: campoBairro,
            tipo: campoTipo,
            cpf: campoCPF,
            descricao: campoDescricao };

        updateContato(parseInt(campoId), contato);

        // Reexibe os contatos
        exibeContatos();

        // Limpa o formulario
        $("#form-contato")[0].reset();
    });

    // Intercepta o click do botão Excluir
    $("#btnDelete").click(function () {
        let campoId = $("#inputId").val();
        if (campoId == "") {
            displayMessage("Selecione um contato a ser excluído.");
            return;
        }
        deleteContato(parseInt(campoId));

        // Reexibe os contatos
        exibeContatos();

        // Limpa o formulario
        $("#form-contato")[0].reset();
    });

    // Intercepta o click do botão Listar Contatos
    $("#btnClear").click(function () {
        $("#form-contato")[0].reset();
    });

    // Oculta a mensagem de aviso após alguns segundos
    $('#msg').bind("DOMSubtreeModified", function () {
        window.setTimeout(function () {
            $(".alert").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 5000);
    });

    // Preenche o formulário quando o usuario clicar em uma linha da tabela 
    $("#grid-contatos").on("click", "tr", function (e) {
        let linhaContato = this;
        colunas = linhaContato.querySelectorAll("td");

        $("#inputId").val(colunas[0].innerText);
        $("#inputNome").val(colunas[1].innerText);
        $("#inputTelefone").val(colunas[2].innerText);
        $("#inputEmail").val(colunas[3].innerText);
        $("#inputCidade").val(colunas[4].innerText);
        $("#inputBairro").val(colunas[5].innerText);
        $("#inputTipo").val(colunas[6].innerText);
        $("#inputCPF").val(colunas[7].innerText);
        $("#inputDescricao").val(colunas[8].innerText);
    });

    exibeContatos();
}