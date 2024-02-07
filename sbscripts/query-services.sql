SELECT
  services.id as service_id,
  services.date,
  genres.name as genre,
  selections.title,
  composers.name as composer
FROM
  services
  INNER JOIN service_selections on service_selections.service_id = services.id
  INNER JOIN genres on service_selections.genre_id = genres.id
  INNER JOIN selections on service_selections.selection_id = selections.id
  INNER JOIN composers on selections.composer_id = composers.id
