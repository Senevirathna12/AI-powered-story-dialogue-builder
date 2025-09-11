// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { DashboardHeader } from '@/components/dashboard-header';
// import { ModeSelector } from '@/components/mode-selector';
// import { InputSection } from '@/components/input-section';
// import { OutputSection } from '@/components/output-section';
// import { PromptEngineering } from '@/components/prompt-engineering';
// import { AnimatedBackground } from '@/components/animated-background';
// import { useAuth } from '@/components/auth-provider';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { toast } from 'sonner';
// import { BookOpen, MessageSquare, Sparkles, Zap, Clock, TrendingUp } from 'lucide-react';

// // Sample Templates
// const SAMPLE_STORIES = [
//   {
//     id: 1,
//     title: "Magical Forest Adventure",
//     description: "A young explorer discovers an enchanted forest with mysterious creatures",
//     prompt: "Write a story about Elena, a curious teenager who discovers a glowing stone in an ancient forest. The stone grants her the ability to understand the language of trees, and she learns about an ancient curse that needs to be broken.",
//     category: "Fantasy",
//     popularity: 95
//   },
//   {
//     id: 2,
//     title: "Space Station Mystery",
//     description: "A sci-fi thriller aboard a mysterious space station",
//     prompt: "Create a story about Captain Marcus who encounters a strange nebula containing crystalline structures and alien beings. The aliens claim humanity has reached a threshold and must prove their worthiness.",
//     category: "Sci-Fi",
//     popularity: 88
//   },
//   {
//     id: 3,
//     title: "Time Travel Romance",
//     description: "A love story that transcends time and space",
//     prompt: "Write a romantic story about two lovers who can only meet through time portals that appear during solar eclipses, and their struggle to find a way to be together permanently.",
//     category: "Romance",
//     popularity: 92
//   },
//   {
//     id: 4,
//     title: "Detective Noir",
//     description: "A gritty detective story in a rain-soaked city",
//     prompt: "Create a noir detective story about Detective Sarah Chen investigating a series of mysterious disappearances in the neon-lit streets of Neo Francisco, where nothing is as it seems.",
//     category: "Mystery",
//     popularity: 85
//   }
// ];

// const SAMPLE_DIALOGUES = [
//   {
//     id: 1,
//     title: "Life-Changing Decision",
//     description: "Two friends discuss taking a leap of faith",
//     prompt: "Write a dialogue between Sarah and Mike at a coffee shop, where Mike is trying to convince Sarah to quit her stable job and travel the world with him. Show their different perspectives on security vs. adventure.",
//     category: "Drama",
//     popularity: 91
//   },
//   {
//     id: 2,
//     title: "Police Interrogation",
//     description: "Tense conversation in an interrogation room",
//     prompt: "Create a dialogue between Detective Rodriguez and suspect James Thompson during a police interrogation about a crime that occurred last Tuesday night. Build tension through their verbal sparring.",
//     category: "Thriller",
//     popularity: 87
//   },
//   {
//     id: 3,
//     title: "First Date Conversation",
//     description: "Nervous energy and chemistry on a first date",
//     prompt: "Write a dialogue between two people on their first date at a cozy restaurant. Show their nervousness, attempts at humor, and growing chemistry through natural conversation.",
//     category: "Romance",
//     popularity: 94
//   },
//   {
//     id: 4,
//     title: "Family Reunion Tension",
//     description: "Long-buried family secrets come to light",
//     prompt: "Create a dialogue between siblings Emma and David at their father's funeral, where they discover he left them a mysterious letter revealing family secrets they never knew about.",
//     category: "Drama",
//     popularity: 89
//   }
// ];

