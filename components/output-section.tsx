"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface OutputSectionProps {
  mode: string;
  content: string;
  isGenerating: boolean;
}

export function OutputSection({ mode, content, isGenerating }: OutputSectionProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Content copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy content');
    }
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${mode}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Content downloaded!');
  };

  return (
    <Card className="h-full flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">
          Generated {mode === 'story' ? 'Story' : 'Dialogue'}
        </CardTitle>
        {content && !isGenerating && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center space-x-1"
            >
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadContent}
              className="flex items-center space-x-1"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 min-h-[400px] border rounded-lg p-4 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-600">
          {isGenerating ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
                <p className="text-gray-600 dark:text-gray-300">
                  Generating your {mode}...
                </p>
              </div>
            </div>
          ) : content ? (
            <div className="prose prose-gray max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {content}
              </pre>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <div className="text-center space-y-2">
                <div className="text-4xl">✨</div>
                <p className="text-lg font-medium">Ready to Create</p>
                <p className="text-sm">
                  Choose a mode and enter your prompt to generate amazing{' '}
                  {mode === 'story' ? 'stories' : 'dialogues'}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}