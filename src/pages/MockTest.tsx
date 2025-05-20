
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
  const [failed, setFailed] = useState(false);

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

    // Calculate a score between 30-65 to make most people fail
    const calculatedScore = Math.floor(Math.random() * 35) + 30;
    
    // 80% chance of failing
    const failResult = Math.random() < 0.8;
    
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
    setFailed(failResult);
    setSubmitted(true);
    
    window.scrollTo(0, 0);
  };

  const getFailureRoast = () => {
    const roasts = [
      "Vishal Mega Mart mein Customer banne ka talent hai aapme. Employee? Na baba na!",
      "Itne kam marks? Bhool gaye the ya bhool ke answer kiye the?",
      "Mock test bhi pass nahi ho paya, aur chale hai real exam dene. Wah bhai wah!",
      "Chalo koi na, dunia mein bahut kuch hai karne ko. Retail just isn't for you!",
      "Raja ji maaf karna, aapke bas ki baat nahi hai retail business.",
      "Bhindi arrange karne ke liye bhi dimag lagta hai, jo aapke exam se pata chala... nahi hai!"
    ];
    return roasts[Math.floor(Math.random() * roasts.length)];
  };

  const getSuccessRoast = () => {
    const roasts = [
      "Talent hai, lekin itna bhi nahi. Real exam mein dikha denge kaun asli khiladi hai!",
      "Not bad! Par real exam mein aapko pata chalega asli retail stars kaun hai.",
      "Congrats! Par abhi real test baaki hai, mere dost!",
      "Kya baat! Lekin real exam mein bhindi ka weight guess karna padega."
    ];
    return roasts[Math.floor(Math.random() * roasts.length)];
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Card className={`border-2 ${failed ? 'border-red-500' : 'border-yellow-500'}`}>
          <CardHeader className={`text-white ${failed ? 'bg-red-500' : 'bg-yellow-500'}`}>
            <CardTitle className="text-2xl">
              {failed ? '😂 Arre Bhai Bhai Bhai!' : '😏 Theek Thaak Performance'}
            </CardTitle>
            <CardDescription className="text-white">
              Your score: {score}% {failed ? '(FAILED)' : '(PASSED, barely)'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="text-xl font-bold mb-2">
                {failed ? getFailureRoast() : getSuccessRoast()}
              </div>
              <p className="mt-4 text-gray-700">
                {failed 
                  ? "Mock test hi fail kar diye, real exam mein toh bhagwaan hi malik hai! Lekin koshish karo, shayad kismet chamak jaye."
                  : "Abhi toh sirf mock test hai. Real exam mein dekhte hain aap kitne paani mein hain!"}
              </p>
            </div>
            
            <div className="space-y-6 mt-8">
              <h3 className="font-semibold text-lg">Question Feedback:</h3>
              {mockQuestions.map((question) => (
                <div key={question.id} className="p-4 bg-gray-50 rounded-md">
                  <p className="font-medium">{question.id}. {question.text}</p>
                  {answers[question.id] && (
                    <div className="mt-2">
                      <p className="text-gray-700">
                        Your answer: {question.options.find(opt => opt.id === answers[question.id])?.text}
                      </p>
                      <p className="text-sm mt-1 font-medium text-vmm-blue">
                        {feedback[question.id]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-lg font-medium text-center mb-3">⚠️ Retail Reality Check ⚠️</p>
              <p>{failed 
                ? "VMM mein job paaney ke liye mocks nahi, REAL exam clear karna hoga! Waise bhi, ye mock aapke liye bohot zada tha..." 
                : "Overconfident mat ho jana! Real exam mein bhindi ke pile bhi gir sakte hain!"}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/exam">
              <Button size="lg" className="bg-vmm-red hover:bg-vmm-red/90">
                Try Real Exam Instead
              </Button>
            </Link>
            <Button 
              onClick={() => window.location.reload()} 
              size="lg" 
              variant="outline"
            >
              Retry Mock Test
            </Button>
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
