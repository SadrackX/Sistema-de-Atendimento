package br.com.grupo8.sad.model.DAO;

import java.util.List;

import br.com.grupo8.sad.interfaces.DAO;
import br.com.grupo8.sad.model.PO.EnderecoPO;

public class EnderecoDAO implements DAO<EnderecoPO> {

	@Override
	public boolean cadastrar(EnderecoPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public EnderecoPO capturarPorId(EnderecoPO entidade) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean atualizar(EnderecoPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<EnderecoPO> listar(Integer pagina, Integer qtdRegistros, String filtro) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean excluir(EnderecoPO entidade) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void fecharManager() {
		// TODO Auto-generated method stub
		
	}

}
