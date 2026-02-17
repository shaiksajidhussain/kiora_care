import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, Clock, User, Mail, Phone, MapPinned, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import getInTouchImage from '@/images/getintouch.jpeg';

export interface ScheduleCallFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Plan selected on Schedule Test page: one-time (₹999) or 90-days (₹3,999). When null, defaults to one-time. */
  selectedPlan?: 'one-time' | '90-days' | null;
}

const inputClass =
  'h-11 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow';

const TIME_SLOTS = [
  { value: '11:00', label: '11:00 AM' },
  { value: '15:00', label: '3:00 PM' },
] as const;

const ALLOWED_CITIES = ['greater hyderabad'];

function isValidIndiaMobile(value: string): boolean {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length === 10 && /^[6-9]/.test(cleaned);
}

function isValidIndiaPincode(value: string): boolean {
  return /^\d{6}$/.test(value.trim());
}

function isAllowedCity(city: string): boolean {
  return ALLOWED_CITIES.includes(city.trim().toLowerCase());
}

const ScheduleCallForm = ({ open, onOpenChange, selectedPlan = null }: ScheduleCallFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Greater Hyderabad');
  const [state, setState] = useState('Telangana');
  const [mapLocation, setMapLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);
  const [scheduleTime, setScheduleTime] = useState('');
  const [agreeToContact, setAgreeToContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!isValidIndiaMobile(phone)) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8 or 9).';
    }
    if (!isValidIndiaPincode(pincode)) {
      errors.pincode = 'Please enter a valid 6-digit Indian pincode.';
    }
    if (!city.trim()) {
      errors.city = 'Please select a city.';
    } else if (!isAllowedCity(city)) {
      errors.city = 'We currently serve only Hyderabad and Secunderabad.';
    }
    if (!scheduleTime) {
      errors.scheduleTime = 'Please select a time slot.';
    }
    if (!scheduleDate) {
      errors.scheduleDate = 'Please select a preferred date.';
    }
    if (!mapLocation.trim()) {
      errors.mapLocation = 'Please enter map location or Google Maps link.';
    }
    if (!address.trim()) {
      errors.address = 'Please enter your address.';
    }
    if (!state.trim()) {
      errors.state = 'Please enter state.';
    }
    if (!name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!email.trim()) {
      errors.email = 'Please enter your email.';
    }
    if (!gender) {
      errors.gender = 'Please select gender.';
    }
    setFieldErrors(errors);
    setSubmitError(Object.keys(errors).length > 0 ? 'Please correct the errors below.' : '');
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setFieldErrors({});

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        throw new Error('Backend URL is not configured. Please set VITE_BACKEND_URL or NEXT_PUBLIC_BACKEND_URL environment variable.');
      }

      const response = await fetch(`${backendUrl}/api/send-contact-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'schedule-test',
          userType: 'patient',
          fullName: name,
          emailAddress: email,
          phoneNumber: phone,
          city: city.trim() || address,
          state: state.trim() || null,
          address: address.trim() || null,
          pincode,
          message: `Schedule a test request${selectedPlan === 'one-time' ? ' (Essential (One time test) - ₹999)' : selectedPlan === '90-days' ? ' (Signature (90 Days plan) - ₹3,999)' : ''}.\nGender: ${gender || 'Not specified'}\nAddress: ${address}\nCity: ${city}\nState: ${state}\nMap location: ${mapLocation}\nPreferred date: ${scheduleDate ? format(scheduleDate, 'PPP') : 'Not set'}\nPreferred time: ${scheduleTime ? TIME_SLOTS.find(s => s.value === scheduleTime)?.label ?? scheduleTime : 'Not set'}`,
          agreeToContact,
          selectedPlan: selectedPlan || null,
          gender: gender || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send email' }));
        throw new Error(errorData.error || errorData.message || 'Failed to send email');
      }

      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setGender('');
      setAddress('');
      setCity('Greater Hyderabad');
      setState('Telangana');
      setMapLocation('');
      setPincode('');
      setScheduleDate(undefined);
      setScheduleTime('');
      setAgreeToContact(false);
      setTimeout(() => {
        setSubmitSuccess(false);
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && !isSubmitting) {
      setSubmitError('');
      setFieldErrors({});
      setSubmitSuccess(false);
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          'max-w-[min(920px,95vw)] max-h-[100vh] md:max-h-[90vh] overflow-hidden p-0 gap-0',
          'rounded-2xl md:rounded-3xl border-border shadow-2xl',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]'
        )}
      >
        <div className="flex flex-col md:flex-row md:min-h-[520px]">
          {/* Left: visual panel with gradient — same theme as form (light/dark) */}
          <div className="hidden md:flex md:w-[42%] flex-col rounded-l-2xl md:rounded-l-3xl overflow-hidden border-r border-border text-foreground p-8 bg-gradient-to-b from-primary/10 via-primary/5 to-card dark:from-primary/20 dark:via-primary/10 dark:to-card">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 dark:bg-primary/25 flex items-center justify-center mb-4 text-primary">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Pick a date and time that works for you.
              </p>
            </div>
            <div className="relative mt-6 rounded-xl overflow-hidden flex-1 min-h-[240px] bg-muted shadow-inner flex items-center justify-center">
              <img
                src={getInTouchImage}
                alt="Healthcare professionals"
                className="max-w-full max-h-full w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right: form — same gradient as left */}
          <div className="flex-1 flex flex-col overflow-y-auto max-h-[100vh] md:max-h-[90vh] bg-gradient-to-b from-primary/10 via-primary/5 to-card dark:from-primary/20 dark:via-primary/10 dark:to-card">
            <DialogHeader className="sticky top-0 p-6 pb-4 pr-12 md:p-8 md:pb-6 md:pr-14 text-left border-b border-border bg-transparent backdrop-blur-sm">
              <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Schedule a test
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs md:text-sm mt-1">
                Fill in your details and preferred date & time for your test. We’ll get back to you shortly with a confirmation.
              </DialogDescription>
              <p className="text-foreground/90 text-xs md:text-sm mt-3 leading-relaxed max-w-lg">
                Live only in Hyderabad now.
              </p>
              <div className="flex items-baseline gap-2 mt-4">
                {selectedPlan === '90-days' ? (
                  <>
                    <span className="text-muted-foreground text-sm line-through">₹4,999</span>
                    <span className="text-xl font-bold text-foreground">₹3,999</span>
                    <span className="text-muted-foreground text-xs">per plan</span>
                  </>
                ) : (
                  <>
                    <span className="text-muted-foreground text-sm line-through">₹1,299</span>
                    <span className="text-xl font-bold text-foreground">₹999</span>
                    <span className="text-muted-foreground text-xs">per test</span>
                  </>
                )}
              </div>
            </DialogHeader>

            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center gap-4 p-8 md:p-12">
                <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-lg font-semibold text-foreground text-center">
                  Test request submitted!
                </p>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                  We’ll reach out soon to confirm your test date and time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 pb-24">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-name" className="text-foreground font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Name
                    </Label>
                    <Input
                      id="schedule-name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setFieldErrors((prev) => ({ ...prev, name: '' })); }}
                      placeholder="Your full name"
                      className={cn(inputClass, fieldErrors.name && 'border-destructive')}
                      required
                    />
                    {fieldErrors.name && (
                      <p className="text-xs text-destructive">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-email" className="text-foreground font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email
                    </Label>
                    <Input
                      id="schedule-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setFieldErrors((prev) => ({ ...prev, email: '' })); }}
                      placeholder="you@example.com"
                      className={cn(inputClass, fieldErrors.email && 'border-destructive')}
                      required
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-destructive">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

           

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-phone" className="text-foreground font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Mobile number
                    </Label>
                    <Input
                      id="schedule-phone"
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setPhone(v);
                        setFieldErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      placeholder="10-digit Indian mobile number"
                      className={cn(inputClass, fieldErrors.phone && 'border-destructive')}
                      required
                      maxLength={10}
                    />
                    {fieldErrors.phone && (
                      <p className="text-xs text-destructive">{fieldErrors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-gender" className="text-foreground font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Gender
                    </Label>
                    <Select value={gender} onValueChange={(v) => { setGender(v); setFieldErrors((prev) => ({ ...prev, gender: '' })); }} required>
                      <SelectTrigger className={cn(inputClass, 'h-11', fieldErrors.gender && 'border-destructive')}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldErrors.gender && (
                      <p className="text-xs text-destructive">{fieldErrors.gender}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="schedule-address" className="text-foreground font-medium flex items-center gap-2">
                    <MapPinned className="w-4 h-4 text-muted-foreground" />
                    Address <span className="text-muted-foreground font-normal">(Live in Hyderabad only)</span>
                  </Label>
                  <Input
                    id="schedule-address"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); setFieldErrors((prev) => ({ ...prev, address: '' })); }}
                    placeholder="Street, area, landmark"
                    className={cn(inputClass, fieldErrors.address && 'border-destructive')}
                    required
                  />
                  {fieldErrors.address && (
                    <p className="text-xs text-destructive">{fieldErrors.address}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-city" className="text-foreground font-medium">
                      City
                    </Label>
                    <Select
                      value={city}
                      onValueChange={(value) => {
                        setCity(value);
                        setFieldErrors((prev) => ({ ...prev, city: '' }));
                      }}
                      required
                    >
                      <SelectTrigger className={cn(inputClass, 'h-11', fieldErrors.city && 'border-destructive')}>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Greater Hyderabad">Greater Hyderabad</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldErrors.city && (
                      <p className="text-xs text-destructive">{fieldErrors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-state" className="text-foreground font-medium">
                      State
                    </Label>
                    <Select value={state || 'Telangana'} onValueChange={setState}>
                      <SelectTrigger className={cn(inputClass, 'h-11', fieldErrors.state && 'border-destructive')}>
                        <SelectValue placeholder="Telangana" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Telangana">Telangana</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldErrors.state && (
                      <p className="text-xs text-destructive">{fieldErrors.state}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule-map" className="text-foreground font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Map location
                  </Label>
                  <Input
                    id="schedule-map"
                    value={mapLocation}
                    onChange={(e) => { setMapLocation(e.target.value); setFieldErrors((prev) => ({ ...prev, mapLocation: '' })); }}
                    placeholder="Google Maps link or location name"
                    className={cn(inputClass, fieldErrors.mapLocation && 'border-destructive')}
                    required
                  />
                  {fieldErrors.mapLocation && (
                    <p className="text-xs text-destructive">{fieldErrors.mapLocation}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-pincode" className="text-foreground font-medium">
                      Pincode
                    </Label>
                    <Input
                      id="schedule-pincode"
                      value={pincode}
                      onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '').slice(0, 6)); setFieldErrors((prev) => ({ ...prev, pincode: '' })); }}
                      placeholder="6-digit pincode (e.g. 500001)"
                      className={cn(inputClass, fieldErrors.pincode && 'border-destructive')}
                      required
                      maxLength={6}
                    />
                    {fieldErrors.pincode && (
                      <p className="text-xs text-destructive">{fieldErrors.pincode}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      Preferred date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            'w-full h-11 justify-start text-left font-normal rounded-xl border-border',
                            !scheduleDate && 'text-muted-foreground',
                            fieldErrors.scheduleDate && 'border-destructive'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleDate ? format(scheduleDate, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-xl border-border" align="start">
                        <Calendar
                          mode="single"
                          selected={scheduleDate}
                          onSelect={(date) => { setScheduleDate(date ?? undefined); setFieldErrors((prev) => ({ ...prev, scheduleDate: '' })); }}
                          disabled={(date) => {
                            const today = new Date(new Date().setHours(0, 0, 0, 0));
                            const isPast = date < today;
                            const isSunday = date.getDay() === 0;
                            return isPast || isSunday;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldErrors.scheduleDate && (
                      <p className="text-xs text-destructive">{fieldErrors.scheduleDate}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      Preferred time
                    </Label>
                    <Select value={scheduleTime} onValueChange={setScheduleTime} required>
                      <SelectTrigger className={cn(inputClass, 'h-11', fieldErrors.scheduleTime && 'border-destructive')}>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.scheduleTime && (
                      <p className="text-xs text-destructive">{fieldErrors.scheduleTime}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border  px-3.5 py-3">
                  <input
                    id="schedule-consent"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    checked={agreeToContact}
                    onChange={(e) => setAgreeToContact(e.target.checked)}
                    required
                  />
                  <label
                    htmlFor="schedule-consent"
                    className="text-xs sm:text-xs text-muted-foreground leading-relaxed"
                  >
                    I consent to Kiora contacting me via phone, SMS, WhatsApp, or email regarding this test
                    booking and related care. I understand that I can withdraw this consent at any time.
                  </label>
                </div>

                {submitError && (
                  <p className="text-sm text-destructive font-medium bg-destructive/10 border border-destructive/20 rounded-xl px-3 py-2">
                    {submitError}
                  </p>
                )}

                <div className="sticky bottom-0 left-0 right-0 pt-3 -mx-6 md:-mx-8 pb-2 bg-gradient-to-t from-background via-background/95 to-background/60 backdrop-blur">
                  <div className="px-6 md:px-8">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'w-full h-12 rounded-xl font-semibold text-primary-foreground',
                        'bg-primary hover:opacity-90 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
                        'transition-all duration-200 disabled:opacity-50'
                      )}
                    >
                      {isSubmitting ? 'Sending...' : 'Schedule my test'}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleCallForm;
