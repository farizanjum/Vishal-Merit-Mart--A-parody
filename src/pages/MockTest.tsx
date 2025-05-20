
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    feedback: string;
  }[];
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "A customer is angry because they can't find the discount section. What do you do?",
    options: [
      { id: "a", text: "Tell them to look harder", feedback: "Not the customer service Vishal is known for!" },
      { id: "b", text: "Hide in the storage room", feedback: "We can see you hiding behind those boxes..." },
      { id: "c", text: "Politely guide them to the section", feedback: "Perfect! Customer service champion!" },
      { id: "d", text: "Suggest they try Big Bazaar instead", feedback: "That's a quick way to lose your job!" }
    ]
  },
  {
    id: 2,
    text: "How would you arrange vegetables in the produce section?",
    options: [
      { id: "a", text: "By color to make a rainbow display", feedback: "Creative but impractical!" },
      { id: "b", text: "Alphabetically - Apples to Zucchini", feedback: "Interesting... but customers don't shop in alphabetical order!" },
      { id: "c", text: "By size, largest to smallest", feedback: "The tiny vegetables would get crushed!" },
      { id: "d", text: "By type and freshness", feedback: "Perfect! You've passed 'VMM Veggie Arrangement 101'!" }
    ]
  },
  {
    id: 3,
    text: "What's the best way to handle inventory that's about to expire?",
    options: [
      { id: "a", text: "Mark it down and place on clearance", feedback: "Smart business decision!" },
      { id: "b", text: "Change the expiry date stickers", feedback: "That's illegal! And we caught you on camera!" },
      { id: "c", text: "Hide it behind newer products", feedback: "That's how you get health violations!" },
      { id: "d", text: "Take it home for yourself", feedback: "That's called 'stealing' and is frowned upon!" }
    ]
  },
  {
    id: 4,
    text: "The store is closing in 5 minutes but customers are still shopping. What do you do?",
    options: [
      { id: "a", text: "Turn off the lights to give them a hint", feedback: "That's one way to get negative reviews!" },
      { id: "b", text: "Make loud announcements every 30 seconds", feedback: "Annoying but effective..." },
      { id: "c", text: "Politely inform them the store is closing soon", feedback: "Professional approach! You're management material!" },
      { id: "d", text: "Start loudly cleaning around them", feedback: "Passive-aggressive, but it works!" }
    ]
  },
  {
    id: 5,
    text: "What is the most important quality in a Vishal Mega Mart employee?",
    options: [
      { id: "a", text: "The ability to fold shirts perfectly", feedback: "Important, but there's more to retail!" },
      { id: "b", text: "Being able to memorize all 10,000+ SKUs", feedback: "Impressive, but we have scanners for that!" },
      { id: "c", text: "Customer service and positive attitude", feedback: "Exactly! You're Vishal material!" },
      { id: "d", text: "Speed-stacking skills for making impressive displays", feedback: "Save that for the grocery olympics!" }
    ]
  }
];

const MockTest = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Record<number, string>>({});

  const handleAnswerChange = (questionId: number, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < mockQuestions.length) {
      toast.error("Please answer all questions before submitting!");
      return;
    }

    // Calculate a fun score
    let calculatedScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-99
    
    // Generate feedback for each question
    const feedbackObj: Record<number, string> = {};
    mockQuestions.forEach((question) => {
      const selectedOptionId = answers[question.id];
      const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);
      if (selectedOption) {
        feedbackObj[question.id] = selectedOption.feedback;
      }
    });

    setFeedback(feedbackObj);
    setScore(calculatedScore);
    setSubmitted(true);
    
    window.scrollTo(0, 0);
  };

  const getResultMessage = () => {
    if (score >= 90) {
      return "You're now eligible for Floor Manager at Ghaziabad Vishal Mart!";
    } else if (score >= 80) {
      return "You qualify for Shelf Specialist position at Azamgarh branch!";
    } else if (score >= 70) {
      return "You've been selected as Cashier Trainee at Patna location!";
    } else {
      return "You're eligible for Security Officer position at any branch!";
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Card className="border-2 border-green-500">
          <CardHeader className="bg-green-500 text-white text-center">
            <CardTitle className="text-2xl">Mock Test Result</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-vmm-blue mb-2">{score}%</div>
              <p className="text-lg text-gray-700 font-medium">{getResultMessage()}</p>
            </div>
            
            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-semibold text-vmm-blue">Your Answer Feedback:</h3>
              
              {mockQuestions.map((question) => (
                <div key={question.id} className="border-b pb-4">
                  <p className="font-medium">{question.id}. {question.text}</p>
                  <p className="mt-2">
                    <span className="font-semibold">Your choice:</span>{" "}
                    {question.options.find(opt => opt.id === answers[question.id])?.text}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 italic">{feedback[question.id]}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/exam">
              <Button size="lg" className="bg-vmm-red hover:bg-vmm-red/90">
                Take Real Exam Now
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline">
                Return to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Vishal Mega Mart Mock Test</CardTitle>
          <CardDescription>
            This practice test will help you prepare for the real exam. Don't worry, this won't count towards your application!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {mockQuestions.map((question) => (
              <div key={question.id} className="space-y-4">
                <div className="font-medium">
                  {question.id}. {question.text}
                </div>
                <RadioGroup
                  value={answers[question.id]}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={`q${question.id}-${option.id}`} />
                        <Label htmlFor={`q${question.id}-${option.id}`}>{option.text}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>Back</Button>
          <Button onClick={handleSubmit}>Submit Answers</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MockTest;
