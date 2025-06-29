
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code?: string;
  language?: string;
  title?: string;
  multiLanguage?: {
    [key: string]: string;
  };
}

export function CodeBlock({ code = "", language = "javascript", title, multiLanguage }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (multiLanguage) {
    return (
      <Card className="overflow-hidden">
        {title && (
          <div className="border-b bg-muted/50 px-4 py-2">
            <h4 className="text-sm font-medium">{title}</h4>
          </div>
        )}
        <Tabs defaultValue={Object.keys(multiLanguage)[0]} className="w-full">
          <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
            <TabsList className="h-8">
              {Object.keys(multiLanguage).map((lang) => (
                <TabsTrigger key={lang} value={lang} className="text-xs">
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {Object.entries(multiLanguage).map(([lang, codeContent]) => (
            <TabsContent key={lang} value={lang} className="m-0">
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(codeContent)}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
                <pre className="overflow-x-auto p-4 text-sm">
                  <code className={cn("block", `language-${lang}`)}>{codeContent}</code>
                </pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {title && (
        <div className="border-b bg-muted/50 px-4 py-2">
          <h4 className="text-sm font-medium">{title}</h4>
        </div>
      )}
      <div className="relative">
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-2 top-2 h-8 w-8 p-0 z-10"
          onClick={() => copyToClipboard(code)}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
        <pre className="overflow-x-auto p-4 text-sm">
          <code className={cn("block", `language-${language}`)}>{code}</code>
        </pre>
      </div>
    </Card>
  );
}
