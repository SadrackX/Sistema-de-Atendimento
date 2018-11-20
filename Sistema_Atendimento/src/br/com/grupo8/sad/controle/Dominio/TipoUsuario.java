package br.com.grupo8.sad.controle.Dominio;

public enum TipoUsuario {
	CLIENTE('C',"CLIENTE"),
	FUNCIONARIO('F',"FUNCIONÁRIO");
	
	private char codigo;
	private String descricao;
	
	TipoUsuario(char codigo, String descricao){
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return this.descricao;
	}
	public static String getDescricao(char codigo){
		String retorno = "NÃO DEFINIDO";
		if(TipoUsuario.CLIENTE.getCodigo() == codigo){
			retorno = TipoUsuario.CLIENTE.getDescricao();
		}else if(TipoUsuario.FUNCIONARIO.getCodigo() == codigo){
			retorno = TipoUsuario.FUNCIONARIO.getDescricao();
		}
		return retorno;
	}
	public char getCodigo(){
		return this.codigo;
	}
	
	public boolean equals(Character codigo){
		return this.getCodigo() == codigo.charValue() ? true : false;
	}
}