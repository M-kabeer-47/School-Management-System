"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    Save,
    User,
    Briefcase,
    GraduationCap,
    Shield,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Sub-components
import FormStepper from "@/components/admin/students/add/FormStepper";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import EmploymentDetailsStep from "./steps/EmploymentDetailsStep";
import RoleDetailsStep from "./steps/RoleDetailsStep";

// Schemas & Types
import {
    staffPersonalInfoSchema,
    staffEmploymentSchema,
    teachingDetailsSchema,
    nonTeachingDetailsSchema,
    StaffPersonalInfoInput,
    StaffEmploymentInput,
    TeachingDetailsInput,
    NonTeachingDetailsInput,
} from "@/components/admin/schemas/staff-schemas";

interface StaffFormProps {
    staffType: "teaching" | "non-teaching";
}

const LOCAL_STORAGE_KEY = "add-staff-form-v1";

export default function StaffForm({ staffType }: StaffFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);

    const STEPS = [
        {
            id: 1,
            title: "Personal Info",
            subtitle: "Bio & Contact",
            icon: User,
        },
        {
            id: 2,
            title: "Employment",
            subtitle: "Job Details",
            icon: Briefcase,
        },
        {
            id: 3,
            title: staffType === "teaching" ? "Teaching Details" : "Role Details",
            subtitle: staffType === "teaching" ? "Subjects & Classes" : "Shift & Area",
            icon: staffType === "teaching" ? GraduationCap : Shield,
        },
    ];

    // Initialize Forms
    const personalForm = useForm<StaffPersonalInfoInput>({
        resolver: zodResolver(staffPersonalInfoSchema),
        mode: "onBlur",
    });

    const employmentForm = useForm<StaffEmploymentInput>({
        resolver: zodResolver(staffEmploymentSchema),
        mode: "onBlur",
        defaultValues: {
            staffType: staffType,
        },
    });

    const teachingForm = useForm<TeachingDetailsInput>({
        resolver: zodResolver(teachingDetailsSchema),
        mode: "onBlur",
    });

    const nonTeachingForm = useForm<NonTeachingDetailsInput>({
        resolver: zodResolver(nonTeachingDetailsSchema),
        mode: "onBlur",
    });

    const roleForm = staffType === "teaching" ? teachingForm : nonTeachingForm;

    // Load from LocalStorage on Mount
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.personal) personalForm.reset(parsed.personal);
                if (parsed.employment) employmentForm.reset(parsed.employment);
                if (parsed.teaching && staffType === "teaching") teachingForm.reset(parsed.teaching);
                if (parsed.nonTeaching && staffType === "non-teaching") nonTeachingForm.reset(parsed.nonTeaching);
            } catch (e) {
                console.error("Failed to parse saved form data", e);
            }
        }
        setIsLoaded(true);

        const handleBeforeUnload = () => {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [personalForm, employmentForm, teachingForm, nonTeachingForm, staffType]);

    // Save to LocalStorage on Change
    useEffect(() => {
        if (!isLoaded) return;

        const subscription1 = personalForm.watch((data) =>
            saveToStorage({ personal: data })
        );
        const subscription2 = employmentForm.watch((data) =>
            saveToStorage({ employment: data })
        );
        const subscription3 = teachingForm.watch((data) =>
            saveToStorage({ teaching: data })
        );
        const subscription4 = nonTeachingForm.watch((data) =>
            saveToStorage({ nonTeaching: data })
        );

        return () => {
            subscription1.unsubscribe();
            subscription2.unsubscribe();
            subscription3.unsubscribe();
            subscription4.unsubscribe();
        };
    }, [isLoaded, personalForm, employmentForm, teachingForm, nonTeachingForm]);

    const saveToStorage = (partialData: any) => {
        const current = localStorage.getItem(LOCAL_STORAGE_KEY)
            ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
            : {};
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({ ...current, ...partialData })
        );
    };

    const handleNext = async () => {
        let isValid = false;

        if (currentStep === 1) {
            isValid = await personalForm.trigger();
        } else if (currentStep === 2) {
            isValid = await employmentForm.trigger();
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
            personalForm.reset({
                firstName: "",
                lastName: "",
                gender: "",
                dob: "",
                cnic: "",
                phone: "",
                email: "",
                address: "",
            });
            employmentForm.reset({
                staffCode: "",
                staffType: staffType,
                department: "",
                designation: "",
                joiningDate: "",
                salary: "",
                bankAccount: "",
            });
            teachingForm.reset({
                subjects: "",
                classes: "",
                qualifications: "",
                specialization: "",
            });
            nonTeachingForm.reset({
                role: "",
                shift: undefined,
                workArea: "",
            });
            setCurrentStep(1);
        }
    };

    const handleSubmit = async () => {
        const isValid = await roleForm.trigger();
        if (isValid) {
            const finalData = {
                personal: personalForm.getValues(),
                employment: employmentForm.getValues(),
                roleDetails: staffType === "teaching"
                    ? teachingForm.getValues()
                    : nonTeachingForm.getValues(),
            };

            console.log("FINAL SUBMISSION:", finalData);
            alert("Staff Saved! Check console for data.");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    };

    const stepVariants = {
        hidden: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" as const },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -50 : 50,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeIn" as const },
        }),
    };

    if (!isLoaded) return null;

    return (
        <div className="space-y-8">
            {/* Stepper */}
            <FormStepper
                steps={STEPS}
                currentStep={currentStep}
                onStepClick={async (stepId) => {
                    if (stepId < currentStep) {
                        setCurrentStep(stepId);
                    }
                }}
            />

            {/* Form Card */}
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
                                <FormProvider {...personalForm}>
                                    <PersonalInfoStep />
                                </FormProvider>
                            )}

                            {currentStep === 2 && (
                                <FormProvider {...employmentForm}>
                                    <EmploymentDetailsStep />
                                </FormProvider>
                            )}

                            {currentStep === 3 && staffType === "teaching" && (
                                <FormProvider {...teachingForm}>
                                    <RoleDetailsStep staffType="teaching" />
                                </FormProvider>
                            )}

                            {currentStep === 3 && staffType === "non-teaching" && (
                                <FormProvider {...nonTeachingForm}>
                                    <RoleDetailsStep staffType="non-teaching" />
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
                        {currentStep < 3 ? (
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
                                Save Staff <Save className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
