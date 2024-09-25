import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarAlt, faCalendarDay, faCalendarDays, faClock, faNoteSticky, faPencilAlt, faTags, faTeletype } from '@fortawesome/free-solid-svg-icons';
import '../styles/observation-form.css';
import { Link } from 'react-router-dom';
import { LoaderSm } from '../../common/components/Loader/Loader';
import { EventFormData } from 'event/components/types/eventForm';
import { Observation } from 'observation/types/Observation';
import { formatToDateString } from 'event/components/utils/utils';
import DateRange from './DateRange';
import FormSectionContainer from 'event/components/FormSectionContainer';
import Select from "react-select";
import noteTags from '../data/noteTags.json';
import { NoteTag } from 'observation/types/NoteTag';
import ScrumValueRating from 'rating/ScrumValueRating';
import DailyAntiPatterns from 'agilepatterns/DailyAntiPatterns';
import { ScrumAnalysisResponse } from 'observation/types/ScrumAnalysis';

interface IProps{
    eventData: EventFormData
}

const tagOptions: NoteTag[] = noteTags;

const ObservationForm: React.FC<IProps> = ({eventData}) => {
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>('');
  const [analysis, setAnalysis] = useState<ScrumAnalysisResponse | null>(null);
  const [noteType, setNoteType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [eventSearchTag, setEventSearchTag] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<NoteTag[]>([]);

  const evalNotes = async () =>{
    await handleAnalyzeScrum();
  }


  const handleAnalyzeScrum = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response:any = await fetch('http://localhost:3000/api/scrum/analyze-scrum', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({notes: notes}),
      });
      
      if (!response.ok) {
        setError("Failed to create user profile!");
      }
  
      //return response.json();

      if(response.ok){
        const data = await response.json() as ScrumAnalysisResponse;
        setAnalysis(data);
        console.log(data);
      }

      setIsLoading(false);
    } catch (err) {
      setError('Failed to analyze Scrum values. Please try again.');
      setIsLoading(false);
    }
  };

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
        endDate: eventData.endDate,
        tags: selectedTags
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

  const handleTagChange = (selectedOptions: any) => {
    const arr = selectedOptions.map((item: any) => item.value);
    setSelectedTags(selectedOptions);
    setEventSearchTag(arr);
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
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                    noteType === 'Question'? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setNoteType('Question')}
              >
                Question
              </button>
            </div>

          </div>
        </FormSectionContainer>

        {/* Daily Scrum Anti-Patterns */}
        <FormSectionContainer
          isHr={true}
          className='time-date'
          icon={faTags}
          title='Daily Scrum Anti Patterns'
          description='Find anti patterns observed'
          isCollapsed={true}
        >
            <div className='my-2'>
              <p className='form-field-title d-none'>Search and select more than 1 anti pattern if needed</p>
              <div className='mb-3'>
                <DailyAntiPatterns />
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

        {/* Notes Text Area */}
        <FormSectionContainer
          isHr={true}
          className='time-date'
          icon={faTags}
          title='Tags'
          description='Additional tags to find this note easier later'
        >
            <div className='my-2'>
            <p className='form-field-title d-none'>Select one or more tags that describe this note</p>
            <div className='mb-3'>
                <Select
                  placeholder='Please enter to add a tag'
                  onChange={handleTagChange}
                  options={tagOptions}
                  isMulti
                  isSearchable
                  value={selectedTags}
                  
                />
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='text-muted fs-12 mb-0'>{selectedTags.length}/{tagOptions.length} tags</p>
                  <p className='text-muted fs-12 mb-0'>{eventSearchTag.length}/{tagOptions.length}</p>
                </div>
              </div>
            </div>
        </FormSectionContainer>

        {/* Scrum Value Ratings */}
        <FormSectionContainer
          isHr={true}
          className='time-date'
          icon={faTags}
          title='Scrum Value Rating'
          description='Rate SCRUM values displayed against this observation'
        >
            <div className='my-2'>
              <p className='form-field-title d-none'>If a value has not been displayed, mark it as a 5 and decrease only those with lesser scores</p>
              <div className='text-end pb-4'>
                <button type='button' className='btn btn-secondary py-2 px-4' onClick={evalNotes}>
                  Evaluate Notes For Ratings
                  {isLoading && <LoaderSm />}
                </button>
              </div>
              <div className='mb-3'>
                <ScrumValueRating 
                  scrumAnalysis={analysis} 
                />
              </div>
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
