var idDivPaginacaoAtendimento = "#OpPaginasAtendimento";
var paginaAtualAtendimentos = 1;
var qtdRegistrosAtendimentos = 10;
var qtdRegistrosAtendimentosObtidos = 0;
var urlAtendimentos = "ws/atendimentows/listar/";
var urlUsuarios = "ws/atendimentows/listarAtendimentos/";

/*CADASTRAR ATENDIMENTO*/

function solicitarAt(){
	limparCamposAtendimento();
	M.updateTextFields();
	$("#modal-s-atendimento").modal('open');
}

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

/*TABELA DE ATENDIMENTOS*/

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
	var html = " <a style='padding: 5px' href='#' onclick='abrirInformacoesAtendimento("+JSON.stringify(atendimento)+")' title='Mais informações'><i class='blue-text fas fa-map-marked-alt fa-2x'/></a> ";
	return html;
}

function getBtnInfoCliente(atendimento){
	var html = " <a style='padding: 5px' href='#' onclick='infoCliente("+JSON.stringify(atendimento)+")' title='Informações do cliente'><i class='blue-text fas fa-info-circle fa-2x'/></a> ";
	return html;
}

function getBtnAtender(atendimento){
	var html = " <a style='padding: 5px' href='#' onclick='atender("+JSON.stringify(atendimento)+")' title='Atender'><i class='green-text fas fa-clipboard-check fa-2x'/></a>";
	return html;
}

function getBtnMotivo(atendimento){
	var html = " <a style='padding: 5px' href='#' onclick='motivoBtn("+JSON.stringify(atendimento)+")' title='Motivo'><i class='orange-text fas fa-exclamation-triangle fa-2x'/></a>";
	return html;
}

/*MOTIVO*/

function motivoBtn(atendimento){
	$.ajax({
		url : "ws/conclusaows/capturar/"+atendimento.chave,
		type : 'GET',
		success : function(data) {
			retornoMt(data);
		},
	});
}

function retornoMt(data){
	$("#at-ipt").addClass('hiddendiv');
	$("#btn-submit").addClass('hiddendiv');
	$("#atendimento-ta").val(data.motivo);
	$("#atender-modal").modal('open');
}

/*INFO DO ATENDIMENTO & CLIENTE*/

function abrirInformacoesAtendimento(atendimento){
	$("#txtEndereco").val(atendimento.usuario.cep);
	$('#btnEndereco').trigger('click');
	$("#modal-mapa").modal('open');
}

function infoCliente(atendimento){
	$("#nome_info").val(atendimento.usuario.nome);
	$("#sobrenome_info").val(atendimento.usuario.sobrenome);
	$("#email_info").val(atendimento.usuario.email);
	$("#telefone_info").val(atendimento.usuario.telefone);
	$("#rua_info").val(atendimento.usuario.rua);
	$("#numero_info").val(atendimento.usuario.numero);
	$("#bairro_info").val(atendimento.usuario.bairro);
	$("#cidade_info").val(atendimento.usuario.cidade);
	$("#cep_info").val(atendimento.usuario.cep);
	$("#login_info").val(atendimento.usuario.login);	
	M.updateTextFields();
	$("#cliente_info").modal('open');
}

/*ATENDER*/

var atendimento_tb;
function atender(atendimento){
	atendimento_tb = atendimento;	
	$("#at-ipt").removeClass('hiddendiv');
	$('#mensagemRetorno_atendimento').addClass("hiddendiv");
	$("#btn-submit").removeClass('hiddendiv');
	$("#atender-modal").modal('open');
}

$("#atender").submit(function(event){
	$('#mensagemRetorno_atendimento').addClass("hiddendiv");
	if (capturarDadosAtender() != null){
	var formData = JSON.stringify(capturarDadosAtender());
	$.ajax({
		url : "ws/conclusaows/atender/",
		type : 'POST',
		data : formData,
		success : function(data) {
			$("#atender-modal").modal('close');
			M.toast({html: at_situacao, classes: 'blue'});
			carregarAtendimentos(1);
		},
		cache : false,
		contentType : "application/json",
		processData : true
	});
	}else{
		$('#mensagemRetorno_atendimento').addClass("red");
		$('#mensagemRetorno_atendimento').removeClass("hiddendiv");
	}
	return false;
});

