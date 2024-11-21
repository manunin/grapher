package com.manunin.grapher.core;

public interface Parser<K, T> {
    K parseFile(T source);
}
