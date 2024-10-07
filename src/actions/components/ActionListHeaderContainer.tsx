import React from 'react';
import ActionListHeader from "./ActionListHeader";
import { SdgHeader } from "../types/Sdg";

interface Props {
  selectedSdg: number;
  sdgHeader: SdgHeader | null;
  onHandleSwitchSdg: () => void;
  showMoreInfo: boolean;
  setShowMoreInfo: (show: boolean) => void;
  eventId: string | undefined;
}

const ActionListHeaderContainer: React.FC<Props> = ({ selectedSdg, sdgHeader, onHandleSwitchSdg, showMoreInfo, setShowMoreInfo, eventId }) => {
  return (
    <ActionListHeader 
      sdg={selectedSdg} 
      sdgHeader={sdgHeader}
      changeSdg={onHandleSwitchSdg} 
      onShowMore={() => setShowMoreInfo(!showMoreInfo)}
      eventId={eventId || undefined}
      canChange={true}
    />
  );
};

export default ActionListHeaderContainer;
