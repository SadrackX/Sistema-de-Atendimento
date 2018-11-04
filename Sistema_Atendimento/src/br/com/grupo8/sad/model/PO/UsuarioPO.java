package br.com.grupo8.sad.model.PO;

import java.io.Serializable;
import java.lang.String;
import java.util.Calendar;

import javax.persistence.*;


@Entity(name="usuario")
@Table(name="usuario")
public class UsuarioPO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer chave;
	
	private String nome;
	private String login;
	private String senha;
	private String email;
	private String telefone;
	
	private Character status;
	
	@Column(name="data_criacao", nullable= false)
    @Temporal(TemporalType.TIMESTAMP)
	private Calendar dataCriacao;
	@Column(name="data_inativacao")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar dataInativacao;
	@Column(name="data_exclusao")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar dataExclusao;
	
	@Column(name="tipo_user")
	private Character tipo_user;
	
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
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	
	public Character getStatus() {
		return status;
	}
	public void setStatus(Character status) {
		this.status = status;
	}

	public Character getTipo() {
		return tipo_user;
	}
	
	public Calendar getDataCriacao() {
		return dataCriacao;
	}
	public void setDataCriacao(Calendar dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	public Calendar getDataInativacao() {
		return dataInativacao;
	}
	public void setDataInativacao(Calendar dataInativacao) {
		this.dataInativacao = dataInativacao;
	}
	public Calendar getDataExclusao() {
		return dataExclusao;
	}
	public void setDataExclusao(Calendar dataExclusao) {
		this.dataExclusao = dataExclusao;
	}

}
