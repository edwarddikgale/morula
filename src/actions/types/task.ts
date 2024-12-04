export interface TaskType {
  id?: string;
  title: string;
  status: string;
  description?: string;
}

export interface ActionTask extends TaskType{
  actionId: string;
  actionTitle?: string;
  assignedToId?: string;
  createdById?: string;
  sdg?: number
}
