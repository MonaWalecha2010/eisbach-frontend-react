import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ReactFlow, {  Position  } from 'reactflow';
type GatewayState = {
  user?:any;
  org?:any;
  gateway?:any;
  alert?:number|null;
  isGatewayProcessing?:boolean;
  requestProcessor?:any;
  responseProcessor?:any;
};

const initialState = {
  gateway:{},
  user:{},
  org:{},
  alert:null,
  isGatewayProcessing:false,
  requestProcessor:[{id: '0', sourcePosition: "right" as Position, type: 'input', position: { x: 0, y: 80 }, data: { label: 'Default Node' },  },],
  responseProcessor:[{id: '0', sourcePosition: "right" as Position, type: 'input', position: { x: 0, y: 80 }, data: { label: 'Default Node' },  },]
} as GatewayState;

export const gatewayReducer = createSlice({
  name: "gateway",
  initialState,
  reducers: {
    setGateway: (state, action: PayloadAction<string>) => {
      state.gateway = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setOrg: (state, action: PayloadAction<any>) => {
      state.org = action.payload;
    },
    setAlert: (state, action: PayloadAction<number|null>) => {
      state.alert = action.payload;
    },
    setIsGatewayProcessing: (state, action: PayloadAction<boolean>)=>{
      state.isGatewayProcessing = action.payload
    },
    setRequestProcessor: (state, action: PayloadAction<any>)=>{
      state.requestProcessor = action.payload
    },
    setResponseProcessor: (state, action: PayloadAction<any>)=>{
      state.responseProcessor = action.payload
    }
  },
});

export const {
  setGateway,
  setUser,
  setOrg,
  setAlert,
  setIsGatewayProcessing,
  setRequestProcessor,
  setResponseProcessor
} = gatewayReducer.actions;

export default gatewayReducer.reducer;
