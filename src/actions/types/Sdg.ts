export interface Sdg{
   id: string,
   title: string,
   description: string
}

export interface SdgHeader{
   title: string,
   shortTitle: string,
   sdg: number;
   goal: string;
   indicators: Indicator[];
}

export interface Indicator {
   index: string;
   title: string;
 }