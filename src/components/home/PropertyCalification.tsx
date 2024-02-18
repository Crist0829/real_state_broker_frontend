
import axios from '@/lib/axiosConfig'
import { PropertyCalificationType, User } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ReactStars from 'react-rating-star-with-type'

const PropertyCalification = ({califications, propertyId, setCalification} : 
    {califications : PropertyCalificationType[], propertyId : number, setCalification? : any}) => {

    const [generalCalification, setGeneralCalification] = useState<number>(0)
    const [myCalification, setMyCalification] = useState<PropertyCalificationType | null >(null)
    const [showMyCalification, setShowMyCalification] = useState<boolean>(false)
    const [_user, setUser] = useState<User | null>(null)

    

    useEffect(() => {
        const checkAuthenticated = async () => {
            try {
                const res = await axios.get('api/user');
                setUser(res.data);
                if (res.data != null) {
                    setShowMyCalification(true)
                    //Saco mi calificacion
                    if (califications.length > 0) {
                        const myCalificationR = califications.find(calification => calification.user_id === res.data.id)
                        if(myCalificationR) setMyCalification(myCalificationR)
                    }
                }
               
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        }
        checkAuthenticated();
    }, []);

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
        toast("Calificación agregada", {
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
                activeColors={[ "red", "orange", "#FFCE00", "#9177FF","#8568FC",]}/>
            </div>
            }
    </div>

       
    )
}

export default PropertyCalification 