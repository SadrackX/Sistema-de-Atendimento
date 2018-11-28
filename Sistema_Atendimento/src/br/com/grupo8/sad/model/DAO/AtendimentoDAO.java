package br.com.grupo8.sad.model.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import br.com.grupo8.sad.interfaces.DAO;
import br.com.grupo8.sad.model.PO.AtendimentoPO;
import br.com.grupo8.sad.model.Util.PersistenceUtil;

public class AtendimentoDAO implements DAO<AtendimentoPO> {
	private EntityManager manager;

	@Override
	public boolean cadastrar(AtendimentoPO entidade) {
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
	public AtendimentoPO capturarPorId(AtendimentoPO entidade) {
		try{
			StringBuilder query = new StringBuilder();
			query.append("SELECT a ")
				 .append("FROM atendimento a ")
				 .append("WHERE a.chave = :chave");
			TypedQuery<AtendimentoPO> typedQuery = getManager().createQuery(query.toString(),AtendimentoPO.class);
				typedQuery.setParameter("chave", entidade.getChave().intValue());
				return (AtendimentoPO) typedQuery.getSingleResult();
		}catch (Exception e) {
			System.out.println("\nOcorreu um erro ao capturar 0 atendimento pela chave. Causa:\n");
			e.printStackTrace();
			return null;
		}finally {
			fecharManager();
		}
	}
	
	public List<AtendimentoPO> capturarByIdUser(AtendimentoPO entidade) {
		try{
			StringBuilder query = new StringBuilder();
			query.append("SELECT a ")
				 .append("FROM atendimento a ")
				 .append("WHERE a.usuario.chave = :chave ")
				 .append("AND (a.status != 'C' OR a.status IS NULL)");
			TypedQuery<AtendimentoPO> typedQuery = getManager().createQuery(query.toString(),AtendimentoPO.class);
				typedQuery.setParameter("chave", entidade.getUsuario().getChave().intValue());
				return (List<AtendimentoPO>) typedQuery.getResultList();
		}catch (Exception e) {
			System.out.println("\nOcorreu um erro ao tentar capturar os atendimentos. Causa:\n");
			e.printStackTrace();
			return null;
		}finally {
			fecharManager();
		}
	}

	@Override
	public boolean atualizar(AtendimentoPO entidade) {
		try {
			getManager().getTransaction().begin();
			getManager().merge(entidade);
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
	public List<AtendimentoPO> listar(Integer pagina, Integer qtdRegistros, String filtro) {
		try{
			StringBuilder query = new StringBuilder();
			query.append("SELECT u ")
				 .append("FROM atendimento u ")
				 .append(filtro);
			TypedQuery<AtendimentoPO> typedQuery = getManager().createQuery(query.toString(),AtendimentoPO.class);
				return (List<AtendimentoPO>) typedQuery.setFirstResult(pagina).setMaxResults(qtdRegistros).getResultList();
		}catch (Exception e) {
			System.out.println("\nOcorreu um erro ao tentar capturar todos os atendimentos. Causa:\n");
			e.printStackTrace();
			return null;
		}finally {
			fecharManager();
		}
	}

	@Override
	public boolean excluir(AtendimentoPO entidade) {
		try {
			getManager().getTransaction().begin();
			getManager().merge(entidade);
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
	public void fecharManager() {
		if(this.manager.isOpen()){
			this.manager.close();
		}			
	}

	public List<AtendimentoPO> listaTodos() {
		// TODO Auto-generated method stub
		return null;
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
