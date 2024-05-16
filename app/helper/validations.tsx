export const ValidateEmail=(email: string | undefined) =>{   
    var regex= /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return(email && regex.test(email)? true: false);    
}

export const ValidatePassword=(val: string | undefined) =>{ 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return(val && passwordRegex.test(val)? true: false);
}
