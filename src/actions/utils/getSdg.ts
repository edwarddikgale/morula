import { SdgHeader } from "actions/types/Sdg";
import sdgList from "common/data/sdg-n-indicators.json";

const getAgilePrinciplesByIds = (ids: number[]): SdgHeader[] => {
    return sdgList.filter((sdg) => ids.includes(sdg.id));
};

export {getAgilePrinciplesByIds};