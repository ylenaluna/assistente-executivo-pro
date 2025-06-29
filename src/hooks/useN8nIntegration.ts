
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface N8nWebhookConfig {
  name: string;
  url: string;
  enabled: boolean;
}

export const useN8nIntegration = () => {
  const [webhooks, setWebhooks] = useState<N8nWebhookConfig[]>([]);
  const { toast } = useToast();

  const addWebhook = useCallback((config: N8nWebhookConfig) => {
    setWebhooks(prev => [...prev, config]);
    localStorage.setItem('n8n-webhooks', JSON.stringify([...webhooks, config]));
  }, [webhooks]);

  const removeWebhook = useCallback((name: string) => {
    const updated = webhooks.filter(w => w.name !== name);
    setWebhooks(updated);
    localStorage.setItem('n8n-webhooks', JSON.stringify(updated));
  }, [webhooks]);

  const triggerWebhook = useCallback(async (
    webhookUrl: string, 
    data: Record<string, any>,
    actionName: string
  ) => {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: "assistente-virtual",
          action: actionName,
        }),
      });

      toast({
        title: "n8n Acionado",
        description: `Workflow '${actionName}' foi executado com sucesso.`,
      });

      return true;
    } catch (error) {
      console.error("Error triggering n8n webhook:", error);
      toast({
        title: "Erro n8n",
        description: "Falha ao acionar o workflow do n8n.",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  return {
    webhooks,
    addWebhook,
    removeWebhook,
    triggerWebhook,
  };
};
