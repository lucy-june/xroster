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

package com.lucywu.xroster.util;

/**
 * Created by lucy on 2018/4/23.
 */
public class StringUtil {
    public static String classnoStandardization(String classno){
        if(classno==null) return null;
        int k=0;
        while(k<classno.length()){
            if((int)classno.charAt(k)>=48 && (int)classno.charAt(k)<=57){
                break;
            }
            else{
                ++k;
            }
        }

        if(k==0) return "X"+classno;
        else return classno.charAt(0)+classno.substring(k,classno.length());
    }

//    public static void main(String [] args){
//        System.out.println(classnoStandardization("1234"));
//        System.out.println(classnoStandardization("C1934"));
//        System.out.println(classnoStandardization("DSE1934"));
//    }
}
