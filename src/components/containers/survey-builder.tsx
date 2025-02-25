'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {ArrowLeft, Loader} from 'lucide-react';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {motion, AnimatePresence} from 'framer-motion';
import {AnswerVariantsType, SurveyBuilderProps} from '@/app/types/survey';
import axios from 'axios';
import Image from 'next/image';
import {ScratchToReveal} from '@/components/containers/scratch-to-reveal';
import {cn} from '@/lib/utils';
import confetti from 'canvas-confetti';
import {viewport} from "@telegram-apps/sdk-react";
import Link from 'next/link';

// Question components
const questionComponents = {
    yesno: ({schema, questionId, question, questionDesc, onChange, selectedAnswer}) => (
        <div>
            <h3 className="font-semibold mb-2">{question}</h3>
            <p className="font-medium mb-2">{questionDesc}</p>
            <RadioGroup defaultValue={schema.questions[questionId].value} value={selectedAnswer}
                        onValueChange={onChange}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes"/>
                    <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no"/>
                    <Label htmlFor="no">No</Label>
                </div>
            </RadioGroup>
        </div>
    ),
    single: ({schema, questionId, question, questionDesc, options, onClick}) => (
        <div>
            <h3 className="text-2xl font-semibold mb-2">{question}</h3>
            <p className="font-medium mb-2">{questionDesc}</p>
            <div className="mt-6 space-y-2">
                {options.map((option: AnswerVariantsType, idx) => (
                    <button
                        key={idx}
                        data-active={schema.questions[questionId - 1].userAnswer === option.id}
                        className={`
                          flex w-full items-center justify-center rounded-xl
                          border border-zinc-200/50 bg-transparent px-4 py-3

                          data-[active=true]:border-zinc-500/50
                        `}
                        onClick={() => onClick(option.id)} // Trigger handleAnswerSelection
                    >
                        <span>{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    ),
    range: ({question, range, onChange}) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <input type="range" min={range.min} max={range.max} onChange={(e) => onChange(e.target.value)}/>
            <div>
                <span>{range.min}</span> - <span>{range.max}</span>
            </div>
        </div>
    ),
    text: ({question, onChange}) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <input type="text" className="border rounded p-2 w-full" onChange={(e) => onChange(e.target.value)}/>
        </div>
    ),
    number: ({question, onChange}) => (
        <div className="mb-4">
            <p className="font-medium mb-2">{question}</p>
            <input type="number" className="border rounded p-2 w-full" onChange={(e) => onChange(e.target.value)}/>
        </div>
    ),
};

const validateSchema = (schema) => {
    return {
        ...schema,
        questions: schema.questions
            .map((question) => {
                // Validate userAnswer
                if (
                    question.userAnswer &&
                    !question.answerVariants.some((variant) => variant.id === question.userAnswer)
                ) {
                    question = {...question, userAnswer: null};
                }

                // Sort answerVariants by id
                question.answerVariants.sort((a, b) => a.id - b.id);

                return question;
            })
            .sort((a, b) => a.index - b.index), // Sort questions by index
    };
};

const SurveyBuilder = ({initialSchema, surveyId, userId}: SurveyBuilderProps) => {
    const [schema, setSchema] = useState(validateSchema(initialSchema));
    const [promoCode, setPromoCode] = useState<string | null>(null);
    const [isFetchingPromo, setIsFetchingPromo] = useState(false);
    const [fetchPromoError, setFetchPromoError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(() => {
        const index = schema.questions.findIndex((question) => question.userAnswer === null);
        return index < 0 ? 0 : index;
    });
    const [isCompleted, setIsCompleted] = useState(false);

    const updateUserAnswer = (questionId: string, answer: string) => {
        setSchema((prevSchema) => ({
            ...prevSchema,
            questions: prevSchema.questions.map((question) =>
                question.id === questionId ? {...question, userAnswer: answer} : question
            ),
        }));
    };

    const handleAnswerSelection = async (questionId: string, value: string) => {
        setLoading(true);
        try {
            const question = schema.questions.find((q) => q.id === questionId);
            if (!question || !question.answerVariants.some((variant) => variant.id === value)) {
                console.error('Invalid answer selected:', value);
                return;
            }

            // Submit the answer to the API
            await axios.post('/api/submit-answer', {
                answerVariantId: value,
                questionId: questionId,
                surveyId: surveyId,
                userId: userId,
            });

            // Update the local state with the new answer
            updateUserAnswer(questionId, value);

            // Transition to the next question if applicable
            if (question.type === 'yesno' || question.type === 'single' || question.type === undefined) {
                console.log('Transitioning to next question:', questionId);
                setTimeout(() => {
                    handleNext();
                }, 150);
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (currentQuestion < schema.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else if (currentQuestion === schema.questions.length - 1) {
            handleSubmit().then();
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsCompleted(true);
        await fetchPromoCode();
    };

    const isNextDisabled = () => {
        const currentQuestionData = schema.questions[currentQuestion];
        return currentQuestionData && !currentQuestionData.userAnswer;
    };

    const fetchPromoCode = async () => {
        setIsFetchingPromo(true);
        setFetchPromoError(null);

        try {
            const response = await axios.get('/api/get-promo', {headers: {userId: userId, surveyId: surveyId}});
            setPromoCode(response.data);
        } catch (error) {
            console.error('Error fetching promo code:', error);
            setFetchPromoError('Failed to fetch promo code. Please try again later.');
        } finally {
            setIsFetchingPromo(false);
        }
    };

    const progressPercentage = Math.round((currentQuestion / schema.questions.length) * 100);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {x: 0, opacity: 1},
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
        }),
    };

    const confettiBoom = () => {
        const count = 200;
        const defaults = {
            origin: {y: 0.7},
        };

        function fire(particleRatio: number, opts: { spread: number, startVelocity?: number, decay?: number, scalar?: number }) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    return (
        <Card className={`
          relative flex h-screen flex-grow flex-col border-none shadow-none
        `} style={{paddingTop: viewport.contentSafeAreaInsetTop() + 60}}>
            {loading && <Loader className="absolute right-1 top-1 animate-spin"/>}
            <CardContent className={cn(`
              flex flex-1 flex-col justify-between overflow-hidden pt-2
            `, isCompleted && `justify-center`)}>
                {isCompleted ? (
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.4}}
                        className="flex flex-col items-center text-center"
                    >
                        <Image
                            src="/congrats.webp"
                            className="my-4 h-20 w-20"
                            width={512}
                            height={512}
                            alt="Congrats!"
                        />
                        <p className="mb-4">Потри карточку чтобы забрать награду:</p>
                        <ScratchToReveal
                            width={250}
                            height={150}
                            minScratchPercentage={40}
                            className={cn(
                                `
                                  relative flex items-center justify-center
                                  overflow-hidden rounded-2xl

                                  after:fixed after:z-[-10] after:h-[590px]
                                  after:w-[590px] after:animate-spin
                                  after:bg-[url(/rays.png)] after:content-[""]
                                  after:[animation-duration:15000ms]
                                `,
                                isFetchingPromo
                                    ? 'bg-gray-100'
                                    : fetchPromoError
                                        // ? 'bg-red-100'
                                        ? 'bg-purple-100'
                                        : promoCode
                                            ? 'bg-green-100'
                                            : 'bg-gray-100'
                            )}
                            onComplete={() => confettiBoom()}
                            gradientColors={['#A97CF8', '#F38CB8', '#FDCC92']}
                        >
                            {isFetchingPromo ? (
                                <span className="text-4xl">Загрузка...</span>
                            ) : fetchPromoError ? (
                                // <span className="text-2xl">{fetchPromoError}</span>
                                <span className="font-mono">
                                    Скоро здесь появятся промокоды. А пока L1vestack в бете, пользуйся им бесплатно!
                                </span>
                            ) : promoCode ? (
                                <span className="text-4xl">{promoCode}</span>
                            ) : (
                                <span className="text-2xl">Нет доступных ваучеров.</span>
                            )}
                        </ScratchToReveal>
                        <Button className={"mt-4"}>
                            <Link href={"/"}>На главную</Link>
                        </Button>
                    </motion.div>
                ) : (
                    <>
                        <AnimatePresence mode="popLayout" initial={false} custom={currentQuestion}>
                            <motion.div
                                key={currentQuestion}
                                custom={currentQuestion}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{type: 'spring', stiffness: 300, damping: 30}}
                            >
                                {(() => {
                                    const questionData = schema.questions[currentQuestion];
                                    if (!questionData) return null;
                                    const Component = questionComponents[questionData.type ?? 'single'];
                                    if (!Component) return null;
                                    return (
                                        <Component
                                            key={questionData.id}
                                            question={questionData.title}
                                            questionDesc={questionData.description}
                                            options={questionData.answerVariants}
                                            range={questionData.range}
                                            questionId={questionData.id}
                                            schema={schema}
                                            onClick={(value: string) => handleAnswerSelection(questionData.id, value)}
                                        />
                                    );
                                })()}
                            </motion.div>
                        </AnimatePresence>
                        <div>
                            <Progress value={progressPercentage}/>
                            <div className="mt-4 flex">
                                <div className="flex flex-grow items-center">
                                    <p className={`
                                      mt-2 whitespace-nowrap text-sm
                                      text-gray-500
                                    `}>
                                        Вопрос {currentQuestion + 1} из {schema.questions.length}
                                    </p>
                                </div>
                                <div className={`flex gap-2 self-end`}>
                                    <Button onClick={handleBack} variant="outline"
                                            disabled={currentQuestion === 0}>
                                        <ArrowLeft/>
                                        Предыдущий
                                    </Button>
                                    <Button onClick={handleNext} size="icon" variant="outline"
                                            disabled={isNextDisabled()}>
                                        <ArrowLeft className="rotate-180"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default SurveyBuilder;