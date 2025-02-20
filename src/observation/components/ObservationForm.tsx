import React, { useEffect, useState } from 'react';
import { faCalendarAlt, faCalendarDay, faCalendarDays, faClock, faNoteSticky, faPencilAlt, faTags, faTeletype } from '@fortawesome/free-solid-svg-icons';
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
import ScrumAntiPatterns from 'agilepatterns/ScrumAntiPatterns';
import { Hypothesis, ScrumAnalysisResponse } from 'observation/types/ScrumAnalysis';
import ScrumDesignPatterns from 'agilepatterns/ScrumDesignPatterns';
import HypothesisList from './HypothesisList';
import { scrumEventObservationAPI } from 'observation/utils/API';
import { AgilePattern } from 'agilepatterns/types';
import { joinDailyPatterns } from 'observation/utils/joinScrumPatterns';
import { ObservationList } from './ObservationList';
import { splitScrumPatterns } from 'observation/utils/splitScrumPatterns';
import SelectableButtonGroup from 'common/components/ui/SelectableButtonGroup';
import capitaliseFirstLetter from 'common/utils/capitaliseFirstLetter';
import AnimatedButton from '@components/ui/AnimatedButton';
import ImpedimentList from './ImpedimentsManager';
import { Impediment } from 'observation/types/Impediment';
import ImpedimentsManager from './ImpedimentsManager';

interface IProps{
    eventData: EventFormData
}

const tagOptions: NoteTag[] = noteTags;

