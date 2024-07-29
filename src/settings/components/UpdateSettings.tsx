import React, { useState } from "react";
import "../styles/settings.css";
import { CalenderIcon } from "../../utils/CustomIcon";
import Swal from "sweetalert2";
import { settingFormData } from "../types/createSettings";
import { orgSettingsAPI } from "../utils/API";
import { LoaderSm } from "../../common/components/Loader/Loader";
import { IOrgSettingsData } from "settings/types/IOrgSettingsData";

interface IProps {
  settingsData: IOrgSettingsData;
}

const UpdateSettings = ({settingsData}: IProps) => {
  const [year, setYear] = useState<string>(settingsData.year.toString());
  const [purpose, setPurpose] = useState<string>(settingsData.companyPurpose);
  const [isoScope, setISOScope] = useState<string>(settingsData.iso20121Scope);
  const [id, setId] = useState<string | undefined>(settingsData._id);
  //const [userId, setUserId] = useState<string | undefined>(settingsData.userId);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetFrom = () => {
    setYear("");
    setPurpose("");
    setISOScope("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData: settingFormData = {
      year: year,
      companyPurpose: purpose,
      iso20121Scope: isoScope,
      userId: settingsData.userId
    };
    console.log({ formData });

    setIsLoading(true);
    try {
      const res = !id? await orgSettingsAPI.createSettings(formData):  await orgSettingsAPI.updateSettings(formData, id);
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Record ${!id? "Created": "Updated"} Successfully!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsLoading(false);
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setIsLoading(false);
        //setId here
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* select year */}
        <div className='mt-5'>
          <p>
            Choose the <strong>year {year}</strong> you are providing settings for
          </p>
          <div className='d-flex flex-wrap'>
            <button
              type='button'
              className={`my-1 me-3 btn btn-light btn-setting-year ${
                year === "2023" ? "btn-setting-year-selected" : ""
              } `}
              onClick={() => setYear("2023")}
            >
              <span className='ms-3'> 2023</span>
              <span className='ms-2'>
                <CalenderIcon />
              </span>
            </button>
            <button
              type='button'
              className={`my-1 me-3 btn btn-light btn-setting-year ${
                year === "2024" ? "btn-setting-year-selected" : ""
              } `}
              onClick={() => setYear("2024")}
            >
              <span className='ms-3'> 2024</span>
              <span className='ms-2'>
                <CalenderIcon />
              </span>
            </button>
            <button
              type='button'
              className={`my-1 me-3 btn btn-light btn-setting-year ${
                year === "2025" ? "btn-setting-year-selected" : ""
              } `}
              onClick={() => setYear("2025")}
            >
              <span className='ms-3'> 2025</span>
              <span className='ms-2'>
                <CalenderIcon />
              </span>
            </button>
            <button
              type='button'
              className={`my-1 me-3 btn btn-light btn-setting-year ${
                year === "Unknown" ? "btn-setting-year-selected" : ""
              } `}
              onClick={() => setYear("Unknown")}
            >
              <span className='ms-3'> Unknown</span>
              <span className='ms-2'>
                <CalenderIcon />
              </span>
            </button>
          </div>
        </div>

        {/* purpose */}
        <div className='mt-5'>
          <p className='fw-bold mb-1'>Company/Organisation purpose</p>
          <p>Purpose of your company</p>

          <textarea
            className='form-control'
            id='evenSummary'
            placeholder='What is the purpose of your company, please provide a summary here... e.g: The scope is 100% of activities delivered by the Manchester office.'
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
          />
        </div>

        {/* purpose */}
        <div className='mt-5'>
          <p className='fw-bold mb-1'>ISO 20121 Scope</p>
          <p>Explainer text about scope of the company. could be 2 lines...</p>

          <textarea
            className='form-control'
            id='evenSummary'
            placeholder='Paste your sustainability policy here or complete the sustainability policy template (This template will be available in future versions of EventSustainability'
            value={isoScope}
            onChange={e => setISOScope(e.target.value)}
          />
        </div>

        <div className='mt-5'>
          <button type='reset' className='btn btn-secondary px-5' onClick={() => resetFrom()}>
            Cancel
          </button>
          <button type='submit' className='btn btn-dark px-5 ms-5'>
            Submit
            {isLoading && <LoaderSm />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSettings;
