import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Share2, Download, FileX } from 'lucide-react';

interface ResultData {
  name: string;
  rollNo: string;
  score: number;
  branch: string;
  timestamp: string;
  status: 'Selected' | 'Rejected' | 'Waitlisted';
  isTopper?: boolean;
  answers?: Record<number, string>;
}

const Result = () => {
  const [searchParams] = useSearchParams();
  const rollNoFromUrl = searchParams.get('roll');
  const navigate = useNavigate();
  
  const [rollNo, setRollNo] = useState(rollNoFromUrl || '');
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

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
          
          // If this is a topper, update the topper list in localStorage
          if (result.isTopper) {
            updateTopperList(result);
          }
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
      
      // 10% chance to be a topper if selected
      const isTopper = status === 'Selected' && Math.random() < 0.1;
      
      // Generate random answers
      const randomAnswers: Record<number, string> = {};
      for (let i = 1; i <= 10; i++) {
        randomAnswers[i] = ['a', 'b', 'c', 'd'][Math.floor(Math.random() * 4)];
      }
      
      // Fake data generation
      const generatedData: ResultData = {
        name: `Candidate ${rollNo.slice(-5)}`,
        rollNo,
        score: randomScore,
        branch: randomBranch,
        timestamp: new Date().toISOString(),
        status,
        isTopper,
        answers: randomAnswers
      };
      
      setResultData(generatedData);
      setLoading(false);
      
      // Update topper list if this is a topper
      if (isTopper) {
        updateTopperList(generatedData);
      }
    }, 1500);
  };

  const updateTopperList = (result: ResultData) => {
    if (!result.isTopper) return;
    
    // Get current topper list or initialize empty array
    const currentToppers = JSON.parse(localStorage.getItem('vmmToppers') || '[]');
    
    // Check if this person is already in the list
    const existingIndex = currentToppers.findIndex((t: any) => t.rollNo === result.rollNo);
    
    if (existingIndex >= 0) {
      // Update existing topper
      currentToppers[existingIndex] = {
        ...currentToppers[existingIndex],
        score: result.score,
        branch: result.branch,
        status: result.status
      };
    } else {
      // Add new topper with some extra fields
      const awards = [
        "Cleanest Shelf Arranger",
        "5/5 in Angry Customer Management",
        "Fastest Inventory Counter",
        "Bhindi Stacking Champion",
        "Most Precise Price Tagger",
        "Shopping Bag Folding Master",
        "Display Arrangement Wizard",
        "Receipt Printing Speedster",
        "Best Product Knowledge",
        "Most Efficient Barcoder"
      ];
      
      const positions = [
        "Floor Manager",
        "Assistant Floor Manager",
        "Cashier Specialist",
        "Inventory Manager",
        "Floor Executive",
        "Customer Service Lead",
        "Visual Merchandiser",
        "Senior Cashier",
        "Department Head",
        "Tech Support Executive"
      ];
      
      const newTopper = {
        name: result.name,
        city: result.branch,
        rollNo: result.rollNo,
        score: result.score,
        award: awards[Math.floor(Math.random() * awards.length)],
        position: positions[Math.floor(Math.random() * positions.length)]
      };
      
      // Add to the list and ensure only top 10 by score are kept
      currentToppers.push(newTopper);
    }
    
    // Sort by score and keep top 10
    const topTen = currentToppers
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 10);
    
    // Save back to localStorage
    localStorage.setItem('vmmToppers', JSON.stringify(topTen));
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

  const getBrutalFeedback = (questionId: number, answer?: string) => {
    if (!answer) return "No answer provided. Silent treatment? Vishal Merit Mart doesn't work like that.";
    
    const feedbackOptions = [
      // Question 1: Retail floor manager
      {
        a: "Managing inventory? Tumse apna room saaf nahi hota, store kya manage karoge? Phir se sochneka please.",
        b: "Congrats, somehow you got this right. Probably a lucky guess. Ek andha ghodi bhi kabhi kabhi chaand ko dekh leta hai.",
        c: "Cash registers hi manage kar lo pehle, floor manager banne ka sapna baad me dekh lena. Abhi ke liye ghar jaao.",
        d: "Display building? Tumse WhatsApp status sahi se nahi banta, store displays kya banayega? Merit Mart mein naukri bhool jao."
      },
      // Question 2: Customer handling
      {
        a: "Kisi aur ko bhej doge? Responsibility se bhaagna Olympic sport hai tumhare liye. Gold medal pakka hai.",
        b: "Ignore karke solution? Wah! Tumhara future retail mein utna hi bright hai jitna load shedding ke time bulb. Zero watts.",
        c: "Listen and find solution? Accidentally sahi jawab de diya. Girlfriend ke messages toh padhte nahi, customer ki complaint kya sunoge?",
        d: "Sidha discount? Paisa kya tumhare baap ka hai? Cost-benefit analysis ka matlab bhi pata hai? Nahi na... expected tha."
      },
      // Question 3: Bhindi stacking
      {
        a: "Freshest at bottom? Tumse ghar mein bartan dhone ko kaha jaye toh pyramid bana doge kya? Logic kidhar hai?",
        b: "Random pile? Tumhara dimaag bhi aise hi arranged hai kya? Koi system nahi, bas chaos? VMM mein jagah nahi hai.",
        c: "Neat rows? Lucky guess! Par real Vishal Merit Mart floor pe 5 minute khade raho, paseene se bhindi phisal jayegi. Tab kya karoge?",
        d: "Size arrangement se customer ko kya fayda? Instagram pe vegetables ki reels bana rahe ho kya? Influencer bano, shopkeeper nahi."
      },
      // Question 4: Expired products
      {
        a: "Kisi aur ke liye chod do? Responsibility se bhaagna tumhara favorite sport hai kya? Olympic mein medal milega isme toh!",
        b: "Correct! Par real life mein tum expired products ko discount section mein daal dete, hai na? Hume sab malum hai.",
        c: "Dusre section mein? Yani problem solve nahi ki, bas shift kar di? Minister bano politics mein! VMM mein nahi.",
        d: "Discount? Expired cheez bechoge? CBI is watching your career choices! Food safety inspector ka number ready rakhna."
      },
      // Question 5: Broken pickle
      {
        a: "Customer se payment? Wah! Customer service ka 'S' bhi nahi pata aur retail mein aana hai. Waah beta waah!",
        b: "Sahi jawab! Par asli zindagi mein tum phone nikal ke video banate, viral hone ki umeed mein. #PickleSlipChallenge trending!",
        c: "Manager ko call? Har choti problem manager solve kare, toh tum kya karoge? Selfie loge? Initiative kaha hai tumhara?",
        d: "Break ke baad? Haan, customer pickle mein slip karke gir jaye tab tak tum chai piyo. Great! Lawsuit coming soon..."
      },
      // Question 6: Parle-G in detergent section
      {
        a: "Expert sirf detergent ka? Tumhe Parle-G aur detergent mein antar bhi pata hai? Doubt hai humko seriously.",
        b: "Cross-selling attempt? Sales mein successful hone ke sapne dekh rahe ho, reality mein customer gusse mein nikal jayega. Aur tum bhi job se.",
        c: "Guide politely? Sahi hai, par tumse politeness expect karna desert mein baarish ka intezaar karna hai. Kabhi nahi hoga.",
        d: "Mazaak soojha? Customer service mein tumhara brilliant future stand-up comedy mein hai. VMM chhod do, Netflix special karo."
      },
      // Question 7: Missing chips
      {
        a: "Previous shift ko blame? Responsibility lene se jitna tum bhagte ho, Olympic mein gold medal milta. Usain Bolt competition na de tumhe.",
        b: "Chup rehna? Honesty tumhari dictionary mein dhundhne se bhi nahi milegi. Aur dictionary bhi tumhe dhundhna nahi aayega.",
        c: "Report to supervisor? Chamatkar! Ek sahi jawab. Probably misclick hai. Ya fir mummy ne answer bataya?",
        d: "Khud se chips kharidna? Itna dedication dikhta toh tumhare parents proud hote. Par hume pata hai chips tum khud kha gaye."
      },
      // Question 8: Best discount offer
      {
        a: "BOGO? Sahi hai, par tumse yeh offer follow karne ko kaho toh 'Buy 1, Keep 1 Free for yourself' implement karoge. Chori chhipe.",
        b: "50% off? Calculation nahi aati toh percentage discount avoid karo, customer ko ullu banane ki ninja technique nahi hai yeh.",
        c: "Cashback? Isse accha customer ko seedha paisa de do. At least transparent toh hoga. Par transparency aur tum? Oil aur paani jaisa relation.",
        d: "Free samosa? Food safety inspector bhi customer ban jaega, innovation ka award milega tumhe! Health department se fine bhi."
      },
      // Question 9: Sharma ji taking samples
      {
        a: "Khud bhi le lo? Dono milke company ka diwaala nikal doge, excellent teamwork! Partnership mein Chor Bazaar khol lena.",
        b: "Selfie lena? Social media pe viral hone ke chakkar mein job se viral ho jaoge - bahar! #Unemployed trending!",
        c: "Politely inform? Accha hai, par tumhare muh se 'politely' shabd realistic nahi lagta. Tum politely bol sakte ho? Impossible.",
        d: "Store mic pe announce? Privacy violation ka case karke Sharma ji tumhe job se nikalwa denge. Aur social media pe bhi viral karenge."
      },
      // Question 10: Measure of successful cashier
      {
        a: "Scanning speed? Robot bana hai kya? Customer interaction ka kya? Koi machine laga lete tumhare jagah, at least error toh kam hota.",
        b: "Carry bag line? Haan, zindagi ka success isi mein hai - ₹5 ki carry bag bechne mein. Nobel prize milega tumhein zarur.",
        c: "Balance efficiency & satisfaction? Theory aati hai, practical mein customer ke saamne stammer karte ho. Aur line lagi toh panic attack.",
        d: "Membership card? Sales target ke chakkar mein customer ko itna pareshan karoge ki kabhi wapas na aaye. Genius strategy, store band karwa dena perfect!"
      }
    ];

    return feedbackOptions[questionId - 1][answer as keyof typeof feedbackOptions[0]] || "Is this even an answer? Merit Mart ke liye nahi, circus ke liye apply karo.";
  };

  const getRemarks = () => {
    if (!resultData) return '';
    
    switch (resultData.status) {
      case 'Selected':
        return [
          "Congratulations! Somehow you fooled our system. Welcome to Vishal Merit Mart!",
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
          "Retail mein aapka future utna hi bright hai jitna powercut ke time bulb. Zero brightness, zero hope.",
          "Sorry, but arranging onions in alphabetical order was NOT the right answer. Dictionary padhni thi onion ko organize karne se pehle.",
          "The committee unanimously agreed: better luck becoming a customer! Kam se kam customer service humara experience kar paoge.",
          "Physics walon ko pata hai F=MA. Aapko pata hai F=FAIL! VMM mein aapki jagah sirf as customer hai."
        ][Math.floor(Math.random() * 4)];
      
      default:
        return "Thank you for your interest in Vishal Merit Mart.";
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
      const shareText = `I ${resultData.status === 'Selected' ? 'got selected' : 'applied'} at Vishal Merit Mart! Score: ${resultData.score}% | Roll No: ${resultData.rollNo} | Check your result at http://vmmcareers.fake`;
      
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

  const shareOnSocialMedia = (platform: 'whatsapp' | 'twitter' | 'linkedin') => {
    if (!resultData) return;
    
    const shareText = encodeURIComponent(
      `I ${resultData.status === 'Selected' ? 'got selected' : 'applied'} at Vishal Merit Mart! Score: ${resultData.score}% | Roll No: ${resultData.rollNo} | Check your result at http://vmmcareers.fake`
    );
    
    let url = '';
    
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${shareText}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${shareText}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=http://vmmcareers.fake&summary=${shareText}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank');
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
              Vishal Merit Mart Recruitment Drive 2025
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

            {/* Answer Feedback Section */}
            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowAnswerFeedback(!showAnswerFeedback)} 
                className="w-full"
              >
                {showAnswerFeedback ? "Hide Brutal Feedback" : "Show Answer Feedback (Warning: Extra Brutal!)"}
              </Button>
              
              {showAnswerFeedback && resultData.answers && (
                <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-md">
                  <p className="font-medium text-red-800">Question-by-Question Evaluation:</p>
                  {Object.keys(resultData.answers).map(qId => {
                    const questionId = parseInt(qId);
                    return (
                      <div key={qId} className="p-2 border-b border-gray-200">
                        <p className="text-sm font-medium">Question {qId}:</p>
                        <p className="text-sm text-gray-700 mt-1">
                          {getBrutalFeedback(questionId, resultData.answers?.[questionId])}
                        </p>
                      </div>
                    );
                  })}
                  <div className="p-3 mt-2 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm font-medium text-red-800">Overall Assessment:</p>
                    <p className="mt-1 text-red-700">
                      {resultData.score < 50 ? 
                        "Aapke answers dekhkar hamare AI ko bhi fever aa gaya. Isse pehle ki hum bhi tumhari tarah fail ho jayein, ja rahe hain reboot hone. Hamare expectations kum the, aap usme bhi neeche chale gaye. Waah!" : 
                        resultData.score < 75 ? 
                        "Aapne itne galat jawab diye ki humara AI ab depression mein hai. Congratulations for this outstanding achievement! AI therapist dhoond raha hai ab." : 
                        "Even a broken clock is right twice a day. Tumne bhi kuch answers sahi de diye, but don't let it get to your head. Kismat acchi thi, dimag nahi."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {resultData.status === 'Rejected' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm font-medium text-red-800">Special Feedback from HR:</p>
                <p className="mt-1 text-red-700">
                  {[
                    "Your knowledge of retail is as empty as our shelves after a sale. Matlab ki kuch nahi hai.",
                    "Sabziyan arrange karna bhi nahi aata, kya karenge retail mein? Bhindi ko sahi se pakad bhi nahi paoge.",
                    "Aapke answers itne unique the ki hamara system confuse ho gaya. Wrong answers ko naya level de diya aapne.",
                    "Vishal Merit Mart experience: Aap as customer achhe ho, employee nahi. Please shopping karne aana, kaam karne nahi.",
                    "Aapka selection aise hi ho jayega jaise dhaniya free milta hai. Matlab kabhi nahi.",
                    "Aap retail mein utne hi successful honge jitna watermelon ko aloo kehne par customer maanta hai.",
                    "Bhindi arrange karne ka talent aapme bilkul nahi hai. Yeh koi YouTube challenge nahi hai, real life hai.",
                    "Aap sabzi waale se discount maangne mein expert honge, lekin retail mein nahi. Bargaining aur retail understanding alag cheezein hain."
                  ][Math.floor(Math.random() * 8)]}
                </p>
              </div>
            )}

            {resultData.isTopper && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm font-medium text-green-800">Special Recognition:</p>
                <p className="mt-1 text-green-700">
                  Congratulations! You've made it to our Top Performers List. 
                  Check out the Topper List to see your position!
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {resultData.status === 'Selected' && (
                <Button onClick={handleViewCertificate} className="bg-vmm-blue hover:bg-vmm-blue/90">
                  View Offer Letter
                </Button>
              )}
              
              {resultData.status === 'Rejected' && (
                <Button onClick={handleViewCertificate} className="bg-red-600 hover:bg-red-700 text-white">
                  <FileX className="w-4 h-4 mr-2" />
                  Rejection Letter (Regret)
                </Button>
              )}
              
              <Button variant="outline" onClick={shareResult}>
                <Share2 className="w-4 h-4 mr-2" />
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
              
              <Link to="/meme-generator">
                <Button variant="outline" className="border-vmm-magenta text-vmm-magenta hover:bg-vmm-magenta/10">
                  Create Meme
                </Button>
              </Link>
            </div>

            {/* Social Media Sharing */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-center text-sm text-gray-500 mb-3">Share on social media:</p>
              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => shareOnSocialMedia('whatsapp')}
                  className="bg-green-500 hover:bg-green-600 text-white border-none"
                >
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => shareOnSocialMedia('twitter')}
                  className="bg-blue-400 hover:bg-blue-500 text-white border-none"
                >
                  X (Twitter)
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => shareOnSocialMedia('linkedin')}
                  className="bg-blue-700 hover:bg-blue-800 text-white border-none"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
            
            {/* Merit Mart Certification Stamp */}
            <div className="mt-8 flex justify-center">
              <div className="border-2 border-vmm-blue rounded-full p-4 w-32 h-32 flex flex-col items-center justify-center text-center transform -rotate-12 opacity-40">
                <span className="text-xs font-bold text-vmm-blue">OFFICIAL</span>
                <span className="text-sm font-bold text-vmm-magenta">SABZIMART</span>
                <span className="text-xs font-bold text-vmm-blue">CERTIFIED</span>
              </div>
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
            Enter your roll number to view your Vishal Merit Mart recruitment result
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
