package br.com.grupo8.sad.model.Util;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class PersistenceUtil {
	private static EntityManagerFactory fabrica;
	
	static{
		try{
			fabrica = Persistence.createEntityManagerFactory("sad");
		}catch(EntityExistsException ex){
                    System.out.println("Error ao capturar o entity manager");
		}catch (Exception e) {
			System.out.println("Ocorreu um erro inesperado. Causa: \n");
		}
	}
	
	public static EntityManager getEntityManager(){
		return fabrica.createEntityManager();
	}
}
