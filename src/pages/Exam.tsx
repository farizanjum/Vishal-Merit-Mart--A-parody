import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface ExamQuestion {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer?: string; // Optional for scoring
}

const branches = [
  'Lucknow',
  'Azamgarh',
  'Patna',
  'Ghaziabad',
  'Kanpur',
  'Varanasi',
  'Gorakhpur',
  'Allahabad',
  'Meerut',
  'Agra'
];

// Real exam questions
const examQuestions: ExamQuestion[] = [
  {
    id: 1,
    text: "What is the primary responsibility of a retail floor manager?",
    options: [
      { id: "a", text: "Managing inventory and stock levels" },
      { id: "b", text: "Supervising staff and customer service" },
      { id: "c", text: "Handling only the cash registers" },
      { id: "d", text: "Building store displays exclusively" }
    ],
    correctAnswer: "b"
  },
  {
    id: 2,
    text: "Which of these is the most effective way to handle an upset customer?",
    options: [
      { id: "a", text: "Tell them to speak to someone else" },
      { id: "b", text: "Ignore them until they calm down" },
      { id: "c", text: "Listen actively and find a solution" },
      { id: "d", text: "Offer a discount immediately" }
    ],
    correctAnswer: "c"
  },
  {
    id: 3,
    text: "When arranging bhindi (okra) in the produce section, what is the optimal stacking technique?",
    options: [
      { id: "a", text: "Pyramid formation with the freshest at bottom" },
      { id: "b", text: "Random pile to show abundance" },
      { id: "c", text: "Neat rows with stems aligned" },
      { id: "d", text: "Arranged by size from smallest to largest" }
    ],
    correctAnswer: "c"
  },
  {
    id: 4,
    text: "What should you do if you find expired products on the shelf?",
    options: [
      { id: "a", text: "Leave them for someone else to handle" },
      { id: "b", text: "Remove them immediately and report to supervisor" },
      { id: "c", text: "Move them to another section" },
      { id: "d", text: "Discount them heavily for quick sale" }
    ],
    correctAnswer: "b"
  },
  {
    id: 5,
    text: "A customer has dropped and broken a jar of pickle. What's your first action?",
    options: [
      { id: "a", text: "Ask them to pay for it" },
      { id: "b", text: "Secure the area and clean it safely" },
      { id: "c", text: "Call your manager immediately" },
      { id: "d", text: "Ignore it until your break is over" }
    ],
    correctAnswer: "b"
  },
  {
    id: 6,
    text: "Agar koi customer aapko Parle-G ke baare mein pooche jabki aap Detergent section mein ho, aap kya karenge?",
    options: [
      { id: "a", text: "\"Sir, main sirf detergent expert hoon, biscuit nahi bechta\"" },
      { id: "b", text: "\"Wo raha Parle-G. Waise aapko Surf Excel ka naya variant dikha doon?\"" },
      { id: "c", text: "Politely guide them to the biscuit aisle or find a colleague to help" },
      { id: "d", text: "\"Parle-G se kapde nahi dhulte sir, try this Tide instead\"" }
    ],
    correctAnswer: "c"
  },
  {
    id: 7,
    text: "During inventory, you notice 50 packets of chips missing. What's your response?",
    options: [
      { id: "a", text: "Blame the previous shift and update records" },
      { id: "b", text: "Say nothing and hope no one notices" },
      { id: "c", text: "Report the discrepancy to your supervisor" },
      { id: "d", text: "Buy replacement chips with your salary to avoid trouble" }
    ],
    correctAnswer: "c"
  },
  {
    id: 8,
    text: "Kaunsa discount offer customers ko sabse zyada attract karta hai according to VMM research?",
    options: [
      { id: "a", text: "Buy 1 Get 1 Free" },
      { id: "b", text: "50% Off on MRP" },
      { id: "c", text: "Buy for ₹999 and get ₹100 cashback" },
      { id: "d", text: "Free samosa with purchase above ₹2000" }
    ],
    correctAnswer: "a"
  },
  {
    id: 9,
    text: "If you see Sharma ji filling his shopping bag with extra free samples, you should:",
    options: [
      { id: "a", text: "Join him and take some for yourself" },
      { id: "b", text: "Take a selfie with him for Instagram" },
      { id: "c", text: "Politely inform him samples are limited to one per customer" },
      { id: "d", text: "Announce on store mic: \"Sharma ji pakde gaye!\"" }
    ],
    correctAnswer: "c"
  },
  {
    id: 10,
    text: "The true measure of a successful cashier at VMM is:",
    options: [
      { id: "a", text: "Number of items scanned per minute" },
      { id: "b", text: "How politely they can say 'Carry bag lenge? ₹5 extra lagega'" },
      { id: "c", text: "Balance of efficiency and customer satisfaction" },
      { id: "d", text: "Talent in convincing customers to take membership cards" }
    ],
    correctAnswer: "c"
  }
];

