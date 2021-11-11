/*******************************************************************************
 * Copyright (c) 2018-2026 lucywu.com
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Lucy Wu - initial API and implementation
 *******************************************************************************/

package com.lucywu.xroster.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lucywu.xroster.model.Person;


@Controller
public class IndexController {
    private JdbcTemplate jdbcTemplate;


    @Autowired
    public IndexController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(HttpSession session,Model model,String lang) {
    	if(checkSession(session)){
    		return "redirect:/main";
    	}
        model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));
        return "index"; 
    }
    
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(HttpSession session,Model model,String lang) {
    	if(checkSession(session)){
    		return "redirect:/main";
    	}
        model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));
        return "index"; 
    }
    
    @RequestMapping(value = "/index_htm", method = RequestMethod.GET)
    public String index_htm(HttpSession session,Model model,String lang) {
    	if(checkSession(session)){
    		return "redirect:/main";
    	}
        model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));
        return "index"; 
    }
    
    @RequestMapping(value = "/index_html", method = RequestMethod.GET)
    public String index_html(HttpSession session,Model model,String lang) {
    	if(checkSession(session)){
    		return "redirect:/main";
    	}
        model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));
        return "index"; 
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(String lang, String email, String password,HttpSession session, Model model) {
    	System.out.println("###########################");
        System.out.println(lang);
    	System.out.println(email);
    	System.out.println(password);
    	System.out.println("###########################");
    	
    	if(checkSession(session)){
    		return "redirect:/main";
    	}
    	
    	if(checkLogin(email,password)){
    		fillSession(email,session);

            if(lang==null || lang.isEmpty()) return "redirect:/main";
            else return "redirect:/main?lang="+lang;
    	}
    	else{
            model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));
    		model.addAttribute("isFail", true);
    		return "index";
    	}
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login_get(HttpSession session, Model model,String lang) {
    	if(checkSession(session)){
    		return "redirect:/main";
    	}
    	else{
            model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));
//    		model.addAttribute("isFail", true);
    		return "index";
    	}
    }
    
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout(HttpSession session,Model model,String lang) {
    	session.invalidate();
    	if(lang==null || lang.isEmpty()) return "redirect:/";
        else return "redirect:/?lang="+lang;
    }
    
    public static boolean checkSession(HttpSession session){
    	System.out.println(session.getAttribute("email"));
    	if(session.getAttribute("email")!=null){
    		return true;
    	}
    	return false;
    }
    
    public boolean checkLogin(String email, String password){
        if(email==null || email.isEmpty()) return false;
        String str="";
        try{
            str= jdbcTemplate.queryForObject("select password from tbl_account where email=?",new Object[]{email}, String.class);
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    	if(password==null || password.isEmpty()) return false;
    	return password.equals(str);
    }

    public void fillSession(String email, HttpSession session){
        if(email==null || email.isEmpty()) return;

        Map<String,Object> map=new HashMap<String,Object>();
        try{
            map= jdbcTemplate.queryForMap("select * from tbl_account where email=?",email);
        }catch(Exception e){
            e.printStackTrace();
            return;
        }

        session.setAttribute("email", email);
        session.setAttribute("ref_id", map.get("ref_id"));
        session.setAttribute("role", map.get("role"));
        return;
    }
    
    @RequestMapping("/sendpwd")
    public String sendpwd(HttpSession session, Model model,String lang) {
    	session.invalidate();

    	//send pwd to Email

    	model.addAttribute("isSent", true);
        if(lang==null || lang.isEmpty()) return "redirect:/";
        else return "redirect:/?lang="+lang;
    }
}
