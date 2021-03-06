var idDivPaginacaoUsuario = "#OpPaginasUsuario";
var paginaAtualUsuarios=1;
var qtdRegistrosUsuarios = 10;
var qtdRegistrosUsuariosObtidos = 0;
var status = 'A';

/*CADASTRAR USUARIO*/

function cadastrarUsuario(){
	$('#mensagemRetornoCadastro').addClass("hiddendiv");
	$('#tituloFomunlarioUsuario').html("Cadastrar Usuário");
	limparCamposFormCadastro();
	$('#form_type').val("cadastrar");
	$("#chave").val(null);
}

$("#CadastroDeUsuario").submit(function(event){
	$('#mensagemRetornoCadastro').addClass("hiddendiv");
	if(capturarDadosDoForm() != null){
		var formData = JSON.stringify(capturarDadosDoForm());
		$.ajax({
			url: "ws/usuariows/"+$('#form_type').val()+"/",
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
	var chave = $("#chave").val();
	var nome = $("#nome").val();
	var sobrenome = $("#sobrenome").val();
	var tipo = $("#tipo").val();
	var login = $("#login").val();
	var telefone = $("#telefone").val();
	var email = $("#email").val();
	var rua = $("#rua").val();
	var numero = $("#numero").val();
	var bairro = $("#bairro").val();
	var cidade = $("#cidade").val();
	var cep = $("#cep").val();	
	var senha = $("#senha").val();
	var usuario
	if(isDadosValidos(nome,sobrenome,telefone, tipo, login,email,senha, rua, numero, bairro, cidade, cep)){
	   usuario = {"chave":chave,"nome":nome, "sobrenome":sobrenome, "email":email, "telefone":telefone, "tipo":tipo, "login":login, "senha":senha, "status":status, "rua":rua, "numero": numero, "bairro":bairro, "cidade":cidade, "cep":cep};
	}else{
		usuario = null;
	}
	return usuario;
}

function isDadosValidos(nome,sobrenome,telefone, tipo, login,email,senha, rua, numero, bairro, cidade, cep){
	var mensagem = "";
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
	if(telefone == null || telefone == "" || telefone.length < 10){
		mensagem += "<li>É obrigatório preencher o campo TELEFONE corretamente</li>";
		$('#mensagemRetornoAlteracao').html(mensagem);
		retorno = false;
	}
	if(email == null || email == "" || email.length < 10){
		mensagem += "<li>É obrigatório preencher o campo EMAIL com o seguinte formato 'exemplo@email.com'</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}	
	if(rua == null || rua == "" || rua.length < 1 ){
		mensagem += "<li>É obrigatório preencher o campo RUA</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if(numero == null || numero == "" || numero.length < 1 ){
		mensagem += "<li>É obrigatório preencher o campo NUMERO</li>";
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
	if(cep == null || cep == "" || cep.length < 9 ){
		mensagem += "<li>É obrigatório preencher o campo CEP</li>";
		$('#mensagemRetornoCadastro').html(mensagem);
		retorno = false;
	}
	if($('#form_type').val()=="C"){
		if(senha == null || senha == "" || senha.length < 5){
			mensagem += "<li>É obrigatório preenche o campo SENHA com no mínimo 5 caracteres alfanuméricos</li>";
			$('#mensagemRetornoCadastro').html(mensagem);
			retorno = false;
		}
		if(login == null || login == "" || login.length < 5 ){
			mensagem += "<li>É obrigatório preencher o campo LOGIN com no mínimo 5 caracteres alfanuméricos</li>";
			$('#mensagemRetornoCadastro').html(mensagem);
			retorno = false;
		}
	}
	return retorno;
}

/*TABELA USUARIO*/

$('#cliente-tab-btn').click(function(event){
	$('#tipo_u').val("C");
	carregarUsuarios(1);
});
$('#funcionario-tab-btn').click(function(event){
	$('#tipo_u').val("F");
	carregarUsuarios(1);
});

function carregarUsuarios(pagina){
	$("#barraCarregando").removeClass("hiddendiv");
    qtdRegistrosUsuarios = parseInt($("#qtdRegistrosUsuarios").val());
	$.ajax({
		url: "ws/usuariows/listar/"+pagina+"/"+qtdRegistrosUsuarios+"/"+$("#tipo_u").val(),
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

function preencherTabelaUsuarios(arrayDeUsuarios){
	var html = "";
	for( i = 0; i < arrayDeUsuarios.length; i++){
		html += getLinhaUsuario(arrayDeUsuarios[i]);
	}
	$("#tabelaUsuarios").html(html);	
}

function getLinhaUsuario(usuario){
	linha = "<tr>";
	linha +="<td>"+usuario.nome+" "+usuario.sobrenome+"</td>";
	linha +="<td>"+usuario.telefone+"</td>";
	linha +="<td>"+usuario.cep +"</td>";
	linha +="<td>"+(usuario.email == null ? "" : usuario.email)+"</td>";
	linha +="<td>"+getAcoesUsuario(usuario)+"</td>";
	linha +="</tr>";
	return linha;
}

function getAcoesUsuario(usuario){
	var html = getBtnInfoUsuario(usuario);
	html += getBtnEditarUsuario(usuario);
	html += getBtnExcluirUsuario(usuario);
	return html;
}

function getBtnInfoUsuario(usuario){
	var html = "<a style='padding: 5px' href='#' class='modal-trigger' data-target='user_info' onclick='abrirInformacoesUsuario("+JSON.stringify(usuario)+")' title='Mais informações'><i class='blue-text fas fa-info-circle fa-2x'/></a> ";
	return html;
}

function getBtnEditarUsuario(usuario){
	var html = "<a style='padding: 5px' href='#' class='modal-trigger' data-target='cadastro' onclick='limparCamposFormCadastro() , editarUsuario("+JSON.stringify(usuario)+")' title='Editar'><i class='green-text fas fa-user-edit fa-2x'/></a> ";
	return html;
}

function getBtnExcluirUsuario(usuario){
	var html = "<a style='padding: 5px' href='#' onclick='excluirUsuario("+JSON.stringify(usuario)+")' title='Excluir'><i class='red-text fas fa-user-times fa-2x'/></a>";
	return html;
}

/*INFORMAÇÕES USUARIO*/

function abrirInformacoesUsuario(usuario){
	$("#nome_info").val(usuario.nome);
	$("#sobrenome_info").val(usuario.sobrenome);
	$("#email_info").val(usuario.email);
	$("#telefone_info").val(usuario.telefone);
	$("#rua_info").val(usuario.rua);
	$("#numero_info").val(usuario.numero);
	$("#bairro_info").val(usuario.bairro);
	$("#cidade_info").val(usuario.cidade);
	$("#cep_info").val(usuario.cep);
	$("#login_info").val(usuario.login);	
	M.updateTextFields();
}

/*EXCLUIR USUARIO*/

function excluirUsuario(usuario){
	$('#nomeEx').html("Deseja excluir:<br/>"+usuario.nome);
	$("#confirmaExclusao").modal('open');
	$("#chave_usuario").val(usuario.chave);
}

$("#confirmarExclusaoUsuario").submit(function(event){
	var chave = $("#chave_usuario").val();
	$.ajax({
		url: "ws/usuariows/excluir/"+chave,
        type: 'GET',
        data: "",
        contentType: "application/json"
	});
	M.toast({html: 'Usuario excluido!', classes: 'green'});
	setTimeout(function(){
		$("#confirmaExclusao").modal('close');
		if ($('#test1').val() == "1"){
			$('#cliente-tab-btn').trigger('click');
		}else{
			$('#funcionario-tab-btn').trigger('click');
		}
	},2000);
	return false;
});

/*EDITAR USUARIO*/

function editarUsuario(usuario){
	$('#mensagemRetornoCadastro').addClass("hiddendiv");
	$('#tituloFomunlarioUsuario').html("Alterar dados de Usuário");
	$('#form_type').val("alterar");
	$("#chave").val(usuario.chave);
	$("#nome").val(usuario.nome);
	$("#sobrenome").val(usuario.sobrenome);
	$("#tipo").val(usuario.tipo);
	$("#email").val(usuario.email);
	$("#telefone").val(usuario.telefone);
	$("#rua").val(usuario.rua);
	$("#numero").val(usuario.numero);
	$("#bairro").val(usuario.bairro);
	$("#cidade").val(usuario.cidade);
	$("#cep").val(usuario.cep);
	$("#login").val(usuario.login);
	$("#senha").val(usuario.senha);
	$("#login-div").addClass("hiddendiv");
	M.updateTextFields();
	$('#tipo').find('option[value="'+usuario.tipo+'"]').prop('selected', true);
	$("#tipo").formSelect();
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
		if ($('#form_type').val()=="cadastrar"){
			M.toast({html: 'Usuario cadastrado!', classes: 'green'});
		}else{
			M.toast({html: 'Usuario atualizado!', classes: 'blue'});
		}
		setTimeout(function(){
			$("#cadastro").modal('close');
			limparCamposFormCadastro();
			$('#mensagemRetornoCadastro').addClass("hiddendiv");
			if ($('#tipo_u').val() == "C"){
				$('#cliente-tab-btn').trigger('click');
			}else{
				$('#funcionario-tab-btn').trigger('click');
			}
		},2000);
	}else{
		$('#mensagemRetornoCadastro').html("Login ja existe!");
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
	$("#rua").val("");
	$("#numero").val("");
	$("#bairro").val("");
	$("#cidade").val("");
	$("#cep").val("");
	$("#login-div").removeClass("hiddendiv");
}




