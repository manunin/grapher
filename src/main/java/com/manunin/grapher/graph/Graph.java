package com.manunin.grapher.graph;

import java.util.*;

public class Graph {
    private final Set<Edge> edges = new HashSet<>();

    private void addEdge(final List<Edge> edges) {
        this.edges.addAll(edges);
    }

    public void addEdge(final String source, final String target, final String label) {
        Edge edge = new Edge(new Node(source), new Node(target), label);
        edges.add(edge);
    }

    public void removeEdge(final String source, final String target, final String label) {
        Edge edge = new Edge(new Node(source), new Node(target), label);
        edges.remove(edge);
    }

    public Set<Edge> getEdges() {
        //get safe copy of edges
        return new HashSet<>(edges);
    }

    public Set<Edge> getLinkedNodes(final String label) {
        Set<Edge> linkedNodes = new HashSet<>();
        Node node = new Node(label);
        for (Edge edge : edges) {
            if (edge.getSource().equals(node) || edge.getTarget().equals(node)) {
                //add safe copy of edge
                linkedNodes.add(new Edge(edge.getSource(), edge.getTarget(), edge.getLabel()));
            }
        }
        return linkedNodes;
    }

    public static class Builder {
        private final Set<Edge> edges = new HashSet<>();

        public Builder addEdge(final String source, final String target, final String label) {
            Edge edge = new Edge(new Node(source), new Node(target), label);
            edges.add(edge);
            return this;
        }

        public Graph build() {
            Graph graph = new Graph();
            graph.addEdge(new ArrayList<>(edges));
            return graph;
        }
    }
}
