
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, MapPin, Wrench, Zap, Lock, Bell } from "lucide-react";

const ApiReference = () => {
  const endpoints = [
    {
      category: "Vehicles",
      icon: Car,
      description: "Manage and retrieve vehicle information",
      endpoints: [
        {
          method: "GET",
          path: "/v1/vehicles",
          description: "List all vehicles",
          scopes: ["vehicles:read"]
        },
        {
          method: "GET",
          path: "/v1/vehicles/{id}",
          description: "Get vehicle details",
          scopes: ["vehicles:read"]
        },
        {
          method: "GET",
          path: "/v1/vehicles/{id}/status",
          description: "Get vehicle status",
          scopes: ["vehicles:read"]
        }
      ]
    },
    {
      category: "Location",
      icon: MapPin,
      description: "Access vehicle location and tracking data",
      endpoints: [
        {
          method: "GET",
          path: "/v1/vehicles/{id}/location",
          description: "Get current vehicle location",
          scopes: ["vehicles:location"]
        },
        {
          method: "GET",
          path: "/v1/vehicles/{id}/location/history",
          description: "Get location history",
          scopes: ["vehicles:location"]
        }
      ]
    },
    {
      category: "Diagnostics",
      icon: Wrench,
      description: "Vehicle diagnostic and maintenance data",
      endpoints: [
        {
          method: "GET",
          path: "/v1/vehicles/{id}/diagnostics",
          description: "Get diagnostic data",
          scopes: ["vehicles:diagnostics"]
        },
        {
          method: "GET",
          path: "/v1/vehicles/{id}/health",
          description: "Get vehicle health status",
          scopes: ["vehicles:diagnostics"]
        }
      ]
    },
    {
      category: "Controls",
      icon: Lock,
      description: "Send commands to vehicles",
      endpoints: [
        {
          method: "POST",
          path: "/v1/vehicles/{id}/lock",
          description: "Lock vehicle doors",
          scopes: ["vehicles:control"]
        },
        {
          method: "POST",
          path: "/v1/vehicles/{id}/unlock",
          description: "Unlock vehicle doors",
          scopes: ["vehicles:control"]
        },
        {
          method: "POST",
          path: "/v1/vehicles/{id}/engine/start",
          description: "Start vehicle engine",
          scopes: ["vehicles:control"]
        }
      ]
    }
  ];

  const vehicleListExample = {
    request: `GET /v1/vehicles
Authorization: Bearer {access_token}
Content-Type: application/json`,
    
    response: `{
  "data": [
    {
      "id": "veh_123456789",
      "vin": "1HGBH41JXMN109186",
      "make": "Peugeot",
      "model": "3008",
      "year": 2023,
      "color": "Metallic Blue",
      "status": "active",
      "location": {
        "latitude": 48.8566,
        "longitude": 2.3522,
        "address": "Paris, France"
      },
      "created_at": "2023-01-15T10:30:00Z",
      "updated_at": "2023-11-01T14:22:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 1,
    "total_pages": 1
  }
}`
  };

  const vehicleLocationCode = {
    curl: `curl -X GET "https://api.stellantis-cv.com/v1/vehicles/veh_123456789/location" \\
  -H "Authorization: Bearer {access_token}"`,
    
    javascript: `const location = await client.vehicles.getLocation('veh_123456789');
console.log('Vehicle location:', location);`,
    
    python: `location = client.vehicles.get_location('veh_123456789')
print(f'Vehicle location: {location}')`
  };

  const locationResponse = `{
  "data": {
    "latitude": 48.8566,
    "longitude": 2.3522,
    "altitude": 35.5,
    "accuracy": 5.2,
    "speed": 0,
    "heading": 180,
    "address": {
      "street": "Avenue des Champs-Élysées",
      "city": "Paris",
      "state": "Île-de-France",
      "country": "France",
      "postal_code": "75008"
    },
    "timestamp": "2023-11-01T14:22:15Z"
  }
}`;

  const errorCodes = [
    { code: "400", title: "Bad Request", description: "Invalid request format or parameters" },
    { code: "401", title: "Unauthorized", description: "Invalid or missing authentication token" },
    { code: "403", title: "Forbidden", description: "Insufficient permissions for the requested resource" },
    { code: "404", title: "Not Found", description: "Vehicle or resource not found" },
    { code: "429", title: "Too Many Requests", description: "Rate limit exceeded" },
    { code: "500", title: "Internal Server Error", description: "Unexpected server error" }
  ];

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">API Reference</h1>
          <p className="text-xl text-muted-foreground">
            Complete reference for all Stellantis Connected Vehicles API endpoints.
          </p>
        </div>

        {/* Base URL */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Base URL</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge>Production</Badge>
                  <code className="text-sm bg-muted px-2 py-1 rounded">https://api.stellantis-cv.com</code>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Sandbox</Badge>
                  <code className="text-sm bg-muted px-2 py-1 rounded">https://api-sandbox.stellantis-cv.com</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Endpoints by Category */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Endpoints</h2>
          
          {endpoints.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <category.icon className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle>{category.category}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.endpoints.map((endpoint, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge variant={
                          endpoint.method === "GET" ? "secondary" :
                          endpoint.method === "POST" ? "default" :
                          endpoint.method === "PUT" ? "outline" : "destructive"
                        }>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm">{endpoint.path}</code>
                        <span className="text-sm text-muted-foreground">{endpoint.description}</span>
                      </div>
                      <div className="flex space-x-1">
                        {endpoint.scopes.map((scope, scopeIdx) => (
                          <Badge key={scopeIdx} variant="outline" className="text-xs">
                            {scope}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Detailed Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Detailed Examples</h2>
          
          {/* Vehicle List Example */}
          <Card>
            <CardHeader>
              <CardTitle>List Vehicles</CardTitle>
              <CardDescription>Retrieve a list of all vehicles associated with your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="request" className="w-full">
                <TabsList>
                  <TabsTrigger value="request">Request</TabsTrigger>
                  <TabsTrigger value="response">Response</TabsTrigger>
                </TabsList>
                <TabsContent value="request">
                  <CodeBlock
                    code={vehicleListExample.request}
                    language="http"
                  />
                </TabsContent>
                <TabsContent value="response">
                  <CodeBlock
                    code={vehicleListExample.response}
                    language="json"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Vehicle Location Example */}
          <Card>
            <CardHeader>
              <CardTitle>Get Vehicle Location</CardTitle>
              <CardDescription>Retrieve the current location of a specific vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="code" className="w-full">
                <TabsList>
                  <TabsTrigger value="code">Code Examples</TabsTrigger>
                  <TabsTrigger value="response">Response</TabsTrigger>
                </TabsList>
                <TabsContent value="code">
                  <CodeBlock
                    multiLanguage={vehicleLocationCode}
                    title="Get Vehicle Location"
                  />
                </TabsContent>
                <TabsContent value="response">
                  <CodeBlock
                    code={locationResponse}
                    language="json"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Rate Limits */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Rate Limits</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1,000</div>
                  <div className="text-sm text-muted-foreground">Requests per hour</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50</div>
                  <div className="text-sm text-muted-foreground">Requests per minute</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">10</div>
                  <div className="text-sm text-muted-foreground">Concurrent requests</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Error Codes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Error Codes</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {errorCodes.map((error, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant={
                      error.code.startsWith('2') ? 'secondary' :
                      error.code.startsWith('4') ? 'destructive' : 'outline'
                    }>
                      {error.code}
                    </Badge>
                    <CardTitle className="text-lg">{error.title}</CardTitle>
                  </div>
                  <CardDescription>{error.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </DocLayout>
  );
};

export default ApiReference;
