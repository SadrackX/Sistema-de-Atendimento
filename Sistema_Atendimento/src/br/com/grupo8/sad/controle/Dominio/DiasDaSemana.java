package br.com.grupo8.sad.controle.Dominio;

public enum DiasDaSemana {
	SEGUNDA("segunda-feira",1),
	TERCA("terça-feira", 2),
	QUARTA("quarta-feira",3),
	QUINTA("quinta-feira",4),
	SEXTA("sexta-feira",5),
	SABADO("sábado",6),
	DOMINGO("domingo",7);
	
	private String nome;
	private int codigo;
	
	private DiasDaSemana(String nome, int codigo){
		this.nome = nome;
		this.codigo = codigo;
	}
	
	public String getDescricao(){
		return this.nome;
	}
	
	public static String getDescricao(int codigo){
		if(codigo == SEGUNDA.getCodigo()){
			return SEGUNDA.getDescricao();
		}else if(codigo == TERCA.getCodigo()){
			return TERCA.getDescricao();
		}else if(codigo == QUARTA.getCodigo()){
			return QUARTA.getDescricao();
		}else if(codigo == QUINTA.getCodigo()){
			return QUINTA.getDescricao();
		}else if(codigo == SEXTA.getCodigo()){
			return SEXTA.getDescricao();
		}else if(codigo == SABADO.getCodigo()){
			return SABADO.getDescricao();
		}else if(codigo == DOMINGO.getCodigo()){
			return DOMINGO.getDescricao();
		}else{
			return null;
		}
	}
	
	public int getCodigo(){
		return this.codigo;
	}
	
}