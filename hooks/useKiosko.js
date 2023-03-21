import { useContext } from "react";
import KioskoContext from "../context/KioskoProvider";


const useKisko = () => {
    return useContext(KioskoContext);
}

export default useKisko;