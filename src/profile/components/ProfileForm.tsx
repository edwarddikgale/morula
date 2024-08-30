import React, { useEffect, useState } from "react";
import "../css/profile.css";
import { EmailIcon, LocationIcon, OrganizationIcon, PersonIcon, PhoneIcon } from "../../utils/CustomIcon";
import { formatToDateString } from "../../event/components/utils/utils";
import { UserProfile } from "../types/profile";
import ReactFlagsSelect from "react-flags-select";
import { countryListData } from "../data/countryData";
import { LoaderSm } from "../../common/components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { pageNames } from "../../config/pageNames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { createUserProfile } from "store/actions/profile";
import { confirmError, confirmSuccess } from "common/components/confirmation/confirm";

interface IProps{
  userId: string
}
const ProfileForm = ({userId}: IProps) => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();  
  const {processingDone, isProcessing, error} = useSelector((state: RootState) => state.profile);

  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState(formatToDateString(new Date()));
  const [gender, setGender] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");

  const handleSelect = (countryCode: string) => {
    setCountryCode(countryCode);
    // Convert country code to country name
    const selectedCountry = countryListData.find((country) => country.code === countryCode)?.name;
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
  };

  const updateGenderTo = (gender: string) =>{
    setGender(gender);
  };

  function resetForm() {
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setBirthDate(formatToDateString(new Date()));
    setGender("");
    setOrganizationName("");
    setCity("");
    setCountry("");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const profileData: Partial<UserProfile> = {
      fullName: fullName,
      email: email,
      city: city,
      country: country,
      dateOfBirth: birthDate,
      gender: gender,
      mobile: phoneNumber,
      organisation: organizationName,
      userId: userId,
    };

    dispatch(createUserProfile(profileData as UserProfile));

  };
  
  useEffect(() =>{
    if(processingDone){
      if (error) {
        confirmError({ actionTitle: `Creating Profile`});
      } 
      else{
        confirmSuccess({ actionTitle: `Profile Created`});
      }
    }  
  }, [error, processingDone]);

  return (
    <div className='py-3'>
      {/*Personal info start  */}
      <form onSubmit={handleSubmit}>
        <section className='pInfo'>
          <h3 className='section-title'>Personal Information</h3>

          <div className='my-2 my-md-4'>
            <p className='form-field-title pb-1'>
              Name <span className='text-danger'>*</span>
            </p>
            <div className='position-relative my my-2 me-0 me-md-3'>
              <span className='position-absolute top-50 translate-middle' style={{ left: "20px" }}>
                <PersonIcon />
              </span>

              <input
                value={fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                type='text'
                className='form-control icon-field'
                id='fullName'
                placeholder='Full Name'
                required
              />
            </div>
          </div>
          <div className='my-2 my-md-4'>
            <div className='row'>
              <div className='col-md-6'>
                <p className='form-field-title pb-1'>Contact No.</p>
                <div className='position-relative my-2 me-0 me-md-3'>
                  <span className='position-absolute top-50 translate-middle' style={{ left: "20px" }}>
                    <PhoneIcon />
                  </span>

                  <input
                    value={phoneNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                    type='text'
                    className='form-control icon-field'
                    id='phoneNumber'
                    placeholder='+123 456 7890'
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <p className='form-field-title pb-1'>Date of birth</p>
                <div className='position-relative my-2 me-0 me-md-3'>
                  <input
                    type='date'
                    className='form-control'
                    id='birthday'
                    value={birthDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBirthDate(formatToDateString(new Date(e.target.value)))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='my-2 my-md-4'>
            <div className='row'>
              <div className='col-md-6'>
                <p className='form-field-title pb-1'>Email</p>
                <div className='position-relative my-2 me-0 me-md-3'>
                  <span className='position-absolute top-50 translate-middle' style={{ left: "20px" }}>
                    <EmailIcon />
                  </span>

                  <input
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    type='email'
                    className='form-control icon-field'
                    id='email'
                    required={true}
                    placeholder='yourmail@email.com'
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <p className='form-field-title pb-1'>Gender</p>
                <div className='h-50 d-flex align-items-center'>
                  <div className=''>
                    <button
                      type='button'
                      className={`my-1 mx-2 btn btn-light ${gender === "male" ? "btn-select-active" : "btn-select"}`}
                      onClick={() => updateGenderTo("male")}
                    >
                      Male
                    </button>
                    <button
                      type='button'
                      className={`my-1 mx-2 btn btn-light ${gender === "female" ? "btn-select-active" : "btn-select"}`}
                      onClick={() => updateGenderTo("female")}
                    >
                      Female
                    </button>
                    <button
                      type='button'
                      className={`my-1 mx-2 btn btn-light ${gender === "others" ? "btn-select-active" : "btn-select"}`}
                      onClick={() => updateGenderTo("others")}
                    >
                      Others
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Personal info end  */}

        {/* Organization Info start */}
        <section className='pInfo'>
          <h3 className='section-title'>Organization Information</h3>

          <div className='my-2 my-md-4'>
            <p className='form-field-title pb-1'>
              Name <span className='text-danger'>*</span>
            </p>
            <div className='position-relative my my-2 me-0 me-md-3'>
              <span className='position-absolute top-50 translate-middle' style={{ left: "20px" }}>
                <OrganizationIcon />
              </span>

              <input
                value={organizationName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganizationName(e.target.value)}
                type='text'
                className='form-control icon-field'
                id='fullName'
                placeholder='Organization Name'
                required
              />
            </div>
          </div>

          <div className='my-2 my-md-4'>
            <div className='row'>
              <div className='col-md-6'>
                <p className='form-field-title pb-1'>Country </p>
                {/* <div className='position-relative my-2 me-0 me-md-3'>
                  <span className='position-absolute top-50 translate-middle' style={{ left: "20px" }}>
                    <LocationIcon />
                  </span>

                  <input
                    value={country}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
                    type='text'
                    className='form-control icon-field'
                    id='country'
                    placeholder='Country Name'
                  />
                </div> */}
                <div className='my-2'>
                  <ReactFlagsSelect selected={countryCode} onSelect={handleSelect} searchable />
                </div>
              </div>
              <div className='col-md-6'>
                <p className='form-field-title pb-1'>
                  City <span className='text-danger'>*</span>
                </p>
                <div className='position-relative my-2 me-0 me-md-3'>
                  <span className='position-absolute top-50 translate-middle' style={{ left: "20px" }}>
                    <LocationIcon />
                  </span>

                  <input
                    value={city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                    type='text'
                    className='form-control icon-field'
                    id='city'
                    placeholder='City Name'
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Organization info end */}

        <div className='text-end pb-5'>
          <button type='submit' className='btn btn-primary py-3 px-4'>
            Create Profile {isProcessing && <LoaderSm />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
