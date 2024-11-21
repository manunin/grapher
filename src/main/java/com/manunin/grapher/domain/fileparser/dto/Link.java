package com.manunin.grapher.domain.fileparser.dto;

import com.manunin.grapher.core.Node;

public record Link(Long id, Node source, Node target, String type) { }
