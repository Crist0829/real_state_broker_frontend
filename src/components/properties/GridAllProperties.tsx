import { useEffect, useState } from "react";
import CardProperty from "./CardProperty";
import { Loader2Icon } from "lucide-react";
import { FiltersPropertiesType, Property, ResponseData } from "@/types";
import Pagination from "../common/Pagination";
import axios from "@/lib/axiosConfig";
import FiltersProperties  from "./FiltersProperties";

import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 3,

  1280: 2,
  768: 1,
  500: 1,
};

function GridAllProperties() {
  /* const allPropertiesGlobal = useProperties((state) => state.allProperties);
  const getAllProperties = useProperties((state) => state.getAllProperties);
  const currentPage = useProperties((state) => state.currentPage);
  const loading = useProperties((state) => state.loadingGetAllProperties); */
  const [allProperties, setAllProperties] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [calification, setCalification] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FiltersPropertiesType>({
    bedrooms : "",
    bathrooms : "", 
    livingrooms : "",
    kitchens : "",
    floors : "",
    type : '',
    garage : "",
    paginate :"",
    deleted : "" 
});

  

  const fetchAllProperties = async () => {
    const res = await axios.get("/all-properties?page=" + page, {
      params: filters,
    });
    setCalification(false);
    setLoading(false);
    setAllProperties(res.data.properties);
  };

  useEffect(() => {
    fetchAllProperties();
  }, [page, filters, calification]);

  return (
    <article className="container my-10 animate-fade-in" id="all-properties">
      <h2 className="text-3xl font-bold mb-14">PROPIEDADES DISPONIBLES</h2>
      {/* Si esta cargando */}

      <FiltersProperties setFilters={(e : FiltersPropertiesType) => setFilters(e)} filters={filters} showDeletes={false}/>

      {loading && (
        <div className="w-full flex justify-center p-5">
          {" "}
          <Loader2Icon className="animate-spin-counter-clockwise animate-iteration-count-infinite" />{" "}
        </div>
      )}
      {/* Si ya termino de cargar */}
      {!loading && allProperties !== null && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-properties"
          columnClassName="masonry-item-property"
        >
          {allProperties.data.map((property: Property) => (
            <CardProperty
              key={property.id}
              property={property}
              setCalification={(e : any) => setCalification(e)}
            />
          ))}
        </Masonry>
      )}
      {/* {!loading && allProperties !== null && (
        <section className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 relative animate-fade-in justify-start items-start">
          {allProperties.data.map((property: Property) => (
            <CardProperty
              key={property.id}
              property={property}
              setCalification={(e) => setCalification(e)}
            />
          ))}
        </section>
      )} */}

      {/* Si ya termino de cargar y no hay properties */}
      {!loading && allProperties?.data.length === 0 && (
        <div>No hay propiedades aún</div>
      )}

      {allProperties && allProperties.links !== null && (
        <Pagination
          links={allProperties?.links}
          setPage={(n: number) => setPage(n)}
        />
      )}
    </article>
  );
}

export default GridAllProperties;
