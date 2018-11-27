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
import br.com.grupo8.sad.model.BO.ConclusaoBO;
import br.com.grupo8.sad.model.PO.AtendimentoPO;
import br.com.grupo8.sad.model.PO.ConclusaoPO;

@RequestScoped
@Path("/conclusaows")
@Produces("application/json")
@Consumes("application/json")
public class ConclusaoWS {
	ConclusaoBO conclusaoBO;
	AtendimentoBO atendimentoBO;
	
	@POST
	@Path("/atender/")
	public List<String> create(final ConclusaoPO conclusao) {
		List<String> retorno = new ArrayList<>();
		getAtendimentoBO().setAtendimentoPO(conclusao.getAtendimento());
		getConclusaoBO().setConclusaoPO(conclusao);	
		getAtendimentoBO().atualizar();
		getConclusaoBO().cadastrar();
	    retorno.add("sucess");
		return retorno;
	}
	
	@GET
	@Path("/capturar/{chave:[0-9]*}")
	public ConclusaoPO findByIdAt(@PathParam("chave") final int chave) {
		ConclusaoPO conclusao = new ConclusaoPO();
		conclusao.setAtendimento(new AtendimentoPO());
		conclusao.getAtendimento().setChave(chave);
		getConclusaoBO().setConclusaoPO(conclusao);
		return getConclusaoBO().capturar();
	}

	public ConclusaoBO getConclusaoBO() {
		if(this.conclusaoBO == null){
			conclusaoBO = new ConclusaoBO();
		}
		return conclusaoBO;
	}
	public AtendimentoBO getAtendimentoBO() {
		if(this.atendimentoBO == null){
			atendimentoBO = new AtendimentoBO();
		}
		return atendimentoBO;
	}	

}
