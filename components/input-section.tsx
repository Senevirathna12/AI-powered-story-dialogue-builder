"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { SamplePrompts } from './sample-prompts';
import { PromptEngineering } from './prompt-engineering';

interface InputSectionProps {
  mode: string;
  onGenerate: (prompt: string, characters?: string, enhancedPrompt?: string, settings?: any) => void;
  isGenerating: boolean;
  initialPrompt?: string;
}

export function InputSection({ mode, onGenerate, isGenerating, initialPrompt }: InputSectionProps) {
  const [prompt, setPrompt] = useState('');
  const [characters, setCharacters] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [promptSettings, setPromptSettings] = useState(null);

  // Update prompt when initialPrompt changes
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    onGenerate(prompt, characters, enhancedPrompt, promptSettings);
  };

  const handleSelectPrompt = (selectedPrompt: string, selectedCharacters?: string) => {
    setPrompt(selectedPrompt);
    if (selectedCharacters) {
      setCharacters(selectedCharacters);
    }
  };

  const handleEnhancedPrompt = (enhanced: string, settings: any) => {
    setEnhancedPrompt(enhanced);
    setPromptSettings(settings);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleGenerate();
    }
  };

  return (
    <div className="space-y-4">
      {/* Sample Prompts */}
      <SamplePrompts mode={mode} onSelectPrompt={handleSelectPrompt} />
      
      {/* Main Input Card */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>{mode === 'story' ? 'Story' : 'Dialogue'} Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">
              {mode === 'story' ? 'Story Prompt' : 'Dialogue Scenario'}
            </Label>
            <Textarea
              id="prompt"
              placeholder={
                mode === 'story'
                  ? 'Describe the story you want to generate (e.g., "A brave knight embarks on a quest to save a magical kingdom...")'
                  : 'Describe the dialogue scenario (e.g., "Two friends discussing their plans for the weekend")'
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={4}
              className="resize-none"
            />
          </div>

          {mode === 'dialogue' && (
            <div className="space-y-2">
              <Label htmlFor="characters">Characters (optional)</Label>
              <Input
                id="characters"
                placeholder="e.g., Alice (teacher), Bob (student)"
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
              />
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate {mode === 'story' ? 'Story' : 'Dialogue'}
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Press Ctrl + Enter to generate quickly
          </p>
        </CardContent>
      </Card>
      
      {/* Prompt Engineering */}
      {prompt.trim() && (
        <PromptEngineering 
          mode={mode}
          originalPrompt={prompt}
          onEnhancedPrompt={handleEnhancedPrompt}
        />
      )}
    </div>
  );
}