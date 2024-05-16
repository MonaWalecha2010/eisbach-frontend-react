import React, {useRef, useState, useCallback} from 'react'
import ReactFlow, { getIncomers,getConnectedEdges,
  getOutgoers, useReactFlow, Node, Position, MarkerType,Controls } from 'reactflow';
import { Edge,updateEdge,addEdge,useEdgesState,} from 'reactflow';
import { Background, BackgroundVariant} from 'reactflow';
import CustomNode from './CustomNode';
import styles from '../../styles/styles.module.scss'
import PopupModal from '@/app/components/modal/PopupModal';


const nodeTypes = { textUpdater: CustomNode };

type RequetProps={
    nodes:Node[];
    setNodes: any;
    onNodesChange:any;
    edges:Edge[];
    setEdges:any; 
    onEdgesChange:any;
    nodesCount:number;
}
const RequestChain:React.FC<RequetProps>=({nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, nodesCount }) => {
    const positionR = "right" as Position;
    const positionL = "left" as Position;
    let id = nodesCount;
    const getId = () => `${id++}`;
    const updateNodeModelRef = useRef<HTMLDialogElement>(null) 
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);   
    const [nodeName, setNodeName] = useState<string>('Node 1')
    const [nodeClass, setNodeClass] = useState<string>('')
    const [selectedNodes, setSelectedNodes] = useState<Node>()
    const { screenToFlowPosition } = useReactFlow();
    const edgeUpdateSuccessful = useRef(true);

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
              // type: 'textUpdater',
              sourcePosition: positionR,
              targetPosition: positionL,
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),              
              data: { label: `Node ${id}`,class:`Class ${id}` },
              origin: [0.5, 0.0],
            };    
            setNodes((nds:Node[]) => nds.concat(newNode));
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
    const closeUpdateNodeModel=()=>{
        if (updateNodeModelRef?.current) {           
          updateNodeModelRef.current.close();
        }
      }
      const handleNodeDoubleClick = (event:any, node:Node) => {
        setSelectedNodes(node);
        console.log('Node double-clicked:', node);
        if (updateNodeModelRef?.current) {           
          updateNodeModelRef.current.show();
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
                  
                  class:nodeClass,
                };
              }              
              return node;
            })
          );
          closeUpdateNodeModel();         
        }
    }

    // remove edge
    const onEdgeUpdateStart = useCallback(() => {
      edgeUpdateSuccessful.current = false;
    }, []);
  
    const onEdgeUpdate = useCallback((oldEdge:any, newConnection:any) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els:any) => updateEdge(oldEdge, newConnection, els));
    }, []);
  
    const onEdgeUpdateEnd = useCallback((_:any, edge:any) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds:any) => eds.filter((e:any) => e.id !== edge.id));
      }
  
      edgeUpdateSuccessful.current = true;
    }, []);

  
// delete node 
    const onNodesDelete = useCallback(
      (deleted:any) => {
        setEdges(
          deleted.reduce((accc:any, node:any) => {
            const incomers = getIncomers(node, nodes, edges);
            const outgoers = getOutgoers(node, nodes, edges);
            const connectedEdges = getConnectedEdges([node], edges);
  
            const remainingEdges = accc.filter((edge:any) => !connectedEdges.includes(edge));
  
            const createdEdges = incomers.flatMap(({ id: source }) =>
              outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
            );
  
            return [...remainingEdges, ...createdEdges];
          }, edges)
        );
      },
      [nodes, edges]
    );

    return (<>
        <div style={{ width: '100%', height: '69vh' }} ref={reactFlowWrapper}>
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
            // onEdgeUpdate={onEdgeUpdate}
            // onChange={(data)=>{console.log(data)}}
            // onEdgeUpdateStart={onEdgeUpdateStart}
            // onEdgeUpdateEnd={onEdgeUpdateEnd}   
            className="bg-blue-10"        
            fitView
            // fitViewOptions={{ padding: 2 }}
            // nodeOrigin={[0.5, 0]}
        >  
         <Controls />
        
            <PopupModal modalId='updateSelectedNodeModal' modalRef={updateNodeModelRef} width='w-[32.938rem] mx-w-3xl' height='h-[15rem]' closeModal={closeUpdateNodeModel} modalTitle={`Update Node`} >
              <div className='text-center'>
                <div className="flex flex-row flex-nowrap form-control w-full mb-5 mt-5">
                  <label className={`${styles.label_text} label text-primary-100 mr-3`}>Node Value:</label>                 
                  <input name="nodeName" className='input input-sm input-bordered max-w-xs text-black-100 focus:outline-none grow-1 w-full' value={nodeName} onChange={(evt:any) => setNodeName(evt.target.value)} />
                 </div>
                 <div className="flex flex-row flex-nowrap form-control w-full mb-5 mt-5">
                  <label className={`${styles.label_text} label text-primary-100 mr-3`}> Class Value:</label>                 
                  <input name="nodeName" className='input input-sm input-bordered max-w-xs text-black-100 focus:outline-none grow-1 w-full' value={nodeClass} onChange={(evt:any) => setNodeClass(evt.target.value)} />
                </div>
                <button type='button' className='mt-3 ml-auto btn btn-sm btn-outline hover:bg-slate-100 hover:text-primary-100 mx-auto' onClick={()=>updateSelectedNode()}> Update</button>
              </div>
            </PopupModal>
            {/* <Background
        id="1"
        gap={10}
        color="#000000"
        variant={BackgroundVariant.Dots}
      /> */}
      {/* line,cross,Dots */}
          </ReactFlow>
        </div>
    </>)
}

export default RequestChain