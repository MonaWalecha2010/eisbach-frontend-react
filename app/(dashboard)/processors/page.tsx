'use client'
import React, { ReactNode, useState} from 'react' ;
// import styles from '../../styles/styles.module.scss';
import 'reactflow/dist/style.css';
import './processors.scss';
import { useParams } from 'next/navigation';
import styles from '../../styles/styles.module.scss'
import PageTitle from '@/app/components/PageTitle';
import { useAppSelector , useAppDispatch} from '@/app/store/hooks';
import { getGateway, getUser, getRequestProcessor, getResponseProcessor } from '@/app/store/reducers/gateway.selector';
import { setRequestProcessor, setResponseProcessor } from '@/app/store/reducers/gateway.reducer';
import TabsComponent from '@/app/components/TabsComponent';
import ReactFlow, { useNodesState, useEdgesState, ReactFlowProvider, Node, Edge, Position,} from 'reactflow';
import AddButton from '@/app/components/buttons/AddButton';
import RequestChain from './RequestChain';
import ResponseChain from './ResponseChain';
import ProcessorHub from './ProcessorHub';
import { JsonPrettyColorCodes, JsonPrettyStyles } from '@/app/components/data/jsonPrettyData';
import { requestChainData, responseChainData } from '@/app/components/data/processorsData';
import JSONPretty from 'react-json-pretty';

