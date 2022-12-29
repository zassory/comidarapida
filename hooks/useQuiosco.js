import { useContext } from "react";
import QuioscoContext from "../context/QuioscoProvider";

export const useQuiosco = () => {
    return useContext(QuioscoContext);
}