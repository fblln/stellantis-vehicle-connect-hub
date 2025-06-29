
import { DocLayout } from "@/components/layout/doc-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Car, Shield, Zap, Code, Play, Book, Users } from "lucide-react";

const Index = () => {
  const quickStartCode = {
    javascript: `// Initialize the Stellantis Connected Vehicles SDK
import { StellantisCV } from '@stellantis/connected-vehicles';

const client = new StellantisCV({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  environment: 'production' // or 'sandbox'
});

// Get vehicle information
const vehicle = await client.vehicles.get('vehicle_id');
console.log('Vehicle:', vehicle);

// Get vehicle location
const location = await client.vehicles.getLocation('vehicle_id');
console.log('Location:', location);`,
    
    python: `# Initialize the Stellantis Connected Vehicles SDK
from stellantis_cv import StellantisCV

client = StellantisCV(
    client_id='your_client_id',
    client_secret='your_client_secret',
    environment='production'  # or 'sandbox'
)

# Get vehicle information
vehicle = client.vehicles.get('vehicle_id')
print(f'Vehicle: {vehicle}')

# Get vehicle location
location = client.vehicles.get_location('vehicle_id')
print(f'Location: {location}')`,
    
    curl: `# Authenticate and get access token
curl -X POST "https://api.stellantis-cv.com/auth/token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "grant_type": "client_credentials"
  }'

# Get vehicle information
curl -X GET "https://api.stellantis-cv.com/v1/vehicles/vehicle_id" \\
  -H "Authorization: Bearer ACCESS_TOKEN"`
  };

  const features = [
    {
      icon: Car,
      title: "Vehicle Data Access",
      description: "Access real-time and historical vehicle data including location, diagnostics, and status information."
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "OAuth 2.0 based authentication with comprehensive security features and role-based access control."
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Receive instant notifications about vehicle events through webhooks and real-time data streaming."
    },
    {
      icon: Code,
      title: "Multiple SDKs",
      description: "Official SDKs available for JavaScript, Python, Java, and more programming languages."
    }
  ];

  const useCases = [
    {
      title: "Fleet Management",
      description: "Monitor and manage large vehicle fleets with real-time tracking and diagnostics.",
      badge: "Popular"
    },
    {
      title: "Insurance Telematics",
      description: "Access driving behavior data for usage-based insurance applications.",
      badge: "New"
    },
    {
      title: "Connected Services",
      description: "Build innovative connected car services and applications for end users.",
      badge: ""
    },
    {
      title: "Maintenance Optimization",
      description: "Predictive maintenance solutions using vehicle diagnostic data.",
      badge: ""
    }
  ];

  return (
    <DocLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Stellantis Connected Vehicles API
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build powerful connected vehicle applications with secure access to real-time vehicle data, 
              diagnostics, and location services across the Stellantis ecosystem.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quickstart">
                <Play className="mr-2 h-4 w-4" />
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/api-reference">
                <Book className="mr-2 h-4 w-4" />
                API Reference
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/api-explorer">
                <Code className="mr-2 h-4 w-4" />
                Try API Explorer
              </Link>
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Key Features & Capabilities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Main Use Cases</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {useCases.map((useCase, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{useCase.title}</CardTitle>
                    {useCase.badge && (
                      <Badge variant={useCase.badge === "New" ? "secondary" : "default"}>
                        {useCase.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Start Code */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Quick Start Example</h2>
            <p className="text-muted-foreground">
              Get up and running in minutes with our comprehensive SDKs
            </p>
          </div>
          <CodeBlock
            multiLanguage={quickStartCode}
            title="Vehicle Data Access Example"
          />
        </section>

        {/* API Stats */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">API Overview</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-blue-600">50+</CardTitle>
                <CardDescription>API Endpoints</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-green-600">99.9%</CardTitle>
                <CardDescription>Uptime SLA</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-purple-600">24/7</CardTitle>
                <CardDescription>Support Available</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="text-center space-y-6 py-12 border-t">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers building innovative connected vehicle solutions with our API.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quickstart">Start Building Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/support">
                <Users className="mr-2 h-4 w-4" />
                Join Community
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </DocLayout>
  );
};

export default Index;
