import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Building,
  MapPin
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  avatar?: string;
}

const Contacts = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Ana Silva',
      email: 'ana.silva@empresa.com',
      phone: '+55 11 99999-9999',
      company: 'Tech Solutions',
      position: 'Gerente de Vendas'
    },
    {
      id: '2',
      name: 'Carlos Santos',
      email: 'carlos@consultoria.com',
      phone: '+55 11 88888-8888',
      company: 'Consultoria ABC',
      position: 'Consultor Senior'
    }
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) {
      toast({
        title: "Erro",
        description: "Nome e email são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact
    };

    setContacts(prev => [...prev, contact]);
    setNewContact({
      name: '',
      email: '',
      phone: '',
      company: '',
      position: ''
    });

    toast({
      title: "Contato Adicionado",
      description: `${contact.name} foi adicionado aos seus contatos.`,
    });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-8 h-8" />
        <h1 className="text-3xl font-bold">Contatos</h1>
      </div>

      {/* Adicionar Novo Contato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Adicionar Novo Contato
          </CardTitle>
          <CardDescription>Adicione um novo contato à sua lista</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                placeholder="Nome completo"
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={newContact.email}
                onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="+55 11 99999-9999"
                value={newContact.phone}
                onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                placeholder="Nome da empresa"
                value={newContact.company}
                onChange={(e) => setNewContact(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="position">Cargo</Label>
              <Input
                id="position"
                placeholder="Cargo ou função"
                value={newContact.position}
                onChange={(e) => setNewContact(prev => ({ ...prev, position: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={handleAddContact}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Contato
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Buscar Contatos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Contatos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar por nome, email ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Lista de Contatos */}
      <Card>
        <CardHeader>
          <CardTitle>Meus Contatos</CardTitle>
          <CardDescription>
            {filteredContacts.length} contato(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div 
                key={contact.id} 
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar>
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{contact.name}</h3>
                    {contact.position && (
                      <Badge variant="secondary">{contact.position}</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {contact.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {contact.email}
                      </div>
                    )}
                    
                    {contact.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </div>
                    )}
                    
                    {contact.company && (
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {contact.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredContacts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum contato encontrado</p>
                {searchTerm && <p className="text-sm">Tente uma busca diferente</p>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;