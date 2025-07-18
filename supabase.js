// supabase.js
const SUPABASE_URL = 'https://xwdlkfedsxfchesdqadr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZGxrZmVkc3hmY2hlc2RxYWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4Mzk2OTIsImV4cCI6MjA2ODQxNTY5Mn0.4aPSyfuwWUFBMGActsPfhci1ELaXrDX3MpBALQOHzAo';

// Inisialisasi Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
