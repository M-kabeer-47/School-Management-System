"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Save,
  User,
  GraduationCap,
  MapPin,
  FileCheck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Sub-components
import FormStepper from "./FormStepper";
import AcademicInfoStep from "./steps/AcademicInfoStep";
import PersonalDetailsStep from "./steps/PersonalDetailsStep";
import GuardianInfoStep from "./steps/GuardianInfoStep";
import DocumentsStep from "./steps/DocumentsStep";

// Schemas & Types
import {
  academicInfoSchema,
  personalDetailsSchema,
  guardianInfoSchema,
  documentsSchema,
  AcademicInfoInput,
  PersonalDetailsInput,
  GuardianInfoInput,
  DocumentsInput,
} from "@/components/admin/schemas/student-schemas";

// Mock Data
const GRADES = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
];
const SECTIONS = ["Section A", "Section B", "Section C"];

const STEPS = [
  {
    id: 1,
    title: "Academic Info",
    subtitle: "Class & Roll No",
    icon: GraduationCap,
  },
  { id: 2, title: "Personal Details", subtitle: "Bio & Identity", icon: User },
  { id: 3, title: "Guardians", subtitle: "Parents Info", icon: MapPin },
  { id: 4, title: "Documents", subtitle: "Upload Files", icon: FileCheck },
];

const LOCAL_STORAGE_KEY = "add-student-form-v2";

export default function StudentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initialize Forms
  const academicForm = useForm<AcademicInfoInput>({
    resolver: zodResolver(academicInfoSchema),
    mode: "onBlur",
    defaultValues: {
      isTransfer: false,
      previousSchool: "",
      previousClass: "",
      reasonForLeaving: "",
    },
  });

  const personalForm = useForm<PersonalDetailsInput>({
    resolver: zodResolver(personalDetailsSchema),
    mode: "onBlur",
    defaultValues: {
      nationality: "",
      religion: "",
      bFormNo: "",
    },
  });

  const guardianForm = useForm<GuardianInfoInput>({
    resolver: zodResolver(guardianInfoSchema),
    mode: "onBlur",
  });

  const documentsForm = useForm<DocumentsInput>({
    resolver: zodResolver(documentsSchema),
    mode: "onBlur",
  });

  // 2. Load from LocalStorage on Mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.academic) academicForm.reset(parsed.academic);
        if (parsed.personal) personalForm.reset(parsed.personal);
        if (parsed.guardian) guardianForm.reset(parsed.guardian);
        if (parsed.documents) documentsForm.reset(parsed.documents);
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
    setIsLoaded(true);

    // Clear storage on reload (beforeunload)
    const handleBeforeUnload = () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [academicForm, personalForm, guardianForm, documentsForm]);

  // 3. Save to LocalStorage on Change
  useEffect(() => {
    if (!isLoaded) return;

    const subscription1 = academicForm.watch((data) =>
      saveToStorage({ academic: data }),
    );
    const subscription2 = personalForm.watch((data) =>
      saveToStorage({ personal: data }),
    );
    const subscription3 = guardianForm.watch((data) =>
      saveToStorage({ guardian: data }),
    );
    const subscription4 = documentsForm.watch((data) =>
      saveToStorage({ documents: data }),
    );

    return () => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
      subscription4.unsubscribe();
    };
  }, [isLoaded, academicForm, personalForm, guardianForm, documentsForm]);

  const saveToStorage = (partialData: Record<string, unknown>) => {
    const current = localStorage.getItem(LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
      : {};
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ ...current, ...partialData }),
    );
  };

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await academicForm.trigger();
    } else if (currentStep === 2) {
      isValid = await personalForm.trigger();
    } else if (currentStep === 3) {
      isValid = await guardianForm.trigger();
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear the form?")) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      academicForm.reset({
        rollNo: "",
        grade: "",
        section: "",
        isTransfer: false,
        previousSchool: "",
        previousClass: "",
        reasonForLeaving: "",
      });
      personalForm.reset({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        nationality: "",
        religion: "",
        bFormNo: "",
      });
      guardianForm.reset({
        fatherName: "",
        fatherCnic: "",
        fatherPhone: "",
        motherName: "",
        motherPhone: "",
        address: "",
        city: "",
        postalCode: "",
      });
      documentsForm.reset({ documents: {} });
      setCurrentStep(1);
    }
  };

  const handleSubmit = async () => {
    const finalData = {
      academic: academicForm.getValues(),
      personal: personalForm.getValues(),
      guardian: guardianForm.getValues(),
      documents: documentsForm.getValues(),
    };

    console.log("FINAL SUBMISSION:", finalData);
    alert("Student Saved! Check console for data.");
    // Clear storage after successful save
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const stepVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    }),
  };

  if (!isLoaded) return null; // Prevent hydration mismatch

  const isLastStep = currentStep === STEPS.length;

  return (
    <div className="space-y-8">
      {/* 1. Stepper */}
      <FormStepper
        steps={STEPS}
        currentStep={currentStep}
        onStepClick={async (stepId) => {
          // Allow jumping back, but validate before jumping forward
          if (stepId < currentStep) {
            setCurrentStep(stepId);
          }
        }}
      />

      {/* 2. Form Card */}
      <div className="bg-surface/50 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-2xl shadow-xl min-h-[500px] flex flex-col">
        {/* Header Strip */}
        <div className="bg-accent/5 border-b border-accent/10 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold font-heading text-text-primary">
            {STEPS[currentStep - 1].title}
          </h2>
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-error hover:text-error hover:bg-error/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
              Step {currentStep} of {STEPS.length}
            </span>
          </div>
        </div>

        <div className="p-8 flex-1">
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={currentStep}
              custom={1}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              {currentStep === 1 && (
                <FormProvider {...academicForm}>
                  <AcademicInfoStep GRADES={GRADES} SECTIONS={SECTIONS} />
                </FormProvider>
              )}

              {currentStep === 2 && (
                <FormProvider {...personalForm}>
                  <PersonalDetailsStep />
                </FormProvider>
              )}

              {currentStep === 3 && (
                <FormProvider {...guardianForm}>
                  <GuardianInfoStep />
                </FormProvider>
              )}

              {currentStep === 4 && (
                <FormProvider {...documentsForm}>
                  <DocumentsStep
                    isTransfer={academicForm.getValues("isTransfer")}
                    grade={academicForm.getValues("grade")}
                  />
                </FormProvider>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 bg-surface border-t border-border flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>

          <div className="flex gap-2">
            {!isLastStep ? (
              <Button
                onClick={handleNext}
                className="bg-accent hover:bg-accent-hover text-white gap-2 min-w-[120px]"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                className="bg-accent hover:bg-accent-hover text-white gap-2 min-w-[140px] shadow-lg shadow-accent/20"
                onClick={handleSubmit}
              >
                Save Student <Save className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
