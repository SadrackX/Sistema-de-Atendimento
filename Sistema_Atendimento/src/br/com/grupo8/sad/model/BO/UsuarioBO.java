package br.com.grupo8.sad.model.BO;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import br.com.grupo8.sad.model.DAO.UsuarioDAO;
import br.com.grupo8.sad.model.PO.UsuarioPO;
import br.com.grupo8.sad.controle.Dominio.StatusUsuario;

public class UsuarioBO {
	private UsuarioPO usuarioPO;
	private UsuarioDAO usuarioDAO;
	private List<String> mensagensErro;
	
	private final int USUARIOS_ATIVOS = 1;
	private final int USUARIOS_EXCLUIDOS = 0;
	
	public UsuarioBO(){
		this.mensagensErro = new ArrayList<>();
	}
	
	public UsuarioPO capturar(){
		return getUsuarioDAO().capturarPorId(getUsuarioPO());
	}
	
	public boolean cadastrar(){
		if(isDadosValidosParaCadastro()){
			return getUsuarioDAO().cadastrar(getUsuarioPO());
		}else{
			return false;
		}
	}
	public boolean atualizar(){
		return getUsuarioDAO().atualizar(getUsuarioPO());
	}
	public boolean excluir(){
		UsuarioPO usuario = getUsuarioDAO().capturarPorId(usuarioPO);
		if(usuario !=null){
			usuario.setDataExclusao(Calendar.getInstance());
			usuario.setStatus(StatusUsuario.EXCLUIDO.getCodigo());
			return getUsuarioDAO().excluir(usuario);
		}else{
			return false;
		}
	}
	
	public List<UsuarioPO> listar(Integer pagina, Integer qtdRegistros){
		pagina = pagina*qtdRegistros-qtdRegistros;
		return getUsuarioDAO().listar(pagina,qtdRegistros, getFiltro(USUARIOS_ATIVOS));
	}
	
	public UsuarioPO getUsuarioPO() {
		if(this.usuarioPO == null){
			this.usuarioPO = new UsuarioPO();
		}
		return usuarioPO;
	}
	
	public void setUsuarioPO(UsuarioPO usuarioPO) {
		this.usuarioPO = usuarioPO;
	}
	
	private UsuarioDAO getUsuarioDAO() {
		if(this.usuarioDAO == null){
			this.usuarioDAO = new UsuarioDAO();
		}
		return usuarioDAO;
	}
	
	private boolean isDadosValidosParaCadastro(){
		if(getUsuarioPO().getNome() == null || getUsuarioPO().getNome().isEmpty()){
			setMensagemErro("O nome do usuario deve ser preenchido.<br/>");
		}
		if(getUsuarioPO().getNome().length() < 5){
			setMensagemErro("O nome do usuario deve conter no mínimo 5 caracteres.<br/>");
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
		case USUARIOS_ATIVOS: filtro = "WHERE u.dataExclusao IS NULL ORDER BY u.nome ASC";	
			break;
		case USUARIOS_EXCLUIDOS: filtro = "WHERE u.dataExclusao IS NOT NULL ORDER BY u.nome ASC";
			break;
		}
		return filtro;
	}
	
	private void setMensagemErro(String mensagem){
		this.mensagensErro.add(mensagem);
	}
	public List<String> getMensagemErro(){
		this.mensagensErro = new ArrayList<>();
		this.mensagensErro.add("error");
		return this.mensagensErro;
	}

	public UsuarioPO capturarUsuarioValido(){
		UsuarioPO usuarioCapturado = getUsuarioDAO().capturarPorId(getUsuarioPO());
		if(usuarioCapturado != null && usuarioCapturado.getStatus().charValue() == StatusUsuario.ATIVO.getCodigo()){
			if(!getUsuarioPO().getLogin().equals(usuarioCapturado.getLogin())){
				usuarioCapturado = null;
			}
		}
		return usuarioCapturado;
	}

	public boolean isUsuarioJaExiste() {
		return ((UsuarioDAO) getUsuarioDAO()).isUsuarioJaExiste(getUsuarioPO());
	}
	
}