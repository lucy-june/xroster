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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;


@Controller
public class MainController {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public MainController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

	@RequestMapping(value ="/main", method = RequestMethod.GET)
	public String main(Model model, String lang , HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"main";
	}

	@RequestMapping(value ="/attendance_add", method = RequestMethod.GET)
	public String attendance_add(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"attendance_add";
	}

	@RequestMapping(value ="/attendance_query", method = RequestMethod.GET)
	public String attendance_query(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"attendance_query";
	}

	@RequestMapping(value ="/grade_add", method = RequestMethod.GET)
	public String grade_add(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"grade_add";
	}

	@RequestMapping(value ="/grade_query", method = RequestMethod.GET)
	public String grade_query(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"grade_query";
	}

	@RequestMapping(value ="/gradesub_add", method = RequestMethod.GET)
	public String gradesub_add(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"gradesub_add";
	}

	@RequestMapping(value ="/custom_import", method = RequestMethod.GET)
	public String custom_import(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"custom_import";
	}

	@RequestMapping(value ="/gradesub_query", method = RequestMethod.GET)
	public String gradesub_query(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"gradesub_query";
	}

	@RequestMapping(value ="/student_add", method = RequestMethod.GET)
	public String student_add(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"student_add";
	}

	@RequestMapping(value ="/student_query", method = RequestMethod.GET)
	public String student_query(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"student_query";
	}
	
	@RequestMapping(value ="/student_import", method = RequestMethod.GET)
	public String student_import(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"student_import";
	}

	@RequestMapping(value ="/teacher_add", method = RequestMethod.GET)
	public String teacher_add(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"teacher_add";
	}

	@RequestMapping(value ="/teacher_query", method = RequestMethod.GET)
	public String teacher_query(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"teacher_query";
	}

	@RequestMapping(value ="/analysis_table", method = RequestMethod.GET)
	public String analysis_table(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_table";
	}

	@RequestMapping(value ="/analysis_tablesub", method = RequestMethod.GET)
	public String analysis_tablesub(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_tablesub";
	}

	@RequestMapping(value ="/analysis_stage", method = RequestMethod.GET)
	public String analysis_stage(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_stage";
	}


	@RequestMapping(value ="/analysis_stage_class", method = RequestMethod.GET)
	public String analysis_stage_class(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_stage_class";
	}

	@RequestMapping(value ="/analysis_mark", method = RequestMethod.GET)
	public String analysis_mark(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_mark";
	}

	@RequestMapping(value ="/analysis_mark_class", method = RequestMethod.GET)
	public String analysis_mark_class(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_mark_class";
	}

	@RequestMapping(value ="/analysis_rank", method = RequestMethod.GET)
	public String analysis_rank(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_rank";
	}

	@RequestMapping(value ="/analysis_rank_class", method = RequestMethod.GET)
	public String analysis_rank_class(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_rank_class";
	}

	@RequestMapping(value ="/analysis_personal_radar", method = RequestMethod.GET)
	public String analysis_personal_radar(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_personal_radar";
	}

	@RequestMapping(value ="/analysis_personal_radarsub", method = RequestMethod.GET)
	public String analysis_personal_radarsub(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"analysis_personal_radarsub";
	}

	@RequestMapping(value ="/statistics_attendance", method = RequestMethod.GET)
	public String statistics_attendance(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"statistics_attendance";
	}

	@RequestMapping(value ="/account_manage", method = RequestMethod.GET)
	public String account_manage(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"account_manage";
	}

	@RequestMapping(value ="/account_reset", method = RequestMethod.GET)
	public String account_reset(Model model, String lang, HttpSession session) {
		if(!IndexController.checkSession(session)){
			return "redirect:/";
		}
		model.addAttribute("lang", lang); model.addAttribute("role", session.getAttribute("role"));  return"account_reset";
	}
}
