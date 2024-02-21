import { Edge, MarkerType, Node } from "reactflow";

export const nodes: Node[] = [
  { id: "1", data: { label: "Default node 1" }, position: { x: 500, y: 400 } },
  { id: "2", data: { label: "Default node 2" }, position: { x: 500, y: 600 } },
  { id: "3", data: { label: "Default node 3" }, position: { x: 800, y: 600 } },
  {
    id: "4",
    type: "workNode",
    position: { x: 100, y: 200 },
    data: {
      value: 42,
    },
  },
];

export const edges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
