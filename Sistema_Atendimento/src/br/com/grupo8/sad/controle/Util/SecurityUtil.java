package br.com.grupo8.sad.controle.Util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SecurityUtil {

	public static String getHash(String texto) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			md.update(texto.getBytes());
			System.out.println(md.toString());
			return stringHexa(md.digest());
		} catch (NoSuchAlgorithmException e) {
			return null;
		}
	}
	
	private static String stringHexa(byte[] bytes) {
		   StringBuilder s = new StringBuilder();
		   for (int i = 0; i < bytes.length; i++) {
		       int parteAlta = ((bytes[i] >> 4) & 0xf) << 4;
		       int parteBaixa = bytes[i] & 0xf;
		       if (parteAlta == 0) s.append('0');
		       s.append(Integer.toHexString(parteAlta | parteBaixa));
		   }
		   return s.toString();
		}

}