import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from 'react-bootstrap';
import { LoaderPrimary } from 'common/components/Loader/Loader';
import { IEventSummary, ActionSummary, TaskSummary } from 'event/types/EventSummary';
import './styles/event.css';

interface IProps {
    data: IEventSummary | null;
}

const EventSummary: React.FC<IProps> = ({ data }) => {
    const { eventTitle, eventSummary, eventDescription, attendee_estimate, userSdg, eventDates, actions, profile, orgSettings, completionRate } = data || {};

    if (!data) {
        return <div><LoaderPrimary /> Report Loading...</div>
    }

    const totalActions = actions ? actions.length : 0;
    const totalTasks = !actions ? 0 : actions.reduce((count, action) => count + action.tasks.length, 0);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: 'black', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Cover Page */}
            <div style={{
                backgroundColor: '#caedd3',
                color: 'black',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: '1.25rem',
                textAlign: 'center',
                padding: '20px',
                borderRadius: '40px'
            }}>
                <h1>{profile?.organisation}</h1>
                <h2 className='text-decoration-underline mb-3'>EVENT SUSTAINABILITY REPORT</h2>
                <p>{orgSettings?.companyPurpose}</p>
                <div style={{ marginTop: '20px' }}>
                    <p className='fw-bold'>PREPARED BY</p>
                    <p>{profile?.fullName}</p>
                    <p className='fw-bold'>ORGANISATION</p>
                    <p>{profile?.organisation} - {profile?.country}</p>
                </div>
                {eventDates && eventDates.from &&
                    <h4>{new Date(eventDates.from).getFullYear()}</h4>
                }
            </div>

            {/* Summary Page */}
            <div style={{ padding: '20px', textAlign: 'center' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <div>
                        <h3>{attendee_estimate}</h3>
                        <p>Expected Number Of Attendees</p>
                    </div>
                    <div>
                        <h3>{totalActions}</h3>
                        <p>Number of sustainable actions committed</p>
                    </div>
                    <div>
                        <h3>{totalTasks}</h3>
                        <p>Number of sustainable (sub) tasks committed</p>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h3>COMPANY/ORGANISATION PURPOSE</h3>
                    <p>{orgSettings?.companyPurpose || "Not provided"}</p>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h3>ISO 20121 Scope</h3>
                    <p>{orgSettings?.iso20121Scope || "Not provided"}</p>
                </div>
            </div>

            {/* Event Details */}
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h4>{eventTitle}</h4>
                <h5>{eventSummary}</h5>
                <p>{eventDescription}</p>
                <p>Sustainable Development Goals: {userSdg?.sdgs.join(', ')}</p>
                {eventDates && <p>Event Dates:
                    {new Date(eventDates.from).toLocaleDateString()}
                    {" "}<FontAwesomeIcon icon={faArrowRight} />{" "}
                    {new Date(eventDates.to).toLocaleDateString()}</p>
                }

                <h4 className='text-decoration-underline mb-3 mt-2'>ACTIONS & SUB TASKS</h4>

                <p>Completion Rate: {completionRate}</p>
                <ProgressBar now={parseFloat(completionRate || "0")} />

                {actions && actions.map((action: ActionSummary) => (
                    <div key={action.actionId} style={{ marginTop: '20px', textAlign: 'left' }}>
                        <h3>{action.actionTitle}</h3>
                        <ul>
                            {action.tasks.map((task: TaskSummary) => (
                                <li key={task.taskId}>
                                    <span>{task.title}</span>
                                    {task.status === 'done' && <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '10px' }} />}
                                    {task.status === 'in-progress' && <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'orange', marginLeft: '10px' }} />}
                                    {task.status === 'new' && <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'red', marginLeft: '10px' }} />}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="status-explanation mt-4 text-start">
                    <h6 className="text-decoration-underline">Task Status Explanation</h6>
                    <p className="fw-bold">
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginRight: '10px' }} />
                        Done: This status indicates that the task has been completed successfully.
                    </p>
                    <p className="fw-bold">
                        <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'orange', marginRight: '10px' }} />
                        In Progress: This status indicates that the task is currently being worked on.
                    </p>
                    <p className="fw-bold">
                        <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'red', marginRight: '10px' }} />
                        New: This status indicates that the task is newly created and yet to be started.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventSummary;
