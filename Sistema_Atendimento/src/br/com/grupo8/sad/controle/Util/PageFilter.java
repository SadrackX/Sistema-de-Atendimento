package br.com.grupo8.sad.controle.Util;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class PageFilter implements Filter{
	 public void destroy() {
      }
   
      public void doFilter(ServletRequest request, ServletResponse response,
             FilterChain chain) throws IOException, ServletException {
   
         HttpSession sess = ((HttpServletRequest) request).getSession(true);
   
         String newCurrentPage = ((HttpServletRequest) request).getServletPath();
         System.out.println(newCurrentPage);
            
         if (sess.getAttribute("currentPage") == null) {
             sess.setAttribute("lastPage", newCurrentPage);
             sess.setAttribute("currentPage", newCurrentPage);
         } else {
   
             String oldCurrentPage = sess.getAttribute("currentPage").toString();
             if (!oldCurrentPage.equals(newCurrentPage)) {
               sess.setAttribute("lastPage", oldCurrentPage);
               sess.setAttribute("currentPage", newCurrentPage);
             }
         }
         
         if(sess.getAttribute("currentPage") != null && sess.getAttribute("currentPage").equals("/reserva.do") && sess.getAttribute("usuario") == null){
        	 RequestDispatcher dispacher = request.getRequestDispatcher("login.do");
             dispacher.forward(request, response);
         }
   
         chain.doFilter(request, response);
   
      }
   
      public void init(FilterConfig arg0) throws ServletException {
      }
}