'use client';

import { useActionState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitContact, type ContactFormState } from "@/src/app/actions/contact";

const initialState: ContactFormState = { status: 'idle' };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  useEffect(() => {
    if (state.status === 'success') toast.success(state.message);
    if (state.status === 'error' && state.message) toast.error(state.message);
  }, [state]);

  const errors = state.fieldErrors ?? {};
  const values = state.values;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-gray-800">
          Contact Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* key resets uncontrolled fields to the returned values after each submission */}
        <form key={JSON.stringify(state)} action={formAction} className="space-y-6">
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={values?.name}
              disabled={isPending}
              placeholder="Your name"
              autoComplete="name"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={values?.email}
              disabled={isPending}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              defaultValue={values?.subject}
              disabled={isPending}
              placeholder="Subject of your message"
            />
            {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              defaultValue={values?.message}
              disabled={isPending}
              placeholder="Your message"
              rows={4}
            />
            {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2 size={16} className="animate-spin mr-2" />
            ) : null}
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
