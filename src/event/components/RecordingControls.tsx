import React from 'react';
import Countdown from 'react-countdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

const RecordingControls = ({
  durationInMinutes,
  setDurationInMinutes,
  isRecording,
  handleRecordingToggle,
  timerStartTime,
  countdownRenderer,
}: any) => {
  return (
    <div className="row align-items-center g-3 recording-controls">
      {/* Duration input */}
      <div className="col-12 col-md-4 d-flex flex-column align-items-center">
        <input
          id="duration-input"
          type="number"
          className="form-control text-center w-75"
          value={durationInMinutes}
          onChange={(e) => setDurationInMinutes(parseInt(e.target.value) || 5)}
          min={1}
          max={60}
        />
      </div>

      {/* Record button */}
      <div className="col-12 col-md-4 text-center">
        <button
          className={`record-button btn ${isRecording ? 'recording btn-danger' : 'btn-primary'} px-2 py-1`}
          onClick={handleRecordingToggle}
        >
          <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
          {!isRecording && <span className="ms-2 fw-bold">Rec</span>}
        </button>
      </div>

      {/* Countdown timer */}
      <div className="col-12 col-md-4 text-center">
        {isRecording && timerStartTime && (
          <div className="timer-display fw-bold text-danger">
            <Countdown date={timerStartTime} renderer={countdownRenderer} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordingControls;
