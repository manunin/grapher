package com.manunin.grapher.core;

public class Node {
    private final Long id;
    private final String name;

    public Node(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
