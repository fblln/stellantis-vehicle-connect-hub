
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Key, Car, Code } from "lucide-react";
import { Link } from "react-router-dom";

const QuickStart = () => {
  const steps = [
    {
      title: "Get API Credentials",
      description: "Register your application and obtain your client ID and secret",
      icon: Key,
      badge: "5 min"
    },
    {
      title: "Install SDK",
      description: "Choose your preferred programming language and install our SDK",
      icon: Code,
      badge: "2 min"
    },
    {
      title: "Make Your First Request",
      description: "Authenticate and fetch vehicle data with a simple API call",
      icon: Car,
      badge: "3 min"
    }
  ];

  const installationCode = {
    javascript: `# Install via npm
npm install @stellantis/connected-vehicles

# Install via yarn
yarn add @stellantis/connected-vehicles`,
    
    python: `# Install via pip
pip install stellantis-connected-vehicles

# Install via conda
conda install -c stellantis stellantis-connected-vehicles`,
    
    java: `<!-- Add to your pom.xml -->
<dependency>
  <groupId>com.stellantis</groupId>
  <artifactId>connected-vehicles-sdk</artifactId>
  <version>1.0.0</version>
</dependency>`
  };

  const authenticationCode = {
    javascript: `import { StellantisCV } from '@stellantis/connected-vehicles';

// Initialize client
const client = new StellantisCV({
  clientId: process.env.STELLANTIS_CLIENT_ID,
  clientSecret: process.env.STELLANTIS_CLIENT_SECRET,
  environment: 'sandbox' // Use 'production' for live data
});

// The SDK handles authentication automatically
console.log('Client initialized successfully');`,
    
    python: `from stellantis_cv import StellantisCV
import os

# Initialize client
client = StellantisCV(
    client_id=os.getenv('STELLANTIS_CLIENT_ID'),
    client_secret=os.getenv('STELLANTIS_CLIENT_SECRET'),
    environment='sandbox'  # Use 'production' for live data
)

print('Client initialized successfully')`,
    
    curl: `# Get access token
curl -X POST "https://api-sandbox.stellantis-cv.com/auth/token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "grant_type": "client_credentials"
  }'

# Response
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}`
  };

  const firstRequestCode = {
    javascript: `// Get list of vehicles
const vehicles = await client.vehicles.list();
console.log('Available vehicles:', vehicles);

// Get specific vehicle information
const vehicleId = vehicles.data[0].id;
const vehicle = await client.vehicles.get(vehicleId);

console.log('Vehicle details:', {
  vin: vehicle.vin,
  make: vehicle.make,
  model: vehicle.model,
  year: vehicle.year
});

// Get vehicle location
const location = await client.vehicles.getLocation(vehicleId);
console.log('Current location:', {
  latitude: location.latitude,
  longitude: location.longitude,
  timestamp: location.timestamp
});`,
    
    python: `# Get list of vehicles
vehicles = client.vehicles.list()
print(f'Available vehicles: {vehicles}')

# Get specific vehicle information
vehicle_id = vehicles['data'][0]['id']
vehicle = client.vehicles.get(vehicle_id)

print(f'Vehicle details: {vehicle.vin}, {vehicle.make} {vehicle.model} ({vehicle.year})')

# Get vehicle location
location = client.vehicles.get_location(vehicle_id)
print(f'Current location: {location.latitude}, {location.longitude}')`,
    
    curl: `# Get list of vehicles
curl -X GET "https://api-sandbox.stellantis-cv.com/v1/vehicles" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Get specific vehicle
curl -X GET "https://api-sandbox.stellantis-cv.com/v1/vehicles/VEHICLE_ID" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Get vehicle location
curl -X GET "https://api-sandbox.stellantis-cv.com/v1/vehicles/VEHICLE_ID/location" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`
  };

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Quick Start Guide</h1>
          <p className="text-xl text-muted-foreground">
            Get up and running with the Stellantis Connected Vehicles API in under 10 minutes.
          </p>
        </div>

        {/* Steps Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <step.icon className="h-8 w-8 text-blue-600" />
                  <Badge variant="secondary">{step.badge}</Badge>
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              {index < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 h-6 w-6 text-muted-foreground transform -translate-y-1/2 hidden md:block" />
              )}
            </Card>
          ))}
        </div>

        {/* Step 1: Get API Credentials */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">1</span>
            <h2 className="text-2xl font-semibold">Get API Credentials</h2>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Register Your Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To access the Stellantis Connected Vehicles API, you need to register your application and obtain credentials.</p>
              
              <div className="space-y-2">
                <h4 className="font-medium">Steps to get credentials:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Visit the Stellantis Developer Portal</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Create an account or sign in</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Create a new application</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Copy your Client ID and Client Secret</span>
                  </li>
                </ul>
              </div>
              
              <Button className="mt-4">
                Get API Credentials
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Step 2: Install SDK */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">2</span>
            <h2 className="text-2xl font-semibold">Install SDK</h2>
          </div>
          
          <p className="text-muted-foreground">
            Choose your preferred programming language and install our official SDK.
          </p>
          
          <CodeBlock
            multiLanguage={installationCode}
            title="SDK Installation"
          />
        </section>

        {/* Step 3: Authentication */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">3</span>
            <h2 className="text-2xl font-semibold">Initialize and Authenticate</h2>
          </div>
          
          <p className="text-muted-foreground">
            Initialize the SDK with your credentials. The SDK handles authentication automatically.
          </p>
          
          <CodeBlock
            multiLanguage={authenticationCode}
            title="Client Initialization"
          />
        </section>

        {/* Step 4: Make First Request */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">4</span>
            <h2 className="text-2xl font-semibold">Make Your First Request</h2>
          </div>
          
          <p className="text-muted-foreground">
            Now you're ready to make API calls! Let's fetch vehicle information and location data.
          </p>
          
          <CodeBlock
            multiLanguage={firstRequestCode}
            title="Vehicle Data Request"
          />
        </section>

        {/* Next Steps */}
        <section className="space-y-4 border-t pt-8">
          <h2 className="text-2xl font-semibold">Next Steps</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Explore API Reference</CardTitle>
                <CardDescription>
                  Browse all available endpoints and their detailed documentation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link to="/api-reference">View API Reference</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Try API Explorer</CardTitle>
                <CardDescription>
                  Test API endpoints interactively in your browser.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link to="/api-explorer">Open API Explorer</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Setup Webhooks</CardTitle>
                <CardDescription>
                  Receive real-time notifications about vehicle events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link to="/webhooks">Learn About Webhooks</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DocLayout>
  );
};

export default QuickStart;
