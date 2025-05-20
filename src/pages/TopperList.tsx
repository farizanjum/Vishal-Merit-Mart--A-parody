
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Topper {
  name: string;
  city: string;
  rollNo: string;
  score: number;
  award: string;
  position: string;
}

// Fake topper list data
const toppers: Topper[] = [
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
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-vmm-blue mb-2">Vishal Mega Mart Recruitment 2025</h1>
        <h2 className="text-xl text-vmm-red font-semibold">Top Performers List</h2>
        <p className="mt-2 text-gray-600">
          Congratulations to our outstanding candidates who scored the highest marks in the recruitment exam!
        </p>
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
                    <td className="p-3 font-semibold text-vmm-blue">{topper.score}%</td>
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
