package br.com.grupo8.sad.model.BO;

import java.util.ArrayList;
import java.util.List;

import br.com.grupo8.sad.model.DAO.ConclusaoDAO;
import br.com.grupo8.sad.model.PO.ConclusaoPO;

public class ConclusaoBO {
	private ConclusaoPO conclusaoPO;
	private ConclusaoDAO conclusaoDAO;
	private List<String> mensagensDeErro;
	
	private final int CONCLUSOES_ATIVOS = 1;
	private final int CONCLUSOES_EXCLUIDOS = 0;
	
	public ConclusaoBO(){
		this.mensagensDeErro = new ArrayList<>();
	}
	
	public ConclusaoPO capturar(){
		return getConclusaoDAO().capturarPorId(getConclusaoPO());
	}
	
	public boolean cadastrar(){
		if(isDadosValidosParaCadastro()){
			return getConclusaoDAO().cadastrar(getConclusaoPO());
		}else{
			return false;
		}
	}
	public boolean atualizar(){
		getConclusaoDAO().atualizar(getConclusaoPO());
		return true;
	}
	public boolean excluir(){
		getConclusaoDAO().excluir(getConclusaoPO());
		return true;
	}
	
	public List<ConclusaoPO> listar(Integer pagina, Integer qtdRegistros){
		pagina = pagina*qtdRegistros-qtdRegistros;
		return getConclusaoDAO().listar(pagina,qtdRegistros, getFiltro(CONCLUSOES_ATIVOS));
	}
	
	public List<ConclusaoPO> listarTodos(){
		return getConclusaoDAO().listaTodos();
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
	
	private boolean isDadosValidosParaCadastro(){
		if(getConclusaoPO().getMotivo() == null || getConclusaoPO().getMotivo().isEmpty()){
			setMensagemErro("O nome da conclusao deve ser preenchido.<br/>");
		}
		if(getConclusaoPO().getMotivo().length() < 5){
			setMensagemErro("O nome da conclusao deve conter no mínimo 5 caracteres.<br/>");
		}
		
		if(getMensagemErro().isEmpty()){
			return true;
		}else{
			return false;
		}
	}
	
	
	private String getFiltro(int codigo){
		String filtro = "";
		switch (codigo) {
		case CONCLUSOES_ATIVOS: filtro = "WHERE u.dataExclusao IS NULL ORDER BY u.nome ASC";	
			break;
		case CONCLUSOES_EXCLUIDOS: filtro = "WHERE u.dataExclusao IS NOT NULL ORDER BY u.nome ASC";
			break;
		}
		return filtro;
	}
	
	private void setMensagemErro(String mensagem){
		this.mensagensDeErro.add(mensagem);
	}
	public List<String> getMensagemErro(){
		return this.mensagensDeErro;
	}
	
}