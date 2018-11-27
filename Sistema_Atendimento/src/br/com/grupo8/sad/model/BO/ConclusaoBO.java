package br.com.grupo8.sad.model.BO;

import java.util.ArrayList;
import java.util.List;

import br.com.grupo8.sad.model.DAO.ConclusaoDAO;
import br.com.grupo8.sad.model.PO.ConclusaoPO;

public class ConclusaoBO {
	private ConclusaoPO conclusaoPO;
	private ConclusaoDAO conclusaoDAO;
	private List<String> mensagensDeErro;
	
	public ConclusaoBO(){
		this.mensagensDeErro = new ArrayList<>();
	}
	
	public ConclusaoPO capturar(){
		return getConclusaoDAO().capturarPorId(getConclusaoPO());
	}
	
	public boolean cadastrar(){
		return getConclusaoDAO().cadastrar(getConclusaoPO());
	}
	public boolean atualizar(){
		getConclusaoDAO().atualizar(getConclusaoPO());
		return true;
	}
	public boolean excluir(){
		getConclusaoDAO().excluir(getConclusaoPO());
		return true;
	}
	public ConclusaoPO getConclusaoPO() {
		if(this.conclusaoPO == null){
			this.conclusaoPO = new ConclusaoPO();
		}
		return conclusaoPO;
	}
	public void setConclusaoPO(ConclusaoPO conclusaoPO) {
		this.conclusaoPO = conclusaoPO;
	}
	private ConclusaoDAO getConclusaoDAO() {
		if(this.conclusaoDAO == null){
			this.conclusaoDAO = new ConclusaoDAO();
		}
		return conclusaoDAO;
	}	
	
	@SuppressWarnings("unused")
	private void setMensagemErro(String mensagem){
		this.mensagensDeErro.add(mensagem);
	}
	public List<String> getMensagemErro(){
		return this.mensagensDeErro;
	}
	
}