import AuthLayout from "@/layouts/AuthLayout";
import { useParams } from "react-router-dom";

function Show() {
  const params = useParams();
  console.log(params);

  return <AuthLayout>Show</AuthLayout>;
}

export default Show;
