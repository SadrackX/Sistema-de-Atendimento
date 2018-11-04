package br.com.grupo8.sad.controle.Util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;

import br.com.grupo8.sad.model.PO.UsuarioPO;

public class JsonUtil {
	
	public static UsuarioPO converterJsonEmUsuario(HttpServletRequest request) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
        String json = "";
        if(br != null){
            json = br.readLine();
        }
        Gson gson = new Gson();
        return gson.fromJson(json, UsuarioPO.class);
	}
	
	public static String converterObjetoEmJson(Object objeto){
		return new Gson().toJson(objeto);
	}
}