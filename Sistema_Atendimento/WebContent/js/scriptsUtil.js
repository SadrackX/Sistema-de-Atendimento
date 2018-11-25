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

function getUsuarioDaSessao() {
	var usuario = JSON.parse($("#usuarioDaSessao").val());
	return usuario;
}

function soLetras(e) {
    if (document.all) {
        var evt = event.keyCode;
    } else {
        var evt = e.charCode;
    }
    var chr = String.fromCharCode(evt);
    var re = /[A-Za-z\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/; // permite apenas de A-Z e de a-z e acentuação
    return (re.test(chr) || evt < 20); // com evt < 20 permitimos <ENTER>,<TAB>,<BACKSPACE>
}

function soLetrasNumeros(e) {
    if (document.all) {
        var evt = event.keyCode;
    } else {
        var evt = e.charCode;
    }
    var chr = String.fromCharCode(evt);
    var re = /[A-Za-z0-9\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/; // permite apenas de A-Z e de a-z e acentuação
    return (re.test(chr) || evt < 20); // com evt < 20 permitimos <ENTER>,<TAB>,<BACKSPACE>
}

$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'NUMBER' || d.type.toUpperCase() === 'EMAIL')) 
             || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = false;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});


