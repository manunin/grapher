package com.manunin.grapher;

import com.manunin.grapher.graph.Graph;
import com.manunin.grapher.readers.FileReader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class GrapherApplicationTests {

	@Autowired
	private FileReader fileReader;

	@Test
	public void testReadFile() {
		String path = "src/test/java/com/manunin/grapher/test.txt";
		String content = fileReader.read(path);
		assertEquals("test", content);
	}

	@Test
	public void createGraphWithBuilder_returnGraph() {
		Graph graph = new Graph.Builder()
				.addEdge("A", "B", "HAS")
				.addEdge("B", "C", "HAS")
				.build();
		assertEquals(2, graph.getEdges().size());
	}

	@Test
	public void addEdgesToGraph_returnGraphWithEdges() {
		Graph graph = new Graph.Builder()
				.addEdge("A", "B", "HAS")
				.addEdge("B", "C", "HAS")
				.build();
		graph.addEdge("C", "D", "HAS");
		assertEquals(3, graph.getEdges().size());
	}

	@Test
	public void addNewEdgeToGraph_return() {
		Graph graph = new Graph.Builder()
				.addEdge("A", "B", "HAS")
				.addEdge("B", "C", "HAS")
				.build();
		graph.removeEdge("B", "C", "HAS");
		assertEquals(1, graph.getEdges().size());
	}

	@Test
	public void addEdgeToGraph_returnGraph() {
		Graph graph = new Graph.Builder()
				.addEdge("A", "B", "HAS")
				.addEdge("B", "C", "HAS")
				.build();
		graph.addEdge("A", "C", "HAS");
		assertEquals(2, graph.getLinkedNodes("A").size());
	}

}
