
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
    text: "Ek customer gusse mein hai kyunki unhe discount section nahi mil raha. Aap kya karoge?",
    options: [
      { id: "a", text: "Arre bhaiya, aankhein khol ke dekhiye! 🤨", feedback: "Not the customer service Vishal is known for!" },
      { id: "b", text: "Storage room mein chhup jao aur pretend karo kuch hua hi nahi", feedback: "We can see you hiding behind those boxes..." },
      { id: "c", text: "Smile ke saath politely guide karo wahan tak (yes, we know you're lying) 😇", feedback: "Perfect! Customer service champion!" },
      { id: "d", text: "Big Bazaar try kar lo, yahan toh sirf legends shopping karte hain", feedback: "That's a quick way to lose your job!" }
    ]
  },
  {
    id: 2,
    text: "Sabziyan kaise arrange karoge?",
    options: [
      { id: "a", text: "Colors mein daal ke rainbow bana do 🌈 (because sabzi unicorn hai?)", feedback: "Creative but impractical!" },
      { id: "b", text: "A to Z, kyunki school mein bhi yahi sikhaya tha", feedback: "Interesting... but customers don't shop in alphabetical order!" },
      { id: "c", text: "Size wise: Bhindi se leke Lauki tak ka evolution", feedback: "The tiny vegetables would get crushed!" },
      { id: "d", text: "By type aur freshness (jo logical log karte hain)", feedback: "Perfect! You've passed 'VMM Veggie Arrangement 101'!" }
    ]
  },
  {
    id: 3,
    text: "Inventory expiry ke 2 kadam door hai. Kya karoge?",
    options: [
      { id: "a", text: "Discount mein daal do aur likh do: \"Just Fresh Vibes\"", feedback: "Smart business decision!" },
      { id: "b", text: "Expiry date stickers ka Photoshop karo", feedback: "That's illegal! And we caught you on camera!" },
      { id: "c", text: "Purani cheezein nayi ke peeche chipka do like a coward", feedback: "That's how you get health violations!" },
      { id: "d", text: "Khaane ka mann hai, toh ghar le jaate hain na! 🫣", feedback: "That's called 'stealing' and is frowned upon!" }
    ]
  },
  {
    id: 4,
    text: "Store band hone mein 5 minute baaki hain aur log abhi bhi ghoom rahe hain. Aap?",
    options: [
      { id: "a", text: "Lights off karo, bhool jao electricity bill", feedback: "That's one way to get negative reviews!" },
      { id: "b", text: "Har 30 second mein \"STORE IS CLOSING\" chillao mic pe", feedback: "Annoying but effective..." },
      { id: "c", text: "Polite tone mein batao, \"Sir/Ma'am, bas 5 minute aur…\" (aur phir 30 mins wait)", feedback: "Professional approach! You're management material!" },
      { id: "d", text: "Jhadoo uthao aur cleaning shuru karo — passive aggressive mode ON", feedback: "Passive-aggressive, but it works!" }
    ]
  },
  {
    id: 5,
    text: "Vishal Mega Mart employee mein sabse zaroori quality?",
    options: [
      { id: "a", text: "T-shirts folding ka Olympic level skill", feedback: "Important, but there's more to retail!" },
      { id: "b", text: "10,000+ SKU yaad rakhne ki Shakuntala Devi memory", feedback: "Impressive, but we have scanners for that!" },
      { id: "c", text: "Customer service + smile jo fake na lage (we dare you)", feedback: "Exactly! You're Vishal material!" },
      { id: "d", text: "Speed stacking so epic ki Jenga bhi sharma jaaye", feedback: "Save that for the grocery olympics!" }
    ]
  }
];

const MockTest = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [rollNo, setRollNo] = useState("");

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

    // Generate random roll number
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const generatedRollNo = `VM2025X${randomNum}`;
    
    setFeedback(feedbackObj);
    setScore(calculatedScore);
    setRollNo(generatedRollNo);
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
            <CardTitle className="text-2xl">📝 Exam Complete!</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-vmm-blue mb-2">Aapka Roll No: #{rollNo}</div>
              <p className="text-lg text-gray-700 font-medium">Jaake result check karo hamare <strong>'Check Result'</strong> page par. Waise suspense mein rehna bhi ek skill hai.</p>
            </div>
            
            <div className="mt-8 p-5 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-lg font-medium text-center mb-3">⚠️ Important Notice ⚠️</p>
              <p>Apne answers bhool jaiye. Result mein aapko batayenge ki aap Vishal Mega Mart material hain ya sirf regular customer hi rahenge zindagi bhar.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/exam">
              <Button size="lg" className="bg-vmm-red hover:bg-vmm-red/90">
                Take Real Exam Now
              </Button>
            </Link>
            <Link to="/result">
              <Button size="lg" variant="outline">
                Check Your Result
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
          <CardTitle>Ultimate Vishal Mega Mart Mock Test! 😎🛒</CardTitle>
          <CardDescription className="mt-4">
            <p className="mb-2">This is <strong>NOT</strong> your regular test. This is your <em>final exam of life decisions</em>.</p>
            <p className="mb-2">Don't worry — this test won't count towards your job application.</p>
            <p className="font-bold">But fail this and you'll be haunted by discount dreams forever.</p>
            <p className="mt-4 text-sm font-semibold">🧠 Instructions: Answer honestly (or hilariously), but beware — wrong answers will be roasted like a samosa left in the fryer too long.</p>
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
