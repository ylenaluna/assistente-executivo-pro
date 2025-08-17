import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    if (req.method === 'POST') {
      const body = await req.json();
      console.log('Received WhatsApp webhook:', body);

      // Process WhatsApp message
      const messages = body.entry?.[0]?.changes?.[0]?.value?.messages || [];
      
      for (const message of messages) {
        if (message.type === 'text') {
          const phoneNumber = message.from;
          const textContent = message.text.body.trim();
          
          console.log(`Processing message from ${phoneNumber}: ${textContent}`);
          
          // Parse command and create appropriate record
          const result = await processWhatsAppCommand(supabase, phoneNumber, textContent);
          
          if (result.success) {
            console.log(`Successfully created ${result.type}:`, result.data);
          } else {
            console.error(`Error processing command:`, result.error);
          }
        }
      }

      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function processWhatsAppCommand(supabase: any, phoneNumber: string, message: string) {
  // Find user by phone number in profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('phone', phoneNumber)
    .single();

  if (!profile) {
    return { success: false, error: 'User not found for this phone number' };
  }

  const userId = profile.user_id;
  const lowerMessage = message.toLowerCase();

  try {
    // TAREFA: título | descrição | prioridade | data
    if (lowerMessage.startsWith('tarefa:')) {
      const taskData = message.substring(7).split('|').map(s => s.trim());
      const [title, description = '', priority = 'medium', dueDate] = taskData;

      const task = {
        user_id: userId,
        title,
        description,
        priority: ['low', 'medium', 'high'].includes(priority.toLowerCase()) ? priority.toLowerCase() : 'medium',
        status: 'pending',
        due_date: dueDate ? parseDate(dueDate) : null
      };

      const { data, error } = await supabase.from('tasks').insert(task).select().single();
      return { success: !error, type: 'task', data, error };
    }

    // EVENTO: título | data | hora início | hora fim | local
    if (lowerMessage.startsWith('evento:')) {
      const eventData = message.substring(7).split('|').map(s => s.trim());
      const [title, date, startTime, endTime, location = ''] = eventData;

      if (!date || !startTime) {
        return { success: false, error: 'Data e hora de início são obrigatórias' };
      }

      const startDateTime = parseDatetime(date, startTime);
      const endDateTime = endTime ? parseDatetime(date, endTime) : new Date(startDateTime.getTime() + 60 * 60 * 1000);

      const event = {
        user_id: userId,
        title,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        location,
        description: ''
      };

      const { data, error } = await supabase.from('calendar_events').insert(event).select().single();
      return { success: !error, type: 'event', data, error };
    }

    // CONTATO: nome | email | telefone | empresa
    if (lowerMessage.startsWith('contato:')) {
      const contactData = message.substring(8).split('|').map(s => s.trim());
      const [name, email = '', phone = '', company = ''] = contactData;

      const contact = {
        user_id: userId,
        name,
        email,
        phone,
        company,
        position: ''
      };

      const { data, error } = await supabase.from('contacts').insert(contact).select().single();
      return { success: !error, type: 'contact', data, error };
    }

    return { success: false, error: 'Comando não reconhecido. Use: TAREFA:, EVENTO: ou CONTATO:' };

  } catch (error) {
    return { success: false, error: error.message };
  }
}

function parseDate(dateStr: string): string | null {
  try {
    // Support formats: DD/MM/YYYY, DD-MM-YYYY, hoje, amanhã
    if (dateStr.toLowerCase() === 'hoje') {
      return new Date().toISOString();
    }
    if (dateStr.toLowerCase() === 'amanhã') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString();
    }
    
    // Parse DD/MM/YYYY or DD-MM-YYYY
    const parts = dateStr.split(/[\/\-]/);
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toISOString();
    }
    
    return null;
  } catch {
    return null;
  }
}

function parseDatetime(dateStr: string, timeStr: string): Date {
  const date = new Date(parseDate(dateStr) || new Date().toISOString());
  
  // Parse time format HH:MM
  const timeParts = timeStr.split(':');
  if (timeParts.length === 2) {
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    date.setHours(hours, minutes, 0, 0);
  }
  
  return date;
}