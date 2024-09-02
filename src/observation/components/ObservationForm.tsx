import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarAlt, faCalendarDay, faCalendarDays, faClock, faNoteSticky, faPencilAlt, faTeletype } from '@fortawesome/free-solid-svg-icons';
import '../styles/observation-form.css';
import { Link } from 'react-router-dom';
import { LoaderSm } from '../../common/components/Loader/Loader';
import { EventFormData } from 'event/components/types/eventForm';
import { Observation } from 'observation/types/Observation';
import { formatToDateString } from 'event/components/utils/utils';
import DateRange from './DateRange';
import FormSectionContainer from 'event/components/FormSectionContainer';

interface IProps{
    eventData: EventFormData
}

const ObservationForm: React.FC<IProps> = ({eventData}) => {
  const [notes, setNotes] = useState('');
  const [noteType, setNoteType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [observations, setObservations] = useState<Observation[]>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newObservation = {
        notes,
        sourceId: eventData.userId,
        source: eventData.title + ' ' + eventData.category, 
        title: `${eventData.title} Observation`,
        startDate: eventData.startDate,
        endDate: eventData.endDate
      };
      // Simulate API response delay
      setTimeout(() => {
        setObservations([...observations, newObservation]);
        setIsLoading(false);
        setNotes('');
      }, 2000);
    } catch (error) {
      console.error('Failed to submit observation:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className='container observation-form'>
      <form onSubmit={handleSubmit}>
        <div className='event-header mb-4'>
            <h3 className='section-title'>{eventData.title} - {eventData.category}</h3>
            <div className='date-range'>
                <DateRange 
                    startDate={eventData.startDate} 
                    startTime={eventData.startTime}
                    endDate={eventData.endDate}
                    endTime={eventData.endTime}
                />
            </div>
        </div>

        <FormSectionContainer
          isHr={true}
          className='time-date'
          icon={faNoteSticky}
          title='Observation type'
          description='What type of observation is this?'
        >
          <div>
            <div className='d-flex flex-wrap'>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                    noteType === 'Notes' ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setNoteType('Notes')}
              >
                Just Notes
              </button>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                    noteType === 'Observation'? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setNoteType('Observation')}
              >
                Observation
              </button>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                    noteType === 'Someone-said'? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setNoteType('Someone-said')}
              >
                Said by someone
              </button>
            </div>

          </div>
        </FormSectionContainer>

        {/* Notes Text Area */}
        <FormSectionContainer
          isHr={true}
          className='time-date'
          icon={faPencilAlt}
          title='Notes'
          description='Note or Observation details'
        >
            <div className='my-2'>
            <p className='form-field-title d-none'>Type your observation or notes</p>
            <textarea
                className='form-control'
                id='observationNotes'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder='Write your notes/observation here...'
            />
            </div>
        </FormSectionContainer>

        {/* Submit Button */}
        <div className='text-end pb-4'>
          <button type='submit' className='btn btn-primary py-2 px-4'>
            Submit Observation
            {isLoading && <LoaderSm />}
          </button>
        </div>
      </form>

      <div className='observations-list'>
        {observations.map((obs, index) => (
          <div key={index} className='observation-entry'>
            <p className='observation-notes'>{obs.notes.substring(0, 150)}...</p>
            <small>{obs.title}</small>
            <small>
                <DateRange 
                        startDate={eventData.startDate} 
                        startTime={eventData.startTime}
                        endDate={eventData.endDate}
                        endTime={eventData.endTime}
                    />
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObservationForm;