// // Mock AI responses (same as before)
// const MOCK_STORIES = [
//   "In the heart of the ancient forest, where moonbeams danced through emerald leaves, young Elena discovered a peculiar glowing stone. As she picked it up, whispers of forgotten magic filled the air, and the world around her began to shimmer with possibilities she had never imagined.\n\nThe stone pulsed with a warm, golden light, and suddenly Elena could understand the language of the trees. They spoke of an ancient curse that had befallen the forest, turning its guardian spirit to stone. Only someone pure of heart could break the curse, but the path would be fraught with challenges.\n\nDetermined to help, Elena embarked on a quest that would test not only her courage but also her compassion. Along the way, she met a wise old owl who became her guide, a mischievous fox who taught her the art of cunning, and a gentle deer who showed her the power of kindness.\n\nThrough trials of fire, water, and earth, Elena proved herself worthy. When she finally reached the guardian's resting place, she didn't use magic or force to break the curse. Instead, she offered the guardian her own pure heart, and in that moment of selfless love, the curse was broken, and the forest bloomed with new life.",

//   "Captain Marcus stood on the bridge of his starship, gazing out at the swirling nebula that had appeared out of nowhere. His crew scrambled at their stations, trying to make sense of the impossible readings flooding their instruments.\n\n'Captain, we're detecting life signs within the nebula,' reported his science officer, her voice tinged with disbelief. 'But they're unlike anything in our database.'\n\nAs the ship drew closer, the nebula began to shift and change, revealing structures that defied physics as they knew it. Crystalline spires twisted through space, connected by bridges of pure energy that sparkled like captured starlight.\n\n'We're being hailed,' announced the communications officer.\n\nThe main screen flickered to life, showing a being of indescribable beauty – part humanoid, part light, with eyes that held the wisdom of eons. When it spoke, its voice was like music made manifest.\n\n'Welcome, travelers from the young worlds. We have been waiting for you to find us. Your species has reached the threshold of true understanding, and we are here to guide you to the next phase of your evolution. But first, you must prove that your hearts are as advanced as your technology.'\n\nCaptain Marcus realized this encounter would change not just his mission, but the destiny of all humanity."
// ];

// const MOCK_DIALOGUES = [
//   "**Sarah:** *looking up from her coffee* I can't believe you're actually thinking about quitting your job to travel the world. Aren't you scared?\n\n**Mike:** *leaning back in his chair* Terrified, actually. But I'm more scared of waking up in twenty years and realizing I never took the chance.\n\n**Sarah:** But you have a great career, a stable income, benefits...\n\n**Mike:** *shaking his head* And I'm miserable, Sarah. Every Monday feels like a prison sentence. I keep telling myself 'next year I'll do something different,' but next year never comes.\n\n**Sarah:** *sighs* I get it, I really do. Remember when we used to talk about backpacking through Europe after college?\n\n**Mike:** *smiling sadly* We had it all planned out. The hostels, the trains, the little cafes where we'd write in our journals.\n\n**Sarah:** *voice softening* What happened to us, Mike? When did we become so... practical?\n\n**Mike:** I think we forgot that life is supposed to be an adventure, not just a series of responsible choices. *pauses* Come with me, Sarah. Let's finally take that trip.\n\n**Sarah:** *eyes widening* Are you serious? I can't just... I have responsibilities, a mortgage...\n\n**Mike:** Those things will still be here when we get back. But this moment? This chance? It might not come again.\n\n**Sarah:** *staring into her coffee, then looking up with a small smile* You know what? Maybe it's time I stopped being so practical too.",

//   "**Detective Rodriguez:** *entering the interrogation room* Mr. Thompson, thank you for coming in voluntarily. We just have a few questions about last Tuesday night.\n\n**James Thompson:** *nervously adjusting his tie* Of course, Detective. I want to help however I can.\n\n**Detective Rodriguez:** *sitting down across from him* You said you were home alone watching TV. Can anyone verify that?\n\n**James Thompson:** Well, no. My wife was visiting her sister, and my neighbors... we don't really talk much.\n\n**Detective Rodriguez:** *studying him carefully* The thing is, James – can I call you James? – we have a witness who places you at the scene around 9 PM.\n\n**James Thompson:** *shifting uncomfortably* That's... that's impossible. I was definitely home by then.\n\n**Detective Rodriguez:** *leaning forward slightly* Look, I've been doing this for fifteen years. I can usually tell when someone's being straight with me. Right now, your body language is telling me a different story than your words.\n\n**James Thompson:** *voice cracking slightly* I don't know what you want me to say.\n\n**Detective Rodriguez:** I want you to tell me the truth. Because here's the thing – we're going to find out what really happened that night. We always do. The question is whether you want to get ahead of this or let it catch up to you.\n\n**James Thompson:** *long pause, then looking down* If... if I was there, hypothetically, it wouldn't necessarily mean I did anything wrong, would it?\n\n**Detective Rodriguez:** *voice gentle but firm* James, why don't you start from the beginning and tell me what really happened?"
// ];

// export default function Dashboard() {
//   const [mode, setMode] = useState('story');
//   const [content, setContent] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [currentPrompt, setCurrentPrompt] = useState('');
//   const [enhancedPrompt, setEnhancedPrompt] = useState('');
//   const [promptSettings, setPromptSettings] = useState({});
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/');
//     }
//   }, [isAuthenticated, router]);

//   const handleGenerate = async (prompt: string, characters?: string) => {
//     if (!prompt.trim()) return;

//     setIsGenerating(true);

//     // Use enhanced prompt if available, otherwise use original
//     const finalPrompt = enhancedPrompt || prompt;

//     // Simulate API call delay
//     setTimeout(() => {
//       const responses = mode === 'story' ? MOCK_STORIES : MOCK_DIALOGUES;
//       const randomResponse = responses[Math.floor(Math.random() * responses.length)];

//       setContent(randomResponse);
//       setIsGenerating(false);

//       toast.success(`${mode === 'story' ? 'Story' : 'Dialogue'} generated successfully with AI enhancement!`);
//     }, 2500);
//   };

//   const handleSampleSelect = (sample: any) => {
//     setCurrentPrompt(sample.prompt);
//     toast.success(`Template "${sample.title}" loaded! Customize and generate.`);
//   };

//   const handleEnhancedPrompt = (enhanced: string, settings: any) => {
//     setEnhancedPrompt(enhanced);
//     setPromptSettings(settings);
//     toast.success('Prompt enhanced with AI optimization!');
//   };

//   if (!isAuthenticated) {
//     return null;
//   }

//   const samples = mode === 'story' ? SAMPLE_STORIES : SAMPLE_DIALOGUES;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden">
//       <AnimatedBackground />

//       <div className="relative z-10">
//         <DashboardHeader />

//         <div className="flex-1 p-6">
//           <div className="max-w-7xl mx-auto">
//             {/* Welcome Header */}
//             <motion.div
//               className="mb-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="text-center">
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
//                   AI Story & Dialogue Generator
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Create amazing content with our advanced AI-powered generation tools
//                 </p>
//               </div>
//             </motion.div>

//             <div className="grid lg:grid-cols-3 gap-6">
//               {/* Left Panel - Templates & Samples */}
//               <motion.div
//                 className="space-y-6"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//               >
//                 <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
//                   <CardHeader className="pb-3">
//                     <CardTitle className="flex items-center space-x-2 text-lg">
//                       <Sparkles className="h-5 w-5 text-amber-500" />
//                       <span>Quick Templates</span>
//                     </CardTitle>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Choose from popular templates to get started quickly
//                     </p>
//                   </CardHeader>
//                   <CardContent className="space-y-3 max-h-96 overflow-y-auto">
//                     {samples.map((sample, index) => (
//                       <motion.div
//                         key={sample.id}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="cursor-pointer"
//                         onClick={() => handleSampleSelect(sample)}
//                       >
//                         <Card className="border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md">
//                           <CardContent className="p-4">
//                             <div className="flex items-start justify-between mb-2">
//                               <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
//                                 {sample.title}
//                               </h4>
//                               <Badge variant="secondary" className="text-xs">
//                                 {sample.category}
//                               </Badge>
//                             </div>
//                             <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
//                               {sample.description}
//                             </p>
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center space-x-2">
//                                 <TrendingUp className="h-3 w-3 text-green-500" />
//                                 <span className="text-xs text-green-600 dark:text-green-400">
//                                   {sample.popularity}% popular
//                                 </span>
//                               </div>
//                               <Button size="sm" variant="outline" className="h-6 text-xs">
//                                 Use Template
//                               </Button>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               {/* Middle Panel - Controls */}
//               <motion.div
//                 className="space-y-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
//                   <CardHeader className="pb-3">
//                     <CardTitle className="flex items-center space-x-2 text-lg">
//                       {mode === 'story' ? (
//                         <BookOpen className="h-5 w-5 text-blue-600" />
//                       ) : (
//                         <MessageSquare className="h-5 w-5 text-purple-600" />
//                       )}
//                       <span>Generation Mode</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ModeSelector value={mode} onValueChange={setMode} />
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
//                       {mode === 'story'
//                         ? 'Create immersive narratives and compelling storylines with rich characters and vivid descriptions'
//                         : 'Generate realistic conversations and character interactions with natural dialogue flow'
//                       }
//                     </p>
//                   </CardContent>
//                 </Card>

//                 {/* Prompt Engineering Component */}
//                 {currentPrompt && (
//                   <PromptEngineering
//                     mode={mode}
//                     originalPrompt={currentPrompt}
//                     onEnhancedPrompt={handleEnhancedPrompt}
//                   />
//                 )}

//                 <InputSection
//                   mode={mode}
//                   onGenerate={handleGenerate}
//                   isGenerating={isGenerating}
//                   initialPrompt={currentPrompt}
//                 />

//                 {/* Generation Stats */}
//                 <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 backdrop-blur-sm">
//                   <CardContent className="p-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                         <span className="text-sm font-medium">Generation Status</span>
//                       </div>
//                       <Badge variant={isGenerating ? "default" : "secondary"}>
//                         {isGenerating ? "Generating..." : "Ready"}
//                       </Badge>
//                     </div>
//                     {enhancedPrompt && (
//                       <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
//                         <Zap className="h-3 w-3 inline mr-1 text-amber-500" />
//                         AI Enhancement Active
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               {/* Right Panel - Output */}
//               <motion.div
//                 className="flex flex-col"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.6 }}
//               >
//                 <OutputSection
//                   mode={mode}
//                   content={content}
//                   isGenerating={isGenerating}
//                 />
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard-header";
import { ModeSelector } from "@/components/mode-selector";
import { PromptEngineering } from "@/components/prompt-engineering";
import { AnimatedBackground } from "@/components/animated-background";
import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  BookOpen,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Wand2,
  Loader2,
  Copy,
  Download,
  Zap,
  Clock,
} from "lucide-react";

// Sample Templates for Stories
const STORY_TEMPLATES = [
  {
    id: 1,
    title: "Magical Forest Adventure",
    description:
      "A young explorer discovers an enchanted forest with mysterious creatures",
    prompt:
      "Write a story about Elena, a curious teenager who discovers a glowing stone in an ancient forest. The stone grants her the ability to understand the language of trees, and she learns about an ancient curse that needs to be broken.",
    category: "Fantasy",
    popularity: 95,
  },
  {
    id: 2,
    title: "Space Station Mystery",
    description: "A sci-fi thriller aboard a mysterious space station",
    prompt:
      "Create a story about Captain Marcus who encounters a strange nebula containing crystalline structures and alien beings. The aliens claim humanity has reached a threshold and must prove their worthiness.",
    category: "Sci-Fi",
    popularity: 88,
  },
  {
    id: 3,
    title: "Time Travel Romance",
    description: "A love story that transcends time and space",
    prompt:
      "Write a romantic story about two lovers who can only meet through time portals that appear during solar eclipses, and their struggle to find a way to be together permanently.",
    category: "Romance",
    popularity: 92,
  },
  {
    id: 4,
    title: "Detective Noir",
    description: "A gritty detective story in a rain-soaked city",
    prompt:
      "Create a noir detective story about Detective Sarah Chen investigating a series of mysterious disappearances in the neon-lit streets of Neo Francisco, where nothing is as it seems.",
    category: "Mystery",
    popularity: 85,
  },
];

// Sample Templates for Dialogues
const DIALOGUE_TEMPLATES = [
  {
    id: 1,
    title: "Life-Changing Decision",
    description: "Two friends discuss taking a leap of faith",
    prompt:
      "Write a dialogue between Sarah and Mike at a coffee shop, where Mike is trying to convince Sarah to quit her stable job and travel the world with him. Show their different perspectives on security vs. adventure.",
    category: "Drama",
    popularity: 91,
  },
  {
    id: 2,
    title: "Police Interrogation",
    description: "Tense conversation in an interrogation room",
    prompt:
      "Create a dialogue between Detective Rodriguez and suspect James Thompson during a police interrogation about a crime that occurred last Tuesday night. Build tension through their verbal sparring.",
    category: "Thriller",
    popularity: 87,
  },
  {
    id: 3,
    title: "First Date Conversation",
    description: "Nervous energy and chemistry on a first date",
    prompt:
      "Write a dialogue between two people on their first date at a cozy restaurant. Show their nervousness, attempts at humor, and growing chemistry through natural conversation.",
    category: "Romance",
    popularity: 94,
  },
  {
    id: 4,
    title: "Family Reunion Tension",
    description: "Long-buried family secrets come to light",
    prompt:
      "Create a dialogue between siblings Emma and David at their father's funeral, where they discover he left them a mysterious letter revealing family secrets they never knew about.",
    category: "Drama",
    popularity: 89,
  },
];

// Mock AI responses
const MOCK_STORIES = [
  "In the heart of the ancient forest, where moonbeams danced through emerald leaves, young Elena discovered a peculiar glowing stone. As she picked it up, whispers of forgotten magic filled the air, and the world around her began to shimmer with possibilities she had never imagined.\n\nThe stone pulsed with a warm, golden light, and suddenly Elena could understand the language of the trees. They spoke of an ancient curse that had befallen the forest, turning its guardian spirit to stone. Only someone pure of heart could break the curse, but the path would be fraught with challenges.\n\nDetermined to help, Elena embarked on a quest that would test not only her courage but also her compassion. Along the way, she met a wise old owl who became her guide, a mischievous fox who taught her the art of cunning, and a gentle deer who showed her the power of kindness.\n\nThrough trials of fire, water, and earth, Elena proved herself worthy. When she finally reached the guardian's resting place, she didn't use magic or force to break the curse. Instead, she offered the guardian her own pure heart, and in that moment of selfless love, the curse was broken, and the forest bloomed with new life.",

  "Captain Marcus stood on the bridge of his starship, gazing out at the swirling nebula that had appeared out of nowhere. His crew scrambled at their stations, trying to make sense of the impossible readings flooding their instruments.\n\n'Captain, we're detecting life signs within the nebula,' reported his science officer, her voice tinged with disbelief. 'But they're unlike anything in our database.'\n\nAs the ship drew closer, the nebula began to shift and change, revealing structures that defied physics as they knew it. Crystalline spires twisted through space, connected by bridges of pure energy that sparkled like captured starlight.\n\n'We're being hailed,' announced the communications officer.\n\nThe main screen flickered to life, showing a being of indescribable beauty – part humanoid, part light, with eyes that held the wisdom of eons. When it spoke, its voice was like music made manifest.\n\n'Welcome, travelers from the young worlds. We have been waiting for you to find us. Your species has reached the threshold of true understanding, and we are here to guide you to the next phase of your evolution. But first, you must prove that your hearts are as advanced as your technology.'\n\nCaptain Marcus realized this encounter would change not just his mission, but the destiny of all humanity.",
];

const MOCK_DIALOGUES = [
  "**Sarah:** *looking up from her coffee* I can't believe you're actually thinking about quitting your job to travel the world. Aren't you scared?\n\n**Mike:** *leaning back in his chair* Terrified, actually. But I'm more scared of waking up in twenty years and realizing I never took the chance.\n\n**Sarah:** But you have a great career, a stable income, benefits...\n\n**Mike:** *shaking his head* And I'm miserable, Sarah. Every Monday feels like a prison sentence. I keep telling myself 'next year I'll do something different,' but next year never comes.\n\n**Sarah:** *sighs* I get it, I really do. Remember when we used to talk about backpacking through Europe after college?\n\n**Mike:** *smiling sadly* We had it all planned out. The hostels, the trains, the little cafes where we'd write in our journals.\n\n**Sarah:** *voice softening* What happened to us, Mike? When did we become so... practical?\n\n**Mike:** I think we forgot that life is supposed to be an adventure, not just a series of responsible choices. *pauses* Come with me, Sarah. Let's finally take that trip.\n\n**Sarah:** *eyes widening* Are you serious? I can't just... I have responsibilities, a mortgage...\n\n**Mike:** Those things will still be here when we get back. But this moment? This chance? It might not come again.\n\n**Sarah:** *staring into her coffee, then looking up with a small smile* You know what? Maybe it's time I stopped being so practical too.",

  "**Detective Rodriguez:** *entering the interrogation room* Mr. Thompson, thank you for coming in voluntarily. We just have a few questions about last Tuesday night.\n\n**James Thompson:** *nervously adjusting his tie* Of course, Detective. I want to help however I can.\n\n**Detective Rodriguez:** *sitting down across from him* You said you were home alone watching TV. Can anyone verify that?\n\n**James Thompson:** Well, no. My wife was visiting her sister, and my neighbors... we don't really talk much.\n\n**Detective Rodriguez:** *studying him carefully* The thing is, James – can I call you James? – we have a witness who places you at the scene around 9 PM.\n\n**James Thompson:** *shifting uncomfortably* That's... that's impossible. I was definitely home by then.\n\n**Detective Rodriguez:** *leaning forward slightly* Look, I've been doing this for fifteen years. I can usually tell when someone's being straight with me. Right now, your body language is telling me a different story than your words.\n\n**James Thompson:** *voice cracking slightly* I don't know what you want me to say.\n\n**Detective Rodriguez:** I want you to tell me the truth. Because here's the thing – we're going to find out what really happened that night. We always do. The question is whether you want to get ahead of this or let it catch up to you.\n\n**James Thompson:** *long pause, then looking down* If... if I was there, hypothetically, it wouldn't necessarily mean I did anything wrong, would it?\n\n**Detective Rodriguez:** *voice gentle but firm* James, why don't you start from the beginning and tell me what really happened?",
];

