import { memo, useCallback, useState } from "react";
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useUpdateNodeInternals,
} from "reactflow";

type NodeData = {
  value: number;
};

export type CustomNodeType = Node<NodeData>;

function WorkNode({ id, data, isConnectable }: NodeProps<NodeData>) {
  return (
    <div className="bg-white rounded-md p-2 min-w-20 flex items-center justify-center border">
      <Handle
        type="target"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id="target-bottom"
      />

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        id="target-top"
      />

      <Handle
        type="target"
        position={Position.Right}
        isConnectable={isConnectable}
        id="target-right"
      />

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="target-left"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id="source-bottom"
      />

      <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
        id="source-top"
      />

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        id="source-right"
      />

      <Handle
        type="source"
        position={Position.Left}
        isConnectable={isConnectable}
        id="source-left"
      />

      <span className="text-black text-sm">Node {data.value}</span>
    </div>
  );
}

export default memo(WorkNode);