var at_situacao;
function capturarDadosAtender(){
	var motivo = null;
	var usuario = getUsuarioDaSessao();
	var dataConclusao = new Date().getTime();
	atendimento_tb.status = "C";
	if(!$("#atendimento-cb").is(':checked')){
		motivo = $("#atendimento-ta").val();
		atendimento_tb.status = "N";
		at_situacao = "Atendimento adiado!";
	}else{
		at_situacao = "Atendimento concluido!";
		motivo = "AtendimentoConcluido";
	}
	var conclusao;
	if(validarMotivo(motivo)){
		conclusao = {"motivo":motivo, "usuario": usuario, "atendimento": atendimento_tb, "dataConclusao": dataConclusao};
	}else{
		conclusao = null;
	}
	return conclusao;
}

function validarMotivo(motivo){
	var mensagem = "";
	var retorno = true;
	if (motivo == null || motivo == "" || motivo.length < 10) {
		mensagem += "<li>É obrigatório preencher o MOTIVO com no minimo 10 caracteres</li>";
		retorno = false;
	}
	$('#mensagemRetorno_atendimento').html(mensagem);
	return retorno;
}

/*RETORNO E VALIDACOES*/

function tratarRetornoServidor(data) {
	if(data == "sucess"){
		M.toast({html: 'Solicitação para o Atendimento realizado com sucesso!', classes: 'green'});
		setTimeout(function(){
			$("#modal-s-atendimento").modal('close');
			limparCamposAtendimento();
			$('#mensagemRetorno').addClass("hiddendiv");
		},2000);
	}else{
		$('#mensagemRetorno').html("Não é possivel solicitar um novo atendimento<br/>enquanto estiver outro ativo!");
		$('#mensagemRetorno').addClass("red");
		$('#mensagemRetorno').removeClass("hiddendiv");
	}
}

function limparCamposAtendimento(){
	$("#descricao_a").val("");
	$("#dataCriacao_a").val("");
}

/*LISTAR ATENDIMENTO NA PAGINA DO CLIENTE*/

function carregarAtendimentos_pgCliente(){
	var usuario = getUsuarioDaSessao();
    qtdRegistrosAtendimentos = parseInt($("#qtdRegistrosAtendimentos").val());
	$.ajax({
		url: "ws/atendimentows/listarbyid/"+usuario.chave,
        type: 'GET',
        success: function (data) {
        	qtdRegistrosAtendimentosObtidos = data.length;
        	if(data.length > 0){
        		preencherTabelaAtendimentos_pgCliente(data);
        	}else{
        		$("#tabelaAtendimentos_pgCliente").html('<tr><td colspan="5">Não há atendimentos cadastrados.</td></td>');
        	}
        }
	});}

function preencherTabelaAtendimentos_pgCliente(data){
	var html = "";
	for( i = 0; i < data.length; i++){
		html += getLinhaAtendimento_pgCliente(data[i]);
	}
	$("#tabelaAtendimentos_pgCliente").html(html);	
}
function getLinhaAtendimento_pgCliente(atendimento){
	linha = "<tr>";
	linha +="<td>"+atendimento.usuario.nome+"</td>";
	linha +="<td>"+atendimento.usuario.cep+"</td>";
	linha +="<td><p class='hide-on-med-and-down'>"+atendimento.descricao+"</p><a class='blue hide-on-large-only hide-on-large-only waves-effect waves-light btn' onclick='modalDescricao("+JSON.stringify(atendimento)+")' >Descrição completa</a></td>";
    linha +="<td>"+(atendimento.status == null ? "Aberto" : "Não completado")+"</td>";
	linha +="</tr>";
	return linha;
}

