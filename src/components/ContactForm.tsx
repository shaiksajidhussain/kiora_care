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
  const [showForm, setShowForm] = useState(true);
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
            className="bg-card shadow-[0px_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-[17px] text-foreground tracking-[-0.34px] mt-8 md:mt-[72px] px-9 py-2.5 rounded-xl hover:bg-accent transition-all duration-300 hover:scale-105"
          >
            Reach Out to Us
          </button>
        </div>
        </div>
      </div>
      
      {showForm && (
        <div className={`w-full max-w-[1445px] mt-8 md:mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
          <div className="flex gap-8 md:gap-12 max-md:flex-col">
            {/* Left: image */}
            <div className="w-full md:w-[48%] flex-shrink-0 rounded-3xl md:rounded-[40px] overflow-hidden min-h-[280px] md:min-h-[420px] bg-muted/30">
              <img
                src="https://kimshospital.in/wp-content/uploads/2022/12/doctor-nurses-special-equipment.webp"
                className="w-full h-full min-h-[280px] md:min-h-[420px] object-cover"
                alt="Doctor and nurses with special equipment"
              />
            </div>

            {/* Right: form */}
            <div className="w-full md:flex-1 flex flex-col justify-center">
              <div className="bg-card border border-border rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-1">
                  Get in touch
                </h3>
                <p className="text-muted-foreground text-sm md:text-base mb-6">
                  Share your details and we’ll get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-foreground mb-2">
                      You are a
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleUserTypeChange('doctor')}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                          formData.userType === 'doctor'
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'bg-background border-border text-foreground hover:border-primary/50 hover:bg-muted/30'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          formData.userType === 'doctor' ? 'border-primary bg-primary-foreground' : 'border-border'
                        }`}>
                          {formData.userType === 'doctor' && <span className="w-2 h-2 rounded-full bg-primary" />}
                        </span>
                        Doctor
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUserTypeChange('patient')}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                          formData.userType === 'patient'
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'bg-background border-border text-foreground hover:border-primary/50 hover:bg-muted/30'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          formData.userType === 'patient' ? 'border-primary bg-primary-foreground' : 'border-border'
                        }`}>
                          {formData.userType === 'patient' && <span className="w-2 h-2 rounded-full bg-primary" />}
                        </span>
                        Patient
                      </button>
                    </div>
                    {userTypeError && (
                      <p className="text-destructive text-sm mt-1.5">{userTypeError}</p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-1">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full h-10 rounded-xl border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Phone number"
                          className="w-full h-10 rounded-xl border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="emailAddress" className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                        <input
                          type="email"
                          id="emailAddress"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className="w-full h-10 rounded-xl border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1.5">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="w-full h-10 rounded-xl border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-foreground mb-1.5">Pincode</label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="e.g. 560001"
                          className="w-full h-10 rounded-xl border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help?"
                        rows={4}
                        className="w-full min-h-[100px] resize-y py-3 rounded-xl border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow"
                        required
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      id="agreeToContact"
                      name="agreeToContact"
                      checked={formData.agreeToContact}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      required
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      You agree to Kiora getting in touch with you
                    </span>
                  </label>

                  {submitSuccess && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 text-sm font-medium">
                      Thank you! Your message has been sent. We’ll get back to you soon.
                    </div>
                  )}
                  {submitError && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-primary text-primary-foreground font-medium px-8 py-3 rounded-xl shadow-lg hover:opacity-90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
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
