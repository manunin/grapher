package com.manunin.grapher.graph;

import java.util.Objects;

public class Edge {
    private final Node source;
    private final Node target;
    private final String label;

    public Edge(final Node source, final Node target, final String label) {
        this.source = source;
        this.target = target;
        this.label = label;
    }

    public Node getSource() {
        return new Node(source.getLabel());
    }

    public Node getTarget() {
        return new Node(target.getLabel());
    }

    public String getLabel() {
        return label;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Edge edge = (Edge) obj;
        return source.equals(edge.source) && target.equals(edge.target) && label.equals(edge.label);
    }


    @Override
    public int hashCode() {
        return Objects.hash(source, target, label);
    }

    @Override
    public String toString() {

        return "Edge{" +
                "source=" + source +
                ", target=" + target +
                ", label='" + label + '\'' +
                '}';
    }
}
