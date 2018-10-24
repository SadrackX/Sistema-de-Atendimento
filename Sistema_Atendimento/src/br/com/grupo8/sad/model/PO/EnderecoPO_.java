package br.com.grupo8.sad.model.PO;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2018-10-24T16:37:13.070-0300")
@StaticMetamodel(EnderecoPO.class)
public class EnderecoPO_ {
	public static volatile SingularAttribute<EnderecoPO, Integer> chave;
	public static volatile SingularAttribute<EnderecoPO, String> rua;
	public static volatile SingularAttribute<EnderecoPO, String> bairro;
	public static volatile SingularAttribute<EnderecoPO, String> cidade;
	public static volatile SingularAttribute<EnderecoPO, String> cep;
	public static volatile SingularAttribute<EnderecoPO, UsuarioPO> usuario;
}
