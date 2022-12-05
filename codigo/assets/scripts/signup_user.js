function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};  

    if (strDados) {
        objDados = JSON.parse (strDados);

    }

    else {
        objDados = { Cadastros: [   {Nome: "João", Sobrenome: "da Silva", CPF: "14858996256", Email: "matheueis@yahoo.com.br",Senha: "1234", Telefone: "(32) 991313865", Endereço: "Rua Maria do Carmo", Deficiência: "Tenho 30% da visão", Descrição: "Tenho somente 30% da visão, e por isso tenho bastante dificuldade de conseguir mexer em um site web por enxergar muito pouco."},
                                    {Nome: "Joana", Sobrenome: "Camargo", CPF: "14858974596", Email: "joanacamargo@yahoo.com.br",Senha: "12345", Telefone: "(32) 991374598", Endereço: "Rua Maria do Santos", Deficiência: "Não tenho o olho direito", Descrição: "Tenho somente o olho esquedo, porém isso nao me prejudica muito pois o outro olho enxerga 100%"}]                               
                    }
    }

    return objDados;
}

function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}

function incluirContato () {
    // Ler os dados do localStorage
    let objDados = leDados ();
    // Incluir um cadastro novo
    let strNome = document.getElementById ('campoNome').value;
    let strSobrenome = document.getElementById ('campoSobrenome').value;
    let strCPF = document.getElementById ('campoCPF').value;
    let strEmail = document.getElementById ('campoEmail').value;
    let strSenha = document.getElementById ('campoSenha').value;
    let strTelefone = document.getElementById ('campoTelefone').value;
    let strEndereço = document.getElementById ('campoEndereco').value;
    let strDeficiência = document.getElementById ('campoDeficiencia').value;
    let strDescrição = document.getElementById ('campoDescricao').value;

    let novoCadastro = {
        Nome: strNome,
        Sobrenome: strSobrenome,
        CPF: strCPF,
        Email: strEmail,
        Senha: strSenha,
        Telefone: strTelefone,
        Endereço: strEndereço,
        Deficiência: strDeficiência,
        Descrição: strDescrição
    };
    objDados.Cadastros.push (novoCadastro);
    document.getElementById('campoNome').value='';
    document.getElementById('campoSobrenome').value='';
    document.getElementById('campoCPF').value='';
    document.getElementById('campoEmail').value='';
    document.getElementById('campoSenha').value='';
    document.getElementById('campoTelefone').value='';
    document.getElementById('campoEndereco').value='';
    document.getElementById('campoDeficiencia').value='';
    document.getElementById('campoDescricao').value='';
    alert ("Cadastro foi salvo com sucesso");


    // Salvar os dados no localStorage
    salvaDados (objDados);

    //voltar pagina
    // setTimeout(()=>{
    //     window.location.href = '../product_search/index.html'
    // }, 3000)
}

function imprimeDados () {
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados ();

    for (i=0; i<objDados.Cadastros.length; i++){
        strHtml += `<p>${objDados.Cadastros[i].Nome} - ${objDados.Cadastros[i].Sobrenome} - ${objDados.Cadastros[i].CPF} - ${objDados.Cadastros[i].Email} - ${objDados.Cadastros[i].Telefone} - ${objDados.Cadastros[i].Endereço} - ${objDados.Cadastros[i].Deficiência} - ${objDados.Cadastros[i].Descrição} </p>`
    }

    tela.innerHTML = strHtml;
}
// Configuração dos botões

//document.getElementById ('btnCarregaDados').addEventListener ('click', imprimeDados);
document.getElementById ('btnIncluirCadastro').addEventListener ('click', incluirContato);