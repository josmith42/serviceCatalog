
function Invoke-Psql {
    param(
        [Parameter(Mandatory = $true)]
        [string]$sql
    )
    $dbconnString = 'postgresql://postgres:postgres@localhost:54322/postgres'
    psql -c $sql $dbconnString
}

$csvfile = "music-catalog.csv"
$csv = Import-Csv $csvfile

function Sanitize {
    param(
        [string]$value
    )
    return $value.Replace("'", "''")
}

function Get-Unique-Values {
    param(
        [Parameter(Mandatory=$true)][object]$csv,
        [Parameter(Mandatory=$true)][string]$column
    )
    $values = ($csv | Group-Object $column).Name | Where-Object { $_.Length -gt 0 }
    $values = foreach($value in $values) {
        "('$(( Sanitize $value ))')"
    }
    $values = $values -join ','
    return $values
}

##
## Delete all data from the database
## 
Invoke-Psql -sql "delete from pieces;"
Invoke-Psql -sql "delete from genres;"
Invoke-Psql -sql "delete from composers;"
Invoke-Psql -sql "delete from books;"
Invoke-Psql -sql "delete from services;"

##
## Populate independent tables
##
$genres = Get-Unique-Values -csv $csv -column Genre
Invoke-Psql -sql "insert into Genres(name) values $genres;"

$composers = Get-Unique-Values -csv $csv -column Composer
Invoke-Psql -sql "insert into Composers(name) values $composers;"

$books = Get-Unique-Values -csv $csv -column Book
Invoke-Psql -sql "insert into Books(title) values $books;"

$dates = Get-Unique-Values -csv $csv -column Date
Invoke-Psql -sql "insert into services(date) values $dates"

##
## Populate pieces
##
$parsedPieces = @()

foreach ($row in $csv) {
    if ($parsedPieces.Where({ $_.Title -eq $row.Title -And $_.Composer -eq $row.Composer }, 'First').Count -eq 0) {
        Invoke-Psql -sql "
            insert into Pieces(title, composer_id, book_id, page, notes)
            values (
                '$((Sanitize $row.Title))',
                (select id from composers where name = '$((Sanitize $row.Composer))'),
                (select id from books where title = '$((Sanitize $row.Book))'),
                '$((Sanitize $row.'Page #'))',
                '$((Sanitize $row.Notes))'
            );
        "

        $parsedPieces += @{
            Title    = $row.Title
            Composer = $row.Composer
        }
    }
}

foreach($row in $csv) {
    Invoke-Psql -sql "
        insert into service_pieces(service_id, piece_id, genre_id) values(
            (select id from services where date='$((Sanitize $row.Date))'),
            (select id from pieces where title='$((Sanitize $row.Title))' and composer_id=(select id from composers where name='$((Sanitize $row.Composer))')),
            (select id from genres where name='$((Sanitize $row.Genre))')
        )
    "
}