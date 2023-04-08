// import { chain } from "./blockchain.js";
import "./blockchain.js"

export const getLastBlock = () =>{
        return global.chain[global.chain.length - 1];
};
