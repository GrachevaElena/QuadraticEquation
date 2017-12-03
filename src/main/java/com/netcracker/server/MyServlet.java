package com.netcracker.server;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/server")
public class MyServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JSONObject coeffs=(JSONObject)JSONValue.parse(req.getReader());

        double a = Double.parseDouble(coeffs.get("a").toString());
        double b = Double.parseDouble(coeffs.get("b").toString());
        double c = Double.parseDouble(coeffs.get("c").toString());

        String x1, x2;

        double D=b*b-4*a*c;
        if (D>=0) {
            Double _x1=(-b-Math.sqrt(D))/(2*a);
            Double _x2=(-b+Math.sqrt(D))/(2*a);
            x2=_x1.toString();
            x1=_x2.toString();
        }
        else {
            x1="none";
            x2="none";
        }
         JSONObject res=new JSONObject();
        res.put("x1", x1);
        res.put("x2", x2);
        res.writeJSONString(resp.getWriter());
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }
}
