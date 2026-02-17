import type { ResumeData } from './types';

export interface ValidationErrors {
  [key: string]: string;
}

export function validateResumeData(data: ResumeData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.personalInfo.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!data.personalInfo.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.personalInfo.phone.trim() && !data.personalInfo.email.trim()) {
    errors.contact = 'At least one contact method (email or phone) is required';
  }

  if (!data.headline.trim()) {
    errors.headline = 'Professional headline is required';
  }

  return errors;
}
