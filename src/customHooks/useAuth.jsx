import { useContext } from 'react';
import { AuthContext } from "../Components/Routes/Pages/Authentication/AuthProvider/AuthContext";

const useAuth = () => {
    const authInfo = useContext(AuthContext);
    return authInfo;
};

export default useAuth;
