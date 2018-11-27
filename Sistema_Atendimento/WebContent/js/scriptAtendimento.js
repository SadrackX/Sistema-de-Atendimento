var idDivPaginacaoAtendimento = "#OpPaginasAtendimento";
var paginaAtualAtendimentos = 1;
var qtdRegistrosAtendimentos = 10;
var qtdRegistrosAtendimentosObtidos = 0;
var urlAtendimentos = "ws/atendimentows/listar/";
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

$('#at-tab-btn').click(function(event){
	$('#tipo_a').val("1");
	carregarAtendimentos(1);
});
$('#at-nc-tab-btn').click(function(event){
	$('#tipo_a').val("0");
	carregarAtendimentos(1);
});

function carregarAtendimentos(pagina){
    qtdRegistrosAtendimentos = parseInt($("#qtdRegistrosAtendimentos").val());
	$.ajax({
		url: "ws/atendimentows/listar/"+pagina+"/"+qtdRegistrosAtendimentos+"/"+$("#tipo_a").val(),
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
	linha +="<td>"+atendimento.usuario.nome+"</td>";
	linha +="<td>"+atendimento.usuario.cep+"</td>";
	linha +="<td><p class='hide-on-med-and-down'>"+atendimento.descricao+"</p><a class='blue hide-on-large-only hide-on-large-only waves-effect waves-light btn' onclick='modalDescricao("+JSON.stringify(atendimento)+")' >Descrição completa</a></td>";
    linha +="<td>"+getAcoesAtendimento(atendimento)+"</td>";
	linha +="</tr>";
	return linha;
}

function modalDescricao(atendimento){
	$("#descricao_modal_txt").val(atendimento.descricao);
	$("#descricao_modal").modal('open');
}

function getAcoesAtendimento(atendimento){
	var html = getBtnInfoAtendimento(atendimento);
	html += getBtnInfoCliente(atendimento);
	html += getBtnAtender(atendimento);
	if (atendimento.status != null){
	html += getBtnMotivo(atendimento);
	}
	return html;
}

function getBtnInfoAtendimento(atendimento){
	var html = " <a style='padding: 5px' href='' data-target='modal-mapa' class='modal-trigger' onclick='abrirInformacoesAtendimento("+JSON.stringify(atendimento.usuario.cep)+")' title='Mais informações'><i class='blue-text fas fa-map-marked-alt fa-2x'/></a> ";
	return html;
}

function getBtnInfoCliente(atendimento){
	var html = " <a style='padding: 5px' href='' data-target='cliente_info' class='modal-trigger' onclick='infoCliente("+JSON.stringify(atendimento)+")' title='Informações do cliente'><i class='blue-text fas fa-info-circle fa-2x'/></a> ";
	return html;
}

function getBtnAtender(atendimento){
	var html = " <a style='padding: 5px' href='' data-target='atender-modal' class='modal-trigger' onclick='atender("+JSON.stringify(atendimento)+")' title='Atender'><i class='green-text fas fa-clipboard-check fa-2x'/></a>";
	return html;
}

function getBtnMotivo(atendimento){
	var html = " <a style='padding: 5px' href='#!' onclick='motivoBtn("+JSON.stringify(atendimento)+")' title='Motivo'><i class='orange-text fas fa-exclamation-triangle fa-2x'/></a>";
	return html;
}

function motivoBtn(atendimento){
	$.ajax({
		url : "ws/conclusaows/capturar/"+atendimento.chave,
		type : 'GET',
		success : function(data) {
			retornoMt(data);
		},
		cache : false,
		contentType : "application/json",
		processData : true
	});
}

function retornoMt(data){
	$("#at-ipt").addClass('hiddendiv');
	$("#at-btn").addClass('hiddendiv');
	$("#at-btn-M").removeClass('hiddendiv');
	$("#atendimento-ta").val(data.motivo);
	$("#atender-modal").modal('open');
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

var atendimento_tb;
function atender(atendimento){
	atendimento_tb = atendimento;	
	$("#at-ipt").removeClass('hiddendiv');
	$("#at-btn").removeClass('hiddendiv');
	$("#at-btn-M").addClass('hiddendiv');
}

$("#atender").submit(function(event){
	var formData = JSON.stringify(capturarDadosAtender());
	$.ajax({
		url : "ws/conclusaows/atender/",
		type : 'POST',
		data : formData,
		success : function(data) {
			$("#atender-modal").modal('close');
			M.toast(html, "Atendimento Concluido!");
		},
		cache : false,
		contentType : "application/json",
		processData : true
	});
});

function capturarDadosAtender(){
	var motivo = null;
	var usuario = getUsuarioDaSessao();
	var dataConclusao = new Date().getTime();
	atendimento_tb.status = "C";
	if(!$("#atendimento-cb").is(':checked')){
		motivo = $("#atendimento-ta").val();
		atendimento_tb.status = "N";
	}
	return conclusao = {"motivo":motivo, "usuario": usuario, "atendimento": atendimento_tb, "dataConclusao": dataConclusao};
}





