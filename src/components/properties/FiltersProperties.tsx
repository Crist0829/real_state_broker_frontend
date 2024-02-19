import {  useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { RedoIcon, Search } from "lucide-react"
import { Badge } from "../ui/badge"
import { FiltersPropertiesType } from "@/types"


const FiltersProperties = ({filters, setFilters, showDeletes} : {filters : FiltersPropertiesType, setFilters : any, showDeletes : boolean}) => {

    const initialFiltersValue = {
      bedrooms : "",
      bathrooms : "", 
      livingrooms : "",
      kitchens : "",
      floors : "",
      type : '',
      garage : "",
      paginate :"",
      deleted : "" 
  }

    const [formData, setFormData] = useState<FiltersPropertiesType>(initialFiltersValue)
    const [ showResetFiltersButton, setShowResetFiltersButton] = useState<boolean>(false)

    useEffect(() => setFormData(filters), [filters])

    useEffect(() => {
    
      setShowResetFiltersButton(formData !== filters )
    
    }, [formData])

    const onChangeHandle = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData : any) => ({
          ...prevData,
          [name]: value,
        }));
    }

    const resetFilters = () => {
      setFilters(initialFiltersValue)
      setFormData(initialFiltersValue)
    }

    return (
        <>
        <Badge className="p-3" variant="outline">Filtros de Búsqueda</Badge>

        <div className="flex flex-row flex-wrap justify-center items-baseline gap-5 mb-8 mt-3">
          <Label htmlFor="floors">
            <small className="text-sm  uppercase text-center block">
              pisos
            </small>
            <Input
              min={0}
              name="floors"
              type="number"
              id="floors"
              value={formData.floors}
              onChange={onChangeHandle}
            />
          </Label>

          <Label htmlFor="livingrooms">
            <small className="text-sm  uppercase text-center block">
              livings
            </small>
            <Input
              min={0}
              type="number"
              id="livingrooms"
              name="livingrooms"
              value={formData.livingrooms}
              onChange={onChangeHandle}
            />
          </Label>

          <Label htmlFor="bathrooms">
            <small className="text-sm  uppercase text-center block">
              baños
            </small>
            <Input
              name="bathrooms"
              min={0}
              type="number"
              id="bathrooms"
              onChange={onChangeHandle}
              value={formData.bathrooms}
            />
          </Label>
          <Label htmlFor="kitchens">
            <small className="text-sm  uppercase text-center block ">
              Cocinas
            </small>
            <Input
              min={0}
              type="number"
              name="kitchens"
              id="kitchens"
              value={formData.kitchens}
              onChange={onChangeHandle}
            />
          </Label>
          <Label htmlFor="bedrooms">
            <small className="text-sm  uppercase text-center block ">
              dormitorios
            </small>
            <Input
              min={0}
              type="number"
              name="bedrooms"
              id="bedrooms"
              value={formData.bedrooms}
              onChange={onChangeHandle}
            />
          </Label>

        </div>

            <div className="flex flex-row flex-wrap justify-center items-baseline gap-5 mb-8">
            <div className="dark:bg-gray-800">
                <select
                  className="dark:text-white bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 outline-none focus:outline-none focus:ring focus:border-blue-300"
                  name="type"
                  onChange={onChangeHandle}
                  value={formData.type}
                >
                  <option value="">Tipo</option>
                  <option value="sale">Venta</option>
                  <option value="rent">Renta</option>
                </select>
            </div>
            
            <div className="dark:bg-black">
                <select
                  className="dark:text-white bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 outline-none focus:outline-none focus:ring focus:border-blue-300"
                  onChange={onChangeHandle}
                  value={formData.garage}
                  name="garage"
                >
                  <option value="">Garage</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
            </div>
            


            <div className="dark:bg-gray-800">
                <select
                  className="dark:text-white bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 outline-none focus:outline-none focus:ring focus:border-blue-300"
                  onChange={onChangeHandle}
                  value={formData.paginate}
                  name="paginate"
                >
                  <option value="">Resultados</option>
                  <option value="8"> 8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                </select>
            </div>

            {
              showDeletes &&
              <div className="dark:bg-gray-800">
                <select
                  className="dark:text-white bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 outline-none focus:outline-none focus:ring focus:border-blue-300"
                  onChange={onChangeHandle}
                  value={formData.deleted}
                  name="deleted"
                >
                  <option value="">Eliminados</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
            </div>
            }

            <Button onClick={() => setFilters(formData)} variant="outline">Filtrar <Search className="mx-2"/> </Button>
            {
              showResetFiltersButton && 
              <Button onClick={() => resetFilters()} variant="outline">Resetear <RedoIcon className="mx-2"/> </Button>
            }


            </div>


        </>
        
    )
}

export default FiltersProperties