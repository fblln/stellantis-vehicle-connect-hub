
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, Github, Book, Users, Phone, Clock, HelpCircle } from "lucide-react";

const Support = () => {
  const supportChannels = [
    {
      name: "Developer Forum",
      description: "Community-driven support and discussions",
      icon: Users,
      response: "Community driven",
      availability: "24/7",
      link: "#",
      primary: false
    },
    {
      name: "Email Support",
      description: "Direct email support for technical issues",
      icon: Mail,
      response: "24-48 hours",
      availability: "Business hours",
      link: "mailto:api-support@stellantis.com",
      primary: false
    },
    {
      name: "Live Chat",
      description: "Real-time chat support for urgent issues",
      icon: MessageCircle,
      response: "< 5 minutes",
      availability: "Mon-Fri 9AM-6PM CET",
      link: "#",
      primary: true
    },
    {
      name: "Phone Support",
      description: "Premium phone support for enterprise customers",
      icon: Phone,
      response: "Immediate",
      availability: "Enterprise only",
      link: "#",
      primary: false
    }
  ];

  const resources = [
    {
      name: "API Documentation",
      description: "Complete API reference and guides",
      icon: Book,
      link: "/api-reference"
    },
    {
      name: "GitHub Issues",
      description: "Report bugs and request features",
      icon: Github,
      link: "https://github.com/stellantis/cv-api/issues"
    },
    {
      name: "FAQ",
      description: "Frequently asked questions",
      icon: HelpCircle,
      link: "#faq"
    },
    {
      name: "Status Page",
      description: "Real-time API status and incidents",
      icon: Clock,
      link: "/api-status"
    }
  ];

  const faqItems = [
    {
      question: "How do I get API credentials?",
      answer: "You can get API credentials by registering at the Stellantis Developer Portal. After creating an account, you can create a new application and receive your client ID and secret."
    },
    {
      question: "What are the rate limits for the API?",
      answer: "The API has rate limits of 1,000 requests per hour and 50 requests per minute per client. Premium plans have higher limits available."
    },
    {
      question: "How do I handle webhook signature verification?",
      answer: "Webhooks include an X-Stellantis-Signature header with an HMAC-SHA256 signature. You should verify this signature using your webhook secret to ensure authenticity."
    },
    {
      question: "Can I test the API in a sandbox environment?",
      answer: "Yes, we provide a sandbox environment at https://api-sandbox.stellantis-cv.com for testing. Use your same credentials but with simulated vehicle data."
    },
    {
      question: "What vehicle data is available through the API?",
      answer: "The API provides access to vehicle location, diagnostic data, battery status, door lock status, engine status, and various control commands depending on the vehicle model and your access level."
    },
    {
      question: "How do I migrate from API v1 to v2?",
      answer: "We provide a comprehensive migration guide in our documentation. The main changes involve authentication flow updates and response format standardization. Support for v1 will be discontinued in Q1 2024."
    }
  ];

  const communityStats = [
    { label: "Active Developers", value: "12,500+" },
    { label: "GitHub Stars", value: "2,300+" },
    { label: "Forum Posts", value: "8,900+" },
    { label: "Countries", value: "45+" }
  ];

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Support & Community</h1>
          <p className="text-xl text-muted-foreground">
            Get help, connect with other developers, and access resources to build amazing connected vehicle applications.
          </p>
        </div>

        {/* Support Channels */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Get Help</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {supportChannels.map((channel, index) => (
              <Card key={index} className={channel.primary ? "border-blue-200 bg-blue-50" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <channel.icon className={`h-6 w-6 ${channel.primary ? 'text-blue-600' : 'text-gray-600'}`} />
                      <CardTitle className={channel.primary ? 'text-blue-800' : ''}>{channel.name}</CardTitle>
                    </div>
                    {channel.primary && <Badge>Recommended</Badge>}
                  </div>
                  <CardDescription className={channel.primary ? 'text-blue-700' : ''}>
                    {channel.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Response time:</span>
                      <span className="font-medium">{channel.response}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-medium">{channel.availability}</span>
                    </div>
                  </div>
                  <Button 
                    variant={channel.primary ? "default" : "outline"} 
                    className="w-full"
                    asChild
                  >
                    <a href={channel.link}>Contact Support</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Stats */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Developer Community</h2>
          
          <div className="grid gap-4 md:grid-cols-4">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-blue-600">{stat.value}</CardTitle>
                  <CardDescription>{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Resources</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <resource.icon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={resource.link}>View Resource</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4" id="faq">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Enterprise Support */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Enterprise Support</h2>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800">Premium Support Available</CardTitle>
              <CardDescription className="text-purple-700">
                Get dedicated support, custom integrations, and priority access to new features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-purple-700">Phone Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">&lt; 1hr</div>
                  <div className="text-sm text-purple-700">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">SLA</div>
                  <div className="text-sm text-purple-700">99.9% Uptime</div>
                </div>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Contact Enterprise Sales
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Contact Form */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Send us a message</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Send us a message and we'll get back to you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Tell us more about your question or issue..."
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </DocLayout>
  );
};

export default Support;
