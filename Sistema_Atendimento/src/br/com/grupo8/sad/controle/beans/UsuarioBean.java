package br.com.grupo8.sad.controle.beans;

import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

import br.com.grupo8.sad.controle.Dominio.TipoUsuario;
import br.com.grupo8.sad.controle.Util.JsonUtil;
import br.com.grupo8.sad.model.PO.UsuarioPO;

@ManagedBean
public class UsuarioBean {
	private UsuarioPO usuario;
	
	public UsuarioBean(){
		FacesContext fc = FacesContext.getCurrentInstance();
		HttpSession session = (HttpSession) fc.getExternalContext().getSession(false);
		this.usuario = (UsuarioPO) session.getAttribute("usuario");
	}
	
	public String getUsuarioDaSessao(){
		return JsonUtil.converterObjetoEmJson(getUsuario());
	}
	
	public String getNome(){
		if(TipoUsuario.CLIENTE.equals(getUsuario().getTipo())){
			return getUsuario().getNome();
		}else if(TipoUsuario.FUNCIONARIO.equals(getUsuario().getTipo())){
			return getUsuario().getNome();
		}else{
			return "";
		}
	}
	
	public boolean isUsuarioLogado(){
		return usuario != null ? true : false ; 
	}
	public boolean isFuncionario(){
		boolean retorno = false;
		if(isUsuarioLogado()){
			retorno = TipoUsuario.FUNCIONARIO.equals(getUsuario().getTipo());
		}
		return retorno;
	}

	public UsuarioPO getUsuario() {
		return usuario;
	}
	
}