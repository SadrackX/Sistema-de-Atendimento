var LOGIN_INVALIDO= "Login inválido.";
var SENHA_INCORRETA = "Senha Incorreta";
var LOGANDO = "Logando!!!";

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
    M.Toast.dismissAll();
});

function tratarLoginRetorno(data){
    if(data.loginValido==0 && data.senhaValida==0){
    	M.toast({html: LOGIN_INVALIDO, classes: 'red'});
    }else if(data.loginValido==1 && data.senhaValida==0){
    	M.toast({html: SENHA_INCORRETA , classes: 'red'});    	
    }else if(data.loginValido==1 && data.senhaValida==1){
    	M.toast({html: LOGANDO, classes: 'green'});
    	setTimeout(function(){
    		location.href='index.do';
    	},2000);
    }
}

