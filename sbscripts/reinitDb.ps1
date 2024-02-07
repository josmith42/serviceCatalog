
. $PSScriptRoot/Invoke-Psql.ps1

Invoke-PsqlFile -file $PSScriptRoot/drop-schema.sql
Invoke-PsqlFile -file $PSScriptRoot/schema.sql

. "$PSScriptRoot/populateDb.ps1"
