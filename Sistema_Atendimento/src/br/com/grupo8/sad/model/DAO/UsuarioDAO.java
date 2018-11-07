package br.com.grupo8.sad.model.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import br.com.grupo8.sad.interfaces.DAO;
import br.com.grupo8.sad.model.PO.UsuarioPO;
import br.com.grupo8.sad.model.Util.PersistenceUtil;

public class UsuarioDAO implements DAO<UsuarioPO> {
	
	private EntityManager manager;

	@Override
	public boolean cadastrar(UsuarioPO entidade) {
		getManager().getTransaction().begin();
		try{
			getManager().persist(entidade);
			getManager().getTransaction().commit();
			return true;
		}catch (Exception e) {
			getManager().getTransaction().rollback();
			System.out.println("\nOcorreu um erro tentar cadastrar o cliente. Causa:\n");
			e.printStackTrace();
			return false;
		}finally {
			fecharManager();
		}
		
	}

	@Override
	public UsuarioPO capturarPorId(UsuarioPO entidade) {
		try{
			StringBuilder query = new StringBuilder();
			query.append("SELECT u ")
				 .append("FROM usuario u ")
				 .append("WHERE u.chave = :chave");
			TypedQuery<UsuarioPO> typedQuery = getManager().createQuery(query.toString(),UsuarioPO.class);
				typedQuery.setParameter("chave", entidade.getChave().intValue());
				return (UsuarioPO) typedQuery.getSingleResult();
		}catch (Exception e) {
			System.out.println("\nOcorreu um erro ao capturar o cliente pela chave. Causa:\n");
			e.printStackTrace();
			return null;
		}finally {
			fecharManager();
		}
	}

	@Override
	public boolean atualizar(UsuarioPO entidade) {
		StringBuilder query = new StringBuilder();
		query.append("SELECT u ")
			 .append("FROM UsuarioPO u")
			 .append("WHERE u.nome = :nome");
		TypedQuery<UsuarioPO> typedQuery = getManager().createQuery(query.toString(),UsuarioPO.class);
			typedQuery.setParameter("nome", entidade.getNome());
			UsuarioPO usuario = (UsuarioPO)typedQuery.getSingleResult();
			getManager().getTransaction().begin();
		try{
			if(usuario != null && usuario.getNome().equals(entidade.getNome())){
				getManager().merge(entidade);
			}
			getManager().getTransaction().commit();
			return true;
		}catch (Exception e) {
			getManager().getTransaction().rollback();
			System.out.println("\nOcorreu um erro ao tentar alterar o usuario. Causa:\n");
			e.printStackTrace();
			return false;
		}finally {
			fecharManager();
		}
	}

	@Override
	public List<UsuarioPO> listar(Integer pagina, Integer qtdRegistros, String filtro) {
		try{
			StringBuilder query = new StringBuilder();
			query.append("SELECT u ")
				 .append("FROM usuario u ")
				 .append(filtro);
			TypedQuery<UsuarioPO> typedQuery = getManager().createQuery(query.toString(),UsuarioPO.class);
				return (List<UsuarioPO>) typedQuery.setFirstResult(pagina).setMaxResults(qtdRegistros).getResultList();
		}catch (Exception e) {
			System.out.println("\nOcorreu um erro ao tentar capturar todos os usuarios. Causa:\n");
			e.printStackTrace();
			return null;
		}finally {
			fecharManager();
		}
	}

	@Override
	public boolean excluir(UsuarioPO entidade) {
		try{
			getManager().getTransaction().begin();
			getManager().merge(entidade);
			getManager().getTransaction().commit();
			return true;
		}catch (Exception e) {
			getManager().getTransaction().rollback();
			System.out.println("\nOcorreu um erro ao tentar excluir o usuario: "+entidade.getLogin()+"\n");
			return false;
		}finally {
			fecharManager();
		}
	}

	public List<UsuarioPO> listaTodos() {
		// TODO Auto-generated method stub
		return null;
	}
	
	public boolean isUsuarioJaExiste(UsuarioPO entidade){
		try{
			StringBuilder query = new StringBuilder();
			query.append("SELECT u ")
				 .append("FROM usuario u ")
				 .append("WHERE u.login = :login");
			TypedQuery<UsuarioPO> typedQuery = getManager().createQuery(query.toString(),UsuarioPO.class);
				typedQuery.setParameter("login", entidade.getLogin());
				 UsuarioPO usuario = (UsuarioPO) typedQuery.getSingleResult();
				 if(usuario != null){
					 return true;
				 }else{
					 return false;
				 }
		}catch (Exception e) {
			System.out.println("\nOcorreu um erro ao capturar o usuario pelo login. Causa:\n");
			e.printStackTrace();
			return false;
		}finally {
			fecharManager();
		}	
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
