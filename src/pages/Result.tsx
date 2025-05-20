
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ResultData {
  name: string;
  rollNo: string;
  score: number;
  branch: string;
  timestamp: string;
  status: 'Selected' | 'Rejected' | 'Waitlisted';
}

const Result = () => {
  const [searchParams] = useSearchParams();
  const rollNoFromUrl = searchParams.get('roll');
  const navigate = useNavigate();
  
  const [rollNo, setRollNo] = useState(rollNoFromUrl || '');
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rollNoFromUrl) {
      checkResult();
    }
  }, [rollNoFromUrl]);

  const checkResult = () => {
    if (!rollNo.trim()) {
      toast.error('Please enter your roll number');
      return;
    }

    setLoading(true);

    // Try to get from localStorage first
    const storedResult = localStorage.getItem('vmmExamResult');
    let result;

    if (storedResult) {
      result = JSON.parse(storedResult);
      if (result.rollNo === rollNo) {
        setTimeout(() => {
          setResultData(result);
          setLoading(false);
        }, 1000);
        return;
      }
    }

    // If not found in localStorage or doesn't match, generate random result
    setTimeout(() => {
      // 70% chance of failing to make most people fail
      const randomFail = Math.random() < 0.7;
      
      // Generate score based on pass/fail status
      const randomScore = randomFail 
        ? Math.floor(Math.random() * 30) + 30 // 30-59% for fails
        : Math.floor(Math.random() * 30) + 70; // 70-99% for passes
      
      const status: ResultData['status'] = 
        randomScore >= 75 ? 'Selected' : (randomScore >= 60 ? 'Waitlisted' : 'Rejected');
      
      const fakeBranches = ['Lucknow', 'Patna', 'Ghaziabad', 'Kanpur', 'Azamgarh'];
      const randomBranch = fakeBranches[Math.floor(Math.random() * fakeBranches.length)];
      
      // Fake data generation
      const generatedData: ResultData = {
        name: `Candidate ${rollNo.slice(-5)}`,
        rollNo,
        score: randomScore,
        branch: randomBranch,
        timestamp: new Date().toISOString(),
        status
      };
      
      setResultData(generatedData);
      setLoading(false);
    }, 1500);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Selected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Waitlisted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRemarks = () => {
    if (!resultData) return '';
    
    switch (resultData.status) {
      case 'Selected':
        return [
          "Congratulations! Somehow you fooled our system. Welcome to Vishal Mega Mart!",
          "Your level of desperation impressed our panel. You're exactly what we need.",
          "Your bhindi arranging skills have earned you a spot in our elite team.",
          "Wow! We're as surprised as you are! Welcome aboard."
        ][Math.floor(Math.random() * 4)];
      
      case 'Waitlisted':
        return [
          "Potential hai, lekin yeh potential 10th class ke baad se waitlist pe hai.",
          "Hmm, interesting. Not good enough, not bad enough. The purgatory of retail.",
          "We're keeping you as a backup. Like that expired product behind the fresh ones.",
          "You showed some promise, but so does every monsoon cloud that doesn't rain."
        ][Math.floor(Math.random() * 4)];
      
      case 'Rejected':
        return [
          "Retail mein aapka future utna hi bright hai jitna powercut ke time bulb.",
          "Sorry, but arranging onions in alphabetical order was NOT the right answer.",
          "The committee unanimously agreed: better luck becoming a customer!",
          "Physics walon ko pata hai F=MA. Aapko pata hai F=FAIL!"
        ][Math.floor(Math.random() * 4)];
      
      default:
        return "Thank you for your interest in Vishal Mega Mart.";
    }
  };

  const handleViewCertificate = () => {
    if (resultData) {
      navigate('/certificate', { state: { resultData } });
    }
  };

  const shareResult = async () => {
    if (!resultData) return;

    try {
      const shareText = `I ${resultData.status === 'Selected' ? 'got selected' : 'applied'} at Vishal Mega Mart! Score: ${resultData.score}% | Roll No: ${resultData.rollNo} | Check your result at http://vmmcareers.fake`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'My VMM Recruitment Result',
          text: shareText,
        });
        toast.success("Shared successfully!");
      } else {
        navigator.clipboard.writeText(shareText);
        toast.success("Result copied to clipboard!");
      }
    } catch (error) {
      toast.error("Couldn't share result");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-vmm-red mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Fetching Results</h2>
          <p className="text-gray-600">Please wait while we retrieve your results...</p>
        </div>
      </div>
    );
  }

  if (resultData) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Card className={`border-2 ${
          resultData.status === 'Selected' ? 'border-green-500' : 
          resultData.status === 'Waitlisted' ? 'border-yellow-500' : 
          'border-red-500'
        }`}>
          <CardHeader className={`text-white ${
            resultData.status === 'Selected' ? 'bg-green-500' : 
            resultData.status === 'Waitlisted' ? 'bg-yellow-500' : 
            'bg-red-500'
          }`}>
            <CardTitle>{
              resultData.status === 'Selected' 
                ? '🎉 Aapko Select Kar Liya Gaya Hai!' 
                : resultData.status === 'Waitlisted'
                ? '😐 Aap Waitlist Par Hain'
                : '💩 Rejected! Better luck next janam!'
            }</CardTitle>
            <CardDescription className="text-white/90">
              Vishal Mega Mart Recruitment Drive 2025
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-gray-500">Candidate Name</p>
                <p className="font-medium">{resultData.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Roll Number</p>
                <p className="font-medium">{resultData.rollNo}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Branch Applied</p>
                <p className="font-medium">{resultData.branch}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Exam Date</p>
                <p className="font-medium">
                  {new Date(resultData.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-dashed pt-6">
              <div>
                <p className="text-sm text-gray-500">Score</p>
                <p className="text-4xl font-bold text-vmm-blue">{resultData.score}%</p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <p className="text-sm text-gray-500">Status</p>
                <div className={`mt-1 px-4 py-1.5 rounded-full border ${getStatusBadgeClass(resultData.status)} inline-block font-medium`}>
                  {resultData.status}
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Remarks</p>
              <p className="mt-1">{getRemarks()}</p>
            </div>

            {resultData.status === 'Rejected' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm font-medium text-red-800">Additional Feedback:</p>
                <p className="mt-1 text-red-700">
                  {[
                    "Your knowledge of retail is as empty as our shelves after a sale.",
                    "Sabziyan arrange karna bhi nahi aata, kya karenge retail mein?",
                    "Aapke answers itne unique the ki hamara system confuse ho gaya.",
                    "Vishal Mega Mart experience: Aap as customer achhe ho, employee nahi."
                  ][Math.floor(Math.random() * 4)]}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {resultData.status === 'Selected' && (
                <Button onClick={handleViewCertificate} className="bg-vmm-blue hover:bg-vmm-blue/90">
                  View Offer Letter
                </Button>
              )}
              
              <Button variant="outline" onClick={shareResult}>
                {resultData.status === 'Rejected' 
                  ? "Share Your Shame"
                  : "Share Result"
                }
              </Button>
              
              <Link to="/topper-list">
                <Button variant="ghost">
                  {resultData.status === 'Rejected' 
                    ? "See Who Beat You"
                    : "View Topper List"
                  }
                </Button>
              </Link>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t pt-4 text-xs text-gray-500">
            This result is valid until May 31, 2025
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Check Your Result</CardTitle>
          <CardDescription>
            Enter your roll number to view your Vishal Mega Mart recruitment result
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rollNo">Roll Number</Label>
              <Input 
                id="rollNo" 
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. VMM25-UP-12345" 
              />
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> If you've completed the exam, your roll number 
                should be in the format VMM25-XX-XXXXX.
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button onClick={checkResult} className="w-full">
            Check Result
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">Haven't taken the exam yet?</p>
        <Link to="/exam" className="text-vmm-blue hover:underline text-sm">
          Take the exam now
        </Link>
      </div>
    </div>
  );
};

export default Result;
