package br.com.grupo8.sad.model.BO;

import java.util.ArrayList;
import java.util.List;

import br.com.grupo8.sad.model.DAO.AtendimentoDAO;
import br.com.grupo8.sad.model.PO.AtendimentoPO;

public class AtendimentoBO {
	private AtendimentoPO atendimentoPO;
	private AtendimentoDAO atendimentoDAO;
	private List<String> mensagensDeErro;
	
	private final int ATENDIMENTOS_ATIVOS = 1;
	private final int ATENDIMENTOS_EXCLUIDOS = 0;
	
	public AtendimentoBO(){
		this.mensagensDeErro = new ArrayList<>();
	}
	
	public AtendimentoPO capturar(){
		return getAtendimentoDAO().capturarPorId(getAtendimentoPO());
	}
	
	public boolean cadastrar(){
		if(isDadosValidosParaCadastro()){
			return getAtendimentoDAO().cadastrar(getAtendimentoPO());
		}else{
			return false;
		}
	}
	public boolean atualizar(){
		getAtendimentoDAO().atualizar(getAtendimentoPO());
		return true;
	}
	public boolean excluir(){
		getAtendimentoDAO().excluir(getAtendimentoPO());
		return true;
	}
	
	public List<AtendimentoPO> listar(Integer pagina, Integer qtdRegistros){
		pagina = pagina*qtdRegistros-qtdRegistros;
		return getAtendimentoDAO().listar(pagina,qtdRegistros, getFiltro(ATENDIMENTOS_ATIVOS));
	}
	
	public List<AtendimentoPO> listarTodos(){
		return getAtendimentoDAO().listaTodos();
	}
	
	public AtendimentoPO getAtendimentoPO() {
		if(this.atendimentoPO == null){
			this.atendimentoPO = new AtendimentoPO();
		}
		return atendimentoPO;
	}
	public void setAtendimentoPO(AtendimentoPO atendimentoPO) {
		this.atendimentoPO = atendimentoPO;
	}
	private AtendimentoDAO getAtendimentoDAO() {
		if(this.atendimentoDAO == null){
			this.atendimentoDAO = new AtendimentoDAO();
		}
		return atendimentoDAO;
	}
	
	private boolean isDadosValidosParaCadastro(){
		if(getAtendimentoPO().getDescricao() == null || getAtendimentoPO().getDescricao().isEmpty()){
			setMensagemErro("A descricao do atendimento deve ser preenchido.<br/>");
		}
		if(getAtendimentoPO().getDescricao().length() < 5){
			setMensagemErro("A descricao do atendimento deve conter no mínimo 5 caracteres.<br/>");
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
		case ATENDIMENTOS_ATIVOS: filtro = "WHERE u.dataExclusao IS NULL ORDER BY u.nome ASC";	
			break;
		case ATENDIMENTOS_EXCLUIDOS: filtro = "WHERE u.dataExclusao IS NOT NULL ORDER BY u.nome ASC";
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