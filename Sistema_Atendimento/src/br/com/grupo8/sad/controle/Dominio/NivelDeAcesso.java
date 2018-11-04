package br.com.grupo8.sad.controle.Dominio;

import java.util.ArrayList;

public enum NivelDeAcesso {
	GERENCIAL('G',"Gerencial"),
	ATENDIMENTO('A',"Atendimento"),
	MASTER('M',"Master");
	
	private char codigo;
	private String descricao;
	
	private NivelDeAcesso(char codigo, String descricao){
		this.codigo= codigo;
		this.descricao = descricao;
	}
	
	public char getCodigo(){
		return this.codigo;
	}
	public String getDescricao(){
		return this.descricao;
	}
	public static String getDescricao(char codigo){
		String retorno;
		if(codigo == ATENDIMENTO.getCodigo()){
			retorno = ATENDIMENTO.getDescricao();
		}else if(codigo == GERENCIAL.getCodigo()){
			retorno = GERENCIAL.getDescricao();
		}else if(codigo == MASTER.getCodigo()){
			retorno = MASTER.getDescricao();
		}else{
			retorno = "Não especificado.";
		}
		return retorno;
	}
	
	public static ArrayList<Character> getListaNiveisDeAcesso(){
		ArrayList<Character> lista = new ArrayList<>();
		lista.add(ATENDIMENTO.getCodigo());
		lista.add(GERENCIAL.getCodigo());
		lista.add(MASTER.getCodigo());
		return lista;
	}
}