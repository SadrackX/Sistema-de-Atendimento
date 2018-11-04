package br.com.grupo8.sad.controle.Dominio;

public enum StatusUsuario {
	
	ATIVO('A',"Ativo"),
	INATIVO('I',"Inativo"),
	EXCLUIDO('E',"Excluído");
	
	private char codigo;
	private String descricao;

	private StatusUsuario(char codigo, String descricao){
            this.codigo = codigo;
            this.descricao = descricao;
        }
        
	public char getCodigo(){
		return this.codigo;
	}
	
	public String getDescricao(){ 
		return this.descricao;
	}
	
	public String getDescricao(char codigo){
		String retorno = "Não definido";
		if(StatusUsuario.ATIVO.getCodigo() == codigo){
			retorno = StatusUsuario.ATIVO.getDescricao();
		}else if(StatusUsuario.INATIVO.getCodigo() == codigo){
			retorno = StatusUsuario.INATIVO.getDescricao();
		}else if(StatusUsuario.EXCLUIDO.getCodigo() == codigo){
			retorno = StatusUsuario.EXCLUIDO.getDescricao();
		}
		return retorno;
	}
        
    public void setCodigo(char codigo){
        this.codigo=codigo;
    }
}