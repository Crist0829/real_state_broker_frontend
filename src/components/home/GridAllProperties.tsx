import { useEffect, useState } from "react";
import CardProperty from "./CardProperty";
import { Loader2Icon } from "lucide-react";
import { Property, ResponseData } from "@/types";
import Pagination from "./Pagination";
import axios from "@/lib/axiosConfig";
import FiltersProperties from "./FiltersProperties";

function GridAllProperties() {
  /* const allPropertiesGlobal = useProperties((state) => state.allProperties);
  const getAllProperties = useProperties((state) => state.getAllProperties);
  const currentPage = useProperties((state) => state.currentPage);
  const loading = useProperties((state) => state.loadingGetAllProperties); */
  const [allProperties, setAllProperties] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    bedrooms: "",
    bathrooms: "",
    livingrooms: "",
    kitchens: "",
    floors: "",
    type: "",
    garage: "",
    paginate: "",
  });

  const fetchAllProperties = async () => {
    const res = await axios.get("/all-properties?page=" + page, {
      params: filters,
    });
    setLoading(false);
    setAllProperties(res.data.properties);
  };

  useEffect(() => {
    fetchAllProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  return (
    <article className="container my-10 animate-fade-in" id="all-properties">
      <h2 className="text-3xl font-bold mb-14">PROPIEDADES DISPONIBLES</h2>
      {/* Si esta cargando */}

      <FiltersProperties setFilters={(e) => setFilters(e)} filters={filters} />

      {loading && (
        <div className="w-full flex justify-center p-5">
          {" "}
          <Loader2Icon className="animate-spin-counter-clockwise animate-iteration-count-infinite" />{" "}
        </div>
      )}
      {/* Si ya termino de cargar */}
      {!loading && allProperties !== null && (
        <section className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 relative animate-fade-in">
          {allProperties.data.map((property: Property) => (
            <CardProperty property={property} />
          ))}
        </section>
      )}

      {/* Si ya termino de cargar y no hay properties */}
      {!loading && allProperties?.data.length === 0 && (
        <div>No hay propiedades aún</div>
      )}

      {allProperties !== null && (
        <Pagination
          links={allProperties.links}
          setPage={(n: number) => setPage(n)}
        />
      )}
    </article>
  );
}

export default GridAllProperties;