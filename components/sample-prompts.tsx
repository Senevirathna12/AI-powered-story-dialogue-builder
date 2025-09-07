"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, MessageSquare, Sparkles } from 'lucide-react';

interface SamplePromptsProps {
  mode: string;
  onSelectPrompt: (prompt: string, characters?: string) => void;
}

const SAMPLE_STORIES = [
  {
    title: "Magical Forest Adventure",
    prompt: "A young explorer discovers a hidden magical forest where trees can talk and mythical creatures roam freely. They must solve an ancient riddle to save the forest from eternal darkness.",
    category: "Fantasy"
  },
  {
    title: "Space Station Mystery",
    prompt: "On a remote space station, the crew starts receiving mysterious signals from deep space. As they investigate, they realize the signals contain a warning about an approaching alien fleet.",
    category: "Sci-Fi"
  },
  {
    title: "Time Traveler's Dilemma",
    prompt: "A scientist accidentally travels back to medieval times and must find a way home without changing history. But they discover their presence has already altered the timeline.",
    category: "Adventure"
  },
  {
    title: "Underwater City",
    prompt: "Deep beneath the ocean, an ancient civilization thrives in crystal domes. A marine biologist stumbles upon this hidden world and must choose between revealing it to humanity or protecting its secrets.",
    category: "Mystery"
  }
];

const SAMPLE_DIALOGUES = [
  {
    title: "Job Interview Tension",
    prompt: "A nervous candidate interviews for their dream job, but the interviewer seems to know more about their past than expected.",
    characters: "Sarah (candidate), Mr. Johnson (interviewer)",
    category: "Drama"
  },
  {
    title: "Reunion After Years",
    prompt: "Two childhood friends meet after 20 years at their high school reunion, both having taken very different life paths.",
    characters: "Alex (successful lawyer), Jamie (traveling artist)",
    category: "Drama"
  },
  {
    title: "Detective Interrogation",
    prompt: "A seasoned detective questions a suspect in a high-profile case, using psychological tactics to uncover the truth.",
    characters: "Detective Martinez, Chris Thompson (suspect)",
    category: "Thriller"
  },
  {
    title: "First Date Awkwardness",
    prompt: "Two people on a blind date discover they have completely opposite personalities, leading to humorous misunderstandings.",
    characters: "Emma (organized planner), Ryan (spontaneous adventurer)",
    category: "Comedy"
  }
];

export function SamplePrompts({ mode, onSelectPrompt }: SamplePromptsProps) {
  const samples = mode === 'story' ? SAMPLE_STORIES : SAMPLE_DIALOGUES;

  return (
    <Card className="border-dashed border-2 border-muted-foreground/25 bg-muted/30">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Quick Start Templates</h3>
        </div>
        <div className="grid gap-2 max-h-64 overflow-y-auto">
          {samples.map((sample, index) => (
            <div
              key={index}
              className="group p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => onSelectPrompt(sample.prompt, 'characters' in sample ? sample.characters : undefined)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {mode === 'story' ? (
                      <BookOpen className="h-3 w-3 text-blue-500" />
                    ) : (
                      <MessageSquare className="h-3 w-3 text-purple-500" />
                    )}
                    <span className="font-medium text-xs">{sample.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {sample.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                    {sample.prompt}
                  </p>
                  {'characters' in sample && (
                    <p className="text-xs text-muted-foreground mt-1">
                      <strong>Characters:</strong> {sample.characters}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 h-6 w-6 p-0"
                >
                  <Sparkles className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}