
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2, Download, Image } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

const MemeGenerator = () => {
  const [name, setName] = useState('');
  const [generatedMeme, setGeneratedMeme] = useState('');
  const memeRef = useRef<HTMLDivElement>(null);

  const memeTemplates = [
    "{name} got rejected because they wore Adidas to Vishal!",
    "{name} selected as Surveillance Ninja – Aisle 6 Division.",
    "{name} couldn't fold shirts correctly, now works at lingerie counter!",
    "{name} got 99/100 but failed the 'Namaste Pose' final round.",
    "{name} broke the record for fastest barcode scanning!",
    "Breaking: {name} promoted to 'Discount Announcement Specialist'",
    "{name} caught napping in bedding section during interview.",
    "Manager shocked as {name} organized entire messy rack in 2 minutes!",
    "{name} confused Vishal Mega Mart with Vishal Film Factory, still got hired!"
  ];

  const generateMeme = () => {
    if (!name.trim()) {
      toast.error("Please enter your name first!");
      return;
    }

    // Select a random meme template
    const randomTemplate = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
    const personalizedMeme = randomTemplate.replace('{name}', name);
    setGeneratedMeme(personalizedMeme);
  };

  const downloadMeme = async () => {
    if (!memeRef.current) return;
    
    try {
      const canvas = await html2canvas(memeRef.current, {
        scale: 2,
        backgroundColor: null
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `vmm-meme-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.click();
      
      toast.success("Meme downloaded successfully!");
    } catch (error) {
      console.error("Error generating meme image:", error);
      toast.error("Failed to download meme");
    }
  };

  const shareMeme = () => {
    if (navigator.share && generatedMeme) {
      navigator.share({
        title: 'VMM Recruitment Meme',
        text: generatedMeme,
        url: window.location.href
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => {
        console.error("Error sharing:", error);
        toast.error("Couldn't share meme");
      });
    } else {
      // Fallback if Web Share API is not available
      try {
        navigator.clipboard.writeText(generatedMeme);
        toast.success("Meme copied to clipboard!");
      } catch (e) {
        toast.error("Couldn't copy to clipboard");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-vmm-blue mb-8 text-center">VMM Meme Generator</h1>
      
      <Card className="mb-8">
        <CardHeader className="bg-vmm-magenta text-white">
          <CardTitle className="flex items-center">
            <Image className="mr-2 h-5 w-5" />
            Generate Your VMM Recruitment Meme
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name here"
                className="w-full"
              />
            </div>
            <Button 
              onClick={generateMeme} 
              className="w-full bg-vmm-blue hover:bg-vmm-blue/90"
            >
              Generate Random Meme
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {generatedMeme && (
        <Card>
          <CardContent className="pt-6">
            <div 
              ref={memeRef}
              className="bg-gradient-to-r from-vmm-blue to-vmm-magenta text-white p-8 rounded-md text-center min-h-[200px] flex items-center justify-center"
            >
              <h2 className="text-xl md:text-2xl font-bold">{generatedMeme}</h2>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 pt-2">
            <Button variant="outline" onClick={downloadMeme}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" onClick={shareMeme}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Generate hilarious VMM recruitment memes and share with your friends!</p>
        <p className="mt-1">All memes are completely fictional and for entertainment purposes only.</p>
      </div>
    </div>
  );
};

export default MemeGenerator;
