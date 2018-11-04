package br.com.grupo8.sad.model.BO;

import java.util.ArrayList;
import java.util.List;

import br.com.grupo8.sad.model.DAO.EnderecoDAO;
import br.com.grupo8.sad.model.PO.EnderecoPO;

public class EnderecoBO {
	private EnderecoPO enderecoPO;
	private EnderecoDAO enderecoDAO;
	private List<String> mensagensDeErro;
	
	public EnderecoBO(){
		this.mensagensDeErro = new ArrayList<>();
	}
	
	public EnderecoPO capturar(){
		return getEnderecoDAO().capturarPorId(getEnderecoPO());
	}
	
	public boolean cadastrar(){
		if(isDadosValidosParaCadastro()){
			return getEnderecoDAO().cadastrar(getEnderecoPO());
		}else{
			return false;
		}
	}
	
	public boolean atualizar(){
		getEnderecoDAO().atualizar(getEnderecoPO());
		return true;
	}
	
	public boolean excluir(){
		getEnderecoDAO().excluir(getEnderecoPO());
		return true;
	}
	
	public List<EnderecoPO> listar(Integer pagina, Integer qtdRegistros){
		pagina = pagina*qtdRegistros-qtdRegistros;
		return getEnderecoDAO().listar(pagina,qtdRegistros,"");
	}
	
	public List<EnderecoPO> listarTodos(){
		return getEnderecoDAO().listaTodos();
	}
	
	public EnderecoPO getEnderecoPO() {
		if(this.enderecoPO == null){
			this.enderecoPO = new EnderecoPO();
		}
		return enderecoPO;
	}
	
	public void setEnderecoPO(EnderecoPO enderecoPO) {
		this.enderecoPO = enderecoPO;
	}
	
	private EnderecoDAO getEnderecoDAO() {
		if(this.enderecoDAO == null){
			this.enderecoDAO = new EnderecoDAO();
		}
		return enderecoDAO;
	}
	
	private boolean isDadosValidosParaCadastro(){
		if(getEnderecoPO().getCep() == null || getEnderecoPO().getCep().isEmpty()){
			setMensagemErro("O cep do endereco deve ser preenchido.<br/>");
		}
		if(getEnderecoPO().getCep().length() < 5){
			setMensagemErro("O cep do endereco deve digitado corretamente.<br/>");
		}
		
		if(getMensagemErro().isEmpty()){
			return true;
		}else{
			return false;
		}
	}
	
	private void setMensagemErro(String mensagem){
		this.mensagensDeErro.add(mensagem);
	}
	public List<String> getMensagemErro(){
		return this.mensagensDeErro;
	}
	
}