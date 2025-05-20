
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-[80vh]">
      <div className="py-10 px-4 md:px-6 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-vmm-blue mb-4">
              Vishal Mega Mart Recruitment 2025
            </h1>
            <div className="bg-vmm-red text-white p-2 inline-block rounded">
              Apply now! Last date: 15 June 2025
            </div>
            <p className="mt-6 text-lg text-gray-700">
              Join one of India's fastest-growing retail chains with 14,000+ openings across departments.
              Begin your retail career journey with VMM and grow professionally in a dynamic environment.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/mock-test">
                <Button size="lg" className="bg-vmm-blue hover:bg-vmm-blue/90">Take Mock Test</Button>
              </Link>
              <Link to="/exam">
                <Button size="lg" variant="outline" className="border-vmm-red text-vmm-red hover:bg-vmm-red hover:text-white">
                  Start Real Exam
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="bg-vmm-gray">
                <CardTitle className="text-vmm-blue">Registration Open</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700">All positions accepting applications now.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-vmm-gray">
                <CardTitle className="text-vmm-blue">Multiple Roles</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700">From Floor Management to Shelf Specialists.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-vmm-gray">
                <CardTitle className="text-vmm-blue">Immediate Joining</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700">Selected candidates can join within 7 days.</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4 text-vmm-blue">Already gave the exam?</h2>
            <div className="flex gap-4">
              <Link to="/result">
                <Button variant="secondary">Check Your Result</Button>
              </Link>
              <Link to="/topper-list">
                <Button variant="outline">View Topper List</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <Card className="border-2 border-vmm-red">
            <CardHeader className="bg-vmm-red text-white">
              <CardTitle>Urgent Recruitment Notice</CardTitle>
              <CardDescription className="text-white/80">Last 2,000 positions remaining!</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Floor Managers - ₹13,999/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Shelf Specialists - ₹11,999/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Cashiers - ₹12,499/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Security Officers - ₹12,999/month</span>
                </div>

                <div className="pt-4 pb-2">
                  <div className="text-vmm-red font-semibold animate-blink">
                    🔥 HURRY! Applications closing soon 🔥
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/exam" className="w-full">
                <Button className="w-full bg-vmm-red hover:bg-vmm-red/90">Apply Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-bold text-vmm-blue">Recent Selections</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Ananya S. (Lucknow)</span>
                <span className="font-semibold">Floor Manager</span>
              </li>
              <li className="flex justify-between">
                <span>Rahul D. (Patna)</span>
                <span className="font-semibold">Shelf Specialist</span>
              </li>
              <li className="flex justify-between">
                <span>Priya M. (Azamgarh)</span>
                <span className="font-semibold">Cashier</span>
              </li>
              <li className="text-center mt-2">
                <Link to="/topper-list" className="text-vmm-blue hover:underline text-xs">
                  View All Selections →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
