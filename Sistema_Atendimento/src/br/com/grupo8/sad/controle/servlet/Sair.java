package br.com.grupo8.sad.controle.servlet;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class Sair
 */
@WebServlet("/sair.do")
public class Sair extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public Sair() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession sessao = request.getSession();
		Date data = new Date();
		System.out.println(data.getTime()+"Limpando a sessao: "+sessao.getId());
		sessao.invalidate();
		response.sendRedirect("");
	}

}
