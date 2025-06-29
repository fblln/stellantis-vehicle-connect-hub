
import { DocLayout } from "@/components/layout/doc-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Wrench, AlertTriangle, Trash2 } from "lucide-react";

const Changelog = () => {
  const releases = [
    {
      version: "v2.1.0",
      date: "2023-11-01",
      type: "minor",
      changes: [
        {
          type: "added",
          title: "Enhanced Vehicle Diagnostics",
          description: "Added new diagnostic endpoints for battery health, tire pressure, and fluid levels."
        },
        {
          type: "added",
          title: "Webhook Event Filtering",
          description: "Added ability to filter webhook events by vehicle ID and event type."
        },
        {
          type: "improved",
          title: "Location Accuracy",
          description: "Improved location accuracy for European markets with enhanced GPS processing."
        },
        {
          type: "fixed",
          title: "Rate Limiting Headers",
          description: "Fixed issue where rate limiting headers were not properly returned in all responses."
        }
      ]
    },
    {
      version: "v2.0.5",
      date: "2023-10-15",
      type: "patch",
      changes: [
        {
          type: "fixed",
          title: "Authentication Token Refresh",
          description: "Fixed race condition in token refresh mechanism that could cause temporary authentication failures."
        },
        {
          type: "improved",
          title: "Error Response Format",
          description: "Standardized error response format across all endpoints for better consistency."
        }
      ]
    },
    {
      version: "v2.0.4",
      date: "2023-10-01",
      type: "patch",
      changes: [
        {
          type: "fixed",
          title: "Webhook Signature Validation",
          description: "Fixed webhook signature validation for events with special characters in payload."
        },
        {
          type: "improved",
          title: "API Documentation",
          description: "Updated API documentation with more detailed examples and use cases."
        }
      ]
    },
    {
      version: "v2.0.0",
      date: "2023-09-15",
      type: "major",
      changes: [
        {
          type: "added",
          title: "Real-time Vehicle Controls",
          description: "Added support for real-time vehicle control commands including remote start, lock/unlock, and climate control."
        },
        {
          type: "added",
          title: "Enhanced Webhook System",
          description: "Completely redesigned webhook system with improved reliability and new event types."
        },
        {
          type: "breaking",
          title: "Authentication Flow Update",
          description: "Updated OAuth 2.0 implementation to use PKCE for enhanced security. Old authentication method deprecated."
        },
        {
          type: "breaking",
          title: "API Response Format Changes",
          description: "Standardized response format across all endpoints. Some field names have changed for consistency."
        },
        {
          type: "deprecated",
          title: "Legacy Location Endpoint",
          description: "Deprecated /v1/location endpoint in favor of new /v2/vehicles/{id}/location endpoint."
        },
        {
          type: "removed",
          title: "Basic Authentication",
          description: "Removed support for basic authentication. All requests must use OAuth 2.0 tokens."
        }
      ]
    },
    {
      version: "v1.8.3",
      date: "2023-08-20",
      type: "patch",
      changes: [
        {
          type: "fixed",
          title: "Vehicle Status Caching",
          description: "Fixed issue where vehicle status updates were not properly invalidating cache."
        },
        {
          type: "improved",
          title: "Rate Limiting",
          description: "Improved rate limiting algorithm to be more fair across different client types."
        }
      ]
    },
    {
      version: "v1.8.2",
      date: "2023-08-01",
      type: "patch",
      changes: [
        {
          type: "added",
          title: "Fleet Management Endpoints",
          description: "Added new endpoints specifically designed for fleet management use cases."
        },
        {
          type: "fixed",
          title: "Timezone Handling",
          description: "Fixed timezone inconsistencies in timestamp fields across different endpoints."
        },
        {
          type: "improved",
          title: "SDK Performance",
          description: "Improved performance of official SDKs with better connection pooling and caching."
        }
      ]
    }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "added":
        return <Plus className="h-4 w-4 text-green-600" />;
      case "improved":
      case "fixed":
        return <Wrench className="h-4 w-4 text-blue-600" />;
      case "breaking":
      case "deprecated":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "removed":
        return <Trash2 className="h-4 w-4 text-red-600" />;
      default:
        return <Wrench className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeBadge = (type: string) => {
    switch (type) {
      case "added":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Added</Badge>;
      case "improved":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Improved</Badge>;
      case "fixed":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Fixed</Badge>;
      case "breaking":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Breaking</Badge>;
      case "deprecated":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Deprecated</Badge>;
      case "removed":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Removed</Badge>;
      default:
        return <Badge variant="outline">Change</Badge>;
    }
  };

  const getVersionBadge = (type: string) => {
    switch (type) {
      case "major":
        return <Badge variant="destructive">Major</Badge>;
      case "minor":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Minor</Badge>;
      case "patch":
        return <Badge variant="outline">Patch</Badge>;
      default:
        return <Badge variant="secondary">Release</Badge>;
    }
  };

  return (
    <DocLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Changelog</h1>
          <p className="text-xl text-muted-foreground">
            Stay up to date with the latest changes, improvements, and new features in the Stellantis Connected Vehicles API.
          </p>
        </div>

        {/* Latest Release Highlight */}
        <section className="space-y-4">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-blue-800">🎉</div>
                  <div>
                    <CardTitle className="text-blue-800">Latest Release: v2.1.0</CardTitle>
                    <CardDescription className="text-blue-700">
                      Enhanced diagnostics, webhook filtering, and improved location accuracy
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-blue-600 text-white">Latest</Badge>
              </div>
            </CardHeader>
          </Card>
        </section>

        {/* Migration Notice */}
        <section className="space-y-4">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <div>
                  <CardTitle className="text-yellow-800">Important Migration Notice</CardTitle>
                  <CardDescription className="text-yellow-700">
                    If you're still using API v1.x, please plan to migrate to v2.x before the end of Q1 2024. 
                    Check our migration guide for detailed instructions.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </section>

        {/* Changelog Entries */}
        <section className="space-y-8">
          {releases.map((release, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold">{release.version}</h2>
                {getVersionBadge(release.type)}
                <span className="text-muted-foreground">
                  {new Date(release.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="space-y-3">
                {release.changes.map((change, changeIndex) => (
                  <Card key={changeIndex}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getChangeIcon(change.type)}
                          <div className="flex-1">
                            <CardTitle className="text-lg">{change.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {change.description}
                            </CardDescription>
                          </div>
                        </div>
                        {getChangeBadge(change.type)}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Subscribe to Updates */}
        <section className="border-t pt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stay Updated</CardTitle>
              <CardDescription>
                Get notified about new releases and important updates
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
                You can also watch our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  GitHub repository
                </a>{" "}
                for release notifications.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </DocLayout>
  );
};

export default Changelog;
