package br.com.grupo8.sad.model.PO;

import java.util.Calendar;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2018-11-21T14:22:54.527-0200")
@StaticMetamodel(AtendimentoPO.class)
public class AtendimentoPO_ {
	public static volatile SingularAttribute<AtendimentoPO, Integer> chave;
	public static volatile SingularAttribute<AtendimentoPO, Calendar> dataCriacao;
	public static volatile SingularAttribute<AtendimentoPO, Character> status;
	public static volatile SingularAttribute<AtendimentoPO, UsuarioPO> usuario;
	public static volatile SingularAttribute<AtendimentoPO, String> descricao;
}
