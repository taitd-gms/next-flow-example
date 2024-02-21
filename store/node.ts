import { Edge, Node } from "reactflow";
import { create } from "zustand";
import { nodes as initialNodes, edges as initialEdges } from "../elements";

type Store = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  selectedNodeIds: string[];
  selectedEdgeIds: string[];
  setSelectedNodeIds: (selectedNodeIds: string[]) => void;
  setSelectedEdgeIds: (selectedEdgeIds: string[]) => void;
};

export const useNodeStore = create<Store>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeIds: [],
  selectedEdgeIds: [],
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  setSelectedNodeIds: (selectedNodeIds) => set({ selectedNodeIds }),
  setSelectedEdgeIds: (selectedEdgeIds) => set({ selectedEdgeIds }),
}));
