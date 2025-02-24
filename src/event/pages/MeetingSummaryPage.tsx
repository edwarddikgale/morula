import MeetingTranscript from 'event/components/MeetingTranscript';
import React, { useEffect, useState } from 'react';

export default function MeetingSummaryPage() {
    return (
        <div>
            <MeetingTranscript eventId='123' />
        </div>
  );
}
