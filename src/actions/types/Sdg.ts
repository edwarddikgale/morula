export interface Sdg{
   id: string,
   title: string,
   description: string
}

export interface SdgHeader{
   id: number,
   title: string,
   shortTitle: string,
   goal: string;
   indicators: Indicator[];
}

export interface Indicator {
   index: string;
   title: string;
 }