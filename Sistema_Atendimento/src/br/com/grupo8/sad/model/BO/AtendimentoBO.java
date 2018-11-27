package br.com.grupo8.sad.model.BO;

import java.util.ArrayList;
import java.util.List;

import br.com.grupo8.sad.model.DAO.AtendimentoDAO;
import br.com.grupo8.sad.model.PO.AtendimentoPO;

public class AtendimentoBO {
	private AtendimentoPO atendimentoPO;
	private AtendimentoDAO atendimentoDAO;
	private List<String> mensagensDeErro;
	
	public AtendimentoBO(){
		this.mensagensDeErro = new ArrayList<>();
	}
	
	public boolean cadastrar(){
		return getAtendimentoDAO().cadastrar(getAtendimentoPO());
	}
	
	public AtendimentoPO capturar(){
		return getAtendimentoDAO().capturarPorId(getAtendimentoPO());
	}
	
	public boolean atualizar(){
		AtendimentoPO atendimento = getAtendimentoDAO().capturarPorId(getAtendimentoPO());
		if(atendimento != null){
			return getAtendimentoDAO().atualizar(getAtendimentoPO());
		}else{
			return true;
		}
	}
	public boolean excluir(){
		AtendimentoPO atendimento = getAtendimentoDAO().capturarPorId(getAtendimentoPO());
		if(atendimento != null){
			return getAtendimentoDAO().excluir(getAtendimentoPO());
		}else{
			return true;
		}
	}
	
	public List<AtendimentoPO> listar(Integer pagina, Integer qtdRegistros, Integer tipo){
		pagina = pagina*qtdRegistros-qtdRegistros;
		return getAtendimentoDAO().listar(pagina,qtdRegistros, getFiltro(tipo));
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
	
	
	private String getFiltro(int codigo){
		String filtro = "";
		switch (codigo) {
		case 1: filtro = "WHERE u.status IS NULL";	
			break;
		case 0: filtro = "WHERE u.status = 'N'";
			break;
		}
		return filtro;
	}
	
	@SuppressWarnings("unused")
	private void setMensagemErro(String mensagem){
		this.mensagensDeErro.add(mensagem);
	}
	public List<String> getMensagemErro(){
		return this.mensagensDeErro;
	}
	
}