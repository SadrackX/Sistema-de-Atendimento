var idDivPaginacaofuncioanrio = "#OpPaginasUsuario";
var paginaAtualUsuarios=1;
var qtdRegistrosUsuarios = 10;
var qtdRegistrosUsuariosObtidos = 0;
var urlUsuarios = "ws/usuariows/listar/";
var urlUsuarios = "ws/usuariows/listarUsuarios/";

function cadastrarUsuario(){
	$('#tituloFomunlarioUsuario').html("Formulário de cadastro de usuario");
	$("#hide-alterar").show();
    $("#cadastrarUsuario").modal('open');
    $('#mensagemRetornoCadastro').addClass("hiddendiv");
}

$("#CadastroDeUsuario").submit(function(event){
	$('#mensagemRetornoCadastro').addClass("hiddendiv");
	if(capturarDadosDoForm() != null){
		var formData = JSON.stringify(capturarDadosDoForm());
		$.ajax({
			url: "ws/usuariows/cadastrar/",
	        type: 'POST',
	        data: formData,
	        success: function (data) {
	        	tratarRetornoServidor(data);
	        },
			cache: false,
		    contentType: "application/json",
		    processData: true
		});
	}else{
		$('#mensagemRetornoCadastro').addClass("red");
		$('#mensagemRetornoCadastro').removeClass("hiddendiv");
	}
	return false;
});

function capturarDadosDoForm(){
	var nome = $("#nome").val();
	var sobrenome = $("#sobrenome").val();
	var tipo_user = $("#tipo_user").val();
	var login = $("#login").val();
	var telefone = $("#telefone").val();
	var email = $("#email").val();
	var rua = $("#rua").val();
	var bairro = $("#bairro").val();
	var cidade = $("#cidade").val();
	var cep = $("#cep").val();	
	var senha = $("#senha").val();
	var usuario
	if(isDadosValidos(nome,sobrenome,telefone,tipo_user,login,email,senha, rua, bairro, cidade, cep)){
	   usuario = {"nome":nome+" "+sobrenome, "email":email, "telefone":telefone, "login":login, "senha":senha, "tipo_user":tipo_user, "status":'A', "endereco":{rua:"rua", bairro:"bairro", cidade:"cidade", cep:"cep"}};
	}else{
		usuario = null;
	}
	return usuario;
}

function isDadosValidos(nome,sobrenome,telefone,tipo_user,login,email,senha, rua, bairro, cidade, cep){
	var mensagem = "";
//	var cpfSemFormatacao;
	var retorno = true;
	if(nome == null || nome == "" || nome.length < 4){
		mensagem += "<li>É obrigatório preencher o campo NOME corretamente com no minimo 4 letras</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if(sobrenome == null || sobrenome == "" || sobrenome.length < 4){
		mensagem += "<li>É obrigatório preencher o campo SOBRENOME corretamente com no minimo 4 letras</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if(tipo_user == null || tipo_user == ""){
		mensagem += "<li>É obrigatório selecionar o TIPO corretamente</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if(telefone == null || telefone == "" || telefone.length < 1){
		mensagem += "<li>É obrigatório preencher o campo TELEFONE com 11 caracteres numéricos</li>";
		$('#mensagemRetornoAlteracao').html(mensagem);
		retorno = false;
	}
	if(login == null || login == "" || login.length < 4 ){
		mensagem += "<li>É obrigatório preencher o campo LOGIN com no mínimo 4 caracteres alfanuméricos</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if(email == null || email == "" || email.length < 1){
		mensagem += "<li>É obrigatório preencher o campo EMAIL com o seguinte formato 'exemplo@email.com'</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}	
	if(senha == null || senha == "" || senha.length < 4){
		mensagem += "<li>É obrigatório preenche o campo SENHA com no mínimo 8 caracteres alfanuméricos</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if(rua == null || rua == "" || rua.length < 1 ){
		mensagem += "<li>É obrigatório preencher o campo RUA</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if(bairro == null || bairro == "" || bairro.length < 1 ){
		mensagem += "<li>É obrigatório preencher o campo BAIRRO</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if(cidade == null || cidade == "" || cidade.length < 1 ){
		mensagem += "<li>É obrigatório preencher o campo CIDADE</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if(cep == null || cep == "" || cep.length < 1 ){
		mensagem += "<li>É obrigatório preencher o campo CEP</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	return retorno;
}

/*EXCLUIR USUARIO*/

function excluirUsuario(chave){
	$("#confirmarExclusaoDoUsuario").modal('open');
	$("#usuarioID").val(chave);
}

$("#confirmarExclusaoUsuario").submit(function(event){
	var chave = $("#usuarioID").val();
	$.ajax({
		url: "ws/usuariows/excluir/"+chave,
        type: 'GET',
        data: "",
        contentType: "application/json"
	});
	setTimeout(function(){
		$("#confirmarExclusaoDoUsuario").modal('close');
		carregarUsuarios(1);
	},2000);
	return false;
});

/*TABELA DE FUNCIONARIOS*/

function carregarUsuarios(pagina){
	$("#barraCarregando").removeClass("hiddendiv");
	qtdRegistrosUsuarios = parseInt($("#qtdRegistrosUsuarios").val());
	$.ajax({
		url: "ws/usuariows/listar/"+pagina+"/"+qtdRegistrosUsuarios,
        type: 'GET',
        success: function (data) {
        	qtdRegistrosUsuariosObtidos = data.length;
        	$("#barraCarregando").addClass("hiddendiv");
        	if(data.length > 0){
        		preencherTabelaUsuarios(data);
        	}else{
        		if(pagina == 1){
        			$("#tabelaUsuarios").html('<tr><td colspan="5">Não há usuarios cadastrados.</td></td>');
        		}else{
        			$("#tabelaUsuarios").html('<tr><td colspan="5">Não há mais usuarios a serem listados.</td></td>');
        		}
        	}
        }
	});
	paginaAtualUsuarios = pagina;
	listarOpPaginas(idDivPaginacaoUsuario,paginaAtualUsuarios,qtdRegistrosUsuarios,qtdRegistrosUsuariosObtidos,"carregarUsuarios");
}

function preencherTabelaUsuarios(arrayDeUsuario){
	var html = "";
	for( i = 0; i < arrayDeUsuarios.length; i++){
		html += getLinhaUsuario(arrayDeUsuarios[i]);
	}
	$("#tabelaUsuarios").html(html);	
}

function getLinhaUsuario(usuario){
	linha = "<tr>";
	linha +="<td>"+usuario.nome+"</td>";
	linha +="<td>"+usuario.tipo == "C" ? "Cliente" : "Funcionario"+"</td>";
	linha +="<td>"+(usuario.email == null ? "" : usuario.email)+"</td>";
	linha +="</tr>";
	return linha;
}

/*VALIDAÇÕES E TRATAMENTOS*/

function validar(dom,tipo){
	switch(tipo){
		case'num':var regex=/[A-Za-z]|\.|\,|\;|\:|\[|\{|\]|\}|\-|\_|\=|\+|\§|\)|\(|\*|\&|\¬|\%|\¢|\$|\£|\#|\³|\@|\²|\!|\¹|\º|\ª|\°|\~|\´|\`|\>|\<|\"|\'|\\|\||\¨+/g;break;
		case'text':var regex=/\d|\.|\,|\;|\:|\[|\{|\]|\}|\-|\_|\=|\+|\§|\)|\(|\*|\&|\¬|\%|\¢|\$|\£|\#|\³|\@|\²|\!|\¹|\º|\ª|\°|\~|\´|\`|\>|\<|\"|\'|\\|\||\¨+/g;break;
	}
	dom.value=dom.value.replace(regex,'');
}

function tratarRetornoServidor(data){
	if(data == "sucess"){
		$('#mensagemRetornoCadastro').html("Cadastro realizado com sucesso!");
		$('#mensagemRetornoCadastro').addClass("green");
		$('#mensagemRetornoCadastro').removeClass("hiddendiv");
		setTimeout(function(){
			$("#cadastrarFuncionario").modal('close');
			limparCamposFormCadastro();
			$('#mensagemRetornoCadastro').addClass("hiddendiv");
			carregarUsuarios(1);
		},2000);
	}else{
		$('#mensagemRetornoCadastro').html("Houve erro ao cadastrar!");
		$('#mensagemRetornoCadastro').addClass("red");
		$('#mensagemRetornoCadastro').removeClass("hiddendiv");
	}
}

function limparCamposFormCadastro(){
	$("#nome").val("");
	$("#sobrenome").val("");
	$("#cpf").val("");
	$("#login").val("");
	$("#telefone").val("");
	$("#email").val("");
	$("#senha").val("");
	$("#confirmaSenha").val("");
	$("#tipo").val("");
	$("#rua").val("");
	$("#bairro").val("");
	$("#cidade").val("");
	$("#cep").val("");
}
