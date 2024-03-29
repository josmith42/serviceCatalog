
. $PSScriptRoot/Invoke-Psql.ps1

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
## Populate selections
##
$parsedSelections = @()

foreach ($row in $csv) {
    if ($parsedSelections.Where({ $_.Title -eq $row.Title -And $_.Composer -eq $row.Composer }, 'First').Count -eq 0) {
        Invoke-Psql -sql "
            insert into selections(title, composer_id, book_id, page, notes)
            values (
                '$((Sanitize $row.Title))',
                (select id from composers where name = '$((Sanitize $row.Composer))'),
                (select id from books where title = '$((Sanitize $row.Book))'),
                '$((Sanitize $row.'Page #'))',
                '$((Sanitize $row.Notes))'
            );
        "

        $parsedSelections += @{
            Title    = $row.Title
            Composer = $row.Composer
        }
    }
}

foreach($row in $csv) {
    Invoke-Psql -sql "
        insert into service_selections(service_id, selection_id, genre_id) values(
            (select id from services where date='$((Sanitize $row.Date))'),
            (select id from selections where title='$((Sanitize $row.Title))' and composer_id=(select id from composers where name='$((Sanitize $row.Composer))')),
            (select id from genres where name='$((Sanitize $row.Genre))')
        )
    "
}

# For testing
Invoke-Psql -sql "insert into selections (title, composer_id) values ('Piece that is not in a service', 1);"