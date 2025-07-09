import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  CheckSquare, 
  Users, 
  FileText, 
  Plane, 
  BarChart3,
  Settings as SettingsIcon,
  Key,
  Zap,
  Globe,
  Mail,
  Phone,
  Cloud
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState({
    calendar: {
      google: { enabled: false, apiKey: '' },
      outlook: { enabled: false, apiKey: '' },
      zapier: { enabled: false, webhookUrl: '' }
    },
    tasks: {
      asana: { enabled: false, apiKey: '' },
      trello: { enabled: false, apiKey: '' },
      notion: { enabled: false, apiKey: '' },
      slack: { enabled: false, webhookUrl: '' }
    },
    contacts: {
      hubspot: { enabled: false, apiKey: '' },
      salesforce: { enabled: false, apiKey: '' },
      pipedrive: { enabled: false, apiKey: '' },
      mailchimp: { enabled: false, apiKey: '' }
    },
    documents: {
      googledrive: { enabled: false, apiKey: '' },
      dropbox: { enabled: false, apiKey: '' },
      onedrive: { enabled: false, apiKey: '' },
      sharepoint: { enabled: false, apiKey: '' }
    },
    travel: {
      amadeus: { enabled: false, apiKey: '' },
      booking: { enabled: false, apiKey: '' },
      expedia: { enabled: false, apiKey: '' },
      uber: { enabled: false, apiKey: '' }
    },
    analytics: {
      googleanalytics: { enabled: false, apiKey: '' },
      mixpanel: { enabled: false, apiKey: '' },
      amplitude: { enabled: false, apiKey: '' }
    }
  });

  const handleToggleIntegration = (category: string, service: string) => {
    setIntegrations(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [service]: {
          ...prev[category as keyof typeof prev][service as keyof any],
          enabled: !prev[category as keyof typeof prev][service as keyof any].enabled
        }
      }
    }));
  };

  const handleApiKeyChange = (category: string, service: string, value: string) => {
    setIntegrations(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [service]: {
          ...prev[category as keyof typeof prev][service as keyof any],
          apiKey: value
        }
      }
    }));
  };

  const handleWebhookChange = (category: string, service: string, value: string) => {
    setIntegrations(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [service]: {
          ...prev[category as keyof typeof prev][service as keyof any],
          webhookUrl: value
        }
      }
    }));
  };

  const saveIntegration = (category: string, service: string) => {
    toast({
      title: "Integração Salva",
      description: `Configurações da integração ${service} foram salvas com sucesso.`,
    });
  };

  const testIntegration = async (category: string, service: string) => {
    toast({
      title: "Testando Integração",
      description: `Testando conexão com ${service}...`,
    });
    
    // Simular teste de integração
    setTimeout(() => {
      toast({
        title: "Teste Concluído",
        description: `Conexão com ${service} estabelecida com sucesso!`,
      });
    }, 2000);
  };

  const IntegrationCard = ({ 
    title, 
    description, 
    icon: Icon, 
    category, 
    services 
  }: {
    title: string;
    description: string;
    icon: any;
    category: string;
    services: any;
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(services).map(([serviceName, serviceConfig]: [string, any]) => (
          <div key={serviceName} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-medium capitalize">{serviceName}</h4>
                <Badge variant={serviceConfig.enabled ? "default" : "secondary"}>
                  {serviceConfig.enabled ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <Switch
                checked={serviceConfig.enabled}
                onCheckedChange={() => handleToggleIntegration(category, serviceName)}
              />
            </div>
            
            {serviceConfig.enabled && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`${category}-${serviceName}-key`}>
                    {serviceConfig.webhookUrl !== undefined ? 'Webhook URL' : 'API Key'}
                  </Label>
                  <Input
                    id={`${category}-${serviceName}-key`}
                    type={serviceConfig.webhookUrl !== undefined ? 'url' : 'password'}
                    placeholder={serviceConfig.webhookUrl !== undefined ? 
                      'https://hooks.zapier.com/...' : 
                      'Digite sua API Key'}
                    value={serviceConfig.apiKey || serviceConfig.webhookUrl || ''}
                    onChange={(e) => {
                      if (serviceConfig.webhookUrl !== undefined) {
                        handleWebhookChange(category, serviceName, e.target.value);
                      } else {
                        handleApiKeyChange(category, serviceName, e.target.value);
                      }
                    }}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => saveIntegration(category, serviceName)}
                  >
                    Salvar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => testIntegration(category, serviceName)}
                  >
                    Testar Conexão
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="w-8 h-8" />
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="integrations">Integrações de API</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid gap-6">
            <IntegrationCard
              title="Agenda"
              description="Integre com serviços de calendário para sincronizar eventos"
              icon={Calendar}
              category="calendar"
              services={integrations.calendar}
            />

            <IntegrationCard
              title="Tarefas"
              description="Conecte com ferramentas de gerenciamento de tarefas"
              icon={CheckSquare}
              category="tasks"
              services={integrations.tasks}
            />

            <IntegrationCard
              title="Contatos"
              description="Sincronize com CRMs e ferramentas de marketing"
              icon={Users}
              category="contacts"
              services={integrations.contacts}
            />

            <IntegrationCard
              title="Documentos"
              description="Integre com serviços de armazenamento em nuvem"
              icon={FileText}
              category="documents"
              services={integrations.documents}
            />

            <IntegrationCard
              title="Viagens"
              description="Conecte com APIs de reservas e transporte"
              icon={Plane}
              category="travel"
              services={integrations.travel}
            />

            <IntegrationCard
              title="Analytics"
              description="Integre com ferramentas de análise e métricas"
              icon={BarChart3}
              category="analytics"
              services={integrations.analytics}
            />
          </div>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Personalize a experiência do seu assistente virtual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">Receber notificações por email sobre eventos importantes</p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sincronização Automática</Label>
                  <p className="text-sm text-muted-foreground">Sincronizar dados automaticamente a cada hora</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Fuso Horário</Label>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option>UTC-3 (Brasília)</option>
                  <option>UTC-2 (Fernando de Noronha)</option>
                  <option>UTC-4 (Manaus)</option>
                  <option>UTC-5 (Acre)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Segurança
              </CardTitle>
              <CardDescription>Gerencie suas configurações de segurança e privacidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Alterar Senha</Label>
                <div className="space-y-2">
                  <Input type="password" placeholder="Senha atual" />
                  <Input type="password" placeholder="Nova senha" />
                  <Input type="password" placeholder="Confirmar nova senha" />
                  <Button>Alterar Senha</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Sessões Ativas</Label>
                <p className="text-sm text-muted-foreground">Gerencie onde você está conectado</p>
                <Button variant="outline">Ver Sessões Ativas</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
