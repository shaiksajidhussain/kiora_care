import React, { useState, useEffect, useRef } from 'react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userTypeError, setUserTypeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate user type is selected
    if (!formData.userType) {
      setUserTypeError('Please select either Doctor or Patient');
      return;
    }
    
    setUserTypeError('');
    setSubmitError('');
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.NEXT_PUBLIC_BACKEND_URL;
      
      if (!backendUrl) {
        throw new Error('Backend URL is not configured. Please set VITE_BACKEND_URL or NEXT_PUBLIC_BACKEND_URL environment variable.');
      }

      const response = await fetch(`${backendUrl}/api/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send email' }));
        throw new Error(errorData.error || 'Failed to send email');
      }

      // Success
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        userType: null,
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        city: '',
        pincode: '',
        message: '',
        agreeToContact: false
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="flex flex-col items-center px-4 py-10 md:py-20"
    >
      <div className="w-full max-w-[1445px] mt-10 md:mt-[220px]">
        <div className={`bg-[rgba(17,144,255,1)] flex w-full flex-col overflow-hidden items-center text-white font-normal text-center justify-center px-6 md:px-20 py-10 md:py-16 rounded-[32px] md:rounded-[72px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex w-[772px] max-w-full flex-col items-center">
          <h2 className="text-[clamp(32px,8vw,64px)] font-[510] leading-none tracking-[-1.28px] self-stretch max-w-full">
            Join others on their journey to better care
          </h2>
          <p className="text-base md:text-lg leading-none mt-6 md:mt-[55px] max-w-full">
            Get in touch to discover personalized solutions for kidney disease management.
          </p>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-[17px] text-black tracking-[-0.34px] mt-8 md:mt-[72px] px-9 py-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            Reach Out to Us
          </button>
        </div>
        </div>
      </div>
      
      {showForm && (
        <div className={`w-full max-w-[1445px] mt-6 md:mt-[26px] animate-in fade-in slide-in-from-bottom-4 duration-500`}>
        <div className="gap-6 md:gap-8 flex max-md:flex-col max-md:items-stretch">
          <div className="w-1/2 max-md:w-full max-md:ml-0">
            <img
              src="/images/contact-illustration.png"
              className="aspect-[0.86] object-contain w-full grow rounded-[32px] md:rounded-[72px] max-md:hidden"
              alt="Contact illustration"
            />
          </div>
          <div className="w-1/2 max-md:w-full max-md:ml-0">
            <div className="w-full mt-6 md:mt-[22px] max-md:max-w-full pr-0 md:pr-8">
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
                          className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border self-stretch flex shrink-0 h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0px_2px_12px_rgba(17,144,255,0.3)]"
                          required
                        />
                        
                        <label htmlFor="phoneNumber" className="mt-4">Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex w-[216px] shrink-0 h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0px_2px_12px_rgba(17,144,255,0.3)]"
                          required
                        />
                        
                        <label htmlFor="emailAddress" className="mt-4">Email Address</label>
                        <input
                          type="email"
                          id="emailAddress"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex w-[263px] shrink-0 max-w-full h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0px_2px_12px_rgba(17,144,255,0.3)]"
                          required
                        />
                        
                        <div className="flex max-md:flex-col gap-4 mt-4">
                          <div className="flex flex-col">
                            <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                              className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex w-[203px] max-md:w-full shrink-0 h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0px_2px_12px_rgba(17,144,255,0.3)]"
                          required
                        />
                      </div>
                          <div className="flex flex-col max-md:ml-0 ml-auto">
                      <label htmlFor="pincode">Pincode</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex shrink-0 max-md:w-full h-9 mt-2 rounded-xl border-[rgba(228,228,228,1)] border-solid px-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0px_2px_12px_rgba(17,144,255,0.3)]"
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
                    className="shadow-[0px_1px_8px_rgba(0,0,0,0.25)] border flex shrink-0 h-[115px] mt-[5px] rounded-xl border-[rgba(228,228,228,1)] border-solid max-md:max-w-full px-3 py-2 resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0px_2px_12px_rgba(17,144,255,0.3)]"
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
                  
                  {submitSuccess && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                      <p className="font-medium">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                    </div>
                  )}
                  
                  {submitError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                      <p className="font-medium">{submitError}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[rgba(17,144,255,1)] shadow-[0px_4px_20px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden items-center text-white whitespace-nowrap text-center justify-center mt-[30px] px-[70px] py-[15px] rounded-xl max-md:max-w-full max-md:px-5 hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-[0px_6px_30px_rgba(0,0,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
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
