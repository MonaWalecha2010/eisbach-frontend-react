import React, {useRef, useState, useCallback} from 'react'
import ReactFlow, { addEdge, useReactFlow, Node, Edge, Position, MarkerType,Controls } from 'reactflow';
import styles from '../../styles/styles.module.scss'
import PopupModal from '@/app/components/modal/PopupModal';
import CustomNode from './CustomNode';

const nodeTypes = { textUpdater: CustomNode };

type ResponseProps={
    nodes:Node[];
    setNodes: any;
    onNodesChange:any;
    edges:Edge[];
    setEdges:any; 
    onEdgesChange:any;
    nodesCount:number;
}
const ResponseChain:React.FC<ResponseProps>=({nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, nodesCount }) => {
    const positionR = "right" as Position;
    const positionL = "left" as Position;
    let id = nodesCount;
    const getId = () => `${id++}`;
    const updateResNodeModelRef = useRef<HTMLDialogElement>(null) 
    const reactResFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);   
    const [nodeName, setNodeName] = useState<string>('Node 1')
    const [selectedNodes, setSelectedNodes] = useState<Node>()
    const { screenToFlowPosition } = useReactFlow();
    const onConnect = useCallback(
    (params:any) => {
        // reset the start node on connections
        connectingNodeId.current = null;
        setEdges((eds:Edge[]) => addEdge(params, eds))
    }, [],);    
    const onConnectStart = useCallback((_:any, { nodeId }: { nodeId: any }) => {
        connectingNodeId.current = nodeId;
    }, []);
    const onConnectEnd = useCallback(
        (event:any) => {
          if (!connectingNodeId.current) return;    
          const targetIsPane = event.target.classList.contains('react-flow__pane');    
          if (targetIsPane) {
            // we need to remove the wrapper bounds, in order to get the correct position
            const id = getId();
            const newNode = {
              id,
              sourcePosition: positionR,
              targetPosition: positionL,
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),              
              data: { label: `Node ${id}` },
              origin: [0.5, 0.0],
            };    
            setNodes((nds:any) => nds.concat(newNode));
            setEdges((eds:any) =>
              eds.concat({ id, source: connectingNodeId.current, target: id, markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#5945FF',
              }, }),
            );
          }
        },
        [screenToFlowPosition],
    );
    const closeUpdateResNodeModel=()=>{
        if (updateResNodeModelRef?.current) {           
            updateResNodeModelRef.current.close();
        }
    }
    const handleNodeDoubleClick = (event:any, node:Node) => {
        setSelectedNodes(node);
        console.log('Node double-clicked:', node);
        if (updateResNodeModelRef?.current) {           
            updateResNodeModelRef.current.show();
        }
        // Handle double-click event here
    };
    const updateSelectedNode=()=>{
        if(selectedNodes ){
          console.log(selectedNodes)
          setNodes((nds:Node[]) =>
            nds.map((node:Node) => {
              if (node.id === selectedNodes?.id) {
                // it's important that you create a new object here
                // in order to notify react flow about the change
                node.data = {
                  ...node.data,
                  label: nodeName,
                };
              }              
              return node;
            })
          );
          closeUpdateResNodeModel();         
        }
    }
    return (<>
        <div style={{ width: '100%', height: '69vh' }} ref={reactResFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            // onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
            // onConnectStart={onConnectStart}
            // onConnectEnd={onConnectEnd}
            // attributionPosition="bottom-left"
            // onNodeDoubleClick={handleNodeDoubleClick}
            // onNodesDelete={onNodesDelete}
            // fitView
            // fitViewOptions={{ padding: 2 }}
            // nodeOrigin={[0.5, 0]}
              fitView
        >       
                 <Controls />

            <PopupModal modalId='updateSelectedNodeModal' modalRef={updateResNodeModelRef} width='w-[32.938rem] mx-w-3xl' height='h-[15rem]' closeModal={closeUpdateResNodeModel} modalTitle={`Update Node`} >
              <div className='text-center'>
                <div className="flex flex-row flex-nowrap form-control w-full mb-5 mt-5">
                  <label className={`${styles.label_text} label text-primary-100 mr-3`}>Node Value:</label>                 
                  <input name="nodeName" className='input input-sm input-bordered max-w-xs text-black-100 focus:outline-none grow-1 w-full' value={nodeName} onChange={(evt:any) => setNodeName(evt.target.value)} />
                </div>
                <button type='button' className='mt-3 ml-auto btn btn-sm btn-outline hover:bg-slate-100 hover:text-primary-100 mx-auto' onClick={()=>updateSelectedNode()}> Update</button>
              </div>
            </PopupModal>
          </ReactFlow>
        </div>
    </>)
}
export default ResponseChain