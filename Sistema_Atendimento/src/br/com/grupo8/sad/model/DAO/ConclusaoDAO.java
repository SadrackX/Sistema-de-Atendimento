package br.com.grupo8.sad.model.DAO;

import java.util.List;

import br.com.grupo8.sad.interfaces.DAO;
import br.com.grupo8.sad.model.PO.ConclusaoPO;

public class ConclusaoDAO implements DAO<ConclusaoPO> {

	@Override
	public boolean cadastrar(ConclusaoPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public ConclusaoPO capturarPorId(ConclusaoPO entidade) {
		// TODO Auto-generated method stub
		return null;
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
		// TODO Auto-generated method stub
		
	}

	public List<ConclusaoPO> listaTodos() {
		// TODO Auto-generated method stub
		return null;
	}

}
