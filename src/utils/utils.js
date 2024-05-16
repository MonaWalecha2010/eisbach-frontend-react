export const filterListData=(prevList, setList, value)=>{
    let prev = prevList;
    let itemIndex = prev.indexOf(value);
    if (itemIndex !== -1) {
        prev.splice(itemIndex, 1);
    } else {
        prev.push(value);
    } 
    return(setList([...prev]));    
}
export const handleFilterState=(currState, newState, value)=>{
   return filterListData(currState, newState, value ); 
}
export const multiListFiltersData=(listUt, listE1, typeFilters=[],lmsnFilters=[],compFilters=[], diaFilters=[], dialFilters=[], caseFilters=[], strapFilters=[], orderBy)=>{
    var currentListUt = listUt; 
    var currentListE1 = listE1;    
    if(typeFilters.length>0){
        currentListUt=currentListUt.filter(item => typeFilters.some(i=>{
            return item.filter_type.includes(i);
        }));
        currentListE1=currentListE1.filter(item => typeFilters.some(i=>{
            return item.filter_type.includes(i);
        }));
    }
    if(compFilters.length>0){       
        currentListUt=currentListUt.filter(item => compFilters.some(i=>{
            return item.complication.includes(i);
        }));
        currentListE1=currentListE1.filter(item => compFilters.some(i=>{
            return item.complication.includes(i);
        }));
    }
    if(diaFilters.length>0){            
        currentListUt=currentListUt.filter(item => diaFilters.includes(item.diameter));
        currentListE1= currentListE1.filter((item) => diaFilters.includes(item.diameter));           
    }
    if(lmsnFilters.length>0){
        currentListUt=currentListUt.filter(item => lmsnFilters.includes(item.illumination));
        currentListE1= currentListE1.filter((item) => lmsnFilters.includes(item.illumination));           
    } 
    if(dialFilters.length>0){           
        currentListUt=currentListUt.filter(item => dialFilters.includes(item.dial_color));
        currentListE1= currentListE1.filter((item) => dialFilters.includes(item.dial_color));           
    }  
    if(caseFilters.length>0){
        currentListUt=currentListUt.filter(item => caseFilters.includes(item.case_color));
        currentListE1= currentListE1.filter((item) => caseFilters.includes(item.case_color)); 
    }
    if(strapFilters.length>0){
        currentListUt=currentListUt.filter(item => strapFilters.includes(item.strap));
        currentListE1= currentListE1.filter((item) => strapFilters.includes(item.strap));           
    }
    if(orderBy==='price-low-high'){
        currentListUt=currentListUt.sort((a, b) => new Date(a.Price) - new Date(b.Price));
        currentListE1=currentListE1.sort((a, b) => new Date(a.Price) - new Date(b.Price));
    }
    if(orderBy==='price-high-low'){  
        currentListUt=currentListUt.sort((a, b) => new Date(b.Price) - new Date(a.Price)); 
        currentListE1=currentListE1.sort((a, b) => new Date(b.Price) - new Date(a.Price)); 
    }
    if(orderBy==='latest'){
        currentListUt=currentListUt.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        currentListE1=currentListE1.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } 
    let count= currentListUt.length + currentListE1.length;
    return({'utList':currentListUt,'e1List': currentListE1, 'count': count });
}
export const singleListFiltersData=(listData, typeFilters=[],lmsnFilters=[],compFilters=[], diaFilters=[], dialFilters=[], caseFilters=[], strapFilters=[], orderBy)=>{
    var currentList = listData;
    if(typeFilters.length>0){        
        currentList=currentList.filter(item => typeFilters.some(i=>{
            return item.filter_type.includes(i);
        }));
    }
    if(compFilters.length>0){       
        currentList=currentList.filter(item => compFilters.some(i=>{
            return item.complication.includes(i);
        }));       
    }
    if(diaFilters.length>0){            
        currentList=currentList.filter(item => diaFilters.includes(item.diameter));
    }
    if(lmsnFilters.length>0){
        currentList=currentList.filter(item => lmsnFilters.includes(item.illumination));
    } 
    if(dialFilters.length>0){           
        currentList=currentList.filter(item => dialFilters.includes(item.dial_color));          
    }  
    if(caseFilters.length>0){
        currentList=currentList.filter(item => caseFilters.includes(item.case_color)); 
    }
    if(strapFilters.length>0){
        currentList=currentList.filter(item => strapFilters.includes(item.strap));           
    }
    if(orderBy==='price-low-high'){
        currentList=currentList.sort((a, b) => new Date(a.Price) - new Date(b.Price));       
    }
    if(orderBy==='price-high-low'){  
        currentList=currentList.sort((a, b) => new Date(b.Price) - new Date(a.Price));         
    }
    if(orderBy==='latest'){
        currentList=currentList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));        
    } 
    let count= currentList.length
    return({'productsList':currentList, 'count': count });
}
export const replaceCrmUrl=(fileUrl)=>{
    return fileUrl.replace(/\/crm\//, '');
}
export const getFilename=(fileUrl)=>{
    var filename = fileUrl.split('/').pop();
    return filename.substr(0, filename.lastIndexOf('.'));
}