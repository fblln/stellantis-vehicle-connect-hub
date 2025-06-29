
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Key, Clock, AlertTriangle } from "lucide-react";

const Authentication = () => {
  const tokenRequest = {
    curl: `curl -X POST "https://api.stellantis-cv.com/auth/token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "grant_type": "client_credentials",
    "scope": "vehicles:read vehicles:location"
  }'`,
    
    javascript: `const response = await fetch('https://api.stellantis-cv.com/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    client_id: 'your_client_id',
    client_secret: 'your_client_secret',
    grant_type: 'client_credentials',
    scope: 'vehicles:read vehicles:location'
  })
});

const tokenData = await response.json();
console.log('Access token:', tokenData.access_token);`,
    
    python: `import requests

response = requests.post('https://api.stellantis-cv.com/auth/token', json={
    'client_id': 'your_client_id',
    'client_secret': 'your_client_secret',
    'grant_type': 'client_credentials',
    'scope': 'vehicles:read vehicles:location'
})

token_data = response.json()
print(f'Access token: {token_data["access_token"]}')`
  };

  const tokenResponse = `{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbGllbnRfaWQiLCJhdWQiOiJzdGVsbGFudGlzLWN2IiwiaWF0IjoxNjk5MzUzNjAwLCJleHAiOjE2OTkzNTcyMDAsInNjb3BlIjoidmVoaWNsZXM6cmVhZCB2ZWhpY2xlczpsb2NhdGlvbiJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "vehicles:read vehicles:location"
}`;

  const apiRequest = {
    curl: `curl -X GET "https://api.stellantis-cv.com/v1/vehicles" \\
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \\
  -H "Content-Type: application/json"`,
    
    javascript: `const response = await fetch('https://api.stellantis-cv.com/v1/vehicles', {
  headers: {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json'
  }
});

const vehicles = await response.json();`,
    
    python: `headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.stellantis-cv.com/v1/vehicles', headers=headers)
vehicles = response.json()`
  };

  const scopes = [
    {
      name: "vehicles:read",
      description: "Read vehicle information and basic data",
      level: "Basic"
    },
    {
      name: "vehicles:location",
      description: "Access vehicle location and tracking data",
      level: "Standard"
    },
    {
      name: "vehicles:diagnostics",
      description: "Access vehicle diagnostic and health data",
      level: "Advanced"
    },
    {
      name: "vehicles:control",
      description: "Send commands to vehicles (lock/unlock, start/stop)",
      level: "Premium"
    },
    {
      name: "webhooks:manage",
      description: "Create and manage webhook subscriptions",
      level: "Standard"
    }
  ];

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Authentication & Authorization</h1>
          <p className="text-xl text-muted-foreground">
            Learn how to authenticate your application and manage access to vehicle data using OAuth 2.0.
          </p>
        </div>

        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">OAuth 2.0 Flow</h2>
          <p className="text-muted-foreground">
            The Stellantis Connected Vehicles API uses OAuth 2.0 Client Credentials flow for authentication. 
            This ensures secure access to vehicle data while maintaining user privacy and data protection.
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Key className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Industry-standard OAuth 2.0 with JWT tokens for maximum security.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Scoped Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Granular permissions ensure applications only access necessary data.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Token Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatic token refresh and expiration handling in our SDKs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Getting Access Token */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Getting an Access Token</h2>
          <p className="text-muted-foreground">
            To access the API, you first need to obtain an access token using your client credentials.
          </p>
          
          <CodeBlock
            multiLanguage={tokenRequest}
            title="Token Request"
          />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Token Response</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={tokenResponse}
                language="json"
              />
            </CardContent>
          </Card>
        </section>

        {/* Using Access Token */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Using the Access Token</h2>
          <p className="text-muted-foreground">
            Include the access token in the Authorization header of your API requests.
          </p>
          
          <CodeBlock
            multiLanguage={apiRequest}
            title="Authenticated API Request"
          />
        </section>

        {/* Scopes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Available Scopes</h2>
          <p className="text-muted-foreground">
            Scopes define what data your application can access. Request only the scopes you need.
          </p>
          
          <div className="space-y-3">
            {scopes.map((scope, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-mono text-sm">{scope.name}</CardTitle>
                    <Badge variant={
                      scope.level === "Basic" ? "secondary" :
                      scope.level === "Standard" ? "default" :
                      scope.level === "Advanced" ? "outline" : "destructive"
                    }>
                      {scope.level}
                    </Badge>
                  </div>
                  <CardDescription>{scope.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Security Best Practices</h2>
          
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Never expose your client secret</strong> - Keep your client credentials secure and never include them in client-side code.
              </AlertDescription>
            </Alert>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Store credentials as environment variables, never in code</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use HTTPS for all API communications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Implement proper token refresh logic</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use the minimum required scopes for your application</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Monitor API usage and implement rate limiting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Error Handling */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Error Handling</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Common Authentication Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium">401 Unauthorized</h4>
                  <p className="text-sm text-muted-foreground">Invalid or expired access token</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium">403 Forbidden</h4>
                  <p className="text-sm text-muted-foreground">Insufficient permissions for the requested resource</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">400 Bad Request</h4>
                  <p className="text-sm text-muted-foreground">Invalid client credentials or malformed request</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DocLayout>
  );
};

export default Authentication;
