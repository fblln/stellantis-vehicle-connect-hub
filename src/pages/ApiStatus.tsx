
import { useState, useEffect } from "react";
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle, Clock, TrendingUp, Activity } from "lucide-react";

const ApiStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      name: "Core API",
      status: "operational",
      uptime: 99.99,
      responseTime: 145,
      description: "Main API endpoints for vehicle data access"
    },
    {
      name: "Authentication Service",
      status: "operational",
      uptime: 99.98,
      responseTime: 89,
      description: "OAuth 2.0 authentication and token management"
    },
    {
      name: "Location Services",
      status: "operational",
      uptime: 99.97,
      responseTime: 234,
      description: "Vehicle location and tracking services"
    },
    {
      name: "Webhook Delivery",
      status: "degraded",
      uptime: 99.85,
      responseTime: 567,
      description: "Real-time event notifications via webhooks"
    },
    {
      name: "Diagnostic Services",
      status: "operational",
      uptime: 99.96,
      responseTime: 198,
      description: "Vehicle diagnostic and health monitoring"
    },
    {
      name: "Control Commands",
      status: "operational",
      uptime: 99.94,
      responseTime: 312,
      description: "Vehicle control operations (lock/unlock, start/stop)"
    }
  ];

  const incidents = [
    {
      id: "INC-2023-1101-001",
      title: "Intermittent webhook delivery delays",
      status: "investigating",
      severity: "minor",
      started: "2023-11-01T14:30:00Z",
      description: "Some webhook events are experiencing delivery delays of 2-5 minutes."
    },
    {
      id: "INC-2023-1031-002",
      title: "Elevated API response times",
      status: "resolved",
      severity: "minor",
      started: "2023-10-31T09:15:00Z",
      resolved: "2023-10-31T10:45:00Z",
      description: "API response times were elevated due to increased traffic. Issue resolved by scaling infrastructure."
    },
    {
      id: "INC-2023-1029-001",
      title: "Authentication service maintenance",
      status: "resolved",
      severity: "maintenance",
      started: "2023-10-29T02:00:00Z",
      resolved: "2023-10-29T04:00:00Z",
      description: "Scheduled maintenance to improve authentication service performance."
    }
  ];

  const metrics = [
    {
      name: "API Requests (24h)",
      value: "12.4M",
      change: "+5.2%",
      trend: "up"
    },
    {
      name: "Average Response Time",
      value: "189ms",
      change: "-12ms",
      trend: "down"
    },
    {
      name: "Success Rate",
      value: "99.97%",
      change: "+0.02%",
      trend: "up"
    },
    {
      name: "Active Webhooks",
      value: "8,432",
      change: "+234",
      trend: "up"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "outage":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Operational</Badge>;
      case "degraded":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Degraded</Badge>;
      case "outage":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Outage</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getIncidentBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "major":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Major</Badge>;
      case "minor":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Minor</Badge>;
      case "maintenance":
        return <Badge variant="outline">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">API Status</h1>
              <p className="text-xl text-muted-foreground">
                Real-time status and performance metrics for the Stellantis Connected Vehicles API.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Last updated</div>
              <div className="font-mono text-sm">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Overall Status */}
        <section className="space-y-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <CardTitle className="text-green-800">All Systems Operational</CardTitle>
              </div>
              <CardDescription className="text-green-700">
                All API services are functioning normally with minor degradation in webhook delivery.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Service Status */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Service Status</h2>
          
          <div className="space-y-3">
            {services.map((service, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{service.uptime}% uptime</div>
                        <div className="text-xs text-muted-foreground">{service.responseTime}ms avg</div>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Performance Metrics</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardDescription>{metric.name}</CardDescription>
                    <TrendingUp className={`h-4 w-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{metric.value}</CardTitle>
                  <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} from yesterday
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Uptime Chart */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Uptime History (90 days)</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall Uptime: 99.97%</CardTitle>
              <CardDescription>Green indicates 100% uptime, yellow indicates degraded performance, red indicates outages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-0.5">
                {Array.from({ length: 90 }, (_, i) => {
                  const uptimePercent = Math.random() > 0.02 ? 100 : Math.random() > 0.5 ? 95 : 85;
                  const color = uptimePercent === 100 ? 'bg-green-500' : uptimePercent > 90 ? 'bg-yellow-500' : 'bg-red-500';
                  return (
                    <div
                      key={i}
                      className={`h-8 w-2 ${color} rounded-sm`}
                      title={`Day ${90 - i}: ${uptimePercent}% uptime`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Incidents */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Recent Incidents</h2>
          
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <CardDescription>
                          Started: {new Date(incident.started).toLocaleString()}
                          {incident.resolved && ` • Resolved: ${new Date(incident.resolved).toLocaleString()}`}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getIncidentBadge(incident.severity)}
                      <Badge variant={incident.status === 'resolved' ? 'secondary' : 'default'}>
                        {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{incident.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Subscribe to Updates */}
        <section className="border-t pt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stay Updated</CardTitle>
              <CardDescription>
                Subscribe to status updates and incident notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="pt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Subscribe
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                You can also follow us on Twitter <a href="#" className="text-blue-600">@StellantisDevs</a> for real-time updates.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </DocLayout>
  );
};

export default ApiStatus;
