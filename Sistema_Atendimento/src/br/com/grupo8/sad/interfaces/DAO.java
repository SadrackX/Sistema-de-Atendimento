package br.com.grupo8.sad.interfaces;

import java.util.List;

public interface DAO<ClassePO> {

	public boolean cadastrar(ClassePO entidade);
	public ClassePO capturarPorId(ClassePO entidade);
	public boolean atualizar(ClassePO entidade);
	public List<ClassePO> listar(Integer pagina, Integer qtdRegistros, String filtro);
	public boolean excluir(ClassePO entidade);
	public void fecharManager();
	
}