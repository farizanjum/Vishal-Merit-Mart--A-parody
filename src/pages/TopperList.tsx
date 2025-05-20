
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Share2 } from 'lucide-react';

interface Topper {
  name: string;
  city: string;
  rollNo: string;
  score: number;
  award: string;
  position: string;
}

const initialToppers: Topper[] = [
  {
    name: 'Ananya Sharma',
    city: 'Lucknow',
    rollNo: 'VMM25-UP-10123',
    score: 98.69,
    award: 'Cleanest Shelf Arranger',
    position: 'Floor Manager'
  },
  {
    name: 'Rajesh Kumar',
    city: 'Patna',
    rollNo: 'VMM25-BH-20456',
    score: 97.35,
    award: '5/5 in Angry Customer Management',
    position: 'Assistant Floor Manager'
  },
  {
    name: 'Priya Mehta',
    city: 'Azamgarh',
    rollNo: 'VMM25-UP-30789',
    score: 96.82,
    award: 'Fastest Inventory Counter',
    position: 'Cashier Specialist'
  },
  {
    name: 'Vikram Singh',
    city: 'Ghaziabad',
    rollNo: 'VMM25-UP-40987',
    score: 95.74,
    award: 'Bhindi Stacking Champion',
    position: 'Inventory Manager'
  },
  {
    name: 'Meera Desai',
    city: 'Gorakhpur',
    rollNo: 'VMM25-UP-51234',
    score: 94.91,
    award: 'Most Precise Price Tagger',
    position: 'Floor Executive'
  },
  {
    name: 'Arjun Reddy',
    city: 'Kanpur',
    rollNo: 'VMM25-UP-65432',
    score: 94.23,
    award: 'Shopping Bag Folding Master',
    position: 'Customer Service Lead'
  },
  {
    name: 'Neha Gupta',
    city: 'Varanasi',
    rollNo: 'VMM25-UP-78901',
    score: 93.67,
    award: 'Display Arrangement Wizard',
    position: 'Visual Merchandiser'
  },
  {
    name: 'Sanjay Patel',
    city: 'Meerut',
    rollNo: 'VMM25-UP-89012',
    score: 93.15,
    award: 'Receipt Printing Speedster',
    position: 'Senior Cashier'
  },
  {
    name: 'Kavita Joshi',
    city: 'Allahabad',
    rollNo: 'VMM25-UP-90123',
    score: 92.88,
    award: 'Best Product Knowledge',
    position: 'Department Head'
  },
  {
    name: 'Rahul Verma',
    city: 'Agra',
    rollNo: 'VMM25-UP-02345',
    score: 92.46,
    award: 'Most Efficient Barcoder',
    position: 'Tech Support Executive'
  }
];

