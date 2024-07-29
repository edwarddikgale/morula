import sdgIndicatorList from './sdg-n-indicators.json'; 

const sdgListGetter = (filterNumbers?: number[]) =>{
    if(!filterNumbers) return sdgIndicatorList;
    return sdgIndicatorList.filter(sdg => filterNumbers.includes(sdg.sdg));
}

export {sdgListGetter}