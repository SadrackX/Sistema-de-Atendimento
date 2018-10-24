package br.com.grupo8.sad.model.PO;

import java.io.Serializable;
import java.lang.String;
import javax.persistence.*;


@Entity(name="endereco")
@Table(name="endereco")
public class EnderecoPO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer chave;
	
	private String rua;
	private String bairro;
	private String cidade;
	private String cep;
	
	@OneToOne
	@JoinColumn(name="usuario_chave",referencedColumnName="chave", nullable= true, unique=true)
	private UsuarioPO usuario;
	
	public String getRua() {
		return rua;
	}
	public void setRua(String rua) {
		this.rua = rua;
	}
	public String getBairro() {
		return bairro;
	}
	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}

	public UsuarioPO getUsuario() {
		return usuario;
	}
	public void setUsuario(UsuarioPO usuario) {
		this.usuario = usuario;
	}
}
