/**
 * Responsável por criar o bloco de escolha da página "< 1 2 3 4 5 ... >"
 * 
 * @Obrigatório implementar as funções getSetaEsquerda,getSetaDireita e
 *              getLinhaNumeroPagina no script da página
 * @Obrigatório criar uma div na página com id OpPaginas
 * @Obrigatório criar um select com id qtdRegistros
 */
function listarOpPaginas(idDaDiv, paginaAtual, qtdRegistros,
		qtdRegistrosObtidos, acaoSeta) {
	var html = "";
	var primeiraPg;
	var ultimaPg;
	var pg;
	if (paginaAtual < 5) {
		primeiraPg = 1;
		ultimaPg = 10;
	} else {
		ultimaPg = paginaAtual + 5;
		primeiraPg = ultimaPg - 8 - 1;
	}
	html += getSetaEsquerda(paginaAtual, acaoSeta, qtdRegistros,
			qtdRegistrosObtidos);
	if (qtdRegistrosObtidos < qtdRegistros) {
		if (paginaAtual >= 1 && paginaAtual < 10) {
			for (i = 1; i < 10; i++) {
				html += getLinhaNumeroPagina(i, acaoSeta, paginaAtual);
			}
		} else {
			for (i = (paginaAtual - 4); i < (paginaAtual + 4); i++) {
				html += getLinhaNumeroPagina(i, acaoSeta);
			}
		}
	} else {
		for (i = primeiraPg; i < paginaAtual; i++) {
			html += getLinhaNumeroPagina(i, acaoSeta, paginaAtual);
		}
		html += getLinhaNumeroPagina((paginaAtual));
		for (i = paginaAtual + 1; i < ultimaPg; ++i) {
			html += getLinhaNumeroPagina(i, acaoSeta, paginaAtual);
		}
	}
	html += getSetaDireita(paginaAtual, acaoSeta, qtdRegistros,
			qtdRegistrosObtidos);
	$(idDaDiv).html(html);
}

function getSetaEsquerda(paginaAtual, acaoSeta, qtdRegistros,
		qtdRegistrosObtidos) {
	var setaEsquerda;
	if (paginaAtual == 1 || qtdRegistrosObtidos < qtdRegistros) {
		setaEsquerda = '<li class="disabled"><a><i class="material-icons">chevron_left</i></a></li>';
	} else {
		setaEsquerda = '<li class="waves-effect waves-grey"><a href="#" onclick="'
				+ acaoSeta
				+ '('
				+ (paginaAtual - 1)
				+ ')"><i class="material-icons">chevron_left</i></a></li>';
	}
	return setaEsquerda;
}
function getSetaDireita(paginaAtual, acaoSeta, qtdRegistros,
		qtdRegistrosObtidos) {
	var setaDireita = "";
	if (qtdRegistrosObtidos < qtdRegistros) {
		setaDireita = '<li class="disabled"><a><i class="material-icons">chevron_right</i></a></li>';
	} else {
		setaDireita = '<li class="waves-effect waves-grey"><a href="#" onclick="'
				+ acaoSeta
				+ '('
				+ (paginaAtual + 1)
				+ ')"><i class="material-icons">chevron_right</i></a></li>';
	}
	return setaDireita;
}

function getLinhaNumeroPagina(numero, acaoSeta, paginaAtual) {
	var linha;
	if (numero == paginaAtual) {
		linha = '<li class="active grey"><a href="#" onclick="' + acaoSeta
				+ '(' + numero + ')">' + numero + '</a></li>';
	} else {
		linha = '<li class="waves-effect waves-grey"><a href="#" onclick="'
				+ acaoSeta + '(' + numero + ')">' + numero + '</a></li>';
	}
	return linha;
}

