import { SdgHeader } from "actions/types/Sdg";
import sdgList from "common/data/sdg-n-indicators.json";

const getAgilePrincipleById = (id: number): SdgHeader => {
    const sdgHeader = sdgList.find((sdg) => sdg.id === id);
    return sdgHeader || sdgList[0];
};

export {getAgilePrincipleById};