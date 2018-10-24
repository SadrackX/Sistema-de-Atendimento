package br.com.grupo8.sad.model.DAO;

import java.util.List;

import br.com.grupo8.sad.interfaces.DAO;
import br.com.grupo8.sad.model.PO.AtendimentoPO;

public class AtendimentoDAO implements DAO<AtendimentoPO> {

	@Override
	public boolean cadastrar(AtendimentoPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public AtendimentoPO capturarPorId(AtendimentoPO entidade) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean atualizar(AtendimentoPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<AtendimentoPO> listar(Integer pagina, Integer qtdRegistros, String filtro) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean excluir(AtendimentoPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void fecharManager() {
		// TODO Auto-generated method stub
		
	}

}
