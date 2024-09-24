import React, { useState } from "react";

export const useRegister =()=>{
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePassword2, setHidePassword2] = useState(true);

    const handleToggleShow =()=>{
        setHidePassword(!hidePassword); 
    }
    const handleToggleShow2 =()=>{
        setHidePassword2(!hidePassword2); 
    }

    return {hidePassword,hidePassword2,handleToggleShow,handleToggleShow2}
}
