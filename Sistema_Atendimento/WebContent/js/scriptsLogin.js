var LOGIN_INVALIDO= "Login inválido.";
var SENHA_INCORRETA = "Senha Incorreta";

$('#formularioDeLogin').submit(function (event) {
	$("#barraCarregando").removeClass("hiddendiv");
	var form = {"login":$("#login").val(),"senha":$("#senha").val()};
	var formData = JSON.stringify(form);
    $.ajax({
        url: "autenticar.do",
        type: 'POST',
        data: formData,
        success: function (data) {
        	$("#retornoServidor").addClass("hiddendiv");
            if(data.loginValido==0 && data.senhaValida==0){
            	$("#barraCarregando").addClass("hiddendiv");
            	$("#mensagemRetorno").html(LOGIN_INVALIDO);
            	$("#retornoServidor").removeClass("hiddendiv");
            }else if(data.loginValido==1 && data.senhaValida==0){
            	$("#barraCarregando").addClass("hiddendiv");
            	$("#mensagemRetorno").html(SENHA_INCORRETA);
            	$("#retornoServidor").removeClass("hiddendiv");
            }else if(data.loginValido==1 && data.senhaValida==1){
            	setTimeout(entrar,2000);
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
    return false;
});

function entrar(){
    location.href='index.do';
}