export type childrenType = ReactNode;
const Processors = () => {
    const params = useParams();
    const dispatch = useAppDispatch()
    const requestProcessor = useAppSelector(getRequestProcessor)
    const responseProcessor = useAppSelector(getResponseProcessor)
      console.log("requestProcessor",requestProcessor)
      console.log("responseProcessor",responseProcessor)
    // const activeGateway = useAppSelector(getGateway);
    // const currentUser = useAppSelector(getUser) 
    const [currentTab, setCurrentTab] = useState<string>('Guardrails Hub')  
    // const [queryData, setQueryData] = useState<any>({status:200});
    
    const breadcrumbs=[
      { name: 'Home', link: '/'},
      { name: 'Processors', link: '/processors'}
    ]; 
    const positionR = "right" as Position;
    // const positionL = "left" as Position;{ id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } }
    // const initialState : Node[] = [{id: '0', type: 'textUpdater' , sourcePosition: positionR, position: { x: 0, y: 80 }, data: { label: 'Default Node' ,class:'first'},  }]          
    const initialState : Node[] = [
      {"id":"1","type":"textUpdater","data":{"label":"Start"},"position":{"x":0,"y":90}},
      {"id":"2","type":"textUpdater","data":{"label":"Log Processor "},"position":{"x":209.8406,"y":-102.62340000000009}},
      {"id":"3","type":"textUpdater","data":{"label":"Cost Guardrail "},"position":{"x":211.2464,"y":2.36220000000003}},
      {"id":"4","type":"textUpdater","data":{"label":"Rate Limiter"},"position":{"x":223.8986,"y":91.88400000000001}},
      {"id":"10","type":"textUpdater","data":{"label":"Prompt Injection "},"position":{"x":211.2464,"y":285.75380000000007}},
      {"id":"9","type":"textUpdater","data":{"label":"Group"},"position":{"x":512.8846000000001,"y":97.3766}},
      {"id":"5","type":"textUpdater","data":{"label":"Sensitive Data Protection"},"position":{"x":197.1884,"y":188.4348}},
      {"id":"6","type":"textUpdater","data":{"label":"Archive"},"position":{"x":683.9716,"y":-4.507399999999961}},
      {"id":"7","type":"textUpdater","data":{"label":"Secrets"},"position":{"x":682.5658,"y":180.92759999999998}},
      {"id":"8","type":"textUpdater","data":{"label":"End"},"position":{"x":847.4208000000001,"y":97.1884}}
    ];     
        
    //const initialReqNodes : Node[] = (requestProcessor && requestProcessor?.nodes)?requestProcessor?.nodes : initialState;
    const initialReqNodes : Node[] = initialState;
    // const initialReqEdges : Edge[] = (requestProcessor && requestProcessor?.edges)?requestProcessor?.edges : [];   
    const initialReqEdges : Edge[] = [
      {"id":"e1-2","source":"1","target":"2"},
      {"id":"e1-3","source":"1","target":"3"},
      {"id":"e1-4","source":"1","target":"4"},
      {"id":"e1-5","source":"1","target":"5"},
      {"id":"e1-6","source":"6","target":"8"},
      {"id":"e1-7","source":"7","target":"8"},
      {"source":"1","sourceHandle":"a","target":"10","targetHandle":null,"id":"reactflow__edge-1a-10"},
      {"source":"2","sourceHandle":"a","target":"9","targetHandle":null,"id":"reactflow__edge-2a-9"},
      {"source":"3","sourceHandle":"a","target":"9","targetHandle":null,"id":"reactflow__edge-3a-9"},
      {"source":"4","sourceHandle":"a","target":"9","targetHandle":null,"id":"reactflow__edge-4a-9"},
      {"source":"5","sourceHandle":"a","target":"9","targetHandle":null,"id":"reactflow__edge-5a-9"},
      {"source":"10","sourceHandle":"a","target":"9","targetHandle":null,"id":"reactflow__edge-10a-9"},
      {"source":"9","sourceHandle":"a","target":"6","targetHandle":null,"id":"reactflow__edge-9a-6"},
      {"source":"9","sourceHandle":"a","target":"7","targetHandle":null,"id":"reactflow__edge-9a-7"}];
    const [reqNodes, setReqNodes, onReqNodesChange] = useNodesState<Node[]>(initialReqNodes);
    const [reqEdges, setReqEdges, onReqEdgesChange] = useEdgesState<Edge[]>(initialReqEdges);
   
    const initialStateRes : Node[] = [
      {"id":"1","type":"textUpdater","data":{"label":"Start "},"position":{"x":0,"y":70}},
      {"id":"2","type":"textUpdater","data":{"label":"Cost Guardrail "},"position":{"x":130,"y":70}},
      {"id":"3","type":"textUpdater","data":{"label":"Trust & Safety "},"position":{"x":308,"y":70}},
      {"id":"4","type":"textUpdater","data":{"label":"Log Processor"},"position":{"x":568,"y":-34}},
      {"id":"5","type":"textUpdater","data":{"label":"Archive"},"position":{"x":554,"y":178}},
      {"id":"6","type":"textUpdater","data":{"label":"Response Processor"},"position":{"x":806,"y":74}},
      {"id":"7","type":"textUpdater","data":{"label":"End"},"position":{"x":1008,"y":76}}
    ]; 
  
  const initialReqEdgesRes : Edge[] =[
    {"id":"e1-2","source":"1","target":"2"},
    {"id":"e1-3","source":"2","target":"3"},
    {"id":"e1-4","source":"3","target":"4"},
    {"id":"e1-5","source":"3","target":"5"},
    {"id":"e1-6","source":"4","target":"6"},
    {"id":"e1-7","source":"5","target":"6"},
    {"id":"e1-8","source":"6","target":"7"}
  ];
    // const initialResNodes : Node[] = (responseProcessor && responseProcessor?.nodes)?responseProcessor?.nodes : initialStateRes;
    const initialResNodes : Node[] =  initialStateRes;
    //const initialResEdges : Edge[] = (responseProcessor && responseProcessor?.edges)?responseProcessor?.edges : initialReqEdgesRes;
    const initialResEdges : Edge[] = initialReqEdgesRes;
    const [resNodes, setResNodes, onResNodesChange] = useNodesState<Node[]>(initialResNodes);
    const [resEdges, setResEdges, onResEdgesChange] = useEdgesState<Edge[]>(initialResEdges);
   
    const clearCanvas = () => {
      if(currentTab==='Request Chain'){
        dispatch(setRequestProcessor({nodes:initialState, edges:[]}))
        setReqNodes(initialState)
        setReqEdges([])
      }else if(currentTab==='Response Chain'){
        dispatch(setResponseProcessor({nodes:initialState, edges:[]}))
        setResNodes(initialState)
        setResEdges([])
      }else{ return }
    }
    const saveCanvas = () => {
      if(currentTab==='Request Chain'){
        dispatch(setRequestProcessor({nodes:reqNodes, edges:reqEdges}))
      }else if(currentTab==='Response Chain'){
        console.log(resNodes)
        dispatch(setResponseProcessor({nodes:resNodes, edges:resEdges}))
      }else{ return }
    }

    const reqProps={
      nodes:reqNodes,
      setNodes:setReqNodes,
      onNodesChange:onReqNodesChange,
      edges:reqEdges, 
      setEdges:setReqEdges,
      onEdgesChange:onReqEdgesChange,
      nodesCount: (requestProcessor && requestProcessor?.nodes)?requestProcessor?.nodes?.length:1
    }
    const resProps={
      nodes:resNodes,
      setNodes:setResNodes,
      onNodesChange:onResNodesChange,
      edges:resEdges, 
      setEdges:setResEdges,
      onEdgesChange:onResEdgesChange,
      nodesCount: (responseProcessor && responseProcessor?.nodes)?responseProcessor?.nodes?.length:1
    }
    const tabsData=[
      {
        tabName: 'Guardrails Hub',
        content: ( <ProcessorHub />)
      },
      {
        tabName: 'Request Chain',
        content: ( <ReactFlowProvider>
          <RequestChain {...reqProps} />
        </ReactFlowProvider>)
      },
      {
        tabName: 'Response Chain',
        content: (<ReactFlowProvider>
          <ResponseChain {...resProps} />
        </ReactFlowProvider>)
      }
    ]
    return (
      <>
        <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0 '>                
          <PageTitle pageTitle="Processors" icon={false} breadcrumbData={breadcrumbs} />  
           <div>          
            {/* <AddButton click={()=>saveCanvas()} btnClass='mr-3' plusShow={false} btnTitle={'Save Canvas'} />    
            <AddButton click={()=>clearCanvas()} plusShow={false} btnTitle={'Clear Canvas'} />     */}
          </div>   
        </div>
        <div className='flex flex-row flex-wrap md:flex-nowrap'>
          <div className='flex-auto md:mr-2'>
            <div  className='h-100 px-6 py-6 border rounded-xl bg-white border-blue-700 '>
              <TabsComponent tabsData={tabsData} currentTab={currentTab} setCurrTab={setCurrentTab} />
            </div>
          </div>
          {currentTab !== 'Guardrails Hub' && 
            <div className='flex-1' >
              <div className="h-100 p-4 border rounded-xl border-blue-700 bg-white height-full ">
                <h2 className="text-md font-semibold text-primary-100 mb-2">JSON:</h2>
                <div  className="h-auto rounded-lg border border-zinc-200 dark:border-zinc-200">
                    <div style={{ height: '74vh'}} className={`w-full overflow-auto p-2 bg-transparent font-mono text-xs ${styles.fontMenlo}`}>{<JSONPretty id="json-pretty" {...JsonPrettyStyles} data={JSON.stringify(currentTab ==='Request Chain' ? requestChainData :responseChainData, null, 2)} theme={{...JsonPrettyColorCodes}}></JSONPretty>
                  }
                    </div>
                </div>
              </div>
            </div>
          }
        </div>
      </>
    );
}
export default Processors