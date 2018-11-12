package br.com.grupo8.sad.model.PO;

import java.util.Calendar;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2018-11-12T15:45:57.222-0200")
@StaticMetamodel(AtendimentoPO.class)
public class AtendimentoPO_ {
	public static volatile SingularAttribute<AtendimentoPO, Integer> chave;
	public static volatile SingularAttribute<AtendimentoPO, Calendar> dataCriacao;
	public static volatile SingularAttribute<AtendimentoPO, String> descricao;
	public static volatile SingularAttribute<AtendimentoPO, Character> status;
	public static volatile SingularAttribute<AtendimentoPO, UsuarioPO> usuario;
}
