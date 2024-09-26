import { RegisterProvider, NotifyContextProvider } from "../../../Common/providers";
import RegisterMobile from './RegisterMobile'


const ProvidersRegister = ({ children }) => {
    return (
        <NotifyContextProvider>
            <RegisterProvider>
                {children}
            </RegisterProvider>
        </NotifyContextProvider>
    );
}


const RegisterMob = ({ onHandleLoginSuccess,hadSend }) => {
    const commonprops = {
        onHandleLoginSuccess: onHandleLoginSuccess,
        hadSend:hadSend
    }
    return (
        <ProvidersRegister>
            <RegisterMobile {...commonprops}></RegisterMobile>
        </ProvidersRegister>
    )
}

export default RegisterMob;
