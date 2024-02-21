"use client";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { v4 as uuidv4 } from "uuid";

let nodeId = 0;

export default function AddNodeButton() {
  const reactFlowInstance = useReactFlow();

  const handleAddNode = useCallback(() => {
    const id = uuidv4();
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: "workNode",
      data: {
        value: id,
      },
    };
    reactFlowInstance.addNodes(newNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button className="absolute top-5 left-5 z-[100]" onClick={handleAddNode}>
      Add note
    </Button>
  );
}
