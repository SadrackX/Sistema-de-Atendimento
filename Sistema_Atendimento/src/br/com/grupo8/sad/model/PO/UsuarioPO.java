package br.com.grupo8.sad.model.PO;

import java.io.Serializable;
import java.lang.String;

import javax.persistence.*;


@Entity(name="usuario")
@Table(name="usuario")
public class UsuarioPO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer chave;
	
	private String nome;
	private String sobrenome;
	private String login;
	private String senha;
	private String email;
	private String telefone;
	
	//ENDERECO
	private String rua;
	private String bairro;
	private String cidade;
	private String cep;
	private String numero;
	
	@Column(nullable=false)
	private char tipo;
	@Column(nullable=false)
	private Character status;
	
	public Integer getChave() {
		return this.chave;
	}

	public void setChave(Integer chave) {
		this.chave = chave;
	}   
	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome.toUpperCase();
	}
	
	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome.toUpperCase();
	}

	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	
	public String getSenha() {
		return senha;
	}
	
	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEmail() {
		return email;
	}
	

	public void setEmail(String email) {
		this.email = email.toUpperCase();
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	
	public char getTipo() {
		return tipo;
	}

	public void setTipo(char tipo) {
		this.tipo = tipo;
	}

	public Character getStatus() {
		return status;
	}
	public void setStatus(Character status) {
		this.status = status;
	}

	public String getRua() {
		return rua;
	}

	public void setRua(String rua) {
		this.rua = rua.toUpperCase();
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro.toUpperCase();
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade.toUpperCase();
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	

}
