package br.com.grupo8.sad.model.PO;

import java.io.Serializable;
import java.lang.String;
import java.util.Calendar;

import javax.persistence.*;


@Entity(name="conclusao")
@Table(name="conclusao")
public class ConclusaoPO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer chave;
	
	private String motivo;
	
	@Column(name="data_conclusao", nullable= false)
    @Temporal(TemporalType.TIMESTAMP)
	private Calendar dataConclusao;
	
	@OneToOne
	@JoinColumn(name="atendimento_chave", referencedColumnName="chave", nullable= false)
	private AtendimentoPO atendimento;
	
	@ManyToOne
	@JoinColumn(name="usuario_chave", referencedColumnName="chave", nullable= false)
	private UsuarioPO usuario;

	public Integer getChave() {
		return chave;
	}

	public void setChave(Integer chave) {
		this.chave = chave;
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}
	
	public Calendar getDataConclusao() {
		return dataConclusao;
	}

	public void setDataConclusao(Calendar dataConclusao) {
		this.dataConclusao = dataConclusao;
	}

	public UsuarioPO getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioPO usuario) {
		this.usuario = usuario;
	}

	public AtendimentoPO getAtendimento() {
		return atendimento;
	}

	public void setAtendimento(AtendimentoPO atendimento) {
		this.atendimento = atendimento;
	}
}
