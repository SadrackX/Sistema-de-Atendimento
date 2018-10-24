package br.com.grupo8.sad.model.DAO;

import java.util.List;

import br.com.grupo8.sad.interfaces.DAO;
import br.com.grupo8.sad.model.PO.UsuarioPO;

public class UsuarioDAO implements DAO<UsuarioPO> {

	@Override
	public boolean cadastrar(UsuarioPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public UsuarioPO capturarPorId(UsuarioPO entidade) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean atualizar(UsuarioPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<UsuarioPO> listar(Integer pagina, Integer qtdRegistros, String filtro) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean excluir(UsuarioPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void fecharManager() {
		// TODO Auto-generated method stub
		
	}

	public List<UsuarioPO> listaTodos() {
		// TODO Auto-generated method stub
		return null;
	}


}
