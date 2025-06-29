
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Zap, Shield, Clock, TrendingUp } from "lucide-react";

const BestPractices = () => {
  const rateLimitingCode = `// Implement exponential backoff for rate limits
class ApiClient {
  constructor() {
    this.retryDelays = [1000, 2000, 4000, 8000]; // ms
  }
  
  async makeRequest(endpoint, options = {}, retryIndex = 0) {
    try {
      const response = await fetch(endpoint, options);
      
      if (response.status === 429) {
        if (retryIndex < this.retryDelays.length) {
          await this.delay(this.retryDelays[retryIndex]);
          return this.makeRequest(endpoint, options, retryIndex + 1);
        }
        throw new Error('Rate limit exceeded');
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}`;

  const cachingCode = `// Implement intelligent caching for vehicle data
class VehicleDataCache {
  constructor() {
    this.cache = new Map();
    this.ttl = 5 * 60 * 1000; // 5 minutes
  }
  
  async getVehicleLocation(vehicleId) {
    const cacheKey = \`location_\${vehicleId}\`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data;
    }
    
    const location = await api.vehicles.getLocation(vehicleId);
    this.cache.set(cacheKey, {
      data: location,
      timestamp: Date.now()
    });
    
    return location;
  }
  
  async getVehicleStatus(vehicleId) {
    // Status data changes less frequently - longer TTL
    const cacheKey = \`status_\${vehicleId}\`;
    const ttl = 15 * 60 * 1000; // 15 minutes
    
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
    
    const status = await api.vehicles.getStatus(vehicleId);
    this.cache.set(cacheKey, {
      data: status,
      timestamp: Date.now()
    });
    
    return status;
  }
}`;

  const errorHandlingCode = `// Comprehensive error handling
class ApiErrorHandler {
  static handle(error, context = {}) {
    switch (error.status) {
      case 400:
        console.error('Bad Request:', error.message, context);
        throw new Error('Invalid request parameters');
        
      case 401:
        console.error('Unauthorized:', error.message);
        // Trigger token refresh
        return this.refreshTokenAndRetry(context);
        
      case 403:
        console.error('Forbidden:', error.message, context);
        throw new Error('Insufficient permissions');
        
      case 404:
        console.error('Not Found:', error.message, context);
        throw new Error('Vehicle not found');
        
      case 429:
        console.warn('Rate Limited:', error.message);
        // Implement backoff strategy
        return this.handleRateLimit(context);
        
      case 500:
      case 502:
      case 503:
        console.error('Server Error:', error.message);
        // Retry with exponential backoff
        return this.retryWithBackoff(context);
        
      default:
        console.error('Unknown Error:', error);
        throw error;
    }
  }
  
  static async refreshTokenAndRetry(context) {
    try {
      await auth.refreshToken();
      return context.retryOriginalRequest();
    } catch (refreshError) {
      throw new Error('Authentication failed');
    }
  }
}`;

  const batchingCode = `// Batch multiple requests efficiently
class BatchRequestManager {
  constructor() {
    this.batchSize = 10;
    this.batchDelay = 100; // ms
    this.pendingRequests = [];
  }
  
  async getMultipleVehicleLocations(vehicleIds) {
    // Split into batches to avoid overwhelming the API
    const batches = this.chunkArray(vehicleIds, this.batchSize);
    const results = [];
    
    for (const batch of batches) {
      const batchPromises = batch.map(id => 
        this.getLocationWithRetry(id)
      );
      
      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults);
      
      // Small delay between batches
      if (batches.indexOf(batch) < batches.length - 1) {
        await this.delay(this.batchDelay);
      }
    }
    
    return results;
  }
  
  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}`;

  const practices = [
    {
      category: "Performance",
      icon: Zap,
      color: "text-yellow-600",
      practices: [
        "Implement intelligent caching with appropriate TTL values",
        "Use batch requests for multiple vehicle operations",
        "Implement connection pooling for high-volume applications",
        "Cache authentication tokens and refresh proactively"
      ]
    },
    {
      category: "Security",
      icon: Shield,
      color: "text-green-600",
      practices: [
        "Store API credentials securely in environment variables",
        "Implement proper token refresh mechanisms",
        "Use HTTPS for all API communications",
        "Validate and sanitize all input data"
      ]
    },
    {
      category: "Reliability",
      icon: Clock,
      color: "text-blue-600",
      practices: [
        "Implement exponential backoff for retries",
        "Handle rate limiting gracefully",
        "Use circuit breakers for external dependencies",
        "Monitor API usage and set up alerts"
      ]
    },
    {
      category: "Scalability",
      icon: TrendingUp,
      color: "text-purple-600",
      practices: [
        "Design for horizontal scaling from the start",
        "Implement proper database indexing strategies",
        "Use message queues for async processing",
        "Monitor and optimize database queries"
      ]
    }
  ];

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Best Practices & Optimization</h1>
          <p className="text-xl text-muted-foreground">
            Learn industry best practices for building robust, scalable applications with the Stellantis Connected Vehicles API.
          </p>
        </div>

        {/* Overview */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Key Areas of Focus</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {practices.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <category.icon className={`h-8 w-8 ${category.color}`} />
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.practices.map((practice, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Rate Limiting */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Handling Rate Limits</h2>
          <p className="text-muted-foreground">
            Implement exponential backoff and intelligent retry logic to handle rate limits gracefully.
          </p>
          
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              The API enforces rate limits of 1,000 requests per hour and 50 requests per minute per client.
            </AlertDescription>
          </Alert>
          
          <CodeBlock
            code={rateLimitingCode}
            language="javascript"
            title="Rate Limiting with Exponential Backoff"
          />
        </section>

        {/* Caching Strategies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Intelligent Caching</h2>
          <p className="text-muted-foreground">
            Implement smart caching strategies to reduce API calls and improve application performance.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended TTL Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-mono text-sm">Vehicle Location</span>
                  <span className="text-sm text-muted-foreground">5 minutes</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-mono text-sm">Vehicle Status</span>
                  <span className="text-sm text-muted-foreground">15 minutes</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-mono text-sm">Vehicle Info</span>
                  <span className="text-sm text-muted-foreground">1 hour</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-mono text-sm">Diagnostic Data</span>
                  <span className="text-sm text-muted-foreground">30 minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <CodeBlock
            code={cachingCode}
            language="javascript"
            title="Intelligent Caching Implementation"
          />
        </section>

        {/* Error Handling */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Robust Error Handling</h2>
          <p className="text-muted-foreground">
            Implement comprehensive error handling to build resilient applications.
          </p>
          
          <CodeBlock
            code={errorHandlingCode}
            language="javascript"
            title="Comprehensive Error Handling"
          />
        </section>

        {/* Batch Processing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Batch Processing</h2>
          <p className="text-muted-foreground">
            Optimize performance by batching multiple requests and managing concurrent operations.
          </p>
          
          <CodeBlock
            code={batchingCode}
            language="javascript"
            title="Efficient Batch Processing"
          />
        </section>

        {/* Monitoring & Observability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Monitoring & Observability</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics to Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>API response times and latency</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Error rates and failure patterns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Rate limit consumption</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cache hit/miss ratios</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Application Performance Monitoring (APM)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Structured logging with correlation IDs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Health check endpoints</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Alert thresholds and notifications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Common Pitfalls to Avoid</h2>
          
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Polling too frequently:</strong> Don't poll vehicle location more than once every 5 minutes unless absolutely necessary.
              </AlertDescription>
            </Alert>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Ignoring rate limits:</strong> Always implement proper rate limiting and backoff strategies to avoid API blocks.
              </AlertDescription>
            </Alert>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Not handling timeouts:</strong> Set appropriate timeouts for API requests and handle timeout scenarios gracefully.
              </AlertDescription>
            </Alert>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Storing credentials insecurely:</strong> Never hardcode API credentials in your source code or store them in plain text.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </div>
    </DocLayout>
  );
};

export default BestPractices;
