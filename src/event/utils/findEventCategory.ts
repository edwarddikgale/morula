import { EventCategory } from 'event/components/types/EventCategory';
import eventCategories from '../data/eventCategory.json';
const categories: EventCategory[] = eventCategories;

export  const findEventCatByVal = (value: string | undefined) =>{
    return categories.find(cat => cat.value === value);
}