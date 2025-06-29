
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Webhook, Send, Settings } from 'lucide-react';

interface N8nIntegrationProps {
  title: string;
  data: Record<string, any>;
  onSuccess?: () => void;
}

export const N8nIntegration: React.FC<N8nIntegrationProps> = ({ 
  title, 
  data, 
  onSuccess 
}) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const { toast } = useToast();

  const handleTriggerWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Erro",
        description: "Por favor, insira a URL do webhook do n8n",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering n8n webhook:", webhookUrl, data);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: "assistente-virtual",
          action: title,
        }),
      });

      toast({
        title: "Enviado para n8n",
        description: "Os dados foram enviados com sucesso para o workflow do n8n.",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error triggering n8n webhook:", error);
      toast({
        title: "Erro",
        description: "Falha ao enviar dados para o n8n. Verifique a URL e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Webhook className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Integração n8n</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfig(!showConfig)}
        >
          <Settings className="w-4 h-4 mr-2" />
          {showConfig ? 'Ocultar' : 'Configurar'}
        </Button>
      </div>

      {showConfig && (
        <form onSubmit={handleTriggerWebhook} className="space-y-4 p-4 border rounded-lg">
          <div>
            <Label htmlFor="webhookUrl">URL do Webhook n8n</Label>
            <Input
              id="webhookUrl"
              type="url"
              placeholder="https://seu-n8n.com/webhook/uuid"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Cole aqui a URL do webhook do seu workflow n8n
            </p>
          </div>

          <div>
            <Label>Dados a serem enviados:</Label>
            <Textarea
              value={JSON.stringify(data, null, 2)}
              readOnly
              className="mt-1 h-32 font-mono text-sm"
            />
          </div>

          <Button type="submit" disabled={isLoading || !webhookUrl} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? 'Enviando...' : `Enviar ${title} para n8n`}
          </Button>
        </form>
      )}
    </div>
  );
};
