import { useSearchParams } from "react-router-dom";
import Develop from "../components/develop";
import t from "../lib/t";

const DevelopPage = props => {
  const [searchParams] = useSearchParams();
  const id = t.string(searchParams.get('View'));

  return <Develop id={parseInt(id, 10) || 0}/>
}

export default DevelopPage;
