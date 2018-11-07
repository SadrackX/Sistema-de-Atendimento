package br.com.grupo8.sad.controle.WebServices.Services;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import br.com.grupo8.sad.controle.Util.SecurityUtil;
import br.com.grupo8.sad.model.BO.UsuarioBO;
import br.com.grupo8.sad.model.PO.UsuarioPO;

@RequestScoped
@Path("/usuariows")
@Produces("application/json")
@Consumes("application/json")
public class UsuarioWS {
	
	UsuarioBO clienteBO;
	
	@POST
	@Path("/cadastrar/")
	public List<String> create(final UsuarioPO usuario) {
		List<String> retorno = new ArrayList<>();
		getUsuarioBO().setUsuarioPO(usuario);
		getUsuarioBO().getUsuarioPO().setSenha(SecurityUtil.getHash(getUsuarioBO().getUsuarioPO().getSenha()));		
		if(getUsuarioBO().cadastrar()){
			retorno.add("sucess");
		}else{
			retorno = getUsuarioBO().getMensagemErro();
		}
		return retorno;
	}

	@GET
	@Path("/capturar/{login}")
	public UsuarioPO findById(@PathParam("login") final String login) {
		getUsuarioBO().getUsuarioPO().setLogin(login);
		UsuarioPO usuario = getUsuarioBO().capturarUsuarioValido();
		if(usuario != null){
			return usuario;
		}else{
			return null;
		}
	}
	
	@GET
	@Path("/capturarUsuario/{id:[0-9]*}")
	public UsuarioPO capturarUsuario(@PathParam("id") final Integer id) {
		UsuarioPO usuarioPO = new UsuarioPO();
        usuarioPO.setChave(id);
		getUsuarioBO().setUsuarioPO(usuarioPO);
		return getUsuarioBO().capturar();
	}

	@GET
	@Path("/listar/{pagina:[0-9]*}/{registros:[0-9]*}")
	public List<UsuarioPO> listAll(@PathParam("pagina") final int pagina,@PathParam("registros") final int qtdRegistros) {
		return getUsuarioBO().listar(pagina,qtdRegistros);
	}

	@POST
	@Path("/alterar/")
	public List<String> atualizar(final UsuarioPO cliente) {
		List<String> retorno = new ArrayList<>();
		UsuarioPO usuarioPO = new UsuarioPO();
		getUsuarioBO().setUsuarioPO(usuarioPO);
		if(getUsuarioBO().atualizar()){
			retorno.add("sucess");
		}else{
			retorno.add("fail");
		}
		return retorno;
	}

	@GET
	@Path("/excluir/{chave:[0-9]*}")
	public List<String> excluir(@PathParam("chave") Integer chave) {
		List<String> retorno = new ArrayList<>();
		UsuarioPO usuarioPO = new UsuarioPO();
		usuarioPO.setChave(chave);
		getUsuarioBO().setUsuarioPO(usuarioPO);
		if(getUsuarioBO().excluir()){
			retorno.add("sucess");	
		}else{
			retorno.add("error");
		}
		return retorno;
	}
	
	@GET
	@Path("/verificaSeExiste/{login}")
	public List<String> isExisteLoginCadastrado(@PathParam("login") final String login){
		List<String> retorno = new ArrayList<>();
		getUsuarioBO().getUsuarioPO().setLogin("%"+login+"%");
		if(getUsuarioBO().isUsuarioJaExiste()){
			retorno.add("true");
		}else{
			retorno.add("false");
		}
		return retorno;
	}
	
	private UsuarioBO getUsuarioBO(){
		if(this.clienteBO == null){
			this.clienteBO = new UsuarioBO();
		}
		return this.clienteBO;
	}
}