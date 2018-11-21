var idDivPaginacaoatendimento = "#OpPaginasAtendimento";
var paginaAtualAtendimentos = 1;
var qtdRegistrosAtendimentos = 10;
var qtdRegistrosAtendimentosObtidos = 0;
var urlReservas = "ws/atendimentows/listar/";
var urlUsuarios = "ws/atendimentows/listarAtendimentos/";

$("#agendarAtendimentoForm").submit(function(event) {
	$('#mensagemRetorno').addClass("hiddendiv");
	if (capturarDadosDoForm() != null) {
		var formData = JSON.stringify(capturarDadosDoForm());
		$.ajax({
			url : "ws/atendimentows/cadastrar/",
			type : 'POST',
			data : formData,
			success : function(data) {
				tratarRetornoServidor(data);
			},
			cache : false,
			contentType : "application/json",
			processData : true
		});
	}else{
		$('#mensagemRetorno').addClass("red");
		$('#mensagemRetorno').removeClass("hiddendiv");
	}
	return false;
});

function capturarDadosDoForm() {	
	var myDate=$("#dataCriacao_a").val();
	var usuario = getUsuarioDaSessao();
	var descricao = $("#descricao_a").val();
	var atendimento;
	if (isDadosValidos(usuario, myDate, descricao, atendimento)) {
		myDate=myDate.split("/");
		var newDate=myDate[2]+"-"+myDate[1]+"-"+(parseInt(myDate[0])+1);
		var dataCriacao = new Date(newDate).getTime();
		atendimento = {"usuario":usuario,"dataCriacao": dataCriacao, "descricao": descricao};
	} else {
		atendimento = null;
	}
	return atendimento;
}

function isDadosValidos(usuario, myDate, descricao, atendimento) {
	var mensagem = "";
	var retorno = true;
	if (descricao == null || descricao == "" || descricao.length < 10) {
		mensagem += "<li>É obrigatório preencher a descrição com no minimo 10 caracteres</li>";
		retorno = false;
	}
	if (myDate == null || myDate == "" || myDate.length < 10) {
		mensagem += "<li>É obrigatório selecionar a data para o Atendimento</li>";
		retorno = false;
	}
	$('#mensagemRetorno').html(mensagem);
	return retorno;
}

function tratarRetornoServidor(data) {
	if(data == "sucess"){
		$('#mensagemRetorno').html("Solicitação para o Atendimento realizado com sucesso!");
		$('#mensagemRetorno').addClass("green");
		$('#mensagemRetorno').removeClass("hiddendiv");
		setTimeout(function(){
			$("#modal-s-atendimento").modal('close');
			limparCamposAtendimento();
			$('#mensagemRetorno').addClass("hiddendiv");
			location.href='cliente.do';
		},2000);
	}else{
		$('#mensagemRetorno').html("Houve erro ao cadastrar!");
		$('#mensagemRetorno').addClass("red");
		$('#mensagemRetorno').removeClass("hiddendiv");
	}
}


// TABELA DE ATENDIMENTOS CLIENTE

function carregarAtendimentos(pagina){
    qtdRegistrosAtendimentos = parseInt($("#qtdRegistrosAtendimentos").val());
	$.ajax({
		url: "ws/atendimentows/listar/"+pagina+"/"+qtdRegistrosAtendimentos,
        type: 'GET',
        success: function (data) {
        	qtdRegistrosAtendimentosObtidos = data.length;
        	if(data.length > 0){
        		preencherTabelaAtendimentos(data);
        	}else{
        		if(pagina == 1){
        			$("#tabelaAtendimentos").html('<tr><td colspan="5">Não há atendimentos cadastrados.</td></td>');
        		}else{
        			$("#tabelaAtendimentos").html('<tr><td colspan="5">Não há mais atendimento a serem listados.</td></td>');
        		}
        	}
        }
	});
	paginaAtualAtendimentos = pagina;
	listarOpPaginas(idDivPaginacaoAtendimento,paginaAtualAtendimentos,qtdRegistrosAtendimentos,qtdRegistrosAtendimentosObtidos,"carregarAtendimentos");
}

function preencherTabelaAtendimentos(arrayDeAtendimentos){
	var html = "";
	for( i = 0; i < arrayDeAtendimentos.length; i++){
		html += getLinhaAtendimento(arrayDeAtendimentos[i]);
	}
	$("#tabelaAtendimentos").html(html);	
}

function getLinhaAtendimento(atendimento){
	linha = "<tr>";
	linha +="<td class='col s2 l2'>"+atendimento.usuario.nome+"</td>";
	linha +="<td class='col s2 l2'>"+atendimento.usuario.cep+"</td>";
	linha +="<td class='col s5 l5'>"+atendimento.descricao+"</td>";
    linha +="<td class='col s1 l1'>"+getAcoesAtendimento(atendimento)+"</td>";
	linha +="</tr>";
	return linha;
}

function getAcoesAtendimento(atendimento){
	var html = getBtnInfoAtendimento(atendimento);
	html += getBtnInfoCliente(atendimento);
	html += getBtnExcluirAtendimento(atendimento);
	return html;
}

function getBtnInfoAtendimento(atendimento){
	var html = " <a href='#' data-target='modal-mapa' class='modal-trigger' onclick='abrirInformacoesAtendimento("+JSON.stringify(atendimento.usuario.cep)+")' title='Mais informações'><i class='material-icons'>map</i></a> ";
	return html;
}

function getBtnInfoCliente(atendimento){
	var html = " <a href='#' data-target='cliente_info' class='modal-trigger' onclick='infoCliente("+JSON.stringify(atendimento)+")' title='Editar'><i class='material-icons' aria-hidden='true'>info</i></a> ";
	return html;
}

function getBtnExcluirAtendimento(atendimento){
	var html = ' <a href="#" onclick="excluirAtendimento('+atendimento.chave+')" title="Excluir"><i class="material-icons" aria-hidden="true">delete</i></a>';
	return html;
}

function abrirInformacoesAtendimento(cep){
	$("#txtEndereco").val(cep);
	$('#btnEndereco').trigger('click');
}

function infoCliente(atendimento){
	$("#nome_info").val(atendimento.usuario.nome);
	$("#sobrenome_info").val(atendimento.usuario.sobrenome);
	$("#email_info").val(atendimento.usuario.email);
	$("#telefone_info").val(atendimento.usuario.telefone);
	$("#rua_info").val(atendimento.usuario.rua);
	$("#bairro_info").val(atendimento.usuario.bairro);
	$("#cidade_info").val(atendimento.usuario.cidade);
	$("#cep_info").val(atendimento.usuario.cep);
	$("#login_info").val(atendimento.usuario.login);	
	M.updateTextFields();
}

function excluirAtendimento(chave){
	
}