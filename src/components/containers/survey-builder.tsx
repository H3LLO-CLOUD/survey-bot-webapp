'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

const questionComponents = {
    yesno: ({ question, onChange, selectedAnswer }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <RadioGroup value={selectedAnswer} onValueChange={onChange}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No</Label>
                </div>
            </RadioGroup>
        </div>
    ),
    single: ({ question, options, onChange, selectedAnswer }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <RadioGroup value={selectedAnswer} onValueChange={onChange}>
                {options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    ),
    multi: ({ question, options, onChange, selectedAnswers }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            {options.map((option, idx) => (
                <label key={idx} className="block">
                    <input
                        type="checkbox"
                        checked={selectedAnswers.includes(option)}  // Ensure the option itself is checked
                        value={option}
                        onChange={(e) => {
                            let updatedAnswers;
                            if (e.target.checked) {
                                updatedAnswers = [...selectedAnswers, option];  // Add the full option to the array
                            } else {
                                updatedAnswers = selectedAnswers.filter(ans => ans !== option);  // Remove the option if unchecked
                            }
                            onChange(updatedAnswers);  // Update the selected answers state
                        }}
                    />
                    {option}
                </label>
            ))}
        </div>
    ),
    range: ({ question, range, onChange, selectedValue }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <input
                type="range"
                min={range.min}
                max={range.max}
                value={selectedValue}
                onChange={(e) => onChange(e.target.value)}
            />
            <div>
                <span>{range.min}</span> - <span>{range.max}</span>
            </div>
        </div>
    ),
    text: ({ question, onChange, selectedValue }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <input
                type="text"
                className="border rounded p-2 w-full"
                value={selectedValue}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    ),
    number: ({ question, onChange, selectedValue }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <input
                type="number"
                className="border rounded p-2 w-full"
                value={selectedValue}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    ),
};

const SurveyBuilder = ({ schema }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(() => {
        const savedProgress = localStorage.getItem('surveyAnswers');
        return savedProgress ? JSON.parse(savedProgress) : {};
    });
    const [isCompleted, setIsCompleted] = useState(false);

    // Update localStorage whenever answers change
    useEffect(() => {
        localStorage.setItem('surveyAnswers', JSON.stringify(answers));
    }, [answers]);

    const handleChange = (questionId, value) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (currentQuestion < schema.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Survey complete', answers);
        setIsCompleted(true);
        localStorage.removeItem('surveyAnswers');
    };

    const progressPercentage = Math.round((currentQuestion / schema.questions.length) * 100);

    // Function to handle the "auto-next" behavior for `yesno` and `single` questions
    const handleAutoNext = (questionId, value) => {
        handleChange(questionId, value);

        // Check if it's a `yesno` or `single` question
        const question = schema.questions.find(q => q.id === questionId);
        if (question && (question.type === 'yesno' || question.type === 'single')) {
            setTimeout(() => {
                handleNext();
            }, 1000); // 1-second delay
        }
    };

    // Check if at least one answer is selected for enabling the Next button
    const isNextDisabled = () => {
        const currentQuestionData = schema.questions[currentQuestion];
        const selectedAnswer = answers[currentQuestionData.id];

        // For `yesno` or `single`, just check if there is a selected answer
        if (currentQuestionData.type === 'yesno' || currentQuestionData.type === 'single') {
            return !selectedAnswer;
        }

        // For `multi`, ensure at least one answer is selected
        if (currentQuestionData.type === 'multi') {
            return selectedAnswer?.length === 0;
        }

        return false;
    };

    return (
        <Card className="p-4">
            <CardContent>
                {isCompleted ? (
                    <div className="text-center">
                        <h2 className="mb-4 text-xl font-bold">🎉 Congratulations! 🎉</h2>
                        <p className="mb-4">You have completed the survey! Here&#39;s your reward:</p>
                        <div className="rounded bg-green-100 p-4 text-green-800">
                            🎁 Coupon Code: <strong>SURVEY2025</strong>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            Use this coupon at checkout to enjoy your reward.
                        </p>
                        <Button className="mt-4" onClick={() => window.location.reload()}>
                            Retake Survey
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <Progress value={progressPercentage} />
                            <p className="mt-2 text-sm text-gray-500">Вопрос {currentQuestion + 1} из {schema.questions.length}</p>
                        </div>

                        {/* Display question type label */}
                        <div className="mb-2 text-sm text-gray-500">
                            {schema.questions[currentQuestion].type === 'multi' ? 'Multiple Answers' : 'Single Answer'}
                        </div>

                        {schema.questions.map((q, idx) => {
                            if (idx !== currentQuestion) return null;
                            const Component = questionComponents[q.type];
                            if (!Component) return null;
                            return (
                                <Component
                                    key={q.id}
                                    question={q.question}
                                    options={q.options}
                                    range={q.range}
                                    selectedAnswers={answers[q.id] || []}
                                    selectedValue={answers[q.id] || ''}
                                    onChange={(value) => handleAutoNext(q.id, value)}  // Use the auto-next handler
                                />
                            );
                        })}
                        <div className="mt-4 flex justify-end gap-2">
                            <Button onClick={handleBack} size="icon" variant="outline" disabled={currentQuestion === 0}>
                                <ArrowLeft />
                            </Button>
                            <Button onClick={handleNext} size="icon" variant="outline" disabled={isNextDisabled()}>
                                <ArrowLeft className="rotate-180" />
                            </Button>
                            {currentQuestion === schema.questions.length - 1 && (
                                <Button onClick={handleSubmit}>Submit</Button>
                            )}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default SurveyBuilder;
