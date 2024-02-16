import { Start, StartBg, StartRedBg } from '@/icons/Icons'
import axios from '@/lib/axiosConfig'
import { useAuthenticate } from '@/store/useAuthenticate'
import { PropertyCalificationType, User } from '@/types'
import { useEffect, useState } from 'react'
import  Rating  from 'react-rating'
import { useFetcher } from 'react-router-dom'
import { toast } from 'sonner'

const PropertyCalification = ({califications, propertyId, setCalification} : {califications : PropertyCalificationType[], propertyId : string, setCalification : any}) => {

    const [generalCalification, setGeneralCalification] = useState<number>(0)
    const [myCalification, setMyCalification] = useState<PropertyCalificationType | null >(null)
    const [showMyCalification, setShowMyCalification] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null)

    

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
                        setMyCalification(myCalificationR)
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

    const changeHandle = async (e) => {
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
              <Rating emptySymbol={<Start/>}
                    fullSymbol={<StartRedBg/>}
                    fractions={2}
                    readonly
                    initialRating={generalCalification}/>
                {generalCalification == 0 && <p className='text-sm font-thin'>Sin calificación</p>}
            </div>

            {
                showMyCalification && 
                <div className='flex flex-col items-center'>
              <p className='text-sm my-1'>Tu calificación:</p>
              <Rating emptySymbol={<Start/>}
                    fullSymbol={<StartBg/>}
                    fractions={2}
                    initialRating={myCalification?.calification}
                    onChange={changeHandle}/>
            </div>
            }

        </div>
    )
}

export default PropertyCalification 