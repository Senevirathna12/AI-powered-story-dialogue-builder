"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Settings, Zap, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PromptEngineeringProps {
  mode: string;
  originalPrompt: string;
  onEnhancedPrompt: (enhancedPrompt: string, settings: any) => void;
}

export function PromptEngineering({ mode, originalPrompt, onEnhancedPrompt }: PromptEngineeringProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tone, setTone] = useState('balanced');
  const [length, setLength] = useState('medium');
  const [creativity, setCreativity] = useState([0.7]);
  const [style, setStyle] = useState('narrative');

  const toneOptions = {
    'dramatic': 'Dramatic & Intense',
    'humorous': 'Light & Humorous',
    'mysterious': 'Dark & Mysterious',
    'romantic': 'Romantic & Emotional',
    'balanced': 'Balanced & Natural'
  };

  const lengthOptions = {
    'short': 'Short (100-200 words)',
    'medium': 'Medium (300-500 words)',
    'long': 'Long (600-800 words)',
    'extended': 'Extended (1000+ words)'
  };

  const styleOptions = mode === 'story' ? {
    'narrative': 'Third Person Narrative',
    'first-person': 'First Person POV',
    'descriptive': 'Highly Descriptive',
    'action': 'Action-Packed',
    'literary': 'Literary Style'
  } : {
    'natural': 'Natural Conversation',
    'formal': 'Formal Dialogue',
    'casual': 'Casual Chat',
    'dramatic': 'Dramatic Exchange',
    'comedic': 'Comedic Banter'
  };

  const enhancePrompt = () => {
    let enhancedPrompt = originalPrompt;
    
    // Add tone instruction
    enhancedPrompt += `\n\nTone: ${toneOptions[tone as keyof typeof toneOptions]}`;
    
    // Add length instruction
    enhancedPrompt += `\nLength: ${lengthOptions[length as keyof typeof lengthOptions]}`;
    
    // Add style instruction
    enhancedPrompt += `\nStyle: ${styleOptions[style as keyof typeof styleOptions]}`;
    
    // Add creativity instruction
    const creativityLevel = creativity[0];
    if (creativityLevel < 0.3) {
      enhancedPrompt += `\nApproach: Keep it realistic and grounded`;
    } else if (creativityLevel > 0.7) {
      enhancedPrompt += `\nApproach: Be highly creative and imaginative`;
    } else {
      enhancedPrompt += `\nApproach: Balance creativity with believability`;
    }

    // Add mode-specific instructions
    if (mode === 'story') {
      enhancedPrompt += `\n\nPlease create a compelling story with well-developed characters, engaging plot, and vivid descriptions. Include dialogue where appropriate and ensure a satisfying narrative arc.`;
    } else {
      enhancedPrompt += `\n\nPlease create realistic dialogue that captures the characters' personalities and motivations. Include natural speech patterns, emotional subtext, and appropriate pacing.`;
    }

    const settings = {
      tone,
      length,
      creativity: creativity[0],
      style,
      mode
    };

    onEnhancedPrompt(enhancedPrompt, settings);
  };

  return (
    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors">
            <CardTitle className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-amber-600" />
                <span>Prompt Engineering</span>
                <Badge variant="secondary" className="text-xs">
                  AI Enhancement
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Info className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {isOpen ? 'Hide' : 'Show'} Settings
                </span>
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone" className="text-xs font-medium">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(toneOptions).map(([key, value]) => (
                      <SelectItem key={key} value={key} className="text-xs">
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length" className="text-xs font-medium">Length</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(lengthOptions).map(([key, value]) => (
                      <SelectItem key={key} value={key} className="text-xs">
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style" className="text-xs font-medium">
                {mode === 'story' ? 'Narrative Style' : 'Dialogue Style'}
              </Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(styleOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key} className="text-xs">
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Creativity Level</Label>
                <span className="text-xs text-muted-foreground">
                  {creativity[0] < 0.3 ? 'Conservative' : creativity[0] > 0.7 ? 'Highly Creative' : 'Balanced'}
                </span>
              </div>
              <Slider
                value={creativity}
                onValueChange={setCreativity}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            <Button
              onClick={enhancePrompt}
              className="w-full h-8 text-xs bg-amber-600 hover:bg-amber-700 text-white"
              disabled={!originalPrompt.trim()}
            >
              <Zap className="mr-2 h-3 w-3" />
              Enhance Prompt for AI Model
            </Button>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}