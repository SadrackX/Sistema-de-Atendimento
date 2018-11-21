package br.com.grupo8.sad.controle.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import br.com.grupo8.sad.controle.Util.JsonUtil;
import br.com.grupo8.sad.model.BO.UsuarioBO;
import br.com.grupo8.sad.model.PO.UsuarioPO;

/**
 * Servlet implementation class Autenticar
 */
@WebServlet("/autenticar.do")
public class Autenticar extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private UsuarioBO usuarioBO;
	private UsuarioPO usuarioCapturado;
	private HttpSession sessao;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Autenticar() {
		super();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter retorno = response.getWriter();
		getUsuarioBO().setUsuarioPO(JsonUtil.converterJsonEmUsuario(request));
		setUsuarioCapturado(getUsuarioBO().capturarUsuarioValido());
			
		if (getUsuarioCapturado() != null) {
			setSessao(request.getSession());
			if (getUsuarioCapturado().getSenha().equals(getUsuarioBO().getUsuarioPO().getSenha())) {
				getSessao().setAttribute("usuario", getUsuarioCapturado());
				retorno.println("{\"loginValido\":1,\"senhaValida\":1}");

			} else {
				retorno.println("{\"loginValido\":1,\"senhaValida\":0}");
			}

		} else {
				retorno.println("{\"loginValido\":0,\"senhaValida\":0}");
		}
		
	}


	private UsuarioBO getUsuarioBO() {
		if (this.usuarioBO == null) {
			this.usuarioBO = new UsuarioBO();
		}
		return this.usuarioBO;
	}

	private UsuarioPO getUsuarioCapturado() {
		return this.usuarioCapturado;
	}

	private void setUsuarioCapturado(UsuarioPO usuarioPO) {
		this.usuarioCapturado = usuarioPO;
	}

	private void setSessao(HttpSession session) {
		this.sessao = session;
	}

	private HttpSession getSessao() {
		return this.sessao;
	}
}