const ObservationForm: React.FC<IProps> = ({eventData}) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>('');
  const [analysis, setAnalysis] = useState<ScrumAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [observation, setObservation] = useState<Observation | null>(null);
  const [noteType, setNoteType] = useState<string>(observation?.type || 'Observation');
  const [eventSearchTag, setEventSearchTag] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<NoteTag[]>([]);
  const [agilePatterns, setAgilePatterns] = useState<AgilePattern[]>([]);
  const [scrumAntiPatterns, setScrumAntiPatterns] = useState<{ id: string; key: string }[]>([]);
  const [scrumDesignPatterns, setScrumDesignPatterns] = useState<{ id: string; key: string }[]>([]);
  const [eventCategory, setEventCategory] = useState<string | undefined>(undefined);

  const noteTypes = [
    { value: 'Observation', label: 'Observation' },
    { value: 'Notes', label: 'Just Notes' },
    { value: 'Someone-said', label: 'Said by someone', hidden: true }, // Hidden button
    { value: 'Question', label: 'Question' },
  ];

  const handleAgilePatternsUpdate = (latest: AgilePattern[]) =>{
    setAgilePatterns(latest);
  }

  const handleObservationSelect = (observation: Observation) =>{
    setVisible(false);
    setObservation(observation);
    setNotes(observation.notes);
    setNoteType(observation.type);
    const tags: NoteTag[] = observation.tags?.map(ot => ({value: ot, label: ot} as NoteTag)) || [];
    setSelectedTags(tags);
    if(observation.scrumValuesAnalyses){
      setAnalysis({scrum_values_analysis: observation.scrumValuesAnalyses, hypotheses: observation.hypotheses} as ScrumAnalysisResponse);
    }

    if(observation.patterns){
      const patterns = splitScrumPatterns(observation.patterns);
      setScrumAntiPatterns(patterns.scrumAntiPatterns);
      setScrumDesignPatterns(patterns.scrumDesignPatterns);
    }
    else{
      setScrumAntiPatterns([]);
      setScrumDesignPatterns([]);
    }

    setTimeout(() => setVisible(true), 500);
  }

  const loadObservations = async (eventId: string) =>{
    const response = await scrumEventObservationAPI.getObservationsByEvent(eventId);
    setObservations(response.observations);
  }

  useEffect(() =>{
    if(!eventData._id) return;
    loadObservations(eventData._id);
    setEventCategory(capitaliseFirstLetter(eventData.category));
  },[eventData]);

  const evalNotes = async () =>{
    await handleAnalyzeScrum();
  }

  const handleAnalyzeScrum = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      
      if(!eventCategory) throw new Error(`Unable to analyse unspecified event category`);
      const response = await scrumEventObservationAPI.analyseScrumEvent({
        notes: notes,
        description: eventData.description,
        eventType: eventCategory,
        antiPatterns: observation?.patterns?.filter(pattern => pattern.type === 'anti-pattern'),
        designPatterns: observation?.patterns?.filter(pattern => pattern.type === 'design-pattern')
      });

      setAnalysis(response);
      setIsLoading(false);

    } catch (err) {
      setError('Failed to analyze Scrum values. Please try again.');
      setIsLoading(false);
    }
  };

  const handleObservationDelete = async (observation: Observation) =>{
    if(!observation?._id) throw Error(`Cannot delete an item with no id`);
    const response: any = await scrumEventObservationAPI.deleteObservation(observation?._id);

    if(response.success){
        const updatedObsList = observations.filter((item) => item._id !== observation?._id);
        setObservations(updatedObsList);
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if(!eventData._id) {
      throw new Error(`Error, no event id provided`);
    }

    setIsLoading(true);
    try {
      const record: Observation = {
        eventId: eventData._id,
        type: noteType,
        title: `${eventData.category} ${noteType}`,
        notes: notes,
        createdById: eventData.userId,
        source: eventData.category,
        sourceId: eventData._id,
        tags: selectedTags.map(t => t.value),
        patterns: joinDailyPatterns(scrumAntiPatterns, scrumDesignPatterns),
        hypotheses: observation?.hypotheses || analysis?.hypotheses,
        scrumValuesAnalyses: analysis?.scrum_values_analysis,
        createdAt: observation? observation.createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const response = observation?._id? 
        await scrumEventObservationAPI.updateObservation(record, observation._id)
        : await scrumEventObservationAPI.createObservation(record);

      const unalteredList = observations.filter(obs => obs._id !== observation?._id);
      setObservations([response, ...unalteredList]);
      setObservation(response);

      setIsLoading(false);


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

  const handleHypothesisUpdate = (index: number, updatedHypothesis: Hypothesis) => {
   
    if(!observation) return;

    setObservation((prev: any) => {
      const updatedHypotheses = [...(prev.hypotheses || [])]; // Copy current hypotheses
      updatedHypotheses[index] = updatedHypothesis; // Update specific hypothesis at index
  
      return {
        ...prev,
        hypotheses: updatedHypotheses, // Set the updated hypotheses array
      };
    });

  };

  return (
    <div className={`container observation-form animated-form-container ${visible ? 'visible' : 'hidden'}`}>
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
          <SelectableButtonGroup 
            options={noteTypes} 
            defaultSelected={noteType}
            onSelect={(value) => setNoteType(value)} />
        </FormSectionContainer>

        {/* Scrum Anti-Patterns */}
        {eventCategory &&
          <FormSectionContainer
            isHr={true}
            className='time-date'
            icon={faTags}
            title={`${eventCategory} Scrum Anti Patterns`}
            description={`Find anti patterns observed (${scrumAntiPatterns.length} selected)`}
            isCollapsed={true}
          >
              <div className='my-2'>
                <p className='form-field-title d-none'>Search and select more than 1 anti pattern if needed</p>
                <div className='mb-3'>
                  <ScrumAntiPatterns 
                    selected={scrumAntiPatterns}
                    onSelectionChange={(patterns) => setScrumAntiPatterns(patterns)} 
                    eventType={eventCategory} />
                </div>
              </div>  
          </FormSectionContainer>  
        } 

        {/* Scrum Design-Patterns */} 
        {eventCategory &&  
          <FormSectionContainer
            isHr={true}
            className='time-date'
            icon={faTags}
            title={`${eventCategory} Scrum Design Patterns`}
            description={`Find design patterns observed (${scrumDesignPatterns.length} selected)`}
            isCollapsed={true}
          >
              <div className='my-2'>
                <p className='form-field-title d-none'>Search and select more than 1 design pattern if needed</p>
                <div className='mb-3'>
                  <ScrumDesignPatterns
                    selected={scrumDesignPatterns} 
                    onSelectionChange={(patterns: React.SetStateAction<{ id: string; key: string; }[]>) => setScrumDesignPatterns(patterns)} 
                    eventType={eventCategory} />
                </div>
              </div>  
          </FormSectionContainer> 
        }

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
                  Evaluate Notes For Ratings {" "}
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

        {/* Hypotheses */}
        {analysis &&
        <FormSectionContainer
          isHr={true}
          className='time-date'
          icon={faTags}
          title='Hypothesis List'
          description='A list of hypothesis derived from the notes'
        >
            <div className='my-2'>
              <p className='form-field-title d-none'>...</p>
              <div className='text-end pb-4'>
              </div>
              <div className='mb-3'>
                <HypothesisList 
                  hypotheses={analysis?.hypotheses}
                  onUpdate={handleHypothesisUpdate}
                />
              </div>
            </div>  
        </FormSectionContainer>   
        }

        {/* Impediments */}
        {
        <FormSectionContainer
          isHr={true}
          className='time-date'
          icon={faTags}
          title='Impediment List'
          description='A list of impediments'
        >
          <ImpedimentsManager 
            eventData={eventData}              
          />
            
        </FormSectionContainer>   
        }

        {/* Submit Button */}
        <div className='text-end pb-4'>
          <button type='submit' className='btn btn-primary py-2 px-4'>
            {observation?._id? 'Update': 'Create An'} Observation
            {isLoading && <LoaderSm />}
          </button>
        </div>  

      </form>

      <div>
        <ObservationList 
          observations={observations} 
          eventData={eventData}
          onSelect={handleObservationSelect}
          onDelete={handleObservationDelete}
          />
      </div>

    </div>
  );
};

export default ObservationForm;
