package com.netcracker.server;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/server")
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        double a = Double.parseDouble(req.getParameter("a"));
        double b = Double.parseDouble(req.getParameter("b"));
        double c = Double.parseDouble(req.getParameter("c"));

        double x1,x2;

        String s="";

        double D=b*b-4*a*c;
        if (D>=0) {
            x1=(-b+Math.sqrt(D))/(2*a);
            x2=(-b-Math.sqrt(D))/(2*a);
            s=s+x1+" "+x2;
        }
        else {
            s="none"+" "+"none";
        }
        resp.getWriter().write(s);
    }
}
