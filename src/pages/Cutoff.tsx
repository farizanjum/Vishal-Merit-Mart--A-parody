
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Award, HelpCircle, Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Cutoff = () => {
  const cutoffData = [
    {
      category: "Gen",
      cutoff: "70/100",
      bonusCriteria: "Must survive 4-hour shift without snacks"
    },
    {
      category: "OBC",
      cutoff: "68/100",
      bonusCriteria: "Bonus for resisting \"Buy 1 Get 5\" temptations"
    },
    {
      category: "ST/SC",
      cutoff: "65/100",
      bonusCriteria: "Exempt from trolley-realignment round"
    },
    {
      category: "Special Forces",
      cutoff: "99/100",
      bonusCriteria: "Only for those who did training under Baba Ramdev"
    }
  ];

  const faqs = [
    {
      question: "Can I reapply if rejected?",
      answer: "Try again next sale season. Tumhara koi bharosa nahi hai!"
    },
    {
      question: "Can guards get Diwali bonus?",
      answer: "Yes, 5% off on 5 kg rice bag. Itna hi milega, kripya prasann rahe."
    },
    {
      question: "Do I need to know English for the job?",
      answer: "Bilkul nahi! Bas customer ko \"Discount kidhar hai?\" ka jawab de paao, that's enough."
    },
    {
      question: "Is there a dress code for the interview?",
      answer: "Formal attire preferred. Lekin chappal mat pehenna, bahut gussa aata hai interviewer ko."
    },
    {
      question: "Can I transfer to a different branch?",
      answer: "Pehle selection toh ho jaye, transfer ki tension baad mein le lena."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-vmm-blue mb-2">VMM Cutoff Marks 2025</h1>
          <p className="text-gray-600">Minimum qualification marks for various categories</p>
        </div>
        <img 
          src="https://i.ibb.co/203Mn8tx/Vishal-Merit-Mart.png" 
          alt="Vishal Merit Mart Logo" 
          className="h-24 object-contain"
        />
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-vmm-magenta text-white">
          <CardTitle className="flex items-center">
            <Star className="mr-2 h-5 w-5" />
            Official Cutoff Marks
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableCaption>Cutoffs subject to trolley traffic and festive crowd pressure.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Category</TableHead>
                <TableHead className="w-[200px]">Cutoff Marks</TableHead>
                <TableHead>Bonus Criteria</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cutoffData.map((row) => (
                <TableRow key={row.category}>
                  <TableCell className="font-medium">{row.category}</TableCell>
                  <TableCell>{row.cutoff}</TableCell>
                  <TableCell>{row.bonusCriteria}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="bg-vmm-blue text-white">
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Special Mentions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-md bg-gray-50">
              <div className="font-medium text-vmm-blue">Most Alert Guard</div>
              <div className="text-lg">Pappu Sharma</div>
              <div className="text-sm text-gray-500 mt-1">Can spot a shoplifter from 50 meters</div>
            </div>
            <div className="border p-4 rounded-md bg-gray-50">
              <div className="font-medium text-vmm-blue">Best Namaste Pose</div>
              <div className="text-lg">Bablu Yadav</div>
              <div className="text-sm text-gray-500 mt-1">Customers feel blessed after his greeting</div>
            </div>
            <div className="border p-4 rounded-md bg-gray-50">
              <div className="font-medium text-vmm-blue">Fastest Bargain Resolver</div>
              <div className="text-lg">Pinki Gupta</div>
              <div className="text-sm text-gray-500 mt-1">Convinced customer MRP is fixed price in 5 seconds</div>
            </div>
            <div className="border p-4 rounded-md bg-gray-50">
              <div className="font-medium text-vmm-blue">Best Bill Folder</div>
              <div className="text-lg">Ramesh Kaushik</div>
              <div className="text-sm text-gray-500 mt-1">Makes origami art with every receipt</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-vmm-magenta text-white">
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      <div className="mt-8 p-4 border border-yellow-400 bg-yellow-100 text-yellow-800 rounded-md text-sm">
        <p className="font-bold">Promotional Banner 🎉</p>
        <div className="flex justify-center my-4">
          <div className="relative bg-gradient-to-r from-vmm-blue to-vmm-magenta p-4 rounded-lg text-white text-center w-full">
            <h3 className="text-xl font-bold">Mega Summer Recruitment Drive!</h3>
            <p className="mt-2">Apply now and get a free VMM tote bag on selection</p>
            <p className="text-xs mt-2 animate-pulse">*Tote bag subject to availability. Conditions apply.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cutoff;