const TopperList = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  
  useEffect(() => {
    // Load toppers from localStorage if available
    const storedToppers = localStorage.getItem('vmmToppers');
    
    if (storedToppers) {
      try {
        const parsedToppers = JSON.parse(storedToppers);
        
        if (Array.isArray(parsedToppers) && parsedToppers.length > 0) {
          setToppers(parsedToppers);
          return;
        }
      } catch (e) {
        console.error('Error parsing toppers from localStorage:', e);
      }
    }
    
    // Fall back to initial data if nothing in localStorage
    setToppers(initialToppers);
    
    // Store initial toppers if none exist
    if (!storedToppers) {
      localStorage.setItem('vmmToppers', JSON.stringify(initialToppers));
    }
  }, []);

  const shareTopperList = async () => {
    try {
      const shareText = `Check out the top performers at Vishal Mega Mart Recruitment 2025! #1 is ${toppers[0]?.name} with score ${toppers[0]?.score.toFixed(2)}%. Are you on the list? Check at http://www.vishalmeritmart.com/`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'VMM Top Performers 2025',
          text: shareText,
        });
        toast.success("Shared successfully!");
      } else {
        navigator.clipboard.writeText(shareText);
        toast.success("Topper list info copied to clipboard!");
      }
    } catch (error) {
      toast.error("Couldn't share topper list");
      console.error(error);
    }
  };
  
  const shareOnSocialMedia = (platform: 'whatsapp' | 'twitter' | 'linkedin') => {
    const shareText = encodeURIComponent(
      `Check out the top performers at Vishal Mega Mart Recruitment 2025! #1 is ${toppers[0]?.name} with score ${toppers[0]?.score.toFixed(2)}%. Are you on the list? Check at http://vmmcareers.fake/topper-list`
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
        url = `https://www.linkedin.com/sharing/share-offsite/?url=http://vmmcareers.fake/topper-list&summary=${shareText}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-vmm-blue mb-2">Vishal Mega Mart Recruitment 2025</h1>
        <h2 className="text-xl text-vmm-red font-semibold">Top Performers List</h2>
        <p className="mt-2 text-gray-600">
          Congratulations to our outstanding candidates who scored the highest marks in the recruitment exam!
        </p>

        <div className="mt-4 flex justify-center gap-3">
          <Button variant="outline" onClick={shareTopperList} className="flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Share List
          </Button>
        </div>
      </div>

      <Card className="mb-8 border-2 border-vmm-blue">
        <CardHeader className="bg-gradient-to-r from-vmm-blue to-vmm-lightblue text-white">
          <CardTitle className="text-center">🏆 Top 10 Scorers 🏆</CardTitle>
          <CardDescription className="text-white/90 text-center">
            These candidates have demonstrated exceptional retail aptitude
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-3 font-medium text-gray-600">Rank</th>
                  <th className="p-3 font-medium text-gray-600">Name</th>
                  <th className="p-3 font-medium text-gray-600">City</th>
                  <th className="p-3 font-medium text-gray-600">Roll No.</th>
                  <th className="p-3 font-medium text-gray-600">Score</th>
                  <th className="p-3 font-medium text-gray-600">Position</th>
                </tr>
              </thead>
              <tbody>
                {toppers.map((topper, index) => (
                  <tr key={topper.rollNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 font-semibold">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                    </td>
                    <td className="p-3">{topper.name}</td>
                    <td className="p-3">{topper.city}</td>
                    <td className="p-3">{topper.rollNo}</td>
                    <td className="p-3 font-semibold text-vmm-blue">{topper.score.toFixed(2)}%</td>
                    <td className="p-3">{topper.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Special Recognition</CardTitle>
            <CardDescription>
              Candidates who excelled in specific areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {toppers.slice(0, 5).map((topper) => (
                <li key={topper.rollNo} className="border-b pb-2">
                  <div className="font-medium">{topper.name}</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{topper.city}</span>
                    <span className="text-vmm-red font-medium">"{topper.award}"</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recruitment Statistics</CardTitle>
            <CardDescription>
              Summary of the 2025 recruitment drive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span>Total Applications</span>
                <span className="font-semibold">14,286</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Selected Candidates</span>
                <span className="font-semibold">968</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Waitlisted</span>
                <span className="font-semibold">2,432</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Average Score</span>
                <span className="font-semibold">76.3%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Top Branch</span>
                <span className="font-semibold">Lucknow (243 selections)</span>
              </div>
              <div className="mt-4 bg-vmm-gray p-3 rounded-md">
                <p className="text-sm text-gray-600 italic">
                  "The quality of candidates this year was exceptional. We are proud to welcome these 
                  retail superstars to the Vishal Mega Mart family!"
                </p>
                <p className="text-sm text-right font-medium mt-1">- VMM Recruitment Team</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="mb-4">Share this list on social media:</p>
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

      <div className="mt-8 text-center space-y-4">
        <p>Want to see how you performed compared to our top scorers?</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/result">
            <Button className="bg-vmm-blue hover:bg-vmm-blue/90">Check Your Result</Button>
          </Link>
          <Link to="/exam">
            <Button variant="outline">Take the Exam</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopperList;
