
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Download, Github, Book } from "lucide-react";

const SDKs = () => {
  const sdks = [
    {
      name: "JavaScript/Node.js",
      description: "Official SDK for JavaScript and Node.js applications",
      version: "v2.1.0",
      status: "Stable",
      features: ["TypeScript support", "Promise-based API", "Automatic retries", "Built-in auth"],
      installation: "npm install @stellantis/connected-vehicles",
      github: "https://github.com/stellantis/cv-sdk-javascript",
      docs: "/docs/sdks/javascript"
    },
    {
      name: "Python",
      description: "Official SDK for Python applications",
      version: "v1.8.2",
      status: "Stable",
      features: ["Async/await support", "Type hints", "Pydantic models", "Auto-retry logic"],
      installation: "pip install stellantis-connected-vehicles",
      github: "https://github.com/stellantis/cv-sdk-python",
      docs: "/docs/sdks/python"
    },
    {
      name: "Java",
      description: "Official SDK for Java applications",
      version: "v1.5.1",
      status: "Stable",
      features: ["Spring Boot integration", "Reactive streams", "Builder patterns", "Automatic serialization"],
      installation: "Maven/Gradle dependency",
      github: "https://github.com/stellantis/cv-sdk-java",
      docs: "/docs/sdks/java"
    },
    {
      name: "Go",
      description: "Official SDK for Go applications",
      version: "v0.9.0",
      status: "Beta",
      features: ["Context support", "Structured logging", "Concurrent-safe", "Minimal dependencies"],
      installation: "go get github.com/stellantis/cv-sdk-go",
      github: "https://github.com/stellantis/cv-sdk-go",
      docs: "/docs/sdks/go"
    },
    {
      name: "C#/.NET",
      description: "Official SDK for .NET applications",
      version: "v1.3.0",
      status: "Stable",
      features: ["Async/await", "LINQ support", "Dependency injection", "Configuration binding"],
      installation: "NuGet package",
      github: "https://github.com/stellantis/cv-sdk-dotnet",
      docs: "/docs/sdks/dotnet"
    },
    {
      name: "PHP",
      description: "Official SDK for PHP applications",
      version: "v1.2.0",
      status: "Stable",
      features: ["PSR-4 autoloading", "Guzzle HTTP", "Laravel integration", "Comprehensive tests"],
      installation: "composer require stellantis/connected-vehicles",
      github: "https://github.com/stellantis/cv-sdk-php",
      docs: "/docs/sdks/php"
    }
  ];

  const jsExample = `import { StellantisCV } from '@stellantis/connected-vehicles';

// Initialize the client
const client = new StellantisCV({
  clientId: process.env.STELLANTIS_CLIENT_ID,
  clientSecret: process.env.STELLANTIS_CLIENT_SECRET,
  environment: 'production'
});

// Get vehicles
const vehicles = await client.vehicles.list();

// Get vehicle location
const location = await client.vehicles.getLocation('vehicle_id');

// Lock vehicle doors
await client.vehicles.lock('vehicle_id');`;

  const pythonExample = `from stellantis_cv import StellantisCV

# Initialize the client
client = StellantisCV(
    client_id=os.getenv('STELLANTIS_CLIENT_ID'),
    client_secret=os.getenv('STELLANTIS_CLIENT_SECRET'),
    environment='production'
)

# Get vehicles
vehicles = await client.vehicles.list()

# Get vehicle location
location = await client.vehicles.get_location('vehicle_id')

# Lock vehicle doors
await client.vehicles.lock('vehicle_id')`;

  const javaExample = `import com.stellantis.cv.StellantisCV;
import com.stellantis.cv.models.Vehicle;

// Initialize the client
StellantisCV client = StellantisCV.builder()
    .clientId(System.getenv("STELLANTIS_CLIENT_ID"))
    .clientSecret(System.getenv("STELLANTIS_CLIENT_SECRET"))
    .environment(Environment.PRODUCTION)
    .build();

// Get vehicles
List<Vehicle> vehicles = client.vehicles().list().get();

// Get vehicle location
Location location = client.vehicles()
    .getLocation("vehicle_id")
    .get();

// Lock vehicle doors  
client.vehicles().lock("vehicle_id").get();`;

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">SDKs & Client Libraries</h1>
          <p className="text-xl text-muted-foreground">
            Official SDKs and client libraries to accelerate your development with the Stellantis Connected Vehicles API.
          </p>
        </div>

        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why Use Our SDKs?</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Code className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Developer Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Intuitive APIs, comprehensive documentation, and TypeScript support for better developer experience.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Download className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Easy Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Simple installation via package managers with minimal setup required to get started.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Github className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Open Source</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All SDKs are open source with active community contributions and transparent development.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Available SDKs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Available SDKs</h2>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {sdks.map((sdk, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{sdk.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{sdk.version}</Badge>
                      <Badge variant={sdk.status === "Stable" ? "default" : "secondary"}>
                        {sdk.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{sdk.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Installation</h4>
                    <CodeBlock code={sdk.installation} language="bash" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {sdk.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Github className="mr-2 h-3 w-3" />
                      GitHub
                    </Button>
                    <Button size="sm" variant="outline">
                      <Book className="mr-2 h-3 w-3" />
                      Docs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Start Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Quick Start Examples</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">JavaScript/Node.js</CardTitle>
                <CardDescription>Get started with the JavaScript SDK</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={jsExample} language="javascript" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Python</CardTitle>
                <CardDescription>Get started with the Python SDK</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={pythonExample} language="python" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Java</CardTitle>
                <CardDescription>Get started with the Java SDK</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={javaExample} language="java" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Community SDKs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Community SDKs</h2>
          <p className="text-muted-foreground">
            Community-maintained SDKs for additional programming languages and frameworks.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ruby</CardTitle>
                <CardDescription>Community-maintained Ruby gem</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Community</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rust</CardTitle>
                <CardDescription>Community-maintained Rust crate</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Community</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Migration Guides */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Migration Guides</h2>
          
          <div className="space-y-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">v1.x to v2.x Migration</CardTitle>
                <CardDescription>
                  Guide for upgrading from SDK v1.x to v2.x with breaking changes and new features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  <Book className="mr-2 h-3 w-3" />
                  View Migration Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DocLayout>
  );
};

export default SDKs;
