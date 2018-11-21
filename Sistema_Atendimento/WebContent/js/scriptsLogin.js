var LOGIN_INVALIDO= "Login inválido.";
var SENHA_INCORRETA = "Senha Incorreta";

$('#loginForm').submit(function (event) {
	var form = {"login":$("#login_l").val(),"senha":$("#senha_l").val()};
	var formData = JSON.stringify(form);
    $.ajax({
        url: "autenticar.do",
        type: 'POST',
        data: formData,
        success: function (data) {
        	tratarLoginRetorno(data);
        },
        cache: false,
        contentType: false,
        processData: false
    });
    return false;
});

function tratarLoginRetorno(data){
	$("#retornoServidor_login").addClass("hiddendiv");
    if(data.loginValido==0 && data.senhaValida==0){
    	$("#mensagemRetorno_login").html(LOGIN_INVALIDO);
    	$("#retornoServidor_login").removeClass("hiddendiv");
    	M.toast({html: 'Login incorreto!!'});
    }
    if(data.loginValido==1 && data.senhaValida==0){
    	$("#mensagemRetorno_login").html(SENHA_INCORRETA);
    	$("#retornoServidor_login").removeClass("hiddendiv");
    	M.toast({html: 'Senha incorreta!!'});    	
    }
    if(data.loginValido==1 && data.senhaValida==1){
    	setTimeout(location.href='index.do',1000);
    }
}
