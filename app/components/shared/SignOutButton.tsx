import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'
import { SignoutIcon } from "../icons/svgIcons";
import { useAppDispatch } from "@/app/store/hooks";
import { setOrg, setUser, setGateway, setIsGatewayProcessing } from "@/app/store/reducers/gateway.reducer";
const SignOutButton = () => {
  const dispatch = useAppDispatch();
  const { signOut } = useClerk();
  const router = useRouter()
  const handleSignout=()=>{
    dispatch(setUser(''))
    dispatch(setOrg('')) 
    dispatch(setGateway(''))  
    dispatch(setIsGatewayProcessing(false))  
    signOut(() => router.push("/sign-in"))
  };  
   
  return (    
    <button onClick={() => {handleSignout()}} className="ml-4">
      <span className="flex items-center"><SignoutIcon /><span className="text-gray-100 ml-4"> Sign out</span></span>
    </button>
  );
};
export default SignOutButton;