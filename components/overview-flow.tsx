"use client";

import ReactFlow, {
  Background,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  NodeTypes,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  OnSelectionChangeFunc,
  OnSelectionChangeParams,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useKeyPress,
} from "reactflow";
import { nodes as initialNodes, edges as initialEdges } from "../elements";
import { CSSProperties, useCallback, useEffect, useState } from "react";

import "reactflow/dist/style.css";
import WorkNode from "@/components/work-node";
import AddNodeButton from "@/components/add-node-button";
import ThemeToggle from "@/components/theme-toggle";

const nodeTypes: NodeTypes = {
  workNode: WorkNode,
};

const minimapStyle: CSSProperties = {
  height: 120,
};

export default function OverviewFlow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState<string[]>([]);

  const deletePressed = useKeyPress("Delete");

  // Update nodes when they are dragged or resized
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Update nodes when they are dragged or resized
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Update selected nodes and edges when the user selects them
  const onSelectionChange: OnSelectionChangeFunc = useCallback(
    ({ nodes, edges }: OnSelectionChangeParams) => {
      const nodeIds = nodes.map((node) => node.id);
      const edgeIds = edges.map((edge) => edge.id);
      setSelectedNodeIds(nodeIds);
      setSelectedEdgeIds(edgeIds);
    },
    []
  );

  // Connect nodes when they are dragged on top of each other
  const onConnect: OnConnect = useCallback(
    (connection) => {
      const { source, target } = connection;
      const isConnected = edges.some((edge) => {
        return (
          (edge.source === source && edge.target === target) ||
          (edge.source === target && edge.target === source)
        );
      });

      if (isConnected) {
        return;
      }

      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      );
    },
    [edges, setEdges]
  );

  // Delete selected nodes and edges when the delete key is pressed
  useEffect(() => {
    if (deletePressed) {
      setNodes((nds) =>
        nds.filter((node) => !selectedNodeIds.includes(node.id))
      );

      setEdges((eds) =>
        eds.filter((edge) => !selectedEdgeIds.includes(edge.id))
      );
    }
  }, [deletePressed, selectedNodeIds, selectedEdgeIds, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onSelectionChange={onSelectionChange}
    >
      <AddNodeButton />
      <ThemeToggle />
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}
