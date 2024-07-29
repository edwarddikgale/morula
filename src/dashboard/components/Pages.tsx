import React from "react";
import { EventIcon, InstructionsIcon, ProfileIcon, SettingIcon } from "../../utils/CustomIcon";
import { useNavigate } from "react-router-dom";
import { pageNames } from "../../config/pageNames";
import ProgressAlert from "./ProgressAlert";
import useProfile from "profile/hooks/useProfile";
import { evalProfileProgress } from "dashboard/utils/evalProfileProgress";
import useOrgSettings from "settings/hooks/useIsoSettings";
import { evalOrgSettingsProgress } from "dashboard/utils/evalOrgSettingProgress";
import useEventCount from "event/hooks/useEventCount";
import { evalEventProgress } from "dashboard/utils/evalEventProgress";
import useUserSDG from "sdgselection/hooks/userSDGs";
import { evalISOProgress } from "dashboard/utils/evalISOProgress";

const Pages = () => {
  const navigate = useNavigate();
  const profile = useProfile();
  const orgSettings = useOrgSettings();
  const eventCount = useEventCount();
  const {userSDG, loading, error} = useUserSDG();
  
  return (
    <div className='mt-5 mb-3 mb-md-0'>
      <div className='row gx-5 gy-5'>
        <div className='col-md-6 '>
          <div className='page-card' onClick={() => navigate(pageNames.PROFILE)}>
            <div className='d-flex'>
              <span>
                <ProfileIcon />
              </span>
              <h3 className='ms-4 title'>My Profile</h3>
            </div>

            <p className='text-muted mt-3'>
              Keeping your profile up to date will give you the opportunity for a more personalised user experience and 
              help us understand more about our user community
            </p>

            <div>
              <ProgressAlert 
                data={profile?.userProfile} 
                emptyText={"Please complete your profile info"} 
                completionRateEval={evalProfileProgress}
               />
            </div>
          </div>
        </div>
        <div className='col-md-6 '>
          <div className='page-card' onClick={() => navigate(pageNames.SETTINGS)}>
            <div className='d-flex'>
              <span>
                <SettingIcon />
              </span>
              <h3 className='ms-4 title'>IS020121 Evidence</h3>
            </div>

            <p className='text-muted mt-3'>
              Gathering evidence for your implementation of  ISO 20121 will support your reporting and/or certification process 
            </p>

            <div>
              <ProgressAlert 
                data={orgSettings?.OrgSettings} 
                emptyText={"Please complete your ISO2012 info"} 
                completionRateEval={evalOrgSettingsProgress}
               />
            </div>
          </div>
        </div>
        <div className='col-md-6 '>
          <div className='page-card' onClick={() => navigate(pageNames.EVENT)}>
            <div className='d-flex'>
              <span>
                <EventIcon />
              </span>
              <h3 className='ms-4 title'>My Events</h3>
            </div>

            <p className='text-muted mt-3'>
              After creating your event you can choose credible and creative sustainability actions for your event, share this with your stakeholders and access support resources
            </p>

            <div>
              <ProgressAlert 
                data={eventCount} 
                emptyText={"Please create at least one event"} 
                completedText={`You have ${eventCount.eventCount} events so far!`}
                completionRateEval={evalEventProgress}
               />
            </div>

          </div>
        </div>
        <div className='col-md-6 '>
          <div className='page-card' onClick={() => navigate(pageNames.SDG_SELECTED)}>
            <div className='d-flex'>
              <span>
                <InstructionsIcon />
              </span>
              <h3 className='ms-4 title'>Materiality Exercise</h3>
            </div>
            <p className='text-muted mt-3'>
              A materiality assessment is designed to help you identify and understand the relative importance of specific ESG and sustainability topics to your organization.
            </p>
            <div>
              <ProgressAlert 
                data={userSDG} 
                emptyText={"Complete your materiality to get the most from this app"} 
                completionRateEval={evalISOProgress}
               />
            </div>
          </div>
        </div>        
        <div className='col-md-6 '>
          <div className='page-card' onClick={() => navigate(pageNames.ACTIONS_INTRO)}>
            <div className='d-flex'>
              <span>
                <InstructionsIcon />
              </span>
              <h3 className='ms-4 title'>Instructions</h3>
            </div>

            <p className='text-muted mt-3'>
              Understanding how to use EventSustainability optimally will give you the opportunity to get the best results and use the system to meet your specific needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
