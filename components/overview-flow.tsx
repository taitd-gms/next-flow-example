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
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { nodes as initialNodes, edges as initialEdges } from "../elements";
import { CSSProperties, useCallback, useState } from "react";

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

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      console.log("🚀 ~ OverviewFlow ~ connection:", connection);
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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <AddNodeButton />
      <ThemeToggle />
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}
