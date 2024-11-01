import React from 'react';
import TimeZones from '../data/timeZones.json';

interface TimeZoneSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

const TimeZoneSelect: React.FC<TimeZoneSelectProps> = ({ value, onChange, className }) => {
    //
    return (
        <div className={className || "form-group"}>
            <select
                className='form-select'
                id='TimeZone'
                aria-label='Select your event time zone'
                value={value}
                onChange={onChange}
            >
                {TimeZones.map((tz:any) => (
                    <option key={tz.value} value={tz.value}>
                        {tz.label}
                    </option>
                ))}
            </select>
            <label htmlFor="TimeZone">Time Zone</label>
        </div>
    );
};

export {TimeZoneSelect};
