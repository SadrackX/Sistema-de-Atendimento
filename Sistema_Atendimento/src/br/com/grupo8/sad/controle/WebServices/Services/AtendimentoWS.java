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

import br.com.grupo8.sad.model.BO.AtendimentoBO;
import br.com.grupo8.sad.model.PO.AtendimentoPO;

@RequestScoped
@Path("/atendimentows")
@Produces("application/json")
@Consumes("application/json")
public class AtendimentoWS {
	
	AtendimentoBO atendimentoBO;
	
	@POST
	@Path("/cadastrar/")
	public List<String> create(final AtendimentoPO atendimento) {
		List<String> retorno = new ArrayList<>();
		getAtendimentoBO().setAtendimentoPO(atendimento);	
		getAtendimentoBO().cadastrar();
	    retorno.add("sucess");
		return retorno;
	}
	
	@GET
	@Path("/capturarAtendimento/{id:[0-9]*}")
	public AtendimentoPO capturarAtendimento(@PathParam("id") final Integer id) {
		AtendimentoPO atendimentoPO = new AtendimentoPO();
        atendimentoPO.setChave(id);
		getAtendimentoBO().setAtendimentoPO(atendimentoPO);
		return getAtendimentoBO().capturar();
	}

	@GET
	@Path("/listar/{pagina:[0-9]*}/{registros:[0-9]*}/{tipo:[0-9]*}")
	public List<AtendimentoPO> listAll(@PathParam("pagina") final int pagina,@PathParam("registros") final int qtdRegistros,@PathParam("tipo") final int tipo) {
		return getAtendimentoBO().listar(pagina,qtdRegistros,tipo);
	}

	@POST
	@Path("/alterar/")
	public List<String> atualizar(final AtendimentoPO cliente) {
		List<String> retorno = new ArrayList<>();
		AtendimentoPO atendimentoPO = new AtendimentoPO();
		getAtendimentoBO().setAtendimentoPO(atendimentoPO);
		if(getAtendimentoBO().atualizar()){
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
		AtendimentoPO atendimentoPO = new AtendimentoPO();
		atendimentoPO.setChave(chave);
		getAtendimentoBO().setAtendimentoPO(atendimentoPO);
		if(getAtendimentoBO().excluir()){
			retorno.add("sucess");	
		}else{
			retorno.add("error");
		}
		return retorno;
	}
	
	private AtendimentoBO getAtendimentoBO(){
		if(this.atendimentoBO == null){
			this.atendimentoBO = new AtendimentoBO();
		}
		return this.atendimentoBO;
	}
}