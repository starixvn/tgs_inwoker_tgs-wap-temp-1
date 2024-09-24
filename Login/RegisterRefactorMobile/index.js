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


const RegisterMob = ({ handleLoginSuccess }) => {
    const commonprops = {
        handleLoginSuccess: handleLoginSuccess
    }
    return (
        <ProvidersRegister>
            <RegisterMobile {...commonprops}></RegisterMobile>
        </ProvidersRegister>
    )
}

export default RegisterMob;
