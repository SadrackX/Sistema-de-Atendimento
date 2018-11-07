$(document).ready(function() { $('.sidenav').sidenav(); });
$(document).ready(function() { $('select').formSelect(); });

$(document).ready(function() { 
	$('.datepicker').datepicker({
    i18n: {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Hoje',
        clear: 'Limpar',
        cancel: 'Sair',
        done: 'Confirmar',
        labelMonthNext: 'Próximo mês',
        labelMonthPrev: 'Mês anterior',
        labelMonthSelect: 'Selecione um mês',
        labelYearSelect: 'Selecione um ano',
        selectMonths: true,
        selectYears: 15,
    },
    format: 'dd/mm/yy',
    container: 'body',
    minDate: new Date(),
	});
});

//inicia tabs da janela
$(document).ready(function () {$('ul.tabs').tabs();});

//inicia janelas modais
$(document).ready(function () {$('.modal').modal();});

$( document ).ready(function(){$(".button-collapse").sideNav();});


//Scroll up
$(document).ready(function(){
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('#scrollToTop').fadeIn();
		} else {
			$('#scrollToTop').fadeOut();
		}
    });
    $('#scrollToTop').click(function(){
    	$('html, body').animate({scrollTop : 0},200);
    	return false;
    }); 
});


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


