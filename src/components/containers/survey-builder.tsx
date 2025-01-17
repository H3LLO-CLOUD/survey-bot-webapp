'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const questionComponents = {
    yesno: ({ question, onChange }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <label className="mr-4">
                <input type="radio" name={question} value="yes" onChange={(e) => onChange(e.target.value)} /> Yes
            </label>
            <label>
                <input type="radio" name={question} value="no" onChange={(e) => onChange(e.target.value)} /> No
            </label>
        </div>
    ),
    single: ({ question, options, onChange }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            {options.map((option, idx) => (
                <label key={idx} className="block">
                    <input
                        type="radio"
                        name={question}
                        value={option}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    {option}
                </label>
            ))}
        </div>
    ),
    multi: ({ question, options, onChange }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            {options.map((option, idx) => (
                <label key={idx} className="block">
                    <input
                        type="checkbox"
                        value={option}
                        onChange={(e) => onChange(e.target.checked ? option : null)}
                    />
                    {option}
                </label>
            ))}
        </div>
    ),
    range: ({ question, range, onChange }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <input
                type="range"
                min={range.min}
                max={range.max}
                onChange={(e) => onChange(e.target.value)}
            />
            <div>
                <span>{range.min}</span> - <span>{range.max}</span>
            </div>
        </div>
    ),
    text: ({ question, onChange }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <input
                type="text"
                className="border rounded p-2 w-full"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    ),
    number: ({ question, onChange }) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <input
                type="number"
                className="border rounded p-2 w-full"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    ),
};

const SurveyBuilder = ({ schema }) => {
    const [answers, setAnswers] = useState({});

    const handleChange = (questionId, value) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = () => {
        console.log('Survey Results:', answers);
    };

    return (
        <Card className="p-4">
            <CardContent>
                {schema.questions.map((q) => {
                    const Component = questionComponents[q.type];
                    if (!Component) return null;
                    return (
                        <Component
                            key={q.id}
                            question={q.question}
                            options={q.options}
                            range={q.range}
                            onChange={(value) => handleChange(q.id, value)}
                        />
                    );
                })}
                <Button onClick={handleSubmit} className="mt-4">
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
};

export default SurveyBuilder;