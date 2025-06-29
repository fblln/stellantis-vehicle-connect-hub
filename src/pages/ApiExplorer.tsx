
import { useState } from "react";
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import { Play, Send } from "lucide-react";

const ApiExplorer = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState("/v1/vehicles");
  const [method, setMethod] = useState("GET");
  const [authToken, setAuthToken] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    { path: "/v1/vehicles", method: "GET", description: "List all vehicles" },
    { path: "/v1/vehicles/{id}", method: "GET", description: "Get vehicle details" },
    { path: "/v1/vehicles/{id}/location", method: "GET", description: "Get vehicle location" },
    { path: "/v1/vehicles/{id}/diagnostics", method: "GET", description: "Get diagnostics" },
    { path: "/v1/vehicles/{id}/lock", method: "POST", description: "Lock vehicle" },
    { path: "/v1/vehicles/{id}/unlock", method: "POST", description: "Unlock vehicle" }
  ];

  const handleSendRequest = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResponse = {
        "/v1/vehicles": {
          data: [
            {
              id: "veh_123456789",
              vin: "1HGBH41JXMN109186",
              make: "Peugeot",
              model: "3008",
              year: 2023,
              status: "active"
            }
          ]
        },
        "/v1/vehicles/{id}": {
          data: {
            id: vehicleId || "veh_123456789",
            vin: "1HGBH41JXMN109186",
            make: "Peugeot",
            model: "3008",
            year: 2023,
            color: "Metallic Blue",
            status: "active"
          }
        },
        "/v1/vehicles/{id}/location": {
          data: {
            latitude: 48.8566,
            longitude: 2.3522,
            address: "Paris, France",
            timestamp: new Date().toISOString()
          }
        }
      };

      setResponse(JSON.stringify(mockResponse[selectedEndpoint] || { message: "Success" }, null, 2));
      setIsLoading(false);
    }, 1000);
  };

  const generateCurlCommand = () => {
    const url = `https://api-sandbox.stellantis-cv.com${selectedEndpoint.replace('{id}', vehicleId || 'VEHICLE_ID')}`;
    return `curl -X ${method} "${url}" \\
  -H "Authorization: Bearer ${authToken || 'YOUR_ACCESS_TOKEN'}" \\
  -H "Content-Type: application/json"`;
  };

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">API Explorer</h1>
          <p className="text-xl text-muted-foreground">
            Test API endpoints interactively and see real-time responses.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Request Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Request Builder</span>
              </CardTitle>
              <CardDescription>
                Configure and send API requests to test endpoints
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Endpoint Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Endpoint</label>
                <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {endpoints.map((endpoint) => (
                      <SelectItem key={endpoint.path} value={endpoint.path}>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {endpoint.method}
                          </Badge>
                          <span className="font-mono text-sm">{endpoint.path}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Method */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Method</label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Auth Token */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Authorization Token</label>
                <Input
                  type="password"
                  placeholder="Bearer token..."
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                />
              </div>

              {/* Vehicle ID (if needed) */}
              {selectedEndpoint.includes('{id}') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle ID</label>
                  <Input
                    placeholder="veh_123456789"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                  />
                </div>
              )}

              {/* Send Button */}
              <Button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Request
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Response */}
          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
              <CardDescription>
                API response will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="response" className="w-full">
                <TabsList>
                  <TabsTrigger value="response">Response</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>
                <TabsContent value="response">
                  {response ? (
                    <CodeBlock
                      code={response}
                      language="json"
                      title="Response Body"
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                      Click "Send Request" to see the response
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="curl">
                  <CodeBlock
                    code={generateCurlCommand()}
                    language="bash"
                    title="Equivalent cURL Command"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Quick Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Examples</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
              setSelectedEndpoint("/v1/vehicles");
              setMethod("GET");
            }}>
              <CardHeader>
                <CardTitle className="text-lg">List Vehicles</CardTitle>
                <CardDescription>Get all vehicles in your account</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
              setSelectedEndpoint("/v1/vehicles/{id}/location");
              setMethod("GET");
            }}>
              <CardHeader>
                <CardTitle className="text-lg">Get Location</CardTitle>
                <CardDescription>Retrieve vehicle's current location</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
              setSelectedEndpoint("/v1/vehicles/{id}/lock");
              setMethod("POST");
            }}>
              <CardHeader>
                <CardTitle className="text-lg">Lock Vehicle</CardTitle>
                <CardDescription>Send lock command to vehicle</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>
    </DocLayout>
  );
};

export default ApiExplorer;
