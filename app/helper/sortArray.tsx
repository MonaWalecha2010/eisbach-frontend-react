import moment from "moment";
import { string } from "yup";

export const sortAlphabeticallyAsce=(data:[]|any)=>{
    const sortedData = [...data].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
    
        if (nameA < nameB) {
        return -1;
        }
        if (nameA > nameB) {
        return 1;
        }
        return 0;
    });
    return sortedData;
}

export const sortByTimeStamp = (Arr:any) => {
    return Arr.sort(Timestamp_sortFunction);
    //return JSON.stringify(Arr);
}

function Timestamp_sortFunction(a:any, b:any) {
    let dateA = new Date(a.Timestamp).getTime();
    let dateB = new Date(b.Timestamp).getTime();
    return dateA < dateB ? 1 : -1;
}

export const sortByModifiedAt = (Arr:any) => {
  return Arr.sort(ModifiedAt_sortFunction); 
}

function ModifiedAt_sortFunction(a:any, b:any) {
  let dateA = new Date(a.modified_at).getTime();
  let dateB = new Date(b.modified_at).getTime();
  return dateA < dateB ? 1 : -1;
}

export const sortByModifiedAtAsc = (Arr:any) => {
  return Arr.sort(ModifiedAtAsc_sortFunction); 
}

function ModifiedAtAsc_sortFunction(a:any, b:any) {
  let dateA = new Date(a.modified_at).getTime();
  let dateB = new Date(b.modified_at).getTime();
  return dateA > dateB ? 1 : -1;
}

export const sortByLatestModifiedAt=(data:any, key:string)=> {
  return data.sort((a:any, b:any) => {
    // const timeA = new Date(`2000-01-01T${a[key]}`).getTime();
    // const timeB = new Date(`2000-01-01T${b[key]}`).getTime();
    const timeA = new Date(a[key]).getTime();
    const timeB = new Date(b[key]).getTime();      
    return timeA - timeB;
  });
  // return data.sort((a:any, b:any) => {    
  //   new Date(b[key]).getTime() - new Date(a[key]).getTime()  
  // });
}
export const soryByTime=(dataArray:any, key:string)=>{
  return [...dataArray].sort((a, b) => {
    const valueA = new Date(a[key]);
    const valueB = new Date(b[key]);
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
};
export const dateFormatYYYYMMDDhhmm = (date:any) => {
  return moment(date).format('yyyy-MM-DD hh:mm:ss A');
}
export const convertToJSON = (jsonData:any) => {
  const lines = jsonData.split('\n');
  const parsedObject:any = {};
  for (const line of lines) {
    if (!line.startsWith('#')) {     
      const [keyValue, value] = line.split(' ');
      if (keyValue && value) {
        parsedObject[keyValue] = value;

      }
    }
  }
  return parsedObject;
};

export const awsTextToJson = (awsString:any) => {
  const lines = awsString.split('\n');
  const data:any = [];
  const regex = /^(\w+)\{(.+?)\} (\d+)$/;
  lines.forEach((line:any) => {
    if (!line.startsWith('#')) {
      const match = line.match(regex);
      if (match) {
        const [, key, properties, value] = match;
        const obj = {
          [key]: {
            ...properties.split(',').reduce((acc:any, property:any) => {
              const [propKey, propValue] = property.split('=');
              acc[propKey] = propValue;
              return acc;
            }, {}),
            val: parseInt(value, 10),
          },
        };
        data.push(obj);
      }
    }
  });
  return data;
};