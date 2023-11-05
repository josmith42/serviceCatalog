
function Invoke-Psql {
    param(
        [Parameter(Mandatory=$true)]
        [string]$sql
    )
    $dbconnString = 'postgresql://postgres:postgres@localhost:54322/postgres'
    psql.exe -c $sql $dbconnString
}

$csvfile = "C:\Users\James\Downloads\organ-music-catalog - Catalog.csv"
$csv = Import-Csv $csvfile

function Get-Unique-Values {
    param(
        [Parameter(Mandatory=$true)][object]$csv,
        [Parameter(Mandatory=$true)][string]$column
    )
    $values = ($csv | Group-Object $column).Name | Where-Object { $_.Length -gt 0 }
    $values = foreach($value in $values) {
        "('" + $value.Replace("'", "''") + "')"
    }
    $values = $values -join ','
    return $values
}

$genres = Get-Unique-Values -csv $csv -column Genre
Invoke-Psql -sql "delete from Genres;"
Invoke-Psql -sql "insert into Genres(name) values $genres;"

$composers = Get-Unique-Values -csv $csv -column Composer
Invoke-Psql -sql "delete from Composers;"
Invoke-Psql -sql "insert into Composers(name) values $composers;"

$books = Get-Unique-Values -csv $csv -column Book
Invoke-Psql -sql "delete from Books;"
Invoke-Psql -sql "insert into Books(title) values $books;"
