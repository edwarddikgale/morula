import { SdgHeader } from "actions/types/Sdg";
import sdgList from "../components/sdg/SdgList.json";

const getSdgByIndex = (sdgIndex: number): SdgHeader => {
    const sdgHeader = sdgList.find((sdg) => sdg.sdg === sdgIndex);
    return sdgHeader || sdgList[0];
};

export {getSdgByIndex};