const shoeSize = Array.from({ length: 15 }, (_, i) => (i + 5).toString());

const Exam = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    email: '',
    branch: '',
    shoeSize: '',
    sabziCapacity: [20] // Default to middle of scale
  });
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!examStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    toast.error("Time's up! Your exam will be submitted automatically.");
    handleSubmitExam();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBranchChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      branch: value
    }));
  };

  const handleShoeSizeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      shoeSize: value
    }));
  };

  const handleSabziCapacityChange = (value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      sabziCapacity: value
    }));
  };

  const handleAnswerChange = (questionId: number, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleStartExam = () => {
    // Basic validation
    if (!formData.name || !formData.city || !formData.phone || !formData.email || !formData.branch || !formData.shoeSize) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setExamStarted(true);
    toast.success("Exam started! You have 10 minutes to complete.");
  };

  const handleSubmitExam = () => {
    if (Object.keys(answers).length < examQuestions.length && timeLeft > 0) {
      const confirmed = window.confirm("You haven't answered all questions. Are you sure you want to submit?");
      if (!confirmed) return;
    }

    setLoading(true);

    // Generate a fun roll number
    const stateCode = formData.city.slice(0, 2).toUpperCase();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const rollNo = `VMM25-${stateCode}-${randomNum}`;

    // Calculate score (can be random or based on correct answers)
    let score;
    if (Object.keys(answers).length < 5) {
      // If they answered less than half the questions, give them a lower score
      score = Math.floor(Math.random() * 30) + 40; // 40-69%
    } else {
      // Otherwise give them a decent score
      score = Math.floor(Math.random() * 30) + 70; // 70-99%
    }

    // Store data in localStorage for result page
    const resultData = {
      name: formData.name,
      rollNo,
      score,
      branch: formData.branch,
      timestamp: new Date().toISOString(),
      status: score >= 75 ? 'Selected' : (score >= 60 ? 'Waitlisted' : 'Rejected')
    };
    
    localStorage.setItem('vmmExamResult', JSON.stringify(resultData));
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      navigate(`/result?roll=${rollNo}`);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-vmm-red mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Processing Your Exam</h2>
          <p className="text-gray-600">Please wait while we evaluate your answers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader className="bg-vmm-blue text-white">
          <CardTitle>Vishal Mega Mart Recruitment Exam 2025</CardTitle>
          <CardDescription className="text-gray-100">
            {examStarted 
              ? `Time Remaining: ${formatTime(timeLeft)}`
              : "Please fill in your details to begin the exam"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {!examStarted ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email address" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Preferred Branch</Label>
                  <Select value={formData.branch} onValueChange={handleBranchChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shoeSize">Shoe Size</Label>
                  <Select value={formData.shoeSize} onValueChange={handleShoeSizeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your shoe size" />
                    </SelectTrigger>
                    <SelectContent>
                      {shoeSize.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4 md:col-span-2">
                  <Label htmlFor="sabziCapacity">
                    Sabzi Carrying Capacity (in kg)
                  </Label>
                  <div className="px-2">
                    <Slider
                      value={formData.sabziCapacity}
                      onValueChange={handleSabziCapacityChange}
                      max={40}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5kg (Basic)</span>
                      <span>{formData.sabziCapacity[0]}kg</span>
                      <span>40kg (Pro)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Once you start the exam, you will have 10 minutes to complete all questions. 
                  Make sure you're in a quiet environment with stable internet connection.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {examQuestions.map((question) => (
                <div key={question.id} className="space-y-4 border-b pb-6">
                  <div className="font-medium">
                    {question.id}. {question.text}
                  </div>
                  <RadioGroup
                    value={answers[question.id]}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
                    <div className="space-y-3">
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
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-blue-800">
                  <strong>Notice:</strong> Make sure to review all your answers before submitting. 
                  You won't be able to return to the exam after submission.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            disabled={examStarted && timeLeft > 0}
          >
            Back
          </Button>
          
          {!examStarted ? (
            <Button onClick={handleStartExam}>
              Start Exam
            </Button>
          ) : (
            <Button 
              onClick={handleSubmitExam}
              className="bg-vmm-blue hover:bg-vmm-blue/90"
            >
              Submit Exam
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Exam;
