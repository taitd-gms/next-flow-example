import { Handle } from "reactflow";

export default function WorkHandle({ position, source }) {
  return (
    <Handle
      type="target"
      position={position}
      isValidConnection={(connection) => connection.source === source}
      onConnect={(params) => console.log("handle onConnect", params)}
      style={{ background: "#fff" }}
    />
  );
}
