// // hooks/index.ts
// import { ethers } from "ethers";
// import { useContractCall } from "@usedapp/core";
// // import simpleContractAbi from "../abi/SimpleContract.json";
// // import { simpleContractAddress } from "../contracts"

// const simpleContractInterface = new ethers.utils.Interface(simpleContractAbi);

// export function useCount() {
//   const [count]: any = useContractCall({
//     abi: [{"pqd":123}],
//     address: "simpleContractAddress",
//     method: "count",
//     args: [],
//   }) ?? [];
//   return count;
// }