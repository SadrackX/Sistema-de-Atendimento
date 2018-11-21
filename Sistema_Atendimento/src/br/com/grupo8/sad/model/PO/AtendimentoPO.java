package br.com.grupo8.sad.model.PO;

import java.io.Serializable;
import java.lang.String;
import java.util.Calendar;

import javax.persistence.*;


@Entity(name="atendimento")
@Table(name="atendimento")
public class AtendimentoPO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer chave;
	
	@Column(name="data_criacao", nullable= false)
    @Temporal(TemporalType.TIMESTAMP)
	private Calendar dataCriacao;
	
	private String descricao;
	
	@Column(name="status")
	private Character status;
	
	@ManyToOne
	@JoinColumn(name="usuario_chave", referencedColumnName="chave", nullable= false)
	private UsuarioPO usuario;
	
	public Integer getChave() {
		return this.chave;
	}

	public void setChave(Integer chave) {
		this.chave = chave;
	}   

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	public UsuarioPO getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioPO usuario) {
		this.usuario = usuario;
	}

	public Calendar getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(Calendar dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

}
