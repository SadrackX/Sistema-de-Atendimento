package br.com.grupo8.sad.controle.WebServices;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import br.com.grupo8.sad.controle.WebServices.Services.ClienteWS;

@ApplicationPath("ws")
public class ApplicationConfig extends Application{
	
	@Override
	public Set<Class<?>> getClasses(){
		Set<Class<?>> resources = new HashSet<>();
		addRestResourceClasses(resources);
		return resources;
	}
	
	private void addRestResourceClasses(Set<Class<?>> resources){
		resources.add(ClienteWS.class);
	}
}