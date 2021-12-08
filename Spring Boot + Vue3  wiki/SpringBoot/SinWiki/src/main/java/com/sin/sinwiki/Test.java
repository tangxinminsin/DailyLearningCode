package com.sin.sinwiki;

import java.util.Scanner;

public class Test {

    private String name;
    private int age;

    public Test() {
    }

    public Test(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Test{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }


    public void run(){
        int num=1;
        System.out.println(num);
        try {
            System.out.println("11111111111");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        }
    }
}
