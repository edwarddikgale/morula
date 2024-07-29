export interface taskType {
  id: string;
  title: string;
  status: string;
}

export interface ActionTask{
  id: string;
  title: string;
  status: string;
  actionId: string;
  actionTitle: string;
  sdg: number
}
