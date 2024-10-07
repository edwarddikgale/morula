import React from 'react';
import ActionListHeader from "./ActionListHeader";
import { SdgHeader } from "../types/Sdg";
import EventDetails from 'event/components/EventDetails';

interface Props {
  selectedSdg: number;
  sdgHeader: SdgHeader | null;
  onHandleSwitchSdg: () => void;
  showMoreInfo: boolean;
  setShowMoreInfo: (show: boolean) => void;
  eventId: string | undefined;
  actionCount?: number;
}

const ActionListHeaderContainer: React.FC<Props> = ({ selectedSdg, sdgHeader, onHandleSwitchSdg, showMoreInfo, setShowMoreInfo, eventId, actionCount }) => {
  return (
      <div>
          {eventId && 
            <EventDetails 
              eventId={eventId} 
              preText={`${actionCount || ""} Actions for event: `}
              showSubDetails={true} />
          }
          <ActionListHeader 
            sdg={selectedSdg} 
            sdgHeader={sdgHeader}
            changeSdg={onHandleSwitchSdg} 
            onShowMore={() => setShowMoreInfo(!showMoreInfo)}
            eventId={eventId || undefined}
            canChange={true}
          />
      </div>
  );
};

export default ActionListHeaderContainer;
