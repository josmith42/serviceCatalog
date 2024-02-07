
$dbconnString = 'postgresql://postgres:postgres@localhost:54322/postgres'

function Invoke-Psql {
    param(
        [Parameter(Mandatory = $true)]
        [string]$sql
    )
    psql -c $sql $dbconnString
}

function Invoke-PsqlFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$file
    )
    psql -f $file $dbconnString
}