
import axios from '@/lib/axiosConfig'
import { PropertyCalificationType, User } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ReactStars from 'react-rating-star-with-type'
import { useAuthenticate } from '@/store/useAuthenticate'

const PropertyCalification = ({califications, propertyId, setCalification} : 
    {califications : PropertyCalificationType[], propertyId : number, setCalification? : any}) => {
    const [generalCalification, setGeneralCalification] = useState<number>(0)
    const [myCalification, setMyCalification] = useState<PropertyCalificationType | null >(null)
    const [showMyCalification, setShowMyCalification] = useState<boolean>(false)
    const [ user, setUser] = useState<User | null>(null)
    const isAuthenticated = useAuthenticate((state) => state.isAuthenticated)
    const userAuthenticated = useAuthenticate((state) => state.user)


    useEffect(() => {
        const checkAuthenticated = () => {
            try {
                if (isAuthenticated) {
                    setUser(userAuthenticated)
                    setShowMyCalification(true)
                    if (califications.length > 0) {
                        const myCalificationR = califications.find(calification => calification.user_id === user?.id)
                        if(myCalificationR) setMyCalification(myCalificationR)
                    }
                }else{
                    setShowMyCalification(false)
                }
               
            } catch (error : any) {
                toast.error('Error al obtener datos del usuario:', error);
            }
        }
        checkAuthenticated();
    }, [isAuthenticated]);

    useEffect(() => {
         // Saco la calificación general
         if (califications.length > 0) {
            const nC = califications.length
            const tC = califications.reduce((total, calification) => total + calification.calification, 0)
            const gC = Math.round(tC / nC)
            setGeneralCalification(gC)
        }
    },[setCalification])

    const changeHandle = async (e : any) => {
        const res = await axios.post('/property/addCalification/' + propertyId, { calification : e})
        setCalification(true)
        setMyCalification(res.data)
        toast.success("Calificación agregada", {
            description: "Has calificado esta propiedad",
          });
    }

    return(
        <div className='flex gap-8 my-10 items-center justify-center'>

            <div className={`flex flex-col items-center justify-center ${generalCalification == 0 && 'mt-5'}`}>
              <p className='text-sm my-1'>Calificación general:</p>
              <ReactStars  
                value={generalCalification}  
                isEdit={true} 
                activeColors={[ "red", "orange", "#FFCE00", "#9177FF","#8568FC",]} />

            </div>

            {
            showMyCalification && 
            <div className={`flex flex-col items-center justify-center ${generalCalification == 0 && 'mt-5'}`}>
                <p className='text-sm my-1'>Tu calificación:</p>
                <ReactStars 
                    onChange={(e)=> changeHandle(e)} 
                    value={myCalification?.calification}  
                    isEdit={true}  
                    isHalf={true}
                    activeColors={[ "red", "orange", "#FFCE00", "#9177FF","#856899",]}/>
            </div>

                


            }
    </div>

       
    )
}

export default PropertyCalification 