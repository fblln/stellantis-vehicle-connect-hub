
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, Shield, Zap, CheckCircle } from "lucide-react";

const Webhooks = () => {
  const webhookSetup = {
    curl: `curl -X POST "https://api.stellantis-cv.com/v1/webhooks" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/stellantis",
    "events": [
      "vehicle.location.updated",
      "vehicle.diagnostic.alert",
      "vehicle.door.locked"
    ],
    "secret": "your_webhook_secret"
  }'`,
    
    javascript: `const webhook = await client.webhooks.create({
  url: 'https://your-app.com/webhooks/stellantis',
  events: [
    'vehicle.location.updated',
    'vehicle.diagnostic.alert',
    'vehicle.door.locked'
  ],
  secret: 'your_webhook_secret'
});

console.log('Webhook created:', webhook.id);`,
    
    python: `webhook = client.webhooks.create({
    'url': 'https://your-app.com/webhooks/stellantis',
    'events': [
        'vehicle.location.updated',
        'vehicle.diagnostic.alert',
        'vehicle.door.locked'
    ],
    'secret': 'your_webhook_secret'
})

print(f'Webhook created: {webhook["id"]}')`
  };

  const webhookPayload = `{
  "id": "evt_1234567890",
  "type": "vehicle.location.updated",
  "created": "2023-11-01T14:30:00Z",
  "data": {
    "vehicle_id": "veh_123456789",
    "location": {
      "latitude": 48.8566,
      "longitude": 2.3522,
      "accuracy": 5.2,
      "timestamp": "2023-11-01T14:29:45Z",
      "address": {
        "street": "Avenue des Champs-Élysées",
        "city": "Paris",
        "country": "France"
      }
    },
    "previous_location": {
      "latitude": 48.8560,
      "longitude": 2.3515,
      "timestamp": "2023-11-01T14:25:30Z"
    }
  }
}`;

const verificationCode = {
  javascript: `const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  const actualSignature = signature.replace('sha256=', '');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(actualSignature, 'hex')
  );
}

// Express.js example
app.post('/webhooks/stellantis', (req, res) => {
  const signature = req.headers['x-stellantis-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhook(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Unauthorized');
  }
  
  const event = req.body;
  console.log('Received event:', event.type);
  
  // Process the event
  switch (event.type) {
    case 'vehicle.location.updated':
      handleLocationUpdate(event.data);
      break;
    case 'vehicle.diagnostic.alert':
      handleDiagnosticAlert(event.data);
      break;
  }
  
  res.status(200).send('OK');
});`,

python: `import hmac
import hashlib
from flask import Flask, request, abort

app = Flask(__name__)

def verify_webhook(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    actual_signature = signature.replace('sha256=', '')
    
    return hmac.compare_digest(expected_signature, actual_signature)

@app.route('/webhooks/stellantis', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Stellantis-Signature')
    payload = request.get_data(as_text=True)
    
    if not verify_webhook(payload, signature, WEBHOOK_SECRET):
        abort(401)
    
    event = request.json
    print(f'Received event: {event["type"]}')
    
    # Process the event
    if event['type'] == 'vehicle.location.updated':
        handle_location_update(event['data'])
    elif event['type'] == 'vehicle.diagnostic.alert':
        handle_diagnostic_alert(event['data'])
    
    return 'OK', 200`
};

const eventTypes = [
  {
    name: "vehicle.location.updated",
    description: "Triggered when vehicle location changes significantly",
    badge: "Popular"
  },
  {
    name: "vehicle.diagnostic.alert",
    description: "Sent when diagnostic issues are detected",
    badge: "Critical"
  },
  {
    name: "vehicle.door.locked",
    description: "Triggered when vehicle doors are locked",
    badge: ""
  },
  {
    name: "vehicle.door.unlocked",
    description: "Triggered when vehicle doors are unlocked",
    badge: ""
  },
  {
    name: "vehicle.engine.started",
    description: "Sent when vehicle engine is started",
    badge: ""
  },
  {
    name: "vehicle.engine.stopped",
    description: "Sent when vehicle engine is stopped",
    badge: ""
  },
  {
    name: "vehicle.battery.low",
    description: "Alert when vehicle battery is running low",
    badge: "Alert"
  }
];

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Webhooks</h1>
          <p className="text-xl text-muted-foreground">
            Receive real-time notifications about vehicle events through secure webhook endpoints.
          </p>
        </div>

        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Bell className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Real-time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive instant notifications when vehicle events occur, without polling.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Secure Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  HMAC-SHA256 signatures ensure webhook authenticity and integrity.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatic retries and exponential backoff ensure delivery.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Setting up Webhooks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Setting up Webhooks</h2>
          <p className="text-muted-foreground">
            Create webhook endpoints to receive real-time notifications about vehicle events.
          </p>
          
          <CodeBlock
            multiLanguage={webhookSetup}
            title="Create Webhook Endpoint"
          />
        </section>

        {/* Event Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Available Event Types</h2>
          <div className="space-y-3">
            {eventTypes.map((event, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-mono text-sm">{event.name}</CardTitle>
                    {event.badge && (
                      <Badge variant={
                        event.badge === "Popular" ? "default" :
                        event.badge === "Critical" ? "destructive" :
                        event.badge === "Alert" ? "outline" : "secondary"
                      }>
                        {event.badge}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Webhook Payload */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Webhook Payload</h2>
          <p className="text-muted-foreground">
            All webhooks follow a consistent payload structure with event data and metadata.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Example Payload</CardTitle>
              <CardDescription>
                Location update event payload structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={webhookPayload}
                language="json"
              />
            </CardContent>
          </Card>
        </section>

        {/* Verification */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Webhook Verification</h2>
          <p className="text-muted-foreground">
            Verify webhook authenticity using HMAC-SHA256 signatures to ensure security.
          </p>
          
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Always verify webhook signatures to prevent unauthorized requests to your endpoints.
            </AlertDescription>
          </Alert>
          
          <CodeBlock
            multiLanguage={verificationCode}
            title="Webhook Verification"
          />
        </section>

        {/* Best Practices */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Best Practices</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reliability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Respond with 2xx status codes for successful processing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Process webhooks idempotently using event IDs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Handle webhook processing asynchronously</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Always verify webhook signatures</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use HTTPS endpoints for webhook URLs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Store webhook secrets securely</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Troubleshooting</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Common Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium">Webhook Timeouts</h4>
                  <p className="text-sm text-muted-foreground">Ensure your endpoint responds within 10 seconds</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium">Signature Verification Failures</h4>
                  <p className="text-sm text-muted-foreground">Check your webhook secret and signature calculation</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">Duplicate Events</h4>
                  <p className="text-sm text-muted-foreground">Use event IDs to implement idempotent processing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DocLayout>
  );
};

export default Webhooks;