export default function Dashboard() {
  const [mode, setMode] = useState("story");
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleGenerate = async () => {
    if (!currentPrompt.trim()) return;

    setIsGenerating(true);

    // Use enhanced prompt if available, otherwise use original
    const finalPrompt = enhancedPrompt || currentPrompt;
    console.log("Generating with prompt:", finalPrompt);
    // Simulate API call delay
   
      // Select mock response based on mode
      // const responses = mode === "story" ? MOCK_STORIES : MOCK_DIALOGUES;
      // const randomResponse =
      //   responses[Math.floor(Math.random() * responses.length)];

      const response = await fetch("http://localhost:8001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: finalPrompt }),
      });

      if (!response.ok) {
        toast.error("Failed to generate content. Please try again.");
        setIsGenerating(false);
        return;
      }

      const result = await response.json();
      // console.log("API response:", result.response);
      setContent(result.response);
      // setCurrentPrompt("");
      setIsGenerating(false);
      

      toast.success(
        `${mode === "story" ? "Story" : "Dialogue"} generated successfully!`
      );
  };

  const handleTemplateSelect = (template: any) => {
    setCurrentPrompt(template.prompt);
    toast.success(`Template "${template.title}" loaded!`);
  };

  const handleEnhancedPrompt = (enhanced: string, settings: any) => {
    setEnhancedPrompt(enhanced);
    toast.success("Prompt enhanced with AI optimization!");
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard!");
  };

  const handleDownloadContent = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${mode}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Content downloaded!");
  };

  if (!isAuthenticated) {
    return null;
  }

  const templates = mode === "story" ? STORY_TEMPLATES : DIALOGUE_TEMPLATES;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="p-6">
          <div className="max-w-full mx-auto">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Side: Quick Templates */}
              <div className="col-span-4">
                <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                      <span>Quick Templates</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Choose from popular{" "}
                      {mode === "story" ? "story" : "dialogue"} templates to get
                      started quickly
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-[calc(80vh-2rem)] overflow-y-auto">
                    {templates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <Card className="border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                                {template.title}
                              </h4>
                              <Badge variant="secondary" className="text-xs">
                                {template.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                              {template.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                <span className="text-xs text-green-600 dark:text-green-400">
                                  {template.popularity}% popular
                                </span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 text-xs"
                              >
                                Use Template
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Generation Stats */}
                <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 backdrop-blur-sm mt-8">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                       <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                       <span className="text-sm font-medium">Generation Status</span>
                     </div>
                     <Badge variant={isGenerating ? "default" : "secondary"}>
                       {isGenerating ? "Generating..." : "Ready"}
                     </Badge>
                   </div>
                   {enhancedPrompt && (
                     <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                       <Zap className="h-3 w-3 inline mr-1 text-amber-500" />
                       AI Enhancement Active
                     </div>
                   )}
                 </CardContent>
               </Card>
              </div>

              {/* Middle Section - Mode Selector and Prompt */}
              <div className="col-span-4 space-y-6">
                {/* Mode Selector */}
                <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                        {mode === "story" ? (
                          <BookOpen className="h-6 w-6 text-white" />
                        ) : (
                          <MessageSquare className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <span>Generation Mode</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-8">
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                      <ModeSelector value={mode} onValueChange={setMode} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                      {mode === "story"
                        ? "Create immersive narratives and compelling storylines"
                        : "Generate realistic conversations and character interactions"}
                    </p>
                  </CardContent>
                </Card>

                {/* Prompt Engineering Component */}
                {currentPrompt && (
                  <PromptEngineering
                    mode={mode}
                    originalPrompt={currentPrompt}
                    onEnhancedPrompt={handleEnhancedPrompt}
                  />
                )}

                {/* Prompt Input */}
                <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Wand2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span>Your Prompt</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder={`Enter your ${mode} prompt here...`}
                      value={currentPrompt}
                      onChange={(e) => setCurrentPrompt(e.target.value)}
                      rows={6}
                      className="resize-none text-lg"
                    />
                    <Button
                      onClick={handleGenerate}
                      disabled={!currentPrompt.trim() || isGenerating}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 text-lg"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-5 w-5" />
                          Generate {mode === "story" ? "Story" : "Dialogue"}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side: Output */}
              <div className="col-span-4">
                <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        {mode === "story" ? (
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        ) : (
                          <MessageSquare className="h-5 w-5 text-purple-600" />
                        )}
                        <span>
                          Generated {mode === "story" ? "Story" : "Dialogue"}
                        </span>
                      </CardTitle>
                      {content && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopyContent}
                            className="h-8"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleDownloadContent}
                            className="h-8"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-800/90 rounded-lg p-6 h-[calc(90vh-2rem)]  overflow-y-auto custom-scrollbar">
                      {isGenerating ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                            <p className="text-gray-600 dark:text-gray-400">
                              Generating your {mode}...
                            </p>
                          </div>
                        </div>
                      ) : content ? (
                        <div className="prose dark:prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                            {content}
                          </pre>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-center">
                          <div>
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                              {mode === "story" ? (
                                <BookOpen className="h-8 w-8 text-gray-400" />
                              ) : (
                                <MessageSquare className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 mb-2">
                              No {mode} generated yet
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              Select a template or enter a prompt to get started
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
