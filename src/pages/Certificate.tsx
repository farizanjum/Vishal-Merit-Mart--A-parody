
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResultData {
  name: string;
  rollNo: string;
  score: number;
  branch: string;
  timestamp: string;
  status: 'Selected' | 'Rejected' | 'Waitlisted';
}

const Certificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);

  // Generate random dates for offer letter
  const joiningDate = new Date();
  joiningDate.setDate(joiningDate.getDate() + Math.floor(Math.random() * 30) + 15); // 15-45 days from now
  
  const todayDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  useEffect(() => {
    // Check if we have result data from the location state
    if (location.state?.resultData) {
      setResultData(location.state.resultData);
    } else {
      // Try to get from localStorage as fallback
      const storedResult = localStorage.getItem('vmmExamResult');
      if (storedResult) {
        setResultData(JSON.parse(storedResult));
      } else {
        // Redirect if no data
        toast.error("No result data found");
        navigate('/result');
      }
    }
  }, [location.state, navigate]);

  const downloadAsPDF = async () => {
    if (!certificateRef.current) return;
    
    setLoading(true);
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`VMM-${resultData?.status}-${resultData?.rollNo}.pdf`);
      
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to download PDF");
    } finally {
      setLoading(false);
    }
  };

  if (!resultData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vmm-blue mb-4"></div>
          <p>Loading certificate data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-vmm-blue">
          {resultData.status === 'Selected' ? 'Offer Letter' : 'Application Feedback'}
        </h1>
        <Button 
          onClick={downloadAsPDF} 
          disabled={loading}
          className="bg-vmm-blue hover:bg-vmm-blue/90"
        >
          {loading ? (
            <>
              <span className="animate-spin mr-2">⌛</span> 
              Processing...
            </>
          ) : (
            'Download PDF'
          )}
        </Button>
      </div>

      <div ref={certificateRef} className="bg-white rounded-md border shadow-lg p-8 min-h-[29.7cm]">
        {resultData.status === 'Selected' ? (
          // Offer Letter
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-4xl font-bold text-vmm-red">
                  VM<span className="text-vmm-blue">M</span> <span className="text-2xl">Careers</span>
                </div>
                <div className="text-gray-600 mt-1">Vishal Mega Mart Recruitment 2025</div>
                <div className="text-gray-500 mt-1">(Parody - For Entertainment Only)</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">Ref: VMM/REC/2025/{resultData.rollNo.slice(-5)}</div>
                <div>Date: {todayDate}</div>
              </div>
            </div>

            <div className="border-t border-b py-6 border-gray-200">
              <h2 className="text-2xl font-bold text-center mb-6">OFFER OF EMPLOYMENT</h2>
              
              <p className="mb-4">Dear <span className="font-semibold">{resultData.name}</span>,</p>
              
              <p className="mb-4">
                We are pleased to offer you the position of <span className="font-semibold">
                {resultData.score >= 90 
                  ? 'Floor Manager' 
                  : (resultData.score >= 80 
                    ? 'Assistant Floor Manager' 
                    : 'Floor Executive')}
                </span> at Vishal Mega Mart, {resultData.branch} branch. This offer follows your successful 
                completion of our recruitment examination process.
              </p>
              
              <div className="my-6 space-y-2">
                <div className="grid grid-cols-2 border-b pb-2">
                  <div className="font-medium">Position</div>
                  <div>
                    {resultData.score >= 90 
                      ? 'Floor Manager' 
                      : (resultData.score >= 80 
                        ? 'Assistant Floor Manager' 
                        : 'Floor Executive')}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 border-b pb-2">
                  <div className="font-medium">Department</div>
                  <div>
                    {['Grocery', 'Apparel', 'Home & Kitchen', 'Electronics'][Math.floor(Math.random() * 4)]}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 border-b pb-2">
                  <div className="font-medium">Location</div>
                  <div>{resultData.branch} Branch</div>
                </div>
                
                <div className="grid grid-cols-2 border-b pb-2">
                  <div className="font-medium">Reporting Date</div>
                  <div>
                    {joiningDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 border-b pb-2">
                  <div className="font-medium">Monthly Compensation</div>
                  <div>₹ {
                    resultData.score >= 90 
                      ? '13,999' 
                      : (resultData.score >= 80 
                        ? '12,499' 
                        : '11,999')
                  }/- per month</div>
                </div>
                
                <div className="grid grid-cols-2 border-b pb-2">
                  <div className="font-medium">Working Hours</div>
                  <div>9:30 AM to 8:30 PM (with breaks)</div>
                </div>
              </div>
              
              <p className="mb-4">
                Please report to the HR department at our {resultData.branch} branch on your joining date with the 
                following documents:
              </p>
              
              <ul className="list-disc list-inside mb-6 space-y-1">
                <li>Original educational certificates</li>
                <li>ID proof and address proof</li>
                <li>4 passport-sized photographs</li>
                <li>Previous work experience certificates (if any)</li>
              </ul>
              
              <p className="mb-4">
                We're excited to have you join our team and look forward to your contribution towards 
                making Vishal Mega Mart the preferred shopping destination for our customers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="font-semibold">For Vishal Mega Mart</p>
                <div className="mt-10 italic">
                  <p className="font-semibold">Sunita Sharma</p>
                  <p className="text-sm">HR Manager, North Region</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="border-2 border-dashed border-red-300 rounded-lg p-4 inline-block rotate-[-5deg]">
                  <p className="font-semibold text-center text-red-600">BIRYANI CERTIFIED</p>
                  <p className="text-xs text-center text-red-400 mt-1">Official VMM Seal</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-4 border-t text-xs text-gray-500">
              <p className="text-center">
                ⚠️ DISCLAIMER: This is a parody document created for entertainment purposes only. 
                Not affiliated with any real company. No actual job offer is being extended.
              </p>
            </div>
          </div>
        ) : (
          // Rejection/Waitlist Letter
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-4xl font-bold text-vmm-red">
                  VM<span className="text-vmm-blue">M</span> <span className="text-2xl">Careers</span>
                </div>
                <div className="text-gray-600 mt-1">Vishal Mega Mart Recruitment 2025</div>
                <div className="text-gray-500 mt-1">(Parody - For Entertainment Only)</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">Ref: VMM/REC/2025/{resultData.rollNo.slice(-5)}</div>
                <div>Date: {todayDate}</div>
              </div>
            </div>

            <div className="border-t border-b py-6 border-gray-200">
              <h2 className="text-2xl font-bold text-center mb-6">
                {resultData.status === 'Waitlisted' ? 'WAITLISTED APPLICATION' : 'APPLICATION FEEDBACK'}
              </h2>
              
              <p className="mb-4">Dear <span className="font-semibold">{resultData.name}</span>,</p>
              
              {resultData.status === 'Waitlisted' ? (
                <div className="space-y-4">
                  <p>
                    Thank you for your interest in joining Vishal Mega Mart and for participating in our 
                    recruitment examination process. We appreciate the time and effort you invested in your application.
                  </p>
                  
                  <p>
                    After careful evaluation, we would like to inform you that your application has been 
                    <span className="font-semibold"> waitlisted </span> 
                    for the current recruitment drive. While your profile shows potential, we have limited positions 
                    available at this time.
                  </p>
                  
                  <p>
                    Your application will remain in our database for a period of 90 days, and we may contact you 
                    if suitable positions become available during this time.
                  </p>
                  
                  <div className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h3 className="font-semibold mb-2">Application Summary:</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div>Roll Number:</div>
                      <div>{resultData.rollNo}</div>
                      
                      <div>Branch Applied:</div>
                      <div>{resultData.branch}</div>
                      
                      <div>Exam Score:</div>
                      <div>{resultData.score}%</div>
                      
                      <div>Status:</div>
                      <div>Waitlisted</div>
                    </div>
                  </div>
                  
                  <p>
                    We encourage you to re-apply in our next recruitment drive if you don't hear from us within 90 days.
                    In the meantime, we suggest focusing on the following areas to improve your chances in future applications:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-1">
                    <li>Improve your knowledge of retail inventory management</li>
                    <li>Enhance customer service communication skills</li>
                    <li>Work on time management strategies for busy retail environments</li>
                    <li>Develop expertise in visual merchandising techniques</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>
                    Thank you for your interest in joining Vishal Mega Mart and for participating in our 
                    recruitment examination process. We appreciate the time and effort you invested in your application.
                  </p>
                  
                  <p>
                    After careful consideration, we regret to inform you that we will not be moving forward with your 
                    application at this time. This decision was based on our current hiring needs and the overall 
                    candidate assessment results.
                  </p>
                  
                  <div className="my-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <h3 className="font-semibold mb-2">Application Summary:</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div>Roll Number:</div>
                      <div>{resultData.rollNo}</div>
                      
                      <div>Branch Applied:</div>
                      <div>{resultData.branch}</div>
                      
                      <div>Exam Score:</div>
                      <div>{resultData.score}%</div>
                      
                      <div>Status:</div>
                      <div>Not Selected</div>
                    </div>
                  </div>
                  
                  <p>
                    Based on your examination performance, we would like to offer the following feedback to help 
                    you prepare better for future opportunities:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-1">
                    <li>Your bhindi stacking speed was below our company standards</li>
                    <li>Knowledge of inventory management needs improvement</li>
                    <li>Customer service approach doesn't align with our values</li>
                    <li>Skills in handling multiple tasks simultaneously require development</li>
                  </ul>
                  
                  <p>
                    We encourage you to apply again in the future after gaining more experience in retail 
                    operations or customer service. Our recruitment drives are conducted periodically and are 
                    announced on our website.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="font-semibold">For Vishal Mega Mart</p>
                <div className="mt-10 italic">
                  <p className="font-semibold">Avinash Kumar</p>
                  <p className="text-sm">Recruitment Manager</p>
                </div>
              </div>
              
              <div className="text-right">
                {resultData.status === 'Waitlisted' ? (
                  <div className="border-2 border-dashed border-yellow-300 rounded-lg p-4 inline-block rotate-[-5deg]">
                    <p className="font-semibold text-center text-yellow-600">ON STANDBY</p>
                    <p className="text-xs text-center text-yellow-400 mt-1">Official VMM Seal</p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-red-300 rounded-lg p-4 inline-block rotate-[-5deg]">
                    <p className="font-semibold text-center text-red-600">REJECTED</p>
                    <p className="text-xs text-center text-red-400 mt-1">Official VMM Seal</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 pt-4 border-t text-xs text-gray-500">
              <p className="text-center">
                ⚠️ DISCLAIMER: This is a parody document created for entertainment purposes only. 
                Not affiliated with any real company. No actual job rejection is being communicated.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificate;
