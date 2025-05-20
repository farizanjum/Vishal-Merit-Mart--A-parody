
import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Share2, FileX } from 'lucide-react';
import { Disclaimer } from '@/components/Disclaimer';

const Certificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const resultData = location.state?.resultData;
  
  if (!resultData) {
    // Redirect if no data
    setTimeout(() => navigate('/result'), 100);
    return null;
  }

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Use different filename based on status
      const filename = resultData.status === 'Selected' 
        ? `VMM_Offer_Letter_${resultData.name.replace(/\s+/g, '_')}.pdf`
        : `VMM_Rejection_Letter_${resultData.name.replace(/\s+/g, '_')}.pdf`;
        
      pdf.save(filename);
      
      toast.success(resultData.status === 'Selected' 
        ? "Offer letter downloaded successfully!" 
        : "Rejection letter downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error(resultData.status === 'Selected'
        ? "Failed to download offer letter"
        : "Failed to download rejection letter");
    }
  };

  const handleShare = async () => {
    try {
      const shareText = resultData.status === 'Selected'
        ? `I got selected at Vishal Mega Mart! I'll be joining as a retail professional soon. #VMM2025 #NewJob`
        : `I got rejected by Vishal Mega Mart! They don't know what they're missing. #VMM2025 #TheirLoss`;
      
      if (navigator.share) {
        await navigator.share({
          title: resultData.status === 'Selected' ? 'My VMM Offer Letter' : 'My VMM Rejection Letter',
          text: shareText,
        });
        toast.success("Shared successfully!");
      } else {
        navigator.clipboard.writeText(shareText);
        toast.success("Copied to clipboard!");
      }
    } catch (error) {
      toast.error("Couldn't share letter");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-vmm-blue">
          {resultData.status === 'Selected' ? 'Vishal Mega Mart Offer Letter' : 'Vishal Mega Mart Rejection Letter'}
        </h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      <Card className="p-8 border-2 border-gray-300">
        <div ref={certificateRef} className="bg-white p-8">
          <div className="flex justify-between items-start mb-10">
            <div className="flex flex-col items-center">
              <img 
                src="https://i.ibb.co/203Mn8tx/Vishal-Merit-Mart.png" 
                alt="Vishal Mega Mart Logo" 
                className="h-16 mb-2" 
              />
              <p className="text-xs text-gray-500">Vishal Mega Mart Pvt. Ltd.</p>
            </div>
            
            <div className="text-right">
              <p className="font-semibold">Ref: VMM/2025/REC/{resultData.rollNo}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mb-8 relative">
            {/* Certification Stamp - positioned absolutely */}
            <div className="absolute right-0 top-20 -rotate-12 opacity-30">
              <div className="border-2 border-vmm-blue rounded-full p-2 w-32 h-32 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-vmm-blue">OFFICIAL</span>
                <span className="text-sm font-bold text-vmm-magenta">SABZIMART</span>
                <span className="text-xs font-bold text-vmm-blue">CERTIFIED</span>
              </div>
            </div>
            
            {resultData.status === 'Selected' ? (
              // Offer Letter Content
              <>
                <h2 className="text-xl font-bold text-center mb-6 underline">OFFER OF EMPLOYMENT</h2>
                
                <p className="font-semibold mb-1">Dear {resultData.name},</p>
                <p className="mb-4">
                  We are pleased to offer you employment at Vishal Mega Mart in the position 
                  of <span className="font-semibold">Retail Associate</span> at our {resultData.branch} branch.
                </p>
                
                <p className="mb-4">
                  Based on your impressive score of {resultData.score}% in our recruitment exam,
                  we believe you have the skills and qualities needed to excel in our organization.
                </p>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Employment Details:</h3>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Position: Retail Associate</li>
                    <li>Location: {resultData.branch} Branch</li>
                    <li>Starting Salary: ₹12,500 per month</li>
                    <li>Joining Date: {new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString()}</li>
                    <li>Reporting To: Branch Manager</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Special Skills Recognized:</h3>
                  <p>
                    During your assessment, we were particularly impressed with your 
                    {resultData.score > 90 ? " exceptional attention to detail and customer service aptitude." : 
                     resultData.score > 80 ? " strong organizational skills and product knowledge." : 
                     " ability to work efficiently and follow instructions."}
                  </p>
                </div>
                
                <p className="mb-4">
                  Please bring this offer letter, your original ID proof, and educational certificates
                  when reporting to the branch on your joining date. Our HR team will guide you through
                  the onboarding process.
                </p>
                
                <p>
                  We look forward to welcoming you to the Vishal Mega Mart family!
                </p>
              </>
            ) : (
              // Rejection Letter Content
              <>
                <h2 className="text-xl font-bold text-center mb-6 underline">OFFER OF UNEMPLOYMENT</h2>
                
                <p className="font-semibold mb-1">Dear {resultData.name},</p>
                <p className="mb-4">
                  Thank you for your interest in joining Vishal Mega Mart. We regret to inform you that 
                  your application for the position of <span className="font-semibold">Retail Associate</span> has been rejected.
                </p>
                
                <p className="mb-4">
                  With a score of just {resultData.score}% in our recruitment exam,
                  even our automatic floor cleaning machine performed better than you.
                </p>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Rejection Details:</h3>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Position: Permanently Unemployed</li>
                    <li>Location: Back to your home</li>
                    <li>Salary: ₹0 per month</li>
                    <li>Reporting To: Your disappointed parents</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Problems Identified:</h3>
                  <p>
                    During your assessment, we were particularly concerned about your 
                    {resultData.score < 50 ? " complete inability to understand basic retail concepts. Our goats could arrange shelves better." : 
                     resultData.score < 70 ? " mediocre understanding of customer service. Even our mannequins have better people skills." : 
                     " barely adequate skills that unfortunately don't meet our very low standards."}
                  </p>
                </div>
                
                <p className="mb-4">
                  Please feel free to apply again after gaining more experience or brain cells, 
                  preferably both. In the meantime, we suggest exploring alternative career options
                  that don't involve customer interaction, decision making, or responsibility.
                </p>
                
                <p>
                  We wish you the best of luck in your future endeavors far away from Vishal Mega Mart!
                </p>
              </>
            )}
          </div>
          
          <div className="flex justify-between mt-12 pt-4 border-t">
            <div>
              <p className="font-semibold mb-1">{resultData.name}</p>
              <p className="text-sm">Roll No: {resultData.rollNo}</p>
            </div>
            
            <div className="text-right">
              <p className="font-semibold mb-1">Rajesh Agarwal</p>
              <p className="text-sm">HR Director</p>
              <p className="text-sm">Vishal Mega Mart</p>
            </div>
          </div>
          
          <div className="mt-12 pt-4 border-t text-center text-xs text-gray-500">
            <p>This is a system-generated {resultData.status === 'Selected' ? 'offer' : 'rejection'} letter. No signature required.</p>
            <p>For any queries, contact hr@vishalmegamart.in</p>
          </div>
        </div>
      </Card>
      
      <div className="mt-6">
        <Disclaimer />
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Note: This {resultData.status === 'Selected' ? 'offer' : 'rejection'} letter is valid for 7 days from the date of issue.</p>
      </div>
    </div>
  );
};

export default Certificate;
