#!/usr/bin/env pwsh
npx supabase gen types typescript --schema public --local > $PSScriptRoot/../src/api/dto/supabase.ts
