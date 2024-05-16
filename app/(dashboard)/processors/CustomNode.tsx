import React, { FC, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

interface TextUpdaterNodeProps {
  data: any;
  isConnectable: boolean;
}

const handleStyle = { left: 10 };

const TextUpdaterNode: FC<TextUpdaterNodeProps> = ({ data, isConnectable }) => {
  

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className='text-black rounded-lg p-1	'> {data?.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        // style={handleStyle}
        isConnectable={isConnectable}
      />
      {/* <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} /> */}
    </div>
  );
}

export default TextUpdaterNode;