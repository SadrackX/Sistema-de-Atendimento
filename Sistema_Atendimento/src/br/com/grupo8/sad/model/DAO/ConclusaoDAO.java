package br.com.grupo8.sad.model.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import br.com.grupo8.sad.interfaces.DAO;
import br.com.grupo8.sad.model.PO.ConclusaoPO;
import br.com.grupo8.sad.model.Util.PersistenceUtil;

public class ConclusaoDAO implements DAO<ConclusaoPO> {
	private EntityManager manager;

	@Override
	public boolean cadastrar(ConclusaoPO entidade) {
		try {
			getManager().getTransaction().begin();
			getManager().persist(entidade);
			getManager().getTransaction().commit();
			return true;
		}catch (Exception e) {
			getManager().getTransaction().rollback();
			return false;
		} finally {
			getManager().close();
		}
	}

	@Override
	public ConclusaoPO capturarPorId(ConclusaoPO entidade) {
		try{
			StringBuilder query = new StringBuilder();
			query.append("SELECT u ")
				 .append("FROM conclusao u ")
				 .append("WHERE u.atendimento.chave = :chave ")
				 .append("ORDER BY u.chave desc");
			TypedQuery<ConclusaoPO> typedQuery = getManager().createQuery(query.toString(),ConclusaoPO.class);
				typedQuery.setParameter("chave", entidade.getAtendimento().getChave().intValue());
				return (ConclusaoPO) typedQuery.setMaxResults(1).getSingleResult();
		}catch (Exception e) {
			System.out.println("\nOcorreu um erro ao capturar a conclusao pela chave. Causa:\n");
			e.printStackTrace();
			return null;
		}finally {
			fecharManager();
		}
	}

	@Override
	public boolean atualizar(ConclusaoPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<ConclusaoPO> listar(Integer pagina, Integer qtdRegistros, String filtro) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean excluir(ConclusaoPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void fecharManager() {
		if(this.manager.isOpen()){
			this.manager.close();
		}	
	}
	
	private EntityManager getManager(){
		if(this.manager == null){
			this.manager = PersistenceUtil.getEntityManager();
		}else if(!this.manager.isOpen()){
			this.manager = PersistenceUtil.getEntityManager();
		}
		return this.manager;
	}

}
