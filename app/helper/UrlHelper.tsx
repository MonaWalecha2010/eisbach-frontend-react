import { usePathname } from 'next/navigation';
export const UrlHelper = () => {   
    let url:string = '';
    let key:string = '';
    const currentRoute = usePathname(); 
    if(currentRoute.startsWith('/gateways/development')){
        url = process?.env?.NEXT_PUBLIC_DEV_API_URL as string
        key = process?.env?.NEXT_PUBLIC_DEV_API_KEY as string
    }else if(currentRoute.startsWith('/gateways/production')){
        url = process?.env?.NEXT_PUBLIC_PROD_API_URL as string
        key = process?.env?.NEXT_PUBLIC_PROD_API_KEY as string
    }
    return {url : url, key:key}
}
export const removeSlashTwenty =(slug:string|any)=>{
    if(slug.includes("%20")){
        return slug.replace(/%20/g, ' ')
    }else{ 
        return slug;
    }   
}