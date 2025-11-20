import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';

export const Welcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Employee Management',
      description: 'Comprehensive employee database and profiles',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Automation',
      description: 'Intelligent agents for HR processes',
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Real-time analytics and predictions',
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-600">Next-Gen HR</h1>
              <p className="text-sm text-gray-600">TalentFlow Platform</p>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome to the System
          </h2>
          {user && (
            <p className="text-xl text-gray-700">
              Hello, <span className="font-semibold text-blue-600">{user.name}</span>!
            </p>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-6">
            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-8">
                <div className="space-y-4 text-center">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    You're now logged into the Next-Gen HR TalentFlow Platform. This intelligent
                    human resources management system helps you streamline hiring, manage employees,
                    and make data-driven decisions with ease.
                  </p>
                  <p className="text-gray-600">
                    Get started by exploring the dashboard to view analytics, manage your workforce,
                    or use our AI-powered agents to automate HR tasks.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border border-gray-200 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 p-3 rounded-lg">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={() => navigate('/app/dashboard')}
                size="lg"
                className="bg-blue-600 text-white px-8 py-6 text-lg font-semibold"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
      </div>
    </div>
  );
};

