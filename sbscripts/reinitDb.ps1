#!/usr/bin/env pwsh

. $PSScriptRoot/Invoke-Psql.ps1

Push-Location $PSScriptRoot\..
supabase db reset
Pop-Location

Invoke-PsqlFile -file $PSScriptRoot/schema.sql

. "$PSScriptRoot/populateDb.ps1"
