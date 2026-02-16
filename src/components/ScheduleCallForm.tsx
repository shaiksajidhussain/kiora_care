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

export interface ScheduleCallFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Plan selected on Schedule Test page: one-time (₹999) or 90-days (₹3,999). When null, defaults to one-time. */
  selectedPlan?: 'one-time' | '90-days' | null;
}

const inputClass =
  'h-11 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow';

const ScheduleCallForm = ({ open, onOpenChange, selectedPlan = null }: ScheduleCallFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [mapLocation, setMapLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);
  const [scheduleTime, setScheduleTime] = useState('');
  const [agreeToContact, setAgreeToContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
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
          city: address,
          pincode,
          message: `Schedule a test request${selectedPlan === 'one-time' ? ' (Essential (One time test) - ₹999)' : selectedPlan === '90-days' ? ' (Signature (90 Days plan) - ₹3,999)' : ''}.\nGender: ${gender || 'Not specified'}\nAddress: ${address}\nMap location: ${mapLocation}\nPreferred date: ${scheduleDate ? format(scheduleDate, 'PPP') : 'Not set'}\nPreferred time: ${scheduleTime || 'Not set'}`,
          agreeToContact,
          selectedPlan: selectedPlan || null,
          gender: gender || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send email' }));
        throw new Error(errorData.error || 'Failed to send email');
      }

      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setGender('');
      setAddress('');
      setMapLocation('');
      setPincode('');
      setScheduleDate(undefined);
      setScheduleTime('');
      setAgreeToContact(false);
      setTimeout(() => {
        setSubmitSuccess(false);
        onOpenChange(false);
      }, 2000);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && !isSubmitting) {
      setSubmitError('');
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
          {/* Left: visual panel — same theme as form (light/dark) */}
          <div className="hidden md:flex md:w-[42%] flex-col justify-between rounded-l-2xl md:rounded-l-3xl overflow-hidden bg-card border-r border-border text-foreground p-8">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 text-foreground">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">Schedule a test</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                Pick a date and time that works for you.
              </p>
            </div>
            <div className="relative mt-6 rounded-xl overflow-hidden h-40 bg-muted">
              <img
                src="https://kimshospital.in/wp-content/uploads/2022/12/doctor-nurses-special-equipment.webp"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
            </div>
          </div>

          {/* Right: form */}
          <div className="flex-1 flex flex-col overflow-y-auto max-h-[100vh] md:max-h-[90vh]">
            <DialogHeader className="sticky top-0 p-6 pb-4 pr-12 md:p-8 md:pb-6 md:pr-14 text-left border-b border-border bg-background/95 backdrop-blur">
              <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Schedule a test
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs md:text-sm mt-1">
                Fill in your details and preferred date & time for your test. We’ll get back to you shortly with a confirmation.
              </DialogDescription>
              <p className="text-foreground/90 text-xs md:text-sm mt-3 leading-relaxed max-w-lg">
                Structured renal care assessment and evidence-based diagnostic pathway designed by our clinical team. Schedule your test to understand your CKD stage and personalised intervention options.
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
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className={inputClass}
                      required
                    />
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
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

           

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-phone" className="text-foreground font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Phone
                    </Label>
                    <Input
                      id="schedule-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-gender" className="text-foreground font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Gender
                    </Label>
                    <Select value={gender} onValueChange={setGender} required>
                      <SelectTrigger className={cn(inputClass, 'h-11')}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule-address" className="text-foreground font-medium flex items-center gap-2">
                    <MapPinned className="w-4 h-4 text-muted-foreground" />
                    Address
                  </Label>
                  <Input
                    id="schedule-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, city, state"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule-map" className="text-foreground font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Map location
                  </Label>
                  <Input
                    id="schedule-map"
                    value={mapLocation}
                    onChange={(e) => setMapLocation(e.target.value)}
                    placeholder="Google Maps link or location name"
                    className={inputClass}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-pincode" className="text-foreground font-medium">
                      Pincode
                    </Label>
                    <Input
                      id="schedule-pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 560001"
                      className={inputClass}
                      required
                    />
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
                          variant="outline"
                          className={cn(
                            'w-full h-11 justify-start text-left font-normal rounded-xl border-border',
                            !scheduleDate && 'text-muted-foreground'
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
                          onSelect={setScheduleDate}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      Preferred time
                    </Label>
                    <Input
                      id="schedule-time"
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className={inputClass}
                    />
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