function carregarEConverterArquivo(idInputFile, idInputHidden) {
	var file = document.getElementById(idInputFile);
	var reader = new FileReader();
	try {
		reader.readAsDataURL(file.files[0]);
		reader.onloadend = function() {
			$("#" + idInputHidden).val(reader.result);
		};
	} catch (e) {
	}
	console.log(reader.result);
}

function validar(dom, tipo) {
	switch (tipo) {
	case 'num':
		var regex = /[A-Za-z]/g;
		break;
	case 'text':
		var regex = /\d/g;
		break;
	}
	dom.value = dom.value.replace(regex, '');
}

function converteDataStringEmDate(dataString) {
	var dia = parseInt(dataString.substring(1, 3));
	var mes = parseInt(dataString.substring(3, 6)) - 1;
	var ano = parseInt(dataString.substring(6, 11));
	return new Date(ano, mes, dia);
}

function coverterDateEmDataString(data) {
	var dia = data.getDate();
	if (dia.toString().length == 1)
		dia = "0" + dia;
	var mes = data.getMonth() + 1;
	if (mes.toString().length == 1)
		mes = "0" + mes;
	var ano = data.getFullYear();
	return dia + "/" + mes + "/" + ano;
}

function getDateTime(data, horaString) {
	var dia = parseInt(data.substring(1, 3));
	var mes = parseInt(data.substring(3, 6)) - 1;
	var ano = parseInt(data.substring(6, 11));
	var hora = parseInt(horaString.substring(1, 3));
	var minuto = parseInt(horaString.substring(3, 6));
	return new Date(ano, mes, dia, hora, minuto, 0, 0);
}

function getUsuarioDaSessao() {
	var usuario = JSON.parse($("#usuarioDaSessao").val());
	return usuario;
}
// Utilizar onkeyup passando a string com a #id e a variavel event
function validaHora(idCampo, event) {
	var horaCapturada = $(idCampo).val();
	var hora;
	var minuto;
	var teclaPressionada = event.keyCode;
	if (horaCapturada !== null && horaCapturada !== ""
			&& horaCapturada.length > 0) {
		if (horaCapturada.length === 2) {
			hora = parseInt(horaCapturada.substring(0, 2));
			if ((hora >= 0 && hora < 24) && teclaPressionada !== 8) {
				$(idCampo).val(horaCapturada + ':');
			} else {
				$(idCampo).val("");
				Materialize
						.toast(
								'Favor preencher a hora corretamente!'
										+ '<br>O campo deve ser preenchido dentro do intervalo 00:00 até 23:59.',
								4000);
			}
		}
		if (horaCapturada.length > 3) {
			hora = parseInt(horaCapturada.substring(0, 2));
			meio = horaCapturada.substring(2, 3);
			minuto = parseInt(horaCapturada.substring(3, 5));
			if (meio != ":") {
				$(idCampo).val("");
				$(idCampo).focus();
				Materialize
						.toast(
								'Favor preencher a hora corretamente!'
										+ '<br>O campo deve ser preenchido dentro do intervalo 00:00 até 23:59.',
								4000);
			}
			if (minuto.length == 1 && minuto >= 6) {
				$(idCampo).val("");
				$(idCampo).focus();
				Materialize
						.toast(
								'Favor preencher a hora corretamente!'
										+ '<br>O campo deve ser preenchido dentro do intervalo 00:00 até 23:59.',
								4000);
			}
			if (!(hora >= 0 && hora < 24)) {
				$(idCampo).val("");
				$(idCampo).focus();
				Materialize
						.toast(
								'Favor preencher a hora corretamente!'
										+ '<br>O campo deve ser preenchido dentro do intervalo 00:00 até 23:59.',
								4000);
			}
			if (!(minuto > 0 && minuto < 60)) {
				$(idCampo).val("");
				$(idCampo).focus();
				Materialize
						.toast(
								'Favor preencher a hora corretamente!'
										+ '<br>O campo deve ser preenchido dentro do intervalo 00:00 até 23:59.',
								4000);
			}
		}
	}
}


