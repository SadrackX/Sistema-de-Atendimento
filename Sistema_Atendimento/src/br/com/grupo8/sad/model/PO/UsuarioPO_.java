package br.com.grupo8.sad.model.PO;

import java.util.Calendar;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2018-11-06T20:29:14.770-0200")
@StaticMetamodel(UsuarioPO.class)
public class UsuarioPO_ {
	public static volatile SingularAttribute<UsuarioPO, Integer> chave;
	public static volatile SingularAttribute<UsuarioPO, String> nome;
	public static volatile SingularAttribute<UsuarioPO, String> login;
	public static volatile SingularAttribute<UsuarioPO, String> senha;
	public static volatile SingularAttribute<UsuarioPO, String> email;
	public static volatile SingularAttribute<UsuarioPO, String> telefone;
	public static volatile SingularAttribute<UsuarioPO, EnderecoPO> endereco;
	public static volatile SingularAttribute<UsuarioPO, Character> status;
	public static volatile SingularAttribute<UsuarioPO, Calendar> dataCriacao;
	public static volatile SingularAttribute<UsuarioPO, Calendar> dataInativacao;
	public static volatile SingularAttribute<UsuarioPO, Calendar> dataExclusao;
	public static volatile SingularAttribute<UsuarioPO, Character> tipo_user;
}
