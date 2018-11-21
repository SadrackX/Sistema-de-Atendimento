package br.com.grupo8.sad.model.PO;

import java.util.Calendar;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2018-11-21T14:22:54.529-0200")
@StaticMetamodel(ConclusaoPO.class)
public class ConclusaoPO_ {
	public static volatile SingularAttribute<ConclusaoPO, Integer> chave;
	public static volatile SingularAttribute<ConclusaoPO, String> motivo;
	public static volatile SingularAttribute<ConclusaoPO, Calendar> dataConclusao;
	public static volatile SingularAttribute<ConclusaoPO, AtendimentoPO> atendimento;
	public static volatile SingularAttribute<ConclusaoPO, UsuarioPO> usuario;
}
