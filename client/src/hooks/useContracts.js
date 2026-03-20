import { useContext } from "react";
import { ContractContext } from "../context/ContractContext";

export const useContracts = () => useContext(ContractContext);