export interface EventFormData {
  _id?: string;
  userId: string;
  parentId?: string | null;
  teamId?: string | null;
  title: string;
  category?: string;
  organizer?: string;
  tags?: string[];
  locationType?: string;
  venue?: string;
  isRecurring?: boolean | null;
  isMultiVenue?: boolean | null;
  startDate: string;
  startTime?: string;
  endDate: string;
  endTime?: string;
  showStartTime: boolean;
  showEndTime: boolean;
  timeZone?: string;
  language?: string;
  image?: string | null;
  summary: string;
  description?: string;
  attendee_estimate?: number;
  supplier_estimate?: number;
  status?: string;
}
