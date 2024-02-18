
import { ResponseDataLink } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pagination = ({links, setPage} : {links  : ResponseDataLink[], setPage : any}) => {



    const onclickHandle = (link : string | null) =>{
        if(link != null){
            const page = parseInt(link.split("=")[1])
            setPage(page)
        }
        
    }

    function getClassName(active : boolean) {
        if(active) {
            return "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-900 text-white bg-gray-900 dark:bg-gray-600 dark:text-white";
        } else{
            return "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-900 bg-white text-black hover:bg-gray-800 hover:text-white dark:hover:text-blac";
        }
    }

    const setLabel = (label : string) => {
        if(label == 'Next &raquo;'){
            return <span> <ArrowRight className='text-xs mb-0.4 ml-0.4'/> </span>
        }else if (label == '&laquo; Previous'){
            return <span> <ArrowLeft className='text-xs mb-0.4 mr-0.4'/> </span>
        }else{
            return label
        }
    }

    return (
        links?.length > 3 && (
            <div className="my-14">
                <div className="flex flex-wrap mt-8 justify-center">
                    {links?.map((link, key) => (
                        link.url === null ?
                            (<div key={key}
                            className="first:ml-0 text-xs font-bold mx-2 flex w-8 h-8 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-500 bg-white text-gray-500">{setLabel(link.label)}</div>)
                            :
                            (<button key={key} onClick={() => onclickHandle(link.url)} className={getClassName(link.active)}>{setLabel(link.label)}</button>)
                        ))}
                </div>
            </div>
        )
    );
}

export default Pagination