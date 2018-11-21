package br.com.grupo8.sad.model.BO;
 
import java.util.List;

import br.com.grupo8.sad.model.DAO.UsuarioDAO;
import br.com.grupo8.sad.model.PO.UsuarioPO;
import br.com.grupo8.sad.controle.Dominio.StatusUsuario;

public class UsuarioBO {
	private UsuarioPO usuarioPO;
	private UsuarioDAO usuarioDAO;
	
	private final char USUARIOS_ATIVOS = 'A';
	private final char USUARIOS_EXCLUIDOS = 'E';
	
	
	public UsuarioPO capturar(){
		return getUsuarioDAO().capturarPorId(getUsuarioPO());
	}
	
	public boolean cadastrar(){
			return getUsuarioDAO().cadastrar(getUsuarioPO());
	}
	public boolean atualizar(){
		return getUsuarioDAO().atualizar(getUsuarioPO());
	}
	public boolean excluir(){
		UsuarioPO usuario = getUsuarioDAO().capturarPorId(usuarioPO);
		if(usuario !=null){
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
	
	
	private String getFiltro(int codigo){
		String filtro = "";
		switch (codigo) {
		case USUARIOS_ATIVOS: filtro = "WHERE u.status = 'A' ORDER BY u.nome ASC";	
			break;
		case USUARIOS_EXCLUIDOS: filtro = "WHERE u.status = 'E' ORDER BY u.nome ASC";
			break;
		}
		return filtro;
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