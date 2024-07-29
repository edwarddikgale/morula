import React from "react";
import ActionListHeader from "./ActionListHeader";
import { ActionListEmpty } from "./ActionListEmpty";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { pageNames } from "config/pageNames";
import SdgDetails from "./sdg/SdgDetails";
import { SdgHeader } from "actions/types/Sdg";

interface IProps{
    sdg: number,
    sdgHeader: SdgHeader | null
}
const ActionPageInfo: React.FC<IProps> = ({sdg, sdgHeader}: IProps) =>{
    return (
        <div className="mt-4">
            <SdgDetails 
                sdg={sdg} 
                changeSdg={() => { }} 
                onShowMore={() => {}}
                showDescription={true}
                expand = {true}
                sdgHeader={sdgHeader}
                canChange={false}
                />
            <ActionListEmpty sdg={sdg} />
            <div className="ml-4">    
                <div className='link-to-intro'>
                    <Button variant="btn btn-outline-primary me-2" as={Link as any} to={pageNames.ACTIONS_INTRO}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                        &nbsp; Find out how to use this platform ...
                    </Button>
                </div>          
            </div>
        </div>
    )
}

export default ActionPageInfo;