import React, { useState, useEffect } from 'react';

interface FormData {
  userType: 'doctor' | 'patient' | null;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  city: string;
  pincode: string;
  message: string;
  agreeToContact: boolean;
}

const ContactForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [userTypeError, setUserTypeError] = useState('');

  useEffect(() => {
    const handleOpenForm = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string }>;
      if (customEvent.detail?.message) {
        setFormData(prev => ({
          ...prev,
          message: customEvent.detail.message
        }));
      }
      setShowForm(true);
    };

    window.addEventListener('openContactForm', handleOpenForm);
    return () => {
      window.removeEventListener('openContactForm', handleOpenForm);
    };
  }, []);
  const [formData, setFormData] = useState<FormData>({
    userType: null,
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    city: '',
    pincode: '',
    message: '',
    agreeToContact: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleUserTypeChange = (type: 'doctor' | 'patient') => {
    setFormData(prev => ({ ...prev, userType: type }));
    setUserTypeError(''); // Clear error when user selects a type
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate user type is selected
    if (!formData.userType) {
      setUserTypeError('Please select either Doctor or Patient');
      return;
    }
    
    setUserTypeError('');
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section id="contact" className="flex flex-col items-center">
      <div className="w-full max-w-[1445px] px-4 mt-[220px] max-md:mt-10">
        <div className="bg-[rgba(17,144,255,1)] flex w-full flex-col overflow-hidden items-center text-white font-normal text-center justify-center px-20 py-16 rounded-[72px] max-md:px-5">
        <div className="flex w-[772px] max-w-full flex-col items-center">
          <h2 className="text-[64px] font-[510] leading-none tracking-[-1.28px] self-stretch max-md:max-w-full max-md:text-[40px]">
            Join others on their journey to better care
          </h2>
          <p className="text-lg leading-none mt-[55px] max-md:max-w-full max-md:mt-10">
            Get in touch to discover personalized solutions for kidney disease management.
          </p>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-[17px] text-black tracking-[-0.34px] mt-[72px] px-9 py-2.5 rounded-xl max-md:mt-10 hover:bg-gray-100 transition-colors"
          >
            Reach Out to Us
          </button>
        </div>
      </div>
      </div>
      
      {showForm && (
        <div className="w-full max-w-[1445px] px-4 mt-[26px] max-md:max-w-full">
        <div className="gap-8 flex max-md:flex-col max-md:items-stretch">
          <div className="w-1/2 max-md:w-full max-md:ml-0">
            <img
              src="/images/contact-illustration.png"
              className="aspect-[0.86] object-contain w-full grow rounded-[72px] max-md:max-w-full max-md:mt-10"
              alt="Contact illustration"
            />
          </div>
          <div className="w-1/2 max-md:w-full max-md:ml-0">
            <div className="w-full mt-[22px] max-md:max-w-full max-md:mt-10 pr-8">
              <form onSubmit={handleSubmit} className="max-md:max-w-full">
                <div className="grow text-black max-md:mt-[18px]">
                  <h3 className="text-[55px] font-normal leading-none tracking-[-2.2px] mr-[30px] max-md:text-[40px] max-md:mr-2.5">
                    Join the Waitlist
                  </h3>
                  <div className="flex w-full flex-col text-[17px] font-[510] tracking-[-0.34px] mt-8 pl-[9px] max-md:mt-10">
                        <div className="flex items-stretch gap-9">
                          <div className="flex flex-col items-stretch">
                            <label htmlFor="userType" className="mb-[13px]">You are a</label>
                            <div className="flex gap-4">
                              <button
                                type="button"
                                onClick={() => handleUserTypeChange('doctor')}
                                className={`shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex items-center gap-2.5 overflow-hidden whitespace-nowrap text-center px-[13px] py-2 rounded-xl border-[rgba(228,228,228,1)] border-solid ${
                                  formData.userType === 'doctor' ? 'bg-blue-50' : 'bg-white'
                                }`}
                              >
                                <div className={`flex w-[18px] shrink-0 h-[18px] rounded-[50%] border-2 ${
                                  formData.userType === 'doctor' 
                                    ? 'bg-blue-500 border-blue-500' 
                                    : 'bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)] border-[rgba(228,228,228,1)]'
                                }`} />
                                <span>Doctor</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUserTypeChange('patient')}
                                className={`shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex items-center gap-[11px] overflow-hidden whitespace-nowrap text-center px-3 py-2 rounded-xl border-[rgba(228,228,228,1)] border-solid ${
                                  formData.userType === 'patient' ? 'bg-blue-50' : 'bg-white'
                                }`}
                              >
                                <div className={`flex w-[18px] shrink-0 h-[18px] rounded-[50%] border-2 ${
                                  formData.userType === 'patient' 
                                    ? 'bg-blue-500 border-blue-500' 
                                    : 'bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)] border-[rgba(228,228,228,1)]'
                                }`} />
                                <span>Patient</span>
                              </button>
                            </div>
                            {userTypeError && (
                              <p className="text-red-500 text-sm mt-2">{userTypeError}</p>
                            )}
                          </div>
                        </div>
                        
                        <label htmlFor="fullName" className="mt-4">Full Name</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border self-stretch flex shrink-0 h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3"
                          required
                        />
                        
                        <label htmlFor="phoneNumber" className="mt-4">Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex w-[216px] shrink-0 h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3"
                          required
                        />
                        
                        <label htmlFor="emailAddress" className="mt-4">Email Address</label>
                        <input
                          type="email"
                          id="emailAddress"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex w-[263px] shrink-0 max-w-full h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3"
                          required
                        />
                        
                        <div className="flex gap-4 mt-4">
                          <div className="flex flex-col">
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex w-[203px] shrink-0 h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3"
                              required
                            />
                          </div>
                          <div className="flex flex-col ml-auto">
                            <label htmlFor="pincode">Pincode</label>
                            <input
                              type="text"
                              id="pincode"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleInputChange}
                              className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex shrink-0 h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3"
                              required
                            />
                          </div>
                        </div>
                  </div>
                </div>
                
                <div className="flex w-full flex-col items-stretch text-[17px] text-black font-normal tracking-[-0.34px] mt-6 pl-[9px] max-md:max-w-full">
                  <label htmlFor="message" className="font-[510]">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex shrink-0 h-[115px] mt-[5px] rounded-xl border-[rgba(228,228,228,1)] border-solid max-md:max-w-full px-3 py-2 resize-none"
                    rows={5}
                  />
                  
                  <div className="flex items-stretch gap-2.5 text-base tracking-[-0.64px] mt-[15px]">
                    <input
                      type="checkbox"
                      id="agreeToContact"
                      name="agreeToContact"
                      checked={formData.agreeToContact}
                      onChange={handleInputChange}
                      className="bg-white shadow-[0px_1px_8px_rgba(0,0,0,0.25)] w-6 h-[22px]"
                      required
                    />
                    <label htmlFor="agreeToContact" className="basis-auto grow shrink my-auto">
                      You agree to Kiora getting in touch with you
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-[rgba(17,144,255,1)] shadow-[0px_4px_20px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden items-center text-white whitespace-nowrap text-center justify-center mt-[30px] px-[70px] py-[15px] rounded-xl max-md:max-w-full max-md:px-5 hover:bg-blue-600 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}
    </section>
  );
};

export default ContactForm;
