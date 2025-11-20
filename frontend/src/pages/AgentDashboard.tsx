import { useState } from 'react';
import { Bot, FileText, Calendar, UserCheck, FileCheck, ArrowLeft, Database, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OnboardingAgentInterface } from '@/components/agents/OnboardingAgentInterface';
import { ResumeScreeningAgentInterface } from '@/components/agents/ResumeScreeningAgentInterface';
import { MeetingSchedulerAgentInterface } from '@/components/agents/MeetingSchedulerAgentInterface';
import { InterviewCoordinatorAgentInterface } from '@/components/agents/InterviewCoordinatorAgentInterface';
import { DocumentGenerationAgentInterface } from '@/components/agents/DocumentGenerationAgentInterface';
import { DatabaseManagerAgentInterface } from '@/components/agents/DatabaseManagerAgentInterface';

type AgentType = 
  | 'onboarding' 
  | 'resume-screening' 
  | 'meeting-scheduler' 
  | 'interview-coordinator' 
  | 'document-generation' 
  | 'database-manager' 
  | null;

const AGENTS = [
  {
    id: 'onboarding' as AgentType,
    name: 'Onboarding Automation',
    description: 'Automated onboarding workflows, document generation, and task management',
    icon: UserCheck,
    category: 'Automation',
  },
  {
    id: 'resume-screening' as AgentType,
    name: 'Resume Screening',
    description: 'Automatically screens resumes and matches candidates to job requirements',
    icon: FileText,
    category: 'AI Analysis',
  },
  {
    id: 'meeting-scheduler' as AgentType,
    name: 'Meeting Scheduler',
    description: 'Automated interview scheduling with conflict resolution',
    icon: Calendar,
    category: 'Scheduling',
  },
  {
    id: 'interview-coordinator' as AgentType,
    name: 'Interview Coordinator',
    description: 'Coordinates multi-round interviews, sends reminders, collects feedback',
    icon: UserCheck,
    category: 'Coordination',
  },
  {
    id: 'document-generation' as AgentType,
    name: 'Document Generation',
    description: 'Auto-generates offer letters, contracts, certificates',
    icon: FileCheck,
    category: 'Generation',
  },
  {
    id: 'database-manager' as AgentType,
    name: 'Database Manager',
    description: 'Natural language database queries and operations (find, insert, update, delete)',
    icon: Database,
    category: 'Data Management',
  },
];

export const AgentDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(null);

  if (selectedAgent) {
    return (
      <div className="min-h-screen bg-white">
        <div className="p-6 space-y-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedAgent(null)}
            className="mb-4 text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>

          {selectedAgent === 'onboarding' && <OnboardingAgentInterface />}
          {selectedAgent === 'resume-screening' && <ResumeScreeningAgentInterface />}
          {selectedAgent === 'meeting-scheduler' && <MeetingSchedulerAgentInterface />}
          {selectedAgent === 'interview-coordinator' && <InterviewCoordinatorAgentInterface />}
          {selectedAgent === 'document-generation' && <DocumentGenerationAgentInterface />}
          {selectedAgent === 'database-manager' && <DatabaseManagerAgentInterface />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 md:p-8 lg:p-12 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-blue-600 p-4 rounded-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600">
                Agent Dashboard
              </h1>
              <p className="text-black mt-2 text-lg">Intelligent HR Automation Platform</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black">{AGENTS.length}</p>
                  <p className="text-sm text-black">AI Agents</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black">100%</p>
                  <p className="text-sm text-black">Automated</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black">24/7</p>
                  <p className="text-sm text-black">Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            return (
              <Card
                key={agent.id}
                className="bg-white border border-gray-200 cursor-pointer h-full"
                onClick={() => setSelectedAgent(agent.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-600 p-4 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-black bg-white px-3 py-1 rounded-full border border-gray-200">
                      {agent.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-blue-600">
                    {agent.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black mb-6 leading-relaxed">
                    {agent.description}
                  </p>
                  <Button
                    className="w-full bg-blue-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAgent(agent.id);
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Launch Agent
                      <ArrowLeft className="w-4 h-4 rotate-[-90deg]" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
