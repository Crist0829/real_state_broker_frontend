import Sidebar from "@/components/auth/Sidebar";
import { PropsWithChildren, useEffect } from "react";
import PrincipalBackground from "@/components/PrincipalBackground";
import { useNavigate } from 'react-router-dom';
import axios from "@/lib/axiosConfig";
import { useAuthenticate } from '@/store/useAuthenticate';

function AuthLayout({ children }: PropsWithChildren) {

  const navigate = useNavigate()
  const deleteAuthenticated = useAuthenticate((state) => state.deleteAuthenticate);

  useEffect(() => {
    const checkAuthenticated = async () => {
      try{
        const res = await axios.get('api/user')
      }catch(e){

        if(e.response.status === 401){
          deleteAuthenticated()
          navigate('/')
        }
        
      }
    }
    checkAuthenticated()
  },[])

  return (
    <div className="flex flex-col min-h-dvh  relative">
      {/* Sidebar size */}
      <main className="md:pl-[120px] pb-[100px] container  mx-auto animate-fade-in ">
        {children}
      </main>
      <Sidebar />
      <PrincipalBackground />
    </div>
  );
}

export default AuthLayout;

/* Las páginas que si o si necesiten que el usuario este autenticado */